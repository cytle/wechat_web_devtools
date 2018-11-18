;!function(require, directRequire){;"use strict";const contentWatcher=require('./162bf2ee28b76d3b3d95b685cede4146.js');async function getFile(a,b){b=decodeURI(b);const c=await contentWatcher(a);return await c.getFile(b)}module.exports=getFile;
;}(require("lazyload"), require);
