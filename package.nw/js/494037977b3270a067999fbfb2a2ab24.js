;!function(require, directRequire){;"use strict";const fs=require("fs"),path=require("path"),isDev=global.appConfig.isDev,htmlPath=isDev?path.join(__dirname,"../../../../../html/gamesubcontext.html"):path.join(__dirname,"../html/gamesubcontext.html");module.exports=fs.readFileSync(htmlPath,"utf8");
;}(require("lazyload"), require);
