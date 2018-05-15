const ipc = require('bindings')('server');
const childProcess = require("child_process");
const EventEmitter = require("events").EventEmitter;

var children = {};

let running = false;

let inited = false;

function stop(){
    if(running){
        running = false;
        ipc.stop();
    }
}

function startServer(){
    running = true;
    ipc.startServer();
    if(!inited){
        inited = true;
        ipc.bindPipeListener(function(pid,result){

            let arr = JSON.parse(result);

            if(children[pid]){
                children[pid].__syncEvent.emit.apply(children[pid].__syncEvent,arr);
            }
            else{
                console.error("child with pid "+ pid +"not found");
            }

        });
    }

}

function stopServerIfNoChildLeft(){
    if(!running) return;
    let shouldStop = true;
    for(let key in children){
        if(children[key]){
            shouldStop = false;
        }
    }
    if(shouldStop){
        stop();
    }
}

module.exports = {

    fork:function(){

        let args = Array.prototype.slice.call(arguments,0);

        if(!args[2]){
            args[1] = [];
            args[2] = {};
        }
        if(!args[2].env){
            args[2].env = {}
        }
        //args[2].env.PARENT_NODE_PID = process.pid;

        let child  = childProcess.fork.apply(childProcess,args);

        return this.addChild(child);
    },

    addChild: function (child){

        try {
            if(!running){
                startServer();
            }

            child.__syncEvent = new EventEmitter();

            child.onSync = function(event,listener){

                child.__syncEvent.addListener(event,function(){

                    let res = function(result){
                        if(result === undefined){
                            result = null;
                        }
                        ipc.write(child.pid,JSON.stringify(result));
                    };

                    let args = Array.prototype.slice.call(arguments,0);

                    args.unshift(res);

                    listener.apply(null,args);

                });

            };

            children[child.pid] = child;

            child.on("exit",function(){
                children[child.pid] = null;
                stopServerIfNoChildLeft();
            });

            return child;
        } catch (e){
            throw e;
            if (child && child.pid) {
                children[child.pid] = null;
            }
            stopServerIfNoChildLeft();
        }

    }

};


process.on('exit',function(){
    stop();
});

process.on('SIGINT', () => {
    console.log('Received SIGINT.  Press Control-D to exit.');
    process.exit(0);
});

