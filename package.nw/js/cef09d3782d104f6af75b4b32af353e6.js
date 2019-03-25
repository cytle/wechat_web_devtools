;!function(require, directRequire){;'use strict';const implement=require('./19b8d2537e2a8fa3bfdb9f7f498378a9.js'),exec=function(a,b){const{api:c}=a;return async(d,e)=>{try{if(!implement[c])throw new Error('not support');return await implement[c](d,a,b,e)}catch(a){return{errMsg:`${c}:fail ${a.message||a}`}}}};module.exports={exec};
;}(require("lazyload"), require);
