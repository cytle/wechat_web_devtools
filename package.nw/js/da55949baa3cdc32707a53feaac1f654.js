'use strict';!function(require,directRequire){const a=require('fs'),b=require('path'),c=`
<!DOCTYPE html>
<html lang="zh-CN">

<head>
  <meta http-equiv="Content-Security-Policy" content="script-src 'self' *.qq.com 'unsafe-inline' 'unsafe-eval'">
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0" />
`,d=`
  <style>
    body {
      position: absolute;
      width: 100%;
      height: 100%;
      margin:0;
      overflow: hidden;
    }
  </style>
</head>

<body>
  <canvas id="myCanvas" style="height:100%;width:100%"></canvas>
</body>

</html>
<script>
// 这个不能删除 因为webview.executeScript 没有一个好的时机调用
alert('DOCUMENT_READY')
</script>
`,e=global.appConfig.isDev?b.join(__dirname,'../../../extensions/widgetwebview/index.js'):b.join(__dirname,'./extensions/widgetwebview/index.js'),f=a.readFileSync(e,'utf8');module.exports={htmlBegin:c,htmlEnd:d,jsDebug:f}}(require('lazyload'),require);