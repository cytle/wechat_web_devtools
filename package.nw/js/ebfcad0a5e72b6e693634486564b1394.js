'use strict';!function(require,directRequire){const a=require('path'),b=require('fs'),c='<!-- wxConfig -->',d='<!-- devtoolsConfig -->',e=`
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
  ${c}
  ${d}
`,f=`
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
alert('DOCUMENT_READY')
</script>
`,g=global.appConfig.isDev?a.join(__dirname,'../../../extensions/appservice/index.js'):a.join(__dirname,'./extensions/appservice/index.js'),h=b.readFileSync(g,'utf8');module.exports={asDebug:h,htmlBegin:e,htmlEnd:f,vendorList:['WAService.js'],devVendorList:['webnode.js','reporter-sdk.js','appservice-sdk.js','exparser.min.js','virtual_dom_data.js','app_service_engine.js'],noBrowser:'window,document,frames,self,location,navigator,localStorage,history,Caches,screen,alert,confirm,prompt,fetch,XMLHttpRequest,WebSocket,webkit,WeixinJSCore,WeixinJSBridge,Reporter,print',devtoolsConfigPlaceholder:d,wxConfigPlaceholder:c}}(require('lazyload'),require);