'use strict';!function(require,directRequire){const a=require('./bd975ba7c5cc0dc70c1404f310e1632b.js'),b=require('./3a9c9c49e5ac7329d924774b97ec3e8a.js'),c=require('./1214e8288e4a5916d134bebceea90cdd.js'),d=require('./928230404887ec407dd48ed25376594e.js'),f=require('./67ee44077f752b9db6f47f8c6e157578.js'),g=require('./352666085f73288bef079dbb9bc80b46.js'),h=require('./d3976cc01aeebc5b09e11c4135b6bd8d.js'),i=require('./3bfffbe88b3d923921f851c0697974fe.js'),j=require('./c6f15ef7a40988103528a2ff766b2425.js'),k=require('./f6cbcecf6ed9f533f6a506310d8f07b6.js'),l=require('url'),m=require('path'),n=require('fs'),o=require('./4e88c741ca9fb65fab96c500b6d7f2fb.js'),p=require('./2dfc6a3df6d6fc51266b293c8420e88b.js'),q=require('./56c390e04c10e91a4aa2a2c19d9a885d.js'),r=require('./6242f55dbdfe53c2f07b7a51568311f2.js').errorPrefix,s=require('./d28a711224425b00101635efe1034c99.js'),{asDebug:t,workerAsDebug:u,WeixinWorkerTpl:v}=require('./ebfcad0a5e72b6e693634486564b1394.js'),w='darwin'===process.platform,x=()=>{return`<html>
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
  </html>`},y=(a)=>new Promise((b,c)=>{n.stat(a,async()=>{try{await o.update(!1)}catch(a){c(a)}let d='';try{d=n.readFileSync(a)}catch(a){c(a)}b(d)})});module.exports={getWebviewSource:async function(b){let c=l.parse(b),d=decodeURI(c.pathname).replace(/^\/__pageframe__\//,''),f=i.getCurrent(),g=/pageframe\.html$/.test(d),h=/favicon\.ico$/.test(d),j=d.match(/__dev__\/([-_\w\.]*)$/);return j&&j[1]?(j=j[1],await s.getFile(j)):g?a.generate(f).catch((a)=>{return`<html>
          <head>
            <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
            <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0" />
          </head>
          <body style="overflow:hidden">
            ${a}
          </body>
          </html>`}):h?'':await a.getFile(f,d,null)},getAppServiceSource:async function(a){let c=l.parse(a),d=c.pathname.replace(/^\/appservice\//,''),f=i.getCurrent(),g=/appservice$/.test(d),h=/favicon\.ico$/.test(d),j=/\.js$/.test(d),k=/\.map$/.test(d);if(0===d.indexOf('__asdebug__/asdebug.js'))return t;if(0===d.indexOf('__workerasdebug__')){if(d.endsWith('workerasdebug.js'))return u;if(d.endsWith('weixinworker.js'))return v}let m=d.match(/__dev__\/([-_\w\.]*)$/);if(m&&m[1])return m=m[1],await s.getFile(m);if(m=d.match(/__workerdev__\/([-_\w\.]*)$/),m&&m[1]){m=m[1];const a=await s.getFile(m),b=m.replace('__workerdev__/','');return`__workerVendorCode__['${b}'] = ${JSON.stringify(a.toString('utf8'))}`}return g?b.generate(f).catch((a)=>{return p.display({command:q.DISPLAY_ERROR,type:r.CODE_ERROR,data:{error:a}}),x()}):h?'':j?await b.getJSFile(f,d).catch((a)=>{a.path||(a.path=d),p.display({command:q.DISPLAY_ERROR,type:r.CODE_ERROR,data:{error:a}})}):await b.getJSMapFile(f,d)},getEditorSource:(a)=>new Promise(async(b,c)=>{let d=l.parse(a),f=decodeURI(d.pathname).replace(/^\/editor/,'');const g=new Date;if(/\/assets\/api\//.test(f))try{let a;/js\.api\.monaco\.js$/.test(f)?a=await y(o.JSAPIMonacoFilePath):/component\.api\.js$/.test(f)?a=await y(o.ComponentAPIFilePath):/js\.api\.js$/.test(f)?a=await y(o.JSAPIFilePath):/wxml\.api\.js$/.test(f)?a=await y(o.WXMLAPIFilePath):/lib\.wa\.es6\.js$/.test(f)?a=await y(o.LibWaEs6FilePath):c(`unrecogized url ${f} for getEditorSource`),20>(new Date-g)/1e3?b({body:a}):o.notifyReload()}catch(a){c(a)}else if(/\/files\//.test(f)){let d=i.getCurrent(),f=a.match(/\/files\/(.+)$/);if(!f)c('File not found');else if(f=f[1],f){f=decodeURIComponent(f);let a=m.join(d.projectpath,f);n.readFile(a,(d,f)=>{if(d)return void c(d);let g='text/plain',h=m.extname(a);switch(h){case'.jpg':case'.jpeg':case'.png':case'.icon':case'.gif':case'.cer':{g='image/image';break}case'.svg':{g='image/svg+xml';break}}b({headers:{"content-type":g},body:f})})}else c('File not found')}}),getLocalIdResponse:async function(a){let b=k.getFileRealPath(a),c=b.fileRealPath;return n.readFileSync(c,null)},getWidgetWebviewResource:async function(a){let b=l.parse(a),d=decodeURI(b.pathname).replace(/^\/widgetwebview\//,''),f=i.getCurrent(),g=/widgetPage\.html$/.test(d),h=/favicon\.ico$/.test(d);return h?'':g?await c.generate(f):h?'':await c.getFile(f,d,null)},getWidgetServiceResource:async function(a){let c=l.parse(a),g=c.pathname.replace(/^\/widgetservice\//,''),h=i.getCurrent(),j=/conversation$/.test(g),k=/search$/.test(g),m=/favicon\.ico$/.test(g),n=/\.js$/.test(g);if(m)return'';return j||k?d.generate(h).catch((a)=>{return`<html>
              <head>
              <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
              <script>
                console.error(\`${a}\`)
              </script>
              </head>
              <body>
              </body>
              </html>`}):n?h.attr.gameApp?await f.getFile(h,g,null):await b.getJSFile(h,g).catch((a)=>{a.path||(a.path=g),p.display({command:q.DISPLAY_ERROR,type:r.CODE_ERROR,data:{error:a}})}):void 0},getGamePageResource:async function(a){let b=l.parse(a),c=decodeURI(b.pathname).replace(/^\/game\//,''),d=i.getCurrent(),h=/gamePage\.html$/.test(c),j=/favicon\.ico$/.test(c),k=/nativeview\.html$/.test(c);return k?await g.generate():j?'':h?await f.generate(d).catch((a)=>{let b=a.toString();try{b=b.replace(/\\/g,'\\\\')}catch(a){}return`<html>
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
              </html>`}):await f.getFile(d,c,null).catch(()=>{p.display({command:q.DISPLAY_ERROR,type:r.CODE_ERROR,data:{error:e}})})},getUsrFileResponse:async function(a){let b=k.getFileRealPath(a),c=b.fileRealPath;return n.readFileSync(c,null)}}}(require('lazyload'),require);