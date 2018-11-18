;!function(require, directRequire){;'use strict';const contentWatcher=require('./162bf2ee28b76d3b3d95b685cede4146.js'),getOnlineFile=require('./2be26014bab972c2b643fb166235d6e3.js');async function getFile(a,b,c){if(a.isOnline)return getOnlineFile(a,b,c);const d=await contentWatcher(a);return d.getFile(b,c)}module.exports=getFile;
;}(require("lazyload"), require);
