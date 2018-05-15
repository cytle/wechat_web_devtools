'use strict';!function(require,directRequire){function a(){o={}}function b(b,c){d.extname(c);if('app.json'==c)return void a();for(var e in o)0==c.indexOf(e)&&delete o[e]}async function c(c){let d=await j(c);n&&n.srcPath==d.srcPath||(a(),n&&n.unWatch(b),n=d,n.watch(b))}const d=require('path'),e=require('./d28a711224425b00101635efe1034c99.js'),f=require('./1dea83a77e99a7c94f6b6f01f5c175b0.js'),g=require('./6b5520e429c60abf5d2f924c0fa05fd0.js'),h=require('./d260ebf687a29f24aed49f66b233ab7d.js'),i=require('./3e4c71c2a2cc438e1b3afc3fb10bd4b6.js'),j=require('./162bf2ee28b76d3b3d95b685cede4146.js'),k=require('./d99ed8ea97ed3956b461e69d47df2784.js'),l=require('./e2bb00408a93b45ef5e6ad32f05e850c.js'),m=require('./d3976cc01aeebc5b09e11c4135b6bd8d.js');var n,o={};module.exports=async function(a,b){if(a.isOnline)return await k(a,b);if(await c(a),!o[b]||global.appConfig.isDev){let c=n.getAllJSFiles(),k=await f(a),p=m.checkIsInSubPackage(k,b);if(p){let f=p.pages,m={},n=[],q=[],r=[],s=[],t=[];if(p.plugins)for(var e in p.plugins){const{provider:a,version:b}=p.plugins[e];'dev'==b?t.push(`__devplugin__/${a}/${b}/appservice.js`):t.push(`__onlineplugin__/${a}/${b}/appservice.js`)}let u=await i(a,{page:b,cut:!0});r.push(u.code.replace(/\\/g,'\\\\').replace(/`/g,'\\`'));let v=await g.getFileList(a,k,p);for(let b,c=0,d=v.length;c<d;c++){if(b=v[c],m[b])continue;m[b]=!0,s.push(`${b}.js`);let d={};try{d=await l(a,b)}catch(a){d={}}let e=b.replace(/\"/g,'\\"').replace(/`/g,'\\`');r.push(`
          __wxAppCode__["${e}.wxml"] = ${u.name}("./${e}.wxml")
          __wxAppCode__["${e}.json"] = ${JSON.stringify(d)}
          __wxRoute = "${e}"
          __wxRouteBegin = true
          __wxAppCurrentFile__ = "${e}.js"
          require("${e}.js")
        `)}f.forEach((a)=>{if(a=d.posix.join(p.root,a),!m[a]){m[a]=!0;let b=a.replace(/\"/g,'\\"').replace(/`/g,'\\`');n.push(`${encodeURI(a)}.js`),r.push(`
          __wxRoute = "${b}"
          __wxRouteBegin = true
          require("${b}.js")
          if(__wxRouteBegin) {
            console.group("${new Date} page 编译错误")
            console.error("${b}.js 出现脚本错误或者未正确调用 Page()")
            console.groupEnd()
          }
        `)}}),c.forEach((a)=>{let b=a.replace(/\.js$/,'');m[b]||0!=a.indexOf(p.root)||q.push(`${encodeURI(a)}`)});var h=t.concat(q).concat(s).concat(n),j=[`
        var scriptCounter = ${h.length}
        var requireScript = document.createElement('script')
        requireScript.text = \`${r.join('\n')}\`
        var requireScriptAppended = false
        var scriptLoaded = function(event) {
          if (this.__loaded) {
            return
          }
          this.__loaded = true
          scriptCounter--
          if (!requireScriptAppended && scriptCounter <= 0) {
            requireScriptAppended = true
            document.head.appendChild(requireScript)
            alert('SUBPACKAGE_READY_${b}')
          }
        }
      `];for(let a=0,b=h.length;a<b;a++)j.push(`var script${a} = document.createElement('script')
        script${a}.src = '${h[a]}'
        script${a}.onload = scriptLoaded.bind(script${a})
        script${a}.onreadystatechange = function() {
          if (this.readyState == 'complete') {
            scriptLoaded.call(this)
          }
        }
        document.head.appendChild(script${a})`);o[b]=j.join('\n')}}return o[b]}}(require('lazyload'),require);