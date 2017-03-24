"use strict";var _exports;function init(){function a(p,q){return`
      <script>${o[p.hash]}</script>
      <script>
        document.dispatchEvent(new CustomEvent("generateFuncReady", {
          detail: {
            generateFunc: $gwx('./${q}')
          }
        }))
      </script>
    `}const b=global.appConfig.isDev,c="darwin"===process.platform;require("fs");const d=require("path"),e=require("../../config/dirConfig.js"),f=e.WeappVendor,g=require("../utils/tools.js"),h=require("../utils/projectManager.js"),j=b?d.join(__dirname,"../vendor/"):f,k=c?d.join(j,"wcc"):d.join(j,"wcc.exe");require("glob");const l=require("child_process").spawn,{WXML_ERROR:m,WXML_LOSE_ERROR:n}=require("../../config/config.js");var o={};h.manager.on("FILE_CHANGE",(p,q,r)=>{".wxml"===d.extname(r)&&delete o[p.hash]}),_exports=(p,q,r)=>{let s=q.project,t=g.getFilePath(p,s),u=d.relative(s.projectpath,t),v="",w="";return o[s.hash]?void process.nextTick(()=>{r(null,{generateFunc:a(s,u.replace(/\\/g,"/")),styleStr:v})}):void h.getAllWXMLFileList(s,(x,y)=>{let z=h.getAppJSONSync(s),A=z.pages;for(let B=0,C=A.length;B<C;B++){let D=`./${A[B]}.wxml`,E=y.indexOf(D);if(-1===E)return void r({type:n,msgForConsole:`${B}:${JSON.stringify(z)}`,msg:`编译 .wxml 文件错误， 错误信息：未找到页面 ${A[B]} 对应的 wxml 文件`})}if(!x){let B=["-d"].concat(y),C=l(k,B,{cwd:s.projectpath}),D=[],E=[];C.on("close",F=>{if(0===F)o[s.hash]=Buffer.concat(D).toString(),w=a(s,u.replace(/\\/g,"/")),r(null,{generateFunc:w,styleStr:v});else{let G=Buffer.concat(E).toString();r({type:m,msgForConsole:G,msg:`编译 .wxml 文件错误， 错误信息：${G}，可在控制台查看更详细信息`})}}),C.stdout.on("data",F=>{D.push(F)}),C.stderr.on("data",F=>{E.push(F)})}else r(x.toString())})}}init(),module.exports=_exports;