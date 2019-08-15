/**
 * @file child.js
 *
 * Created by mmhunter on 17/10/2017.
 */
var syncIpc = require("../../index").child();

let sum = 0;

let count = Math.random() * 1000;

for (let i = 0; i < count; i ++){
    sum += syncIpc.sendSync("next");
}

syncIpc.sendSync("result",sum);
