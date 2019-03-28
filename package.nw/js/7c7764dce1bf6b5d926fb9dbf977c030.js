;!function(require, directRequire){;"use strict";const BaseMessager=directRequire('./214c25062f31e2cad941b3ec069db1fe.js'),messagerMap=new Map,getMessager=(a)=>{if(messagerMap.has(a))return messagerMap.get(a);const b=new BaseMessager(`EXTENSION_${a}`);return b.ready=!0,messagerMap.set(a,b),b};module.exports={get:getMessager};
;}(require("lazyload"), require);
