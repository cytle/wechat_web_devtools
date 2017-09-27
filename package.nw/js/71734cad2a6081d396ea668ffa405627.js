'use strict';!function(require,directRequire){function a(){k={}}function b(b,c){d.extname(c);if('app.json'==c)return void a();for(var e in k)0==c.indexOf(e)&&delete k[e]}async function c(c){let d=await g(c,j,b);return d&&(a(),j=d),j}const d=require('path'),e=require('./d28a711224425b00101635efe1034c99.js'),f=require('./1dea83a77e99a7c94f6b6f01f5c175b0.js'),g=require('./2c9d8048c89177fae2327b7849a5e105.js'),h=require('./d260ebf687a29f24aed49f66b233ab7d.js'),i=require('./3e4c71c2a2cc438e1b3afc3fb10bd4b6.js');var j,k={};module.exports=async function(a,b){if(await c(a),!k[b]||global.appConfig.isDev){let c,h=j.getAllJSFiles(),l=await f(a);for(let a=0,d=l.subPackages.length;a<d;a++)if(l.subPackages[a].root==b){c=l.subPackages[a];break}if(c){let f=c.pages,j={},l=[],m=[],n=[],o=await i(a,{page:b,cut:!0});n.push(o.code.replace(/\\/g,'\\\\').replace(/`/g,'\\`')),f.forEach((a)=>{a=d.posix.join(c.root,a),j[a]||(j[a]=!0,l.push(`${a}.js`),n.push(`
          __wxRoute = '${a}'
          __wxRouteBegin = true
          require("${a}.js")
          if(__wxRouteBegin) {
            console.group("${new Date} page 编译错误")
            console.error("${a}.js 出现脚本错误或者未正确调用 Page()")
            console.groupEnd()
          }
        `))}),h.forEach((a)=>{let b=a.replace(/\.js$/,'');j[b]||0!=a.indexOf(c.root)||m.push(`${a}`)});var e=m.concat([]).concat(l),g=[`
        var scriptCounter = ${e.length}
        var requireScript = document.createElement('script')
        requireScript.text = \`${n.join('\n')}\`
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
      `];for(let a=0,b=e.length;a<b;a++)g.push(`var script${a} = document.createElement('script')
        script${a}.src = '${e[a]}'
        script${a}.onload = scriptLoaded.bind(script${a})
        script${a}.onreadystatechange = function() {
          if (this.readyState == 'complete') {
            scriptLoaded.call(this)
          }
        }
        document.head.appendChild(script${a})`);k[b]=g.join('\n')}}return k[b]}}(require('lazyload'),require);