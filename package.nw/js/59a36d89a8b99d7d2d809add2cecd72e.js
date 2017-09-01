'use strict';!function(require,directRequire){const a=require('path'),b=require('fs'),c=`
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta http-equiv="Content-Security-Policy" content="script-src 'self' *.qq.com 'unsafe-inline' 'unsafe-eval'">
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0" />
  <script>var __webviewId__;</script>
  <script>var __wxConfig = {};</script>
`,d=`
  </head>
<body>
  <div></div>
  <script>
    Object.defineProperty(document.body, 'scrollTop', {
      get() {
       return document.documentElement.scrollTop
      },
      set(value) {
        document.documentElement.scrollTop = value
      }
    })
  </script>
</html>

`,e=`
<script>
alert('DOCUMENT_READY')
</script>
`,f=`
  <p>{{error}}</p>
  <script>console.error(\`{{msgForConsole}}\`)</script>
`,g=global.appConfig.isDev?a.join(__dirname,'../../../extensions/pageframe/index.js'):a.join(__dirname,'./extensions/pageframe/index.js'),h=b.readFileSync(g,'utf8');module.exports={jsDebug:h,htmlBegin:c,htmlEnd:d,htmlReady:e,errorTpl:f,devVendorList:['reporter-sdk.js','webview-sdk.js','exparser.min.js','wx-components.js','virtual_dom.js','webview-engine.js','hls.js','wx-components.css'],vendorList:['WAWebview.js','hls.js']}}(require('lazyload'),require);