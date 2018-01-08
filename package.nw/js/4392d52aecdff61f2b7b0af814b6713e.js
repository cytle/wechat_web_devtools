'use strict';!function(require,directRequire){const a=require('fs'),b=require('path'),c=`<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta http-equiv="Content-Security-Policy" content="script-src 'self' *.qq.com 'unsafe-inline' 'unsafe-eval'">
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0" />
  <script>var __webviewId__;</script>
  <script>var __wxConfig = {};</script>
</head>
`,d=`<body style="width: 100%;height:100%;padding:0px;margin:0px;">
<div id="container">
</div>
</body>
</html>
`,e=global.appConfig.isDev?b.join(__dirname,'../../../../extensions/gamenativeview/index.js'):b.join(__dirname,'./extensions/gamenativeview/index.js'),f=a.readFileSync(e,'utf8');module.exports={devVendorList:['wx-config.js','wx-console.js','wx-worker.js','reporter-sdk.js','webview-sdk.js','exparser.min.js','wx-components.js','virtual_dom.js','webview-engine.js','hls.js','wx-components.css'],vendorList:['WAWebview.js','hls.js'],htmlBegin:c,htmlEnd:d,jsDebug:f}}(require('lazyload'),require);