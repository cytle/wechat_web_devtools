"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http = require("http");
process.stdout.write('helper start: ' + Date.now());
const quit = () => {
    setTimeout(() => process.kill(process.pid, 'SIGTERM'), 0);
};
if (!process.env.httpPort || isNaN(parseInt(process.env.httpPort, 10))) {
    process.stderr.write('invalid http port');
    quit();
}
else if (!process.env.sdkCallId || isNaN(parseInt(process.env.sdkCallId, 10))) {
    process.stderr.write('invalid callId');
    quit();
}
else {
    const port = parseInt(process.env.httpPort, 10);
    const callId = parseInt(process.env.sdkCallId, 10);
    const pid = process.pid;
    // what if it exists now
    http.get(`http://127.0.0.1:${port}/remotedebug/registersyncpid/${pid}/${callId}?_r=${Math.random}`, res => {
        process.stdout.write('\nregistered with status code ' + res.statusCode + ', ' + Date.now());
    }).on('error', e => {
        process.stderr.write('error: ' + e.stack);
    });
}
function fn() {
    setTimeout(function () {
        quit();
    }, 15000);
}
fn();
