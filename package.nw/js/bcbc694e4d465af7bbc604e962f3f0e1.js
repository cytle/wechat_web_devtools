'use strict';!function(require,directRequire){const a='<!-- wxConfig -->',b='<!-- devtoolsConfig -->',c='<!-- widgetConfigPlaceholder -->',d=`
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
`,e=`
</head>

<body>
  <p>
    开发者工具使用 nwjs 来模拟小程序的实现，帮助大家来开发和调试微信小程序，所以这里是一个 webview，但真实
    的手机端是运行在 jscore 中的，所以请不要使用任何 bom 对象。
  </p>
  <p>
    我们建议你先完整阅读该开发文档，这将有助于更快地完成开发。如果发现我们的文档有任何错漏，
    或者开发过程中有任何疑问或者你有更好的建议，欢迎通过下列邮箱联系我们

    weixin_developer@qq.com

    或者访问微信小程序开发者社区提交问题：

    https://developers.weixin.qq.com
  </p>
</body>
</html>
<script>
// 这个不能删除 因为webview.executeScript 没有一个好的时机调用
alert('DOCUMENT_READY')
</script>
`,f=require('./ebfcad0a5e72b6e693634486564b1394.js');module.exports={htmlBegin:d,htmlEnd:e,vendorList:['WAWidget.js'],devVendorList:['wx-config.js','webnode.js','reporter-sdk.js','widget-timer-sdk.js','widget-sdk.js','widget-engine.js'],asDebug:f.asDebug,noBrowser:f.noBrowser,wxConfigPlaceholder:a,devtoolsConfigPlaceholder:b,widgetConfigPlaceholder:c}}(require('lazyload'),require);