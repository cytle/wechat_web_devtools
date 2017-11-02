'use strict';!function(require,directRequire){const a=require('./bd975ba7c5cc0dc70c1404f310e1632b.js'),b=require('./3a9c9c49e5ac7329d924774b97ec3e8a.js'),c=require('./1214e8288e4a5916d134bebceea90cdd.js'),d=require('./928230404887ec407dd48ed25376594e.js'),e=require('./d3976cc01aeebc5b09e11c4135b6bd8d.js'),f=require('./3bfffbe88b3d923921f851c0697974fe.js'),g=require('./c6f15ef7a40988103528a2ff766b2425.js'),h=require('./f6cbcecf6ed9f533f6a506310d8f07b6.js'),i=require('url'),j=require('path'),k=require('fs'),l=require('./4e88c741ca9fb65fab96c500b6d7f2fb.js'),m=require('./2dfc6a3df6d6fc51266b293c8420e88b.js'),n=require('./56c390e04c10e91a4aa2a2c19d9a885d.js'),o=require('./6242f55dbdfe53c2f07b7a51568311f2.js').errorPrefix,p=require('./d28a711224425b00101635efe1034c99.js'),{asDebug:q}=require('./ebfcad0a5e72b6e693634486564b1394.js'),r='darwin'===process.platform,s=()=>{return`<html>
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
  </html>`},t=(a)=>{let b=[{reg:/__dev__\/wx-config\.js$/,value:'wx-config.js'},{reg:/__dev__\/reporter-sdk\.js$/,value:'reporter-sdk.js'},{reg:/__dev__\/webview-sdk\.js$/,value:'webview-sdk.js'},{reg:/__dev__\/exparser\.min\.js$/,value:'exparser.min.js'},{reg:/__dev__\/wx-components\.js$/,value:'wx-components.js'},{reg:/__dev__\/virtual_dom\.js$/,value:'virtual_dom.js'},{reg:/__dev__\/webview-engine\.js$/,value:'webview-engine.js'},{reg:/__dev__\/wx-components\.css$/,value:'wx-components.css'},{reg:/__dev__\/hls\.js$/,value:'hls.js'},{reg:/__dev__\/webnode\.js$/,value:'webnode.js'},{reg:/__dev__\/reporter-sdk\.js$/,value:'reporter-sdk.js'},{reg:/__dev__\/appservice-sdk.js$/,value:'appservice-sdk.js'},{reg:/__dev__\/virtual_dom_data\.js$/,value:'virtual_dom_data.js'},{reg:/__dev__\/app_service_engine\.js$/,value:'app_service_engine.js'},{reg:/__dev__\/WAService\.js$/,value:'WAService.js'},{reg:/__dev__\/WAWebview\.js$/,value:'WAWebview.js'}];for(let c=0,d=b.length;c<d;c++)if(b[c].reg.test(a))return b[c].value},u=(a)=>new Promise((b,c)=>{k.stat(a,async()=>{try{await l.update(!1)}catch(a){c(a)}let d='';try{d=k.readFileSync(a)}catch(a){c(a)}b(d)})});module.exports={getWebviewSource:async function(b){let c=i.parse(b),d=decodeURI(c.pathname).replace(/^\/__pageframe__\//,''),e=f.getCurrent(),g=/pageframe\.html$/.test(d),h=/favicon\.ico$/.test(d),j=t(d);return j?await p.getFile(j):g?a.generate(e).catch((a)=>{return`<html>
          <head>
            <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
            <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0" />
          </head>
          <body style="overflow:hidden">
            ${a}
          </body>
          </html>`}):h?'':await a.getFile(e,d,null)},getAppServiceSource:async function(a){let c=i.parse(a),d=c.pathname.replace(/^\/appservice\//,''),e=f.getCurrent(),g=/appservice$/.test(d),h=/favicon\.ico$/.test(d),j=/\.js$/.test(d),k=/\.map$/.test(d);if(0===d.indexOf('__asdebug__/asdebug.js'))return q;let l=t(d);if(l)return await p.getFile(l);return g?b.generate(e).catch((a)=>{return m.display({command:n.DISPLAY_ERROR,type:o.CODE_ERROR,data:{error:a}}),s()}):h?'':j?await b.getJSFile(e,d).catch((a)=>{a.path||(a.path=d),m.display({command:n.DISPLAY_ERROR,type:o.CODE_ERROR,data:{error:a}})}):k?await b.getJSMapFile(e,d):void 0},getEditorSource:(a)=>new Promise(async(b,c)=>{let d=i.parse(a),e=decodeURI(d.pathname).replace(/^\/editor/,'');const g=new Date;if(/\/assets\/api\//.test(e))try{let a;/js\.api\.monaco\.js$/.test(e)?a=await u(l.JSAPIMonacoFilePath):/component\.api\.js$/.test(e)?a=await u(l.ComponentAPIFilePath):/js\.api\.js$/.test(e)?a=await u(l.JSAPIFilePath):/wxml\.api\.js$/.test(e)?a=await u(l.WXMLAPIFilePath):/lib\.wa\.es6\.js$/.test(e)?a=await u(l.LibWaEs6FilePath):c(`unrecogized url ${e} for getEditorSource`),20>(new Date-g)/1e3?b({body:a}):l.notifyReload()}catch(a){c(a)}else if(/\/files\//.test(e)){let d=f.getCurrent(),e=a.match(/\/files\/(.+)$/);if(!e)c('File not found');else if(e=e[1],e){e=decodeURIComponent(e);let a=j.join(d.projectpath,e);k.readFile(a,(d,e)=>{if(d)return void c(d);let f='text/plain',g=j.extname(a);switch(g){case'.jpg':case'.jpeg':case'.png':case'.icon':case'.gif':case'.cer':{f='image/image';break}case'.svg':{f='image/svg+xml';break}}b({headers:{"content-type":f},body:e})})}else c('File not found')}}),getLocalIdResponse:async function(a){let b=h.getFileRealPath(a),c=b.fileRealPath;return k.readFileSync(c,null)},getWidgetWebviewResource:async function(a){let b=i.parse(a),d=decodeURI(b.pathname).replace(/^\/widgetwebview\//,''),e=f.getCurrent(),g=/widgetPage\.html$/.test(d),h=/favicon\.ico$/.test(d);return h?'':g?await c.generate(e):h?'':await c.getFile(e,d,null)},getWidgetServiceResource:async function(a){let c=i.parse(a),g=c.pathname.replace(/^\/widgetservice\//,''),e=f.getCurrent(),h=/conversation$/.test(g),j=/search$/.test(g),k=/favicon\.ico$/.test(g),l=/\.js$/.test(g);if(k)return'';return h||j?d.generate(e).catch((a)=>{return`<html>
              <head>
              <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
              <script>
                console.error(\`${a}\`)
              </script>
              </head>
              <body>
              </body>
              </html>`}):l?await b.getJSFile(e,g).catch((a)=>{a.path||(a.path=g),m.display({command:n.DISPLAY_ERROR,type:o.CODE_ERROR,data:{error:a}})}):void 0},getUsrFileResponse:async function(a){let b=h.getFileRealPath(a),c=b.fileRealPath;return k.readFileSync(c,null)}}}(require('lazyload'),require);