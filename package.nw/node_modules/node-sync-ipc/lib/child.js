/**
 * @file child.js
 *
 * Created by mmhunter on 15/10/2017.
 */

const ipc = require('../build/Release/client.node');
const avLen = 1024

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
        // return JSON.parse(ipc.sendSync(JSON.stringify(args)));
        let rawData = JSON.stringify(args)
        rawData = Buffer.from(rawData).toString('base64')
        const len = rawData.length
        const slices = Math.ceil(len / avLen)
        const id = String(Math.random())
        let rawResult = 'null'
        for (let i = 0; i < slices; i++) {
            const chunk = rawData.slice(i * avLen, i * avLen + avLen)
            const dtd = {
                id: id,
                type: 'chunk',
                data: chunk,
                end: i >= slices - 1,
            }
            rawResult = ipc.sendSync(JSON.stringify(dtd))
        }
        const parsed = JSON.parse(rawResult)
        if (parsed.type === 'chunked') {
            let data = ''
            const pieces = parsed.pieces
            for (let i = 0; i < pieces; i++) {
                const chunk = ipc.sendSync(JSON.stringify({
                    type: 'reqchunk',
                    piece: i,
                    id: parsed.id,
                }))
                data += chunk
            }
            data = Buffer.from(data, 'base64').toString()
            return JSON.parse(data)
        }
        return null
    }

};

ipc.setParentPid(parseInt(process.env.PARENT_NODE_PID));


module.exports = client;

//# sourceURL=[ipc/child]
