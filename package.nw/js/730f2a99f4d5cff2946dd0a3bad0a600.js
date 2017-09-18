'use strict';!function(require,directRequire){const a=require('./bd975ba7c5cc0dc70c1404f310e1632b.js'),b=require('./3a9c9c49e5ac7329d924774b97ec3e8a.js'),c=require('./1214e8288e4a5916d134bebceea90cdd.js'),d=require('./928230404887ec407dd48ed25376594e.js'),e=require('./d3976cc01aeebc5b09e11c4135b6bd8d.js'),f=require('./3bfffbe88b3d923921f851c0697974fe.js'),g=require('./c6f15ef7a40988103528a2ff766b2425.js'),h=require('url'),i=require('path'),j=require('fs'),k=require('./4e88c741ca9fb65fab96c500b6d7f2fb.js'),l=require('./949d8235c744ced2a80121e4dba34c28.js'),m=require('./2dfc6a3df6d6fc51266b293c8420e88b.js'),n=require('./56c390e04c10e91a4aa2a2c19d9a885d.js'),o=require('./6242f55dbdfe53c2f07b7a51568311f2.js').errorPrefix,p=require('./d28a711224425b00101635efe1034c99.js'),{asDebug:q}=require('./ebfcad0a5e72b6e693634486564b1394.js'),r='darwin'===process.platform,s=(a)=>{switch(a.code){case l.APP_JSON_READ_ERR:case l.APP_JSON_ENTRANCE_NOT_FOUND_ERR:case l.APP_JSON_PARSE_ERR:case l.APP_JSON_PAGES_ERR:case l.APP_JSON_CONTENT_ERR:return m.display({command:n.DISPLAY_ERROR,type:o.JSON_ERROR,data:{title:'app.json \u6587\u4EF6\u9519\u8BEF',msg:a.message}}),!0;case l.EXT_JSON_PAGES_ERR:case l.EXT_JSON_PARSE_ERR:return m.display({command:n.DISPLAY_ERROR,type:o.JSON_ERROR,data:{title:'ext.json \u6587\u4EF6\u9519\u8BEF',msg:a.message}}),!0;case l.PAGES_JSON_PARSE_ERR:return m.display({command:n.DISPLAY_ERROR,type:o.JSON_ERROR,data:{title:`${a.path} 文件错误`,msg:a.message}}),!0;default:}return!1},t=(a)=>{return`<html>
    <head>
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    </head>
    <body>
      <script>
        console.error(\`${a}\`)
        if (document.readyState == 'complete') {
          history.replaceState({},{}, location.href + '?load')
        } else {
          window.addEventListener('load', (event) => {
            history.replaceState({},{}, location.href + '?load')
          })
        }
      </script>
    </body>
  </html>`},u=(a)=>{let b=[{reg:/reporter-sdk\.js$/,value:'reporter-sdk.js'},{reg:/webview-sdk\.js$/,value:'webview-sdk.js'},{reg:/exparser\.min\.js$/,value:'exparser.min.js'},{reg:/wx-components\.js$/,value:'wx-components.js'},{reg:/virtual_dom\.js$/,value:'virtual_dom.js'},{reg:/webview-engine\.js$/,value:'webview-engine.js'},{reg:/wx-components\.css$/,value:'wx-components.css'},{reg:/hls\.js$/,value:'hls.js'},{reg:/__dev__\/webnode\.js$/,value:'webnode.js'},{reg:/__dev__\/reporter-sdk\.js$/,value:'reporter-sdk.js'},{reg:/__dev__\/appservice-sdk.js$/,value:'appservice-sdk.js'},{reg:/__dev__\/virtual_dom_data\.js$/,value:'virtual_dom_data.js'},{reg:/__dev__\/app_service_engine\.js$/,value:'app_service_engine.js'},{reg:/__dev__\/WAService\.js$/,value:'WAService.js'}];for(let c=0,d=b.length;c<d;c++)if(b[c].reg.test(a))return b[c].value},v=(a)=>new Promise((b,c)=>{j.stat(a,async()=>{try{await k.update(!1)}catch(a){c(a)}let d='';try{d=j.readFileSync(a)}catch(a){c(a)}b(d)})});module.exports={getWebviewSource:async function(b){let c=h.parse(b),d=decodeURI(c.pathname),g=e.getProjectHashFromURL(b),i=f.getProjectByHash(g),j=/pageframe\.html$/.test(d),k=/favicon\.ico$/.test(d),l=u(d);return l?await p.getFile(l):j?a.generate(i).catch((a)=>{return`<html>
          <head>
            <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
            <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0" />
          </head>
          <body style="overflow:hidden">
            ${a}
          </body>
          </html>`}):k?'':await a.getFile(i,d.replace(/^\//,''),null)},getAppServiceSource:async function(a){let c=h.parse(a),d=c.pathname,g=e.getProjectHashFromURL(a),i=f.getProjectByHash(g),j=/appservice$/.test(d),k=/favicon\.ico$/.test(d),l=/\.js$/.test(d),m=/\.map$/.test(d);if(0===d.indexOf('/__asdebug__/asdebug.js'))return q;let n=u(d);if(n)return await p.getFile(n);return j?b.generate(i).catch((a)=>{let b='';return b=s(a)?'\u751F\u6210 appservice \u51FA\u9519\uFF0C\u8BF7\u67E5\u770B\u8BE6\u7EC6\u4FE1\u606F':a,t(b)}):k?'':l?await b.getJSFile(i,d.replace(/^\//,'')):m?await b.getJSMapFile(i,d.replace(/^\//,'')):void 0},getEditorSource:(a)=>new Promise(async(b,c)=>{const d=new Date;if(/\/assets\/api\//.test(a))try{let e;/js\.api\.monaco\.js$/.test(a)?e=await v(k.JSAPIMonacoFilePath):/component\.api\.js$/.test(a)?e=await v(k.ComponentAPIFilePath):/js\.api\.js$/.test(a)?e=await v(k.JSAPIFilePath):/wxml\.api\.js$/.test(a)?e=await v(k.WXMLAPIFilePath):c(`unrecogized url ${a} for getEditorSource`),20>(new Date-d)/1e3?b({body:e}):k.notifyReload()}catch(a){c(a)}else if(/\/files\//.test(a)){let d=h.parse(a),g=decodeURI(d.pathname),k=e.getProjectHashFromURL(a),l=f.getProjectByHash(k),m=a.match(/\/files\/(.+)$/);if(!m)c('File not found');else if(m=m[1],m){m=decodeURIComponent(m);let a=i.join(l.projectpath,m);j.readFile(a,(d,e)=>{if(d)return void c(d);let f='text/plain',g=i.extname(a);switch(g){case'.jpg':case'.jpeg':case'.png':case'.icon':case'.gif':case'.cer':{f='image/image';break}case'.svg':{f='image/svg+xml';break}}b({headers:{"content-type":f},body:e})})}else c('File not found')}}),getLocalIdResponse:async function(a){if(g.isLocalId(a)){let b=g.getRealPath(a);return j.readFileSync(b,null)}throw new Error('file not found')},getWidgetWebviewResource:async function(a){let b=h.parse(a),d=decodeURI(b.pathname),g=e.getProjectHashFromURL(a),i=f.getProjectByHash(g),j=/widgetPage\.html$/.test(d),k=/favicon\.ico$/.test(d);return k?'':j?await c.generate(i):k?'':await c.getFile(i,d.replace(/^\//,''),null)},getWidgetServiceResource:async function(a){let c=h.parse(a),g=c.pathname,i=e.getProjectHashFromURL(a),j=f.getProjectByHash(i),k=/conversation$/.test(g),l=/search$/.test(g),m=/favicon\.ico$/.test(g),n=/\.js$/.test(g);if(m)return'';return k||l?d.generate(j).catch((a)=>{return`<html>
              <head>
              <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
              <script>
                console.error(\`${a}\`)
              </script>
              </head>
              <body>
              </body>
              </html>`}):n?await b.getJSFile(j,g.replace(/^\//,'')):void 0}}}(require('lazyload'),require);