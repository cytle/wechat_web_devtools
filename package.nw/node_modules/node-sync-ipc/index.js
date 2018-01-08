/**
 * @file index.js
 *
 * Created by mmhunter on 16/10/2017.
 */
module.exports = {
    parent:()=>{ return require("./lib/parent") },
    child:()=>{ return require("./lib/child")}
};

//# sourceURL=[ipc/index]
