/**
 * @file child.js
 *
 * Created by mmhunter on 15/10/2017.
 */


const ipc = require('bindings')('client.node');

let client = {

    sendSync:function(eventName){

        if(typeof eventName !== 'string' || eventName.length === 0){
            throw new Error("Event name must be a non empty string! ");
        }

        let args = Array.prototype.slice.call(arguments);

        args = args.map(function(a){
            if(a === undefined){
                a = null;
            }
            return a;
        });
        // return ipc.sendSync(JSON.stringify(args));
        let result = ipc.sendSync(JSON.stringify(args));

        return JSON.parse(result);

    }

};

ipc.setServerPid(parseInt(process.env.NODE_SYNC_IPC_SERVER_PID || 0));

module.exports = client;
