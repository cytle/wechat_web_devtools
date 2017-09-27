'use strict';!function(require,directRequire){const a=require('path'),b=require('fs'),{NO_BOM_VAR:c}=require('./6242f55dbdfe53c2f07b7a51568311f2.js'),d='<!-- wxConfig -->',e='<!-- devtoolsConfig -->',f=`
<!DOCTYPE html>
<html>
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <meta http-equiv="Content-Security-Policy" content="script-src 'self' 'unsafe-inline' 'unsafe-eval'">
  <script>
  var __wxAppData = {}
  var __wxRoute
  var __wxRouteBegin
  global = {}
  </script>
  ${d}
  ${e}
`,g=`
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
  alert('DOCUMENT_READY')
} else {
  var fn = function(event) {
    alert('DOCUMENT_READY')
    window.removeEventListener("load", fn)
  }
  window.addEventListener('load', fn)
}
</script>
`,h=global.appConfig.isDev?a.join(__dirname,'../../../extensions/appservice/index.js'):a.join(__dirname,'./extensions/appservice/index.js'),i=b.readFileSync(h,'utf8'),j=c.join(',');module.exports={asDebug:i,htmlBegin:f,htmlEnd:g,vendorList:['WAService.js'],devVendorList:['wx-config.js','reporter-sdk.js','appservice-sdk.js','exparser.min.js','virtual_dom_data.js','app_service_engine.js','webnode.js'],noBrowser:j,devtoolsConfigPlaceholder:e,wxConfigPlaceholder:d}}(require('lazyload'),require);