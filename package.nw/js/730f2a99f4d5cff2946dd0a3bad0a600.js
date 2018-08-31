'use strict';!function(require,directRequire){function a(a){C.add(a),D==void 0&&(D=setTimeout(()=>{const a=Array.from(C);p.display({command:q.DISPLAY_ERROR,data:{title:w.config.FAILED_GET_FILE,error:new Error(`${w.config.SOURCEMANAGER_FILE_ERROR_DETAIL}\n${a.join('\n')}`)}}),D=void 0,C.clear()},2e3))}const b=require('url'),c=require('path'),d=require('fs'),e=require('./bd975ba7c5cc0dc70c1404f310e1632b.js'),f=require('./3a9c9c49e5ac7329d924774b97ec3e8a.js'),g=require('./1214e8288e4a5916d134bebceea90cdd.js'),h=require('./928230404887ec407dd48ed25376594e.js'),i=require('./67ee44077f752b9db6f47f8c6e157578.js'),j=require('./352666085f73288bef079dbb9bc80b46.js'),k=require('./d3976cc01aeebc5b09e11c4135b6bd8d.js'),l=require('./3bfffbe88b3d923921f851c0697974fe.js'),m=require('./c6f15ef7a40988103528a2ff766b2425.js'),n=require('./f6cbcecf6ed9f533f6a506310d8f07b6.js'),o=require('./4e88c741ca9fb65fab96c500b6d7f2fb.js'),p=require('./2dfc6a3df6d6fc51266b293c8420e88b.js'),q=require('./56c390e04c10e91a4aa2a2c19d9a885d.js'),r=require('./6242f55dbdfe53c2f07b7a51568311f2.js').errorPrefix,s=require('./d28a711224425b00101635efe1034c99.js'),t=require('./b6d8659542036f6a35f417e0693e56db.js'),u=require('./72653d4b93cdd7443296229431a7aa9a.js'),v=require('./1c8a8c710417d102ab574145dc51b4b0.js'),w=require('./common/locales/index.js'),x=require('./f44251874c8d52edda272e8fb22660aa.js'),{asDebug:y,workerAsDebug:z,WeixinWorkerTpl:A}=require('./ebfcad0a5e72b6e693634486564b1394.js'),B='darwin'===process.platform,C=new Set;let D;const E=()=>`<html>
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
  </html>`,F=(a)=>new Promise((b,c)=>{d.stat(a,async()=>{try{await o.update(!1)}catch(a){c(a)}let e='';try{e=d.readFileSync(a)}catch(a){c(a)}b(e)})});module.exports={getWebviewSource:async function(c){const d=b.parse(c),f=decodeURI(d.pathname).replace(/^\/__pageframe__\//,''),g=l.getCurrent(),h=/pageframe\.html$/.test(f),i=/favicon\.ico$/.test(f);let j=f.match(/__dev__\/([-_\w\.]*)$/);if(j&&j[1])return j=j[1],await s.getFile(j);const k=/^__plugin__\//.test(f);if(k){const a=/__plugin__\/([^\/]*)\/([^\/]*)\/(.*)/,b=a.exec(f),c=b[1]||'',d=b[2]||'';return /pageframe\.js$/.test(f)?await t.getWebviewCode(g,{pluginId:c,version:d}).catch((a)=>{u.error(a),p.display({command:q.DISPLAY_ERROR,type:r.CODE_ERROR,data:{title:`${w.config.PLUGIN} ${c}/${d}`,error:a}})}):await t.getFile(g,{fileName:b[2]+'/'+b[3]||'',pluginId:c},null)}if(h)return e.generate(g).catch((a)=>{return u.error(a),`<html>
          <head>
            <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
            <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0" />
          </head>
          <body style="overflow:hidden">
            ${a}
          </body>
          </html>`});if(i)return'';const m=(g.packOptions||{}).ignore||[];if(v.isFileIgnored(f,m))throw a(f),new Error('file ignored in pack options');return await e.getFile(g,f,null)},getAppServiceSource:async function(c){const d=b.parse(c),e=d.pathname.replace(/^\/appservice\//,''),g=l.getCurrent(),h=/appservice$/.test(e),i=/favicon\.ico$/.test(e),j=/\.js$/.test(e),k=/\.map$/.test(e),m=/^__devplugin__\//.test(e),n=/^__onlineplugin__\//.test(e);let o='';if(0===e.indexOf('__asdebug__/asdebug.js'))return y;if(0===e.indexOf('__workerasdebug__')){if(e.endsWith('workerasdebug.js'))return z;if(e.endsWith('weixinworker.js'))return A}if(o=e.match(/__dev__\/([-_\w\.]*)$/),o&&o[1])return o=o[1],await s.getFile(o);if(o=e.match(/__workerdev__\/([-_\w\.]*)$/),o&&o[1]){o=o[1];const a=await s.getFile(o),b=o.replace('__workerdev__/','');return`__workerVendorCode__['${b}'] = ${JSON.stringify(a.toString('utf8'))}`}if(m||n){let a=n?/^__onlineplugin__\/([^\/]*)\/([^\/]*)\/(.*)/:/^__devplugin__\/([^\/]*)\/([^\/]*)\/(.*)/;const b=a.exec(e),c=b[1]||'',d=b[2]||'';if(/appservice\.js$/.test(e))return await t.getServiceCode(g,{pluginId:c,version:d}).catch((a)=>{u.error(a),p.display({command:q.DISPLAY_ERROR,type:r.CODE_ERROR,data:{title:`${w.config.PLUGIN} ${c}/${d}`,error:a}})});if(/appservice\.js\.map$/.test(e))return await t.getServiceCodeMap(g,{pluginId:g.appid,version:'dev'})}const x=(g.packOptions||{}).ignore||[];if(!h&&!m&&!n&&v.isFileIgnored(e,x))throw a(e),new Error('file ignored in pack options');return h?f.generate(g).catch((a)=>{return p.display({command:q.DISPLAY_ERROR,type:r.CODE_ERROR,data:{error:a}}),E()}):i?'':j?(o=e.replace(/^\//,''),await f.getJSFile(g,o).catch((a)=>{a.path||(a.path=o),p.display({command:q.DISPLAY_ERROR,type:r.CODE_ERROR,data:{error:a}})})):await f.getJSMapFile(g,e)},getEditorSource:(a)=>new Promise(async(e,f)=>{const g=b.parse(a),h=decodeURI(g.pathname).replace(/^\/editor/,''),i=new Date;if(/\/assets\/api\//.test(h))try{let a;/js\.api\.monaco\.js$/.test(h)?a=await F(o.JSAPIMonacoFilePath):/component\.api\.js$/.test(h)?a=await F(o.ComponentAPIFilePath):/js\.api\.js$/.test(h)?a=await F(o.JSAPIFilePath):/wxml\.api\.js$/.test(h)?a=await F(o.WXMLAPIFilePath):/lib\.wa\.es6\.js$/.test(h)?a=await F(o.LibWaEs6FilePath):f(`unrecogized url ${h} for getEditorSource`),20>(new Date-i)/1e3?e({body:a}):o.notifyReload()}catch(a){f(a)}else if(/\/files\//.test(h)){const b=l.getCurrent();let g=a.match(/\/files\/(.+)$/);if(!g)f('File not found');else if(g=g[1],g){g=decodeURIComponent(g);const a=c.join(b.projectpath,g);d.readFile(a,(b,d)=>{if(b)return void f(b);let g='text/plain';const h=c.extname(a);switch(h){case'.jpg':case'.jpeg':case'.png':case'.icon':case'.gif':case'.cer':{g='image/image';break}case'.svg':{g='image/svg+xml';break}}e({headers:{"content-type":g},body:d})})}else f('File not found')}}),getLocalIdResponse:async function(a){const b=n.getFileRealPath(a),c=b.fileRealPath;return d.readFileSync(c,null)},getWidgetWebviewResource:async function(a){const c=b.parse(a),d=decodeURI(c.pathname).replace(/^\/widgetwebview\//,''),e=l.getCurrent(),f=/widgetPage\.html$/.test(d),h=/favicon\.ico$/.test(d);return h?'':f?await g.generate(e):h?'':await g.getFile(e,d,null)},getWidgetServiceResource:async function(a){const c=b.parse(a),d=c.pathname.replace(/^\/widgetservice\//,''),e=l.getCurrent(),g=/conversation$/.test(d),j=/search$/.test(d),k=/favicon\.ico$/.test(d),m=/\.js$/.test(d);if(k)return'';return g||j?h.generate(e).catch((a)=>`<html>
              <head>
              <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
              <script>
                console.error(\`${a}\`)
              </script>
              </head>
              <body>
              </body>
              </html>`):m?e.attr.gameApp?await i.getFile(e,d,null):await f.getJSFile(e,d).catch((a)=>{a.path||(a.path=d),p.display({command:q.DISPLAY_ERROR,type:r.CODE_ERROR,data:{error:a}})}):void 0},getGamePageResource:async function(a){const c=b.parse(a),d=decodeURI(c.pathname).replace(/^\/game\//,''),e=l.getCurrent(),f=/gamePage\.html$/.test(d),g=/subcontext\.html$/.test(d),h=/favicon\.ico$/.test(d),k=/nativeview\.html$/.test(d);return g?await i.getSubContext(e):k?await j.generate():h?'':f?await i.generate(e).catch((a)=>{let b=a.toString();try{b=b.replace(/\\/g,'\\\\')}catch(a){}return`<html>
              <head>
              <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
              <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0" />
              <script src="__asdebug__/asdebug.js"></script>
              <script>console.error(\`${b}\`)</script>
              </head>
              <body>
                ${w.config.COMPILE_ERROR}
                </br>
                ${b}
              </body>
              </html>`}):await i.getFile(e,d,null).catch((a)=>{p.display({command:q.DISPLAY_ERROR,type:r.CODE_ERROR,data:{error:a}})})},getUsrFileResponse:async function(a){const b=n.getFileRealPath(a),c=b.fileRealPath;return d.readFileSync(c,null)},getExperienceResource:async function(a){const c=b.parse(a),d=c.pathname.replace(/^\/experience\/inject\//,'');return await x(d)}}}(require('lazyload'),require);