'use strict';!function(require,directRequire){function a(){l={}}function b(b,c){d.extname(c);if('app.json'==c)return void a();for(var e in l)0==c.indexOf(e)&&delete l[e]}async function c(c){let d=await j(c);k&&k.srcPath==d.srcPath||(a(),k&&k.unWatch(b),k=d,k.watch(b))}const d=require('path'),e=require('./d28a711224425b00101635efe1034c99.js'),f=require('./1dea83a77e99a7c94f6b6f01f5c175b0.js'),g=require('./6b5520e429c60abf5d2f924c0fa05fd0.js'),h=require('./d260ebf687a29f24aed49f66b233ab7d.js'),i=require('./3e4c71c2a2cc438e1b3afc3fb10bd4b6.js'),j=require('./162bf2ee28b76d3b3d95b685cede4146.js');var k,l={};module.exports=async function(a,b){if(await c(a),!l[b]||global.appConfig.isDev){let c,m=k.getAllJSFiles(),n=await f(a);for(let a=0,d=n.subPackages.length;a<d;a++)if(n.subPackages[a].root==b){c=n.subPackages[a];break}if(c){let f=c.pages,k={},o=[],p=[],q=[],r=[],s=await i(a,{page:b,cut:!0});q.push(s.code.replace(/\\/g,'\\\\').replace(/`/g,'\\`'));let t=await g.getFileList(a,n,c);for(let b,c=0,d=t.length;c<d;c++){if(b=t[c],k[b])continue;k[b]=!0,r.push(`${b}.js`);let d={};try{d=await h(a,b)}catch(a){d={}}q.push(`
          __wxAppCode__["${b}.wxml"] = ${s.name}("./${b}.wxml")
          __wxAppCode__["${b}.json"] = ${JSON.stringify(d)}
          __wxRoute = '${b}'
          __wxRouteBegin = true
          __wxAppCurrentFile__ = '${b}.js'
          require("${b}.js")
        `)}f.forEach((a)=>{a=d.posix.join(c.root,a),k[a]||(k[a]=!0,o.push(`${a}.js`),q.push(`
          __wxRoute = '${a}'
          __wxRouteBegin = true
          require("${a}.js")
          if(__wxRouteBegin) {
            console.group("${new Date} page 编译错误")
            console.error("${a}.js 出现脚本错误或者未正确调用 Page()")
            console.groupEnd()
          }
        `))}),m.forEach((a)=>{let b=a.replace(/\.js$/,'');k[b]||0!=a.indexOf(c.root)||p.push(`${a}`)});var e=p.concat(r).concat(o),j=[`
        var scriptCounter = ${e.length}
        var requireScript = document.createElement('script')
        requireScript.text = \`${q.join('\n')}\`
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
      `];for(let a=0,b=e.length;a<b;a++)j.push(`var script${a} = document.createElement('script')
        script${a}.src = '${e[a]}'
        script${a}.onload = scriptLoaded.bind(script${a})
        script${a}.onreadystatechange = function() {
          if (this.readyState == 'complete') {
            scriptLoaded.call(this)
          }
        }
        document.head.appendChild(script${a})`);l[b]=j.join('\n')}}return l[b]}}(require('lazyload'),require);