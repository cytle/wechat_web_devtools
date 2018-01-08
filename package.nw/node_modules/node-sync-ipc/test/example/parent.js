/**
 * @file parent.js
 *
 * Created by mmhunter on 17/10/2017.
 */
var syncIpc = require("../../index").parent();

// fork the child process just like child_process.fork()
var child = syncIpc.fork("./child.js");

child.onSync("foo",function(res,bar){

    bar = bar + " "+ bar;
    // block the child process for one second
    // the first argument will be passed to child process as the result
    setTimeout(function(){
        res(bar);
    },1000);
});