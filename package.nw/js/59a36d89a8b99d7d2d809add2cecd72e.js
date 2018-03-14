'use strict';!function(require,directRequire){const a=require('path'),b=require('fs'),c='<!- wxappcode -->',d=`
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta http-equiv="Content-Security-Policy" content="script-src 'self' *.qq.com 'unsafe-inline' 'unsafe-eval'">
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0" />
  <script>
    var __webviewId__;
    var __wxConfig = {};
    var __wxAppCode__ = {};
    var __WXML_GLOBAL__ = {entrys:{},defines:{},modules:{},ops:[],wxs_nf_init:undefined,total_ops:0};
  </script>
  ${c}
`,e=`
  </head>
<body>
  <div></div>
</body>
</html>
<script>
  document.addEventListener("generateFuncReady", function(){
    setTimeout(function() {
      Object.defineProperty(document.body, 'scrollTop', {
        get() {
         return document.documentElement.scrollTop
        },
        set(value) {
          document.documentElement.scrollTop = value
        }
      })
    }, 100)
  })
</script>
`,f=`
<script>
alert('DOCUMENT_READY')
</script>
`,g=`
  <p>{{error}}</p>
`,h=global.appConfig.isDev?a.join(__dirname,'../../../extensions/pageframe/index.js'):a.join(__dirname,'./extensions/pageframe/index.js'),i=b.readFileSync(h,'utf8');module.exports={jsDebug:i,htmlBegin:d,htmlEnd:e,htmlReady:f,errorTpl:g,devVendorList:['wx-config.js','wx-console.js','wx-worker.js','reporter-sdk.js','webview-sdk.js','exparser.min.js','wx-components.js','virtual_dom.js','webview-engine.js','hls.js','wx-components.css','WARemoteDebug.js'],vendorList:['WAWebview.js','hls.js','WARemoteDebug.js'],wxappcodePlaceholder:c,plugincodePlaceholder:'<!- plugincode -->'}}(require('lazyload'),require);