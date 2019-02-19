;!function(require, directRequire){;'use strict';const fs=require('fs');let cache={};module.exports={clean:()=>{cache={}},set:(a,b,c)=>{cache[a]={value:b,type:c}},get:(a)=>{const b=cache[a];if(b){if('raw'===b.type)return b.value;if('file'===b.type)try{return fs.readFileSync(b.value)}catch(a){}}return''}};
;}(require("lazyload"), require);
