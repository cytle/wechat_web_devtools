# node-sync-ipc

`node-sync-ipc` is a tiny library making it possible for child node.js processes created by `child_process.fork` to send synchronous message to parent process. It can block the child process until the parent make a response. This use case is kind of rare but I hope it can be of some help if anyone needs.

# Install

````shell

npm install node-sync-ipc

````

# Usage

In parent process:



````javascript

// parent.js

var syncIpc = require("node-sync-ipc").parent();

// fork the child process just like child_process.fork()
var child = syncIpc.fork("./child.js");

child.onSync("foo",function(res,bar){

    bar = bar + " " +bar;
    // block the child process for one second
    setTimeout(function(){
        // the first argument will be passed to child process as the result
        res(bar);
    },1000)
});

````

In child process:

````javascript

// child.js

var syncIpc = require("node-sync-ipc").child();

// will log "echo content echo content" in console

console.log(syncIpc.sendSync("foo","echo content"));

````

# Attention

## Data should be serializable

Data to be transferred will be serialized and deserialized in the format of JSON. Error will be thrown if data is not serializable by `JSON.stringify`.

Also class information will be lost during the communication.


## Sock file

On Unix based system, this module would create a `nodePipe${parentPid}.sock` in the home directory (or defined by the HOME environment variable). In most cases this file would be deleted correctly. But currently it is not guaranteed if process was killed unexpectedly.


## Electron

This module has c++ add-ons, so you have to rebuild it to use it in Electron.

# Copyright

Copyright (c) 2017 Hang Ma. See [LICENSE](https://github.com/mmhunter/node-sync-ipc/blob/master/LICENSE) for details.


