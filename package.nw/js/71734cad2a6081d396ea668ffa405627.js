'use strict';!function(require,directRequire){const a=require('path'),b=require('./d28a711224425b00101635efe1034c99.js'),c=require('./1dea83a77e99a7c94f6b6f01f5c175b0.js'),d=require('./6b5520e429c60abf5d2f924c0fa05fd0.js'),e=require('./d260ebf687a29f24aed49f66b233ab7d.js'),f=require('./3e4c71c2a2cc438e1b3afc3fb10bd4b6.js'),g=require('./162bf2ee28b76d3b3d95b685cede4146.js'),h=require('./d99ed8ea97ed3956b461e69d47df2784.js'),i=require('./e2bb00408a93b45ef5e6ad32f05e850c.js'),j=require('./d3976cc01aeebc5b09e11c4135b6bd8d.js'),k=require('./common/locales/index.js'),l=require('./2e9637e8a0816a626f7db9a0dee5efe8.js');let m={};module.exports=async function(b,e){if(b.isOnline)return await h(b,e);await l.init(b);const m=await g(b),n=l.CACHE_KEYS.JS_SUBPACKAGE_APPSERVICE,o=a.posix.join(m.srcPath,e);let p=l.get(n,o);if(!p||global.appConfig.isDev){const g=m.getAllJSFiles(),h=await c(b),q=j.checkIsInSubPackage(h,e);if(q){const c=q.pages,j={},m=[],r=[],s=[],t=[],u=[];if(q.plugins)for(const a in q.plugins){const{provider:b,version:c}=q.plugins[a];'dev'==c?u.push(`__devplugin__/${b}/${c}/appservice.js`):u.push(`__onlineplugin__/${b}/${c}/appservice.js`)}const v=await f(b,{page:e,cut:!0});s.push(v.code.replace(/\\/g,'\\\\').replace(/`/g,'\\`'));const w=await d.getFileList(b,h,q);for(let a=0,c=w.length;a<c;a++){const c=w[a];if(j[c])continue;j[c]=!0,t.push(`${c}.js`);let d={};try{d=await i(b,c)}catch(a){d={}}const e=c.replace(/\"/g,'\\"').replace(/`/g,'\\`');s.push(`
          __wxAppCode__["${e}.wxml"] = ${v.name}("./${e}.wxml")
          __wxAppCode__["${e}.json"] = ${JSON.stringify(d)}
          __wxRoute = "${e}"
          __wxRouteBegin = true
          __wxAppCurrentFile__ = "${e}.js"
          require("${e}.js")
        `)}c.forEach((b)=>{if(b=a.posix.join(q.root,b),!j[b]){j[b]=!0;const a=b.replace(/\"/g,'\\"').replace(/`/g,'\\`');m.push(`${encodeURI(b)}.js`),s.push(`
          __wxRoute = "${a}"
          __wxRouteBegin = true
          require("${a}.js")
          if(__wxRouteBegin) {
            console.group("${new Date} ${k.config.COMPILE_ERROR_PREFIX.format('page')}")
            console.error("${k.config.SCRIPT_ERROR_OR_INCORRECTLY_CALL.format([a+'.js','Page()'])}")
            console.groupEnd()
          }
        `)}}),g.forEach((a)=>{const b=a.replace(/\.js$/,'');j[b]||0!=a.indexOf(q.root)||r.push(`${encodeURI(a)}`)});let x=Date.now()+''+Math.random();x=x.replace(/\./,'');const y=u.concat(r).concat(t).concat(m),z=[`
        var scriptCounter${x} = ${y.length}
        var requireScript${x} = document.createElement('script')
        requireScript${x}.text = \`${s.join('\n')}\`
        var requireScriptAppended${x} = false
        var scriptLoaded = function(event) {
          if (this.__loaded) {
            return
          }
          this.__loaded = true
          scriptCounter${x} --
          if (!requireScriptAppended${x} && scriptCounter${x} <= 0) {
            requireScriptAppended${x} = true
            document.head.appendChild(requireScript${x})
            let __alert = window.alert || window.__global && window.__global.alert
            __alert('SUBPACKAGE_READY_${e}')
          }
        }
      `];for(let a=0,b=y.length;a<b;a++)z.push(`var script${x}${a} = document.createElement('script')
        script${x}${a}.src = '${y[a]}'
        script${x}${a}.onload = scriptLoaded.bind(script${x}${a})
        script${x}${a}.onreadystatechange = function() {
          if (this.readyState == 'complete') {
            scriptLoaded.call(this)
          }
        }
        document.head.appendChild(script${x}${a})`);p=z.join('\n'),l.set(n,o,p)}}return p}}(require('lazyload'),require);