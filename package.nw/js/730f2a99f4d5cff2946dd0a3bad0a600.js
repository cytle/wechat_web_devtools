'use strict';!function(require,directRequire){function a(a){C.add(a),B==void 0&&(B=setTimeout(()=>{const a=Array.from(C);q.display({command:r.DISPLAY_ERROR,data:{title:`获取文件失败`,error:new Error(`以下文件已被配置忽略打包上传，模拟器无法获取：\n${a.join('\n')}`)}}),B=void 0,C.clear()},2e3))}const b=require('./bd975ba7c5cc0dc70c1404f310e1632b.js'),c=require('./3a9c9c49e5ac7329d924774b97ec3e8a.js'),d=require('./1214e8288e4a5916d134bebceea90cdd.js'),f=require('./928230404887ec407dd48ed25376594e.js'),g=require('./67ee44077f752b9db6f47f8c6e157578.js'),h=require('./352666085f73288bef079dbb9bc80b46.js'),i=require('./d3976cc01aeebc5b09e11c4135b6bd8d.js'),j=require('./3bfffbe88b3d923921f851c0697974fe.js'),k=require('./c6f15ef7a40988103528a2ff766b2425.js'),l=require('./f6cbcecf6ed9f533f6a506310d8f07b6.js'),m=require('url'),n=require('path'),o=require('fs'),p=require('./4e88c741ca9fb65fab96c500b6d7f2fb.js'),q=require('./2dfc6a3df6d6fc51266b293c8420e88b.js'),r=require('./56c390e04c10e91a4aa2a2c19d9a885d.js'),s=require('./6242f55dbdfe53c2f07b7a51568311f2.js').errorPrefix,t=require('./d28a711224425b00101635efe1034c99.js'),u=require('./b6d8659542036f6a35f417e0693e56db.js'),v=require('./72653d4b93cdd7443296229431a7aa9a.js'),w=require('./1c8a8c710417d102ab574145dc51b4b0.js'),{asDebug:x,workerAsDebug:y,WeixinWorkerTpl:z}=require('./ebfcad0a5e72b6e693634486564b1394.js'),A='darwin'===process.platform;let B,C=new Set;const D=()=>{return`<html>
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
  </html>`},E=(a)=>new Promise((b,c)=>{o.stat(a,async()=>{try{await p.update(!1)}catch(a){c(a)}let d='';try{d=o.readFileSync(a)}catch(a){c(a)}b(d)})});module.exports={getWebviewSource:async function(c){let d=m.parse(c),f=decodeURI(d.pathname).replace(/^\/__pageframe__\//,''),g=j.getCurrent(),h=/pageframe\.html$/.test(f),i=/favicon\.ico$/.test(f),k=f.match(/__dev__\/([-_\w\.]*)$/);if(k&&k[1])return k=k[1],await t.getFile(k);let l=/^__plugin__\//.test(f);if(l){let a=/__plugin__\/([^\/]*)\/([^\/]*)\/(.*)/,b=a.exec(f),c=b[1]||'',d=b[2]||'';return /pageframe\.js$/.test(f)?await u.getWebviewCode(g,{pluginId:c,version:d}).catch((a)=>{v.error(a),q.display({command:r.DISPLAY_ERROR,type:s.CODE_ERROR,data:{title:`插件 ${c}/${d}`,error:a}})}):await u.getFile(g,{fileName:b[2]+'/'+b[3]||'',pluginId:c},null)}if(h)return b.generate(g).catch((a)=>{return v.error(a),`<html>
          <head>
            <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
            <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0" />
          </head>
          <body style="overflow:hidden">
            ${a}
          </body>
          </html>`});if(i)return'';const n=(g.packOptions||{}).ignore||[];if(w.isFileIgnored(f,n))throw a(f),new Error('file ignored in pack options');return await b.getFile(g,f,null)},getAppServiceSource:async function(b){let d=m.parse(b),f=d.pathname.replace(/^\/appservice\//,''),g=j.getCurrent(),h=/appservice$/.test(f),i=/favicon\.ico$/.test(f),k=/\.js$/.test(f),l=/\.map$/.test(f),n=/^__devplugin__\//.test(f),o=/^__onlineplugin__\//.test(f),p='';if(0===f.indexOf('__asdebug__/asdebug.js'))return x;if(0===f.indexOf('__workerasdebug__')){if(f.endsWith('workerasdebug.js'))return y;if(f.endsWith('weixinworker.js'))return z}if(p=f.match(/__dev__\/([-_\w\.]*)$/),p&&p[1])return p=p[1],await t.getFile(p);if(p=f.match(/__workerdev__\/([-_\w\.]*)$/),p&&p[1]){p=p[1];const a=await t.getFile(p),b=p.replace('__workerdev__/','');return`__workerVendorCode__['${b}'] = ${JSON.stringify(a.toString('utf8'))}`}if(n||o){let a=o?/^__onlineplugin__\/([^\/]*)\/([^\/]*)\/(.*)/:/^__devplugin__\/([^\/]*)\/([^\/]*)\/(.*)/;let b=a.exec(f),c=b[1]||'',d=b[2]||'';if(/appservice\.js$/.test(f))return await u.getServiceCode(g,{pluginId:c,version:d}).catch((a)=>{v.error(a),q.display({command:r.DISPLAY_ERROR,type:s.CODE_ERROR,data:{title:`插件 ${c}/${d}`,error:a}})});if(/appservice\.js\.map$/.test(f))return await u.getServiceCodeMap(g,{pluginId:g.appid,version:'dev'})}const A=(g.packOptions||{}).ignore||[];if(!h&&!n&&!o&&w.isFileIgnored(f,A))throw a(f),new Error('file ignored in pack options');return h?c.generate(g).catch((a)=>{return q.display({command:r.DISPLAY_ERROR,type:s.CODE_ERROR,data:{error:a}}),D()}):i?'':k?(p=f.replace(/^\//,''),await c.getJSFile(g,p).catch((a)=>{a.path||(a.path=p),q.display({command:r.DISPLAY_ERROR,type:s.CODE_ERROR,data:{error:a}})})):await c.getJSMapFile(g,f)},getEditorSource:(a)=>new Promise(async(b,c)=>{let d=m.parse(a),f=decodeURI(d.pathname).replace(/^\/editor/,'');const g=new Date;if(/\/assets\/api\//.test(f))try{let a;/js\.api\.monaco\.js$/.test(f)?a=await E(p.JSAPIMonacoFilePath):/component\.api\.js$/.test(f)?a=await E(p.ComponentAPIFilePath):/js\.api\.js$/.test(f)?a=await E(p.JSAPIFilePath):/wxml\.api\.js$/.test(f)?a=await E(p.WXMLAPIFilePath):/lib\.wa\.es6\.js$/.test(f)?a=await E(p.LibWaEs6FilePath):c(`unrecogized url ${f} for getEditorSource`),20>(new Date-g)/1e3?b({body:a}):p.notifyReload()}catch(a){c(a)}else if(/\/files\//.test(f)){let d=j.getCurrent(),f=a.match(/\/files\/(.+)$/);if(!f)c('File not found');else if(f=f[1],f){f=decodeURIComponent(f);let a=n.join(d.projectpath,f);o.readFile(a,(d,f)=>{if(d)return void c(d);let g='text/plain',h=n.extname(a);switch(h){case'.jpg':case'.jpeg':case'.png':case'.icon':case'.gif':case'.cer':{g='image/image';break}case'.svg':{g='image/svg+xml';break}}b({headers:{"content-type":g},body:f})})}else c('File not found')}}),getLocalIdResponse:async function(a){let b=l.getFileRealPath(a),c=b.fileRealPath;return o.readFileSync(c,null)},getWidgetWebviewResource:async function(a){let b=m.parse(a),c=decodeURI(b.pathname).replace(/^\/widgetwebview\//,''),f=j.getCurrent(),g=/widgetPage\.html$/.test(c),h=/favicon\.ico$/.test(c);return h?'':g?await d.generate(f):h?'':await d.getFile(f,c,null)},getWidgetServiceResource:async function(a){let b=m.parse(a),d=b.pathname.replace(/^\/widgetservice\//,''),h=j.getCurrent(),i=/conversation$/.test(d),k=/search$/.test(d),l=/favicon\.ico$/.test(d),n=/\.js$/.test(d);if(l)return'';return i||k?f.generate(h).catch((a)=>{return`<html>
              <head>
              <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
              <script>
                console.error(\`${a}\`)
              </script>
              </head>
              <body>
              </body>
              </html>`}):n?h.attr.gameApp?await g.getFile(h,d,null):await c.getJSFile(h,d).catch((a)=>{a.path||(a.path=d),q.display({command:r.DISPLAY_ERROR,type:s.CODE_ERROR,data:{error:a}})}):void 0},getGamePageResource:async function(a){let b=m.parse(a),c=decodeURI(b.pathname).replace(/^\/game\//,''),d=j.getCurrent(),f=/gamePage\.html$/.test(c),i=/subcontext\.html$/.test(c),k=/favicon\.ico$/.test(c),l=/nativeview\.html$/.test(c);return i?await g.getSubContext(d):l?await h.generate():k?'':f?await g.generate(d).catch((a)=>{let b=a.toString();try{b=b.replace(/\\/g,'\\\\')}catch(a){}return`<html>
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
              </html>`}):await g.getFile(d,c,null).catch(()=>{q.display({command:r.DISPLAY_ERROR,type:s.CODE_ERROR,data:{error:e}})})},getUsrFileResponse:async function(a){let b=l.getFileRealPath(a),c=b.fileRealPath;return o.readFileSync(c,null)}}}(require('lazyload'),require);