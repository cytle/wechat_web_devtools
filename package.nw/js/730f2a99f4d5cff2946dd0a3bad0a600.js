'use strict';!function(require,directRequire){function a(a){B.add(a),A==void 0&&(A=setTimeout(()=>{const a=Array.from(B);p.display({command:q.DISPLAY_ERROR,data:{title:`获取文件失败`,error:new Error(`以下文件已被配置忽略打包上传，模拟器无法获取：\n${a.join('\n')}`)}}),A=void 0,B.clear()},2e3))}const b=require('./bd975ba7c5cc0dc70c1404f310e1632b.js'),c=require('./3a9c9c49e5ac7329d924774b97ec3e8a.js'),d=require('./1214e8288e4a5916d134bebceea90cdd.js'),e=require('./928230404887ec407dd48ed25376594e.js'),f=require('./67ee44077f752b9db6f47f8c6e157578.js'),g=require('./352666085f73288bef079dbb9bc80b46.js'),h=require('./d3976cc01aeebc5b09e11c4135b6bd8d.js'),i=require('./3bfffbe88b3d923921f851c0697974fe.js'),j=require('./c6f15ef7a40988103528a2ff766b2425.js'),k=require('./f6cbcecf6ed9f533f6a506310d8f07b6.js'),l=require('url'),m=require('path'),n=require('fs'),o=require('./4e88c741ca9fb65fab96c500b6d7f2fb.js'),p=require('./2dfc6a3df6d6fc51266b293c8420e88b.js'),q=require('./56c390e04c10e91a4aa2a2c19d9a885d.js'),r=require('./6242f55dbdfe53c2f07b7a51568311f2.js').errorPrefix,s=require('./d28a711224425b00101635efe1034c99.js'),t=require('./b6d8659542036f6a35f417e0693e56db.js'),u=require('./72653d4b93cdd7443296229431a7aa9a.js'),v=require('./1c8a8c710417d102ab574145dc51b4b0.js'),{asDebug:w,workerAsDebug:x,WeixinWorkerTpl:y}=require('./ebfcad0a5e72b6e693634486564b1394.js'),z='darwin'===process.platform;let A,B=new Set;const C=()=>{return`<html>
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
  </html>`},D=(a)=>new Promise((b,c)=>{n.stat(a,async()=>{try{await o.update(!1)}catch(a){c(a)}let d='';try{d=n.readFileSync(a)}catch(a){c(a)}b(d)})});module.exports={getWebviewSource:async function(c){let d=l.parse(c),e=decodeURI(d.pathname).replace(/^\/__pageframe__\//,''),f=i.getCurrent(),g=/pageframe\.html$/.test(e),h=/favicon\.ico$/.test(e),j=e.match(/__dev__\/([-_\w\.]*)$/);if(j&&j[1])return j=j[1],await s.getFile(j);let k=/^__plugin__\//.test(e);if(k){let a=/__plugin__\/([^\/]*)\/([^\/]*)\/(.*)/,b=a.exec(e),c=b[1]||'',d=b[2]||'';return /pageframe\.js$/.test(e)?await t.getWebviewCode(f,{pluginId:c,version:d}).catch((a)=>{u.error(a),p.display({command:q.DISPLAY_ERROR,type:r.CODE_ERROR,data:{title:`插件 ${c}/${d}`,error:a}})}):await t.getFile(f,{fileName:b[2]+'/'+b[3]||'',pluginId:c},null)}if(g)return b.generate(f).catch((a)=>{return u.error(a),`<html>
          <head>
            <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
            <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0" />
          </head>
          <body style="overflow:hidden">
            ${a}
          </body>
          </html>`});if(h)return'';const m=(f.packOptions||{}).ignore||[];if(v.isFileIgnored(e,m))throw a(e),new Error('file ignored in pack options');return await b.getFile(f,e,null)},getAppServiceSource:async function(b){let d=l.parse(b),e=d.pathname.replace(/^\/appservice\//,''),f=i.getCurrent(),g=/appservice$/.test(e),h=/favicon\.ico$/.test(e),j=/\.js$/.test(e),k=/\.map$/.test(e),m=/^__devplugin__\//.test(e),n=/^__onlineplugin__\//.test(e),o='';if(0===e.indexOf('__asdebug__/asdebug.js'))return w;if(0===e.indexOf('__workerasdebug__')){if(e.endsWith('workerasdebug.js'))return x;if(e.endsWith('weixinworker.js'))return y}if(o=e.match(/__dev__\/([-_\w\.]*)$/),o&&o[1])return o=o[1],await s.getFile(o);if(o=e.match(/__workerdev__\/([-_\w\.]*)$/),o&&o[1]){o=o[1];const a=await s.getFile(o),b=o.replace('__workerdev__/','');return`__workerVendorCode__['${b}'] = ${JSON.stringify(a.toString('utf8'))}`}if(m||n){let a=n?/^__onlineplugin__\/([^\/]*)\/([^\/]*)\/(.*)/:/^__devplugin__\/([^\/]*)\/([^\/]*)\/(.*)/;let b=a.exec(e),c=b[1]||'',d=b[2]||'';if(/appservice\.js$/.test(e))return await t.getServiceCode(f,{pluginId:c,version:d}).catch((a)=>{u.error(a),p.display({command:q.DISPLAY_ERROR,type:r.CODE_ERROR,data:{title:`插件 ${c}/${d}`,error:a}})});if(/appservice\.js\.map$/.test(e))return await t.getServiceCodeMap(f,{pluginId:f.appid,version:'dev'})}const z=(f.packOptions||{}).ignore||[];if(!g&&!m&&!n&&v.isFileIgnored(e,z))throw a(e),new Error('file ignored in pack options');return g?c.generate(f).catch((a)=>{return p.display({command:q.DISPLAY_ERROR,type:r.CODE_ERROR,data:{error:a}}),C()}):h?'':j?(o=e.replace(/^\//,''),await c.getJSFile(f,o).catch((a)=>{a.path||(a.path=o),p.display({command:q.DISPLAY_ERROR,type:r.CODE_ERROR,data:{error:a}})})):await c.getJSMapFile(f,e)},getEditorSource:(a)=>new Promise(async(b,c)=>{let d=l.parse(a),e=decodeURI(d.pathname).replace(/^\/editor/,'');const f=new Date;if(/\/assets\/api\//.test(e))try{let a;/js\.api\.monaco\.js$/.test(e)?a=await D(o.JSAPIMonacoFilePath):/component\.api\.js$/.test(e)?a=await D(o.ComponentAPIFilePath):/js\.api\.js$/.test(e)?a=await D(o.JSAPIFilePath):/wxml\.api\.js$/.test(e)?a=await D(o.WXMLAPIFilePath):/lib\.wa\.es6\.js$/.test(e)?a=await D(o.LibWaEs6FilePath):c(`unrecogized url ${e} for getEditorSource`),20>(new Date-f)/1e3?b({body:a}):o.notifyReload()}catch(a){c(a)}else if(/\/files\//.test(e)){let d=i.getCurrent(),e=a.match(/\/files\/(.+)$/);if(!e)c('File not found');else if(e=e[1],e){e=decodeURIComponent(e);let a=m.join(d.projectpath,e);n.readFile(a,(d,e)=>{if(d)return void c(d);let f='text/plain',g=m.extname(a);switch(g){case'.jpg':case'.jpeg':case'.png':case'.icon':case'.gif':case'.cer':{f='image/image';break}case'.svg':{f='image/svg+xml';break}}b({headers:{"content-type":f},body:e})})}else c('File not found')}}),getLocalIdResponse:async function(a){let b=k.getFileRealPath(a),c=b.fileRealPath;return n.readFileSync(c,null)},getWidgetWebviewResource:async function(a){let b=l.parse(a),c=decodeURI(b.pathname).replace(/^\/widgetwebview\//,''),e=i.getCurrent(),f=/widgetPage\.html$/.test(c),g=/favicon\.ico$/.test(c);return g?'':f?await d.generate(e):g?'':await d.getFile(e,c,null)},getWidgetServiceResource:async function(a){let b=l.parse(a),d=b.pathname.replace(/^\/widgetservice\//,''),g=i.getCurrent(),h=/conversation$/.test(d),j=/search$/.test(d),k=/favicon\.ico$/.test(d),m=/\.js$/.test(d);if(k)return'';return h||j?e.generate(g).catch((a)=>{return`<html>
              <head>
              <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
              <script>
                console.error(\`${a}\`)
              </script>
              </head>
              <body>
              </body>
              </html>`}):m?g.attr.gameApp?await f.getFile(g,d,null):await c.getJSFile(g,d).catch((a)=>{a.path||(a.path=d),p.display({command:q.DISPLAY_ERROR,type:r.CODE_ERROR,data:{error:a}})}):void 0},getGamePageResource:async function(a){let b=l.parse(a),c=decodeURI(b.pathname).replace(/^\/game\//,''),d=i.getCurrent(),e=/gamePage\.html$/.test(c),h=/subcontext\.html$/.test(c),j=/favicon\.ico$/.test(c),k=/nativeview\.html$/.test(c);return h?await f.getSubContext(d):k?await g.generate():j?'':e?await f.generate(d).catch((a)=>{let b=a.toString();try{b=b.replace(/\\/g,'\\\\')}catch(a){}return`<html>
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
              </html>`}):await f.getFile(d,c,null).catch((a)=>{p.display({command:q.DISPLAY_ERROR,type:r.CODE_ERROR,data:{error:a}})})},getUsrFileResponse:async function(a){let b=k.getFileRealPath(a),c=b.fileRealPath;return n.readFileSync(c,null)}}}(require('lazyload'),require);