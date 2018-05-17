'use strict';!function(require,directRequire){function a(){l={}}function b(b,c){d.extname(c);if('app.json'==c)return void a();for(var e in l)0==c.indexOf(e)&&delete l[e]}async function c(c){let d=await j(c);k&&k.srcPath==d.srcPath||(a(),k&&k.unWatch(b),k=d,k.watch(b))}const d=require('path'),e=require('./d28a711224425b00101635efe1034c99.js'),f=require('./1dea83a77e99a7c94f6b6f01f5c175b0.js'),g=require('./6b5520e429c60abf5d2f924c0fa05fd0.js'),h=require('./d260ebf687a29f24aed49f66b233ab7d.js'),i=require('./3e4c71c2a2cc438e1b3afc3fb10bd4b6.js'),j=require('./162bf2ee28b76d3b3d95b685cede4146.js');var k,l={};module.exports=async function(a,b){if(await c(a),!l[b]||global.appConfig.isDev){let c,n=k.getAllJSFiles(),o=await f(a);for(let a=0,d=o.subPackages.length;a<d;a++)if(o.subPackages[a].root==b){c=o.subPackages[a];break}if(c){let f=c.pages,k={},p=[],q=[],r=[],s=[],t=[];if(c.plugins)for(var e in c.plugins){const{provider:a,version:b}=c.plugins[e];'dev'==b?t.push(`__devplugin__/${a}/${b}/appservice.js`):t.push(`__onlineplugin__/${a}/${b}/appservice.js`)}let u=await i(a,{page:b,cut:!0});r.push(u.code.replace(/\\/g,'\\\\').replace(/`/g,'\\`'));let v=await g.getFileList(a,o,c);for(let b,d=0,e=v.length;d<e;d++){if(b=v[d],k[b])continue;k[b]=!0,s.push(`${b}.js`);let e={};try{e=await h(a,b)}catch(a){e={}}if((o.plugins||c.plugins)&&e.usingComponents)for(let a in e.usingComponents)e.usingComponents[a]=e.usingComponents[a].replace(/^plugin:\/\/([^\/]*)\/(.*)/,(a,b,d,e,f)=>{let g=o.plugins&&o.plugins[b]||c.plugins&&c.plugins[b];return g?`plugin://${g.provider}/${d}`:f});r.push(`
          __wxAppCode__["${b}.wxml"] = ${u.name}("./${b}.wxml")
          __wxAppCode__["${b}.json"] = ${JSON.stringify(e)}
          __wxRoute = '${b}'
          __wxRouteBegin = true
          __wxAppCurrentFile__ = '${b}.js'
          require("${b}.js")
        `)}f.forEach((a)=>{a=d.posix.join(c.root,a),k[a]||(k[a]=!0,p.push(`${a}.js`),r.push(`
          __wxRoute = '${a}'
          __wxRouteBegin = true
          require("${a}.js")
          if(__wxRouteBegin) {
            console.group("${new Date} page 编译错误")
            console.error("${a}.js 出现脚本错误或者未正确调用 Page()")
            console.groupEnd()
          }
        `))}),n.forEach((a)=>{let b=a.replace(/\.js$/,'');k[b]||0!=a.indexOf(c.root)||q.push(`${a}`)});var j=t.concat(q).concat(s).concat(p),m=[`
        var scriptCounter = ${j.length}
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
      `];for(let a=0,b=j.length;a<b;a++)m.push(`var script${a} = document.createElement('script')
        script${a}.src = '${j[a]}'
        script${a}.onload = scriptLoaded.bind(script${a})
        script${a}.onreadystatechange = function() {
          if (this.readyState == 'complete') {
            scriptLoaded.call(this)
          }
        }
        document.head.appendChild(script${a})`);l[b]=m.join('\n')}}return l[b]}}(require('lazyload'),require);