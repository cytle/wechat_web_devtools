'use strict';!function(require,directRequire){const a=require('path'),b=require('fs'),{NO_BOM_VAR:c}=require('./6242f55dbdfe53c2f07b7a51568311f2.js'),d='<!-- ondocumentstart -->',e='<!-- wxConfig -->',f='<!-- devtoolsConfig -->',g='<!- wxmlxcjs -->',h='<!- wxappcode -->',i=`
<!DOCTYPE html>
<html>
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <meta http-equiv="Content-Security-Policy" content="script-src 'self' 'unsafe-inline' 'unsafe-eval'">
  ${d}
  <script>
  var __wxAppData = {}
  var __wxRoute
  var __wxRouteBegin
  var __wxAppCode__ = {}
  var __wxAppCurrentFile__
  var Component = function() {}
  var Behavior = function() {}
  var definePlugin = function() {}
  var requirePlugin = function() {}
  global = {}
  var __workerVendorCode__ = {}
  var __workersCode__ = {}
  var __WeixinWorker = WeixinWorker = {}
  var $gwx
  </script>
  ${e}
  ${f}
  ${g}
  ${h}
`,j=`
<style>
    body {
      overflow: hidden;
      background-color: #f3f3f3;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
    }
  </style>
</head>
<body>
</body>
</html>
<script>
if (document.readyState == 'complete') {
  window.__global.alert('DOCUMENT_READY')
} else {
  var fn = function(event) {
    window.__global.alert('DOCUMENT_READY')
    window.removeEventListener("load", fn)
  }
  window.addEventListener('load', fn)
}
</script>
`,k=global.appConfig.isDev?a.join(__dirname,'../../../extensions/appservice/index.js'):a.join(__dirname,'./extensions/appservice/index.js'),l=global.appConfig.isDev?a.join(__dirname,'../../../extensions/context/index.js'):a.join(__dirname,'./extensions/context/index.js'),m=global.appConfig.isDev?a.join(__dirname,'../../../extensions/worker/index.js'):a.join(__dirname,'./extensions/worker/index.js'),n=global.appConfig.isDev?a.join(__dirname,'../../../extensions/worker/weixinworker.tpl.js'):a.join(__dirname,'./extensions/worker/weixinworker.tpl.js'),o=b.readFileSync(k,'utf8'),p=b.readFileSync(l,'utf8'),q=b.readFileSync(m,'utf8'),r=b.readFileSync(n,'utf8'),s=c.join(',');module.exports={asDebug:o,subAsDebug:p,workerAsDebug:q,WeixinWorkerTpl:r,htmlBegin:i,htmlEnd:j,vendorList:['WAService.js'],devVendorList:['wx-config.js','wx-console.js','native-buffer.js','wx-worker.js','js-context.js','reporter-sdk.js','protect-sdk.js','subcontext-engine-main.js','safeway-sdk.js','appservice-sdk.js','exparser.min.js','virtual_dom_data.js','app_service_engine.js','plugin-node.js','webnode.js','global-read-only.js'],devWorkerList:['wx-config.js','native-buffer.js','wx-console.js','wx-worker.js','webnode.js','worker-sdk.js'],workerVendorList:['WAWorker.js'],noBrowser:s,onDocumentStartPlaceholder:d,devtoolsConfigPlaceholder:f,wxConfigPlaceholder:e,wxmlXCJSPlaceholder:g,wxappcodePlaceholder:h,plugincodePlaceholder:'<!- plugincode -->'}}(require('lazyload'),require);