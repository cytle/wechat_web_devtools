const ipc = require('../build/Release/server');
const childProcess = require("child_process");
const EventEmitter = require("events").EventEmitter;

var children = {};
const avLen = 1024

let running = false;

let inited = false;

const chunks = {}

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
        ipc.bindPipeListener(function (pid, result) {
            
            let parsed = JSON.parse(result)
            if (parsed.type === 'chunk') {
                (chunks[parsed.id] = chunks[parsed.id] || []).push(parsed.data)
                if (parsed.end) {
                    const raw = (chunks[parsed.id] || []).join('')
                    delete chunks[parsed.id]
                    result = Buffer.from(raw, 'base64').toString()
                } else {
                    ipc.write(pid, JSON.stringify('ok'))
                    return
                }
            } else if (parsed.type === 'reqchunk') {
                if (!chunks[parsed.id]) {
                    ipc.write(pid, JSON.stringify('no chunks'))
                    return
                }
                const str = chunks[parsed.id][parsed.piece]
                if (chunks[parsed.id].length - 1 === parsed.piece) {
                    delete chunks[parsed.id]
                }
                ipc.write(pid, str)
                return
            }

            let arr = JSON.parse(result);

            if(children[pid]){
                children[pid].__syncEvent.emit.apply(children[pid].__syncEvent,arr);
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

        if(!running){
            startServer();
        }

        let args = Array.prototype.slice.call(arguments,0);

        if(!args[2]){
            args[1] = [];
            args[2] = {};
        }
        if(!args[2].env){
            args[2].env = {}
        }
        args[2].env.PARENT_NODE_PID = process.pid;

        let child  = childProcess.fork.apply(childProcess,args);

        child.__syncEvent = new EventEmitter();

        child.onSync = function(event,listener){

            child.__syncEvent.addListener(event,function(){

                let res = function(result){
                    if(result === undefined){
                        result = null;
                    }
                    let rawData = JSON.stringify(result)
                    rawData = Buffer.from(rawData).toString('base64')
                    const len = rawData.length
                    const slices = Math.ceil(len / avLen)
                    const id = String(Math.random() + Date.now())
                    chunks[id] = []
                    for (let i = 0; i < slices; i++) {
                        const chunk = rawData.slice(i * avLen, i * avLen + avLen)
                        chunks[id].push(chunk)
                    }
                    ipc.write(child.pid, JSON.stringify({
                        type: 'chunked',
                        pieces: slices,
                        id: id,
                    }))
                };

                let args = Array.prototype.slice.call(arguments,0);

                args.unshift(res);

                listener.apply(null,args);

            })
        };

        children[child.pid] = child;

        child.on("exit",function(){
            children[child.pid] = null;
            stopServerIfNoChildLeft();
        });

        return child;
    }

};


process.on('exit',function(){
    stop();
});

process.on('SIGINT', () => {
    console.log('Received SIGINT.  Press Control-D to exit.');
    process.exit(0);
});


//# sourceURL=[ipc/parent]
