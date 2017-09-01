'use strict';!function(require,directRequire){const a=require('./bd975ba7c5cc0dc70c1404f310e1632b.js'),b=require('./3a9c9c49e5ac7329d924774b97ec3e8a.js'),c=require('./1214e8288e4a5916d134bebceea90cdd.js'),d=require('./928230404887ec407dd48ed25376594e.js'),e=require('./d3976cc01aeebc5b09e11c4135b6bd8d.js'),f=require('./3bfffbe88b3d923921f851c0697974fe.js'),g=require('./c6f15ef7a40988103528a2ff766b2425.js'),h=require('url'),i=require('path'),j=require('fs'),k=require('./4e88c741ca9fb65fab96c500b6d7f2fb.js'),l='darwin'===process.platform,m=(a)=>new Promise((b,c)=>{j.stat(a,async(d)=>{if(d)try{await k.update(!1)}catch(a){c(a)}let e='';try{e=j.readFileSync(a)}catch(a){c(a)}b(e)})});module.exports={getWebviewSource:async function(b){let c=h.parse(b),d=decodeURI(c.pathname),g=e.getProjectHashFromURL(b),i=f.getProjectByHash(g),j=/pageframe\.html$/.test(d),k=/favicon\.ico$/.test(d);return j?a.generate(i).catch((a)=>{return`<html>
          <head>
            <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
            <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0" />
          </head>
          <body>
            ${a}
          </body>
          </html>`}):k?'':await a.getFile(i,d.replace(/^\//,''),null)},getAppServiceSource:async function(a){let c=h.parse(a),d=c.pathname,g=e.getProjectHashFromURL(a),i=f.getProjectByHash(g),j=/appservice$/.test(d),k=/favicon\.ico$/.test(d),l=/\.js$/.test(d);if(j)return b.generate(i).catch((a)=>{return`<html>
              <head>
                <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
                <script>
                  console.error(\`${a}\`)
                </script>
              </head>
              <body>
              </body>
              </html>`});return k?'':l?await b.getJSFile(i,d.replace(/^\//,'')):void 0},getEditorSource:(a)=>new Promise(async(b,c)=>{const d=new Date;if(/\/assets\/api\//.test(a))try{let e;/js\.api\.monaco\.js$/.test(a)?e=await m(k.JSAPIMonacoFilePath):/component\.api\.js$/.test(a)?e=await m(k.ComponentAPIFilePath):/js\.api\.js$/.test(a)?e=await m(k.JSAPIFilePath):/wxml\.api\.js$/.test(a)?e=await m(k.WXMLAPIFilePath):c(`unrecogized url ${a} for getEditorSource`),20>(new Date-d)/1e3?b({body:e}):k.notifyReload()}catch(a){c(a)}else if(/\/files\//.test(a)){let d=h.parse(a),g=decodeURI(d.pathname),k=e.getProjectHashFromURL(a),l=f.getProjectByHash(k),m=a.match(/\/files\/(.+)$/);if(!m)c('File not found');else if(m=m[1],m){m=decodeURIComponent(m);let a=i.join(l.projectpath,m);j.readFile(a,(d,e)=>{if(d)return void c(d);let f='text/plain',g=i.extname(a);switch(g){case'.jpg':case'.jpeg':case'.png':case'.icon':case'.gif':case'.cer':{f='image/image';break}case'.svg':{f='image/svg+xml';break}}b({headers:{"content-type":f},body:e})})}else c('File not found')}}),getLocalIdResponse:async function(a){if(g.isLocalId(a)){let b=g.getRealPath(a);return j.readFileSync(b,null)}throw new Error('file not found')},getWidgetWebviewResource:async function(a){let b=h.parse(a),d=decodeURI(b.pathname),g=e.getProjectHashFromURL(a),i=f.getProjectByHash(g),j=/widgetPage\.html$/.test(d),k=/favicon\.ico$/.test(d);return k?'':j?await c.generate(i):k?'':await c.getFile(i,d.replace(/^\//,''),null)},getWidgetServiceResource:async function(a){let c=h.parse(a),g=c.pathname,i=e.getProjectHashFromURL(a),j=f.getProjectByHash(i),k=/conversation$/.test(g),l=/search$/.test(g),m=/favicon\.ico$/.test(g),n=/\.js$/.test(g);if(m)return'';return k||l?d.generate(j).catch((a)=>{return`<html>
              <head>
              <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
              <script>
                console.error(\`${a}\`)
              </script>
              </head>
              <body>
              </body>
              </html>`}):n?await b.getJSFile(j,g.replace(/^\//,'')):void 0}}}(require('lazyload'),require);