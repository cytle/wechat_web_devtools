;!function(require, directRequire){;'use strict';const fs=require('fs'),path=require('path'),devVendorList=['wx-config.js','wx-console.js','wx-worker.js','reporter-sdk.js','webview-sdk.js','exparser.min.js','wx-components.js','virtual_dom.js','webview-engine.js','hls.js','wx-components.css'],vendorList=['WAWebview.js','hls.js'],htmlBegin=`<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta http-equiv="Content-Security-Policy" content="script-src 'self' *.qq.com 'unsafe-inline' 'unsafe-eval'">
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0" />
  <script>var __webviewId__;</script>
  <script>var __wxConfig = {};</script>
  <style>
    body div {
      height:100%
    }
  </style>
</head>
`,htmlEnd=`<body style="width: 100%;height:100%;padding:0px;margin:0px;">
<div id="container">
</div>
</body>
</html>
`,jsDebugPath=global.appConfig.isDev?path.join(__dirname,'../../../../extensions/gamenativeview/index.js'):path.join(__dirname,'./extensions/gamenativeview/index.js'),jsDebug=fs.readFileSync(jsDebugPath,'utf8');module.exports={devVendorList,vendorList,htmlBegin,htmlEnd,jsDebug};
;}(require("lazyload"), require);
