'use strict';!function(require,directRequire){const a='<!-- wxConfig -->',b='<!-- devtoolsConfig -->',c='<!-- widgetConfigPlaceholder -->',d=require('./common/locales/index.js'),e=`
<!DOCTYPE html>
<html>

<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <meta http-equiv="Content-Security-Policy" content="script-src 'self' 'unsafe-inline' 'unsafe-eval'">
  <script>
  var __wxConfig = {}
  var __devtoolsConfig = {}
  global = {}
  </script>
  ${a}
  ${b}
  ${c}
`,f=()=>`
</head>

<body>
  <p>
    ${d.config.WIDGETSERVICE_CONFIG_BODY_P1}
  </p>
  <p>
    ${d.config.WIDGETSERVICE_CONFIG_BODY_P2}

    weixin_developer@qq.com

    ${d.config.WIDGETSERVICE_CONFIG_BODY_P3}

    https://developers.weixin.qq.com
  </p>
</body>
</html>
<script>
// 这个不能删除 因为webview.executeScript 没有一个好的时机调用
alert('DOCUMENT_READY')
</script>
`,g=require('./ebfcad0a5e72b6e693634486564b1394.js');module.exports={htmlBegin:e,get htmlEnd(){return f()},vendorList:['WAWidget.js'],devVendorList:['wx-config.js','webnode.js','reporter-sdk.js','widget-timer-sdk.js','widget-sdk.js','widget-engine.js'],asDebug:g.asDebug,noBrowser:g.noBrowser,wxConfigPlaceholder:a,devtoolsConfigPlaceholder:b,widgetConfigPlaceholder:c}}(require('lazyload'),require);