'use strict';!function(require,directRequire){const a=require('./bd975ba7c5cc0dc70c1404f310e1632b.js'),b=require('./3a9c9c49e5ac7329d924774b97ec3e8a.js'),c=require('./1214e8288e4a5916d134bebceea90cdd.js'),d=require('./928230404887ec407dd48ed25376594e.js'),e=require('./67ee44077f752b9db6f47f8c6e157578.js'),f=require('./352666085f73288bef079dbb9bc80b46.js'),g=require('./d3976cc01aeebc5b09e11c4135b6bd8d.js'),h=require('./3bfffbe88b3d923921f851c0697974fe.js'),i=require('./c6f15ef7a40988103528a2ff766b2425.js'),j=require('./f6cbcecf6ed9f533f6a506310d8f07b6.js'),k=require('url'),l=require('path'),m=require('fs'),n=require('./4e88c741ca9fb65fab96c500b6d7f2fb.js'),o=require('./2dfc6a3df6d6fc51266b293c8420e88b.js'),p=require('./56c390e04c10e91a4aa2a2c19d9a885d.js'),q=require('./6242f55dbdfe53c2f07b7a51568311f2.js').errorPrefix,r=require('./d28a711224425b00101635efe1034c99.js'),{asDebug:s,workerAsDebug:t,WeixinWorkerTpl:u}=require('./ebfcad0a5e72b6e693634486564b1394.js'),v='darwin'===process.platform,w=()=>{return`<html>
    <head>
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
      <script src="__asdebug__/asdebug.js"></script>
    </head>
    <body>
      <script>
        if (document.readyState == 'complete') {
          history.replaceState({},{}, location.href + '?load')
        } else {
          window.addEventListener('load', (event) => {
            history.replaceState({},{}, location.href + '?load')
          })
        }
      </script>
    </body>
  </html>`},x=(a)=>{let b=[{reg:/__(worker)?dev__\/wx-config\.js$/,value:'wx-config.js'},{reg:/__(worker)?dev__\/wx-console\.js$/,value:'wx-console.js'},{reg:/__(worker)?dev__\/wx-worker\.js$/,value:'wx-worker.js'},{reg:/__(worker)?dev__\/native-buffer\.js$/,value:'native-buffer.js'},{reg:/__dev__\/reporter-sdk\.js$/,value:'reporter-sdk.js'},{reg:/__dev__\/webview-sdk\.js$/,value:'webview-sdk.js'},{reg:/__dev__\/exparser\.min\.js$/,value:'exparser.min.js'},{reg:/__dev__\/wx-components\.js$/,value:'wx-components.js'},{reg:/__dev__\/virtual_dom\.js$/,value:'virtual_dom.js'},{reg:/__dev__\/webview-engine\.js$/,value:'webview-engine.js'},{reg:/__dev__\/wx-components\.css$/,value:'wx-components.css'},{reg:/__dev__\/hls\.js$/,value:'hls.js'},{reg:/WAWebview\.js$/,value:'WAWebview.js'},{reg:/devtools-native-components\.js$/,value:'devtools-native-components.js'},{reg:/__(worker)?dev__\/webnode\.js$/,value:'webnode.js'},{reg:/__dev__\/reporter-sdk\.js$/,value:'reporter-sdk.js'},{reg:/__dev__\/appservice-sdk.js$/,value:'appservice-sdk.js'},{reg:/__dev__\/virtual_dom_data\.js$/,value:'virtual_dom_data.js'},{reg:/__dev__\/app_service_engine\.js$/,value:'app_service_engine.js'},{reg:/__workerdev__\/worker-sdk\.js$/,value:'worker-sdk.js'},{reg:/__dev__\/WAService\.js$/,value:'WAService.js'},{reg:/__dev__\/WAWebview\.js$/,value:'WAWebview.js'},{reg:/__workerdev__\/WAWorker\.js$/,value:'WAWorker.js'}];for(let c=0,d=b.length;c<d;c++)if(b[c].reg.test(a))return b[c].value},y=(a)=>new Promise((b,c)=>{m.stat(a,async()=>{try{await n.update(!1)}catch(a){c(a)}let d='';try{d=m.readFileSync(a)}catch(a){c(a)}b(d)})});module.exports={getWebviewSource:async function(b){let c=k.parse(b),d=decodeURI(c.pathname).replace(/^\/__pageframe__\//,''),e=h.getCurrent(),f=/pageframe\.html$/.test(d),g=/favicon\.ico$/.test(d),i=x(d);return i?await r.getFile(i):f?a.generate(e).catch((a)=>{return`<html>
          <head>
            <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
            <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0" />
          </head>
          <body style="overflow:hidden">
            ${a}
          </body>
          </html>`}):g?'':await a.getFile(e,d,null)},getAppServiceSource:async function(a){let c=k.parse(a),d=c.pathname.replace(/^\/appservice\//,''),e=h.getCurrent(),f=/appservice$/.test(d),g=/favicon\.ico$/.test(d),i=/\.js$/.test(d),j=/\.map$/.test(d);if(0===d.indexOf('__asdebug__/asdebug.js'))return s;if(0===d.indexOf('__workerasdebug__')){if(d.endsWith('workerasdebug.js'))return t;if(d.endsWith('weixinworker.js'))return u}let l=x(d);if(l){const a=await r.getFile(l);if(-1<d.indexOf('__workerdev__')){const b=l.replace('__workerdev__/','');return`__workerVendorCode__['${b}'] = ${JSON.stringify(a.toString('utf8'))}`}return a}return f?b.generate(e).catch((a)=>{return o.display({command:p.DISPLAY_ERROR,type:q.CODE_ERROR,data:{error:a}}),w()}):g?'':i?await b.getJSFile(e,d).catch((a)=>{a.path||(a.path=d),o.display({command:p.DISPLAY_ERROR,type:q.CODE_ERROR,data:{error:a}})}):await b.getJSMapFile(e,d)},getEditorSource:(a)=>new Promise(async(b,c)=>{let d=k.parse(a),e=decodeURI(d.pathname).replace(/^\/editor/,'');const f=new Date;if(/\/assets\/api\//.test(e))try{let a;/js\.api\.monaco\.js$/.test(e)?a=await y(n.JSAPIMonacoFilePath):/component\.api\.js$/.test(e)?a=await y(n.ComponentAPIFilePath):/js\.api\.js$/.test(e)?a=await y(n.JSAPIFilePath):/wxml\.api\.js$/.test(e)?a=await y(n.WXMLAPIFilePath):/lib\.wa\.es6\.js$/.test(e)?a=await y(n.LibWaEs6FilePath):c(`unrecogized url ${e} for getEditorSource`),20>(new Date-f)/1e3?b({body:a}):n.notifyReload()}catch(a){c(a)}else if(/\/files\//.test(e)){let d=h.getCurrent(),e=a.match(/\/files\/(.+)$/);if(!e)c('File not found');else if(e=e[1],e){e=decodeURIComponent(e);let a=l.join(d.projectpath,e);m.readFile(a,(d,e)=>{if(d)return void c(d);let f='text/plain',g=l.extname(a);switch(g){case'.jpg':case'.jpeg':case'.png':case'.icon':case'.gif':case'.cer':{f='image/image';break}case'.svg':{f='image/svg+xml';break}}b({headers:{"content-type":f},body:e})})}else c('File not found')}}),getLocalIdResponse:async function(a){let b=j.getFileRealPath(a),c=b.fileRealPath;return m.readFileSync(c,null)},getWidgetWebviewResource:async function(a){let b=k.parse(a),d=decodeURI(b.pathname).replace(/^\/widgetwebview\//,''),e=h.getCurrent(),f=/widgetPage\.html$/.test(d),g=/favicon\.ico$/.test(d);return g?'':f?await c.generate(e):g?'':await c.getFile(e,d,null)},getWidgetServiceResource:async function(a){let c=k.parse(a),f=c.pathname.replace(/^\/widgetservice\//,''),g=h.getCurrent(),i=/conversation$/.test(f),j=/search$/.test(f),l=/favicon\.ico$/.test(f),m=/\.js$/.test(f);if(l)return'';return i||j?d.generate(g).catch((a)=>{return`<html>
              <head>
              <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
              <script>
                console.error(\`${a}\`)
              </script>
              </head>
              <body>
              </body>
              </html>`}):m?g.attr.gameApp?await e.getFile(g,f,null):await b.getJSFile(g,f).catch((a)=>{a.path||(a.path=f),o.display({command:p.DISPLAY_ERROR,type:q.CODE_ERROR,data:{error:a}})}):void 0},getGamePageResource:async function(a){let b=k.parse(a),c=decodeURI(b.pathname).replace(/^\/game\//,''),d=h.getCurrent(),g=/gamePage\.html$/.test(c),i=/favicon\.ico$/.test(c),j=/nativeview\.html$/.test(c);return j?await f.generate():i?'':g?await e.generate(d).catch((a)=>{let b=a.toString();try{b=b.replace(/\\/g,'\\\\')}catch(a){}return`<html>
              <head>
              <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
              <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0" />
              <script src="__asdebug__/asdebug.js"></script>
              <script>console.error(\`${b}\`)</script>
              </head>
              <body>
                编译出错
                </br>
                ${b}
              </body>
              </html>`}):await e.getFile(d,c,null)},getUsrFileResponse:async function(a){let b=j.getFileRealPath(a),c=b.fileRealPath;return m.readFileSync(c,null)}}}(require('lazyload'),require);