;!function(require, directRequire){;"use strict";const path=require("path"),checkAppConfig=require('./1dea83a77e99a7c94f6b6f01f5c175b0.js'),checkCustomComponent=require('./6b5520e429c60abf5d2f924c0fa05fd0.js'),transWXMLToJS=require('./3e4c71c2a2cc438e1b3afc3fb10bd4b6.js'),contentWatcher=require('./162bf2ee28b76d3b3d95b685cede4146.js'),getOnlineSubPackage=require('./d99ed8ea97ed3956b461e69d47df2784.js'),checkWxAppCodeJSON=require('./e2bb00408a93b45ef5e6ad32f05e850c.js'),tools=require('./d3976cc01aeebc5b09e11c4135b6bd8d.js'),locales=require('./common/locales/index.js'),compileCache=require('./2e9637e8a0816a626f7db9a0dee5efe8.js');async function getSubPackage(a,b){if(a.isOnline)return getOnlineSubPackage(a,b);await compileCache.init(a);const c=await contentWatcher(a),d=compileCache.CACHE_KEYS.JS_SUBPACKAGE_APPSERVICE,e=path.posix.join(c.srcPath,b);let f=compileCache.get(d,e);if(!f||global.appConfig.isDev){const g=c.getAllJSFiles(),h=await checkAppConfig(a),i=tools.checkIsInSubPackage(h,b);if(i){const c=i.pages,j={},k=[],l=[],m=[],n=[],o=[];if(i.plugins)for(const a in i.plugins){const{provider:b,version:c}=i.plugins[a];"dev"===c?o.push(encodeURI(`__devplugin__/${b}/${c}/appservice.js`)):o.push(encodeURI(`__onlineplugin__/${b}/${c}/appservice.js`))}const p=await transWXMLToJS(a,{page:b,cut:!0});m.push(p.code.replace(/\\/g,"\\\\").replace(/`/g,"\\`"));const q=await checkCustomComponent.getFileList(a,h,i);for(let b=0,c=q.length;b<c;b++){const c=q[b];if(j[c])continue;j[c]=!0;const d=encodeURI(c);n.push(`${d}.js`);let e={};try{e=await checkWxAppCodeJSON(a,c)}catch(a){e={}}m.push(`
          var decodePathName = decodeURI("${d}")
          __wxAppCode__[decodePathName + ".wxml"] = ${p.name}("./" + decodePathName + ".wxml")
          __wxAppCode__[decodePathName + ".json"] = ${JSON.stringify(e)}
          __wxRoute = decodePathName
          __wxRouteBegin = true
          __wxAppCurrentFile__ = decodePathName + ".js"
          require(__wxAppCurrentFile__)
        `)}c.forEach((a)=>{if(a=path.posix.join(i.root,a),!j[a]){j[a]=!0;const b=a.replace(/\"/g,"\\\"").replace(/`/g,"\\`");k.push(`${encodeURI(a)}.js`),m.push(`
          __wxRoute = "${b}"
          __wxRouteBegin = true
          require("${b}.js")
          if(__wxRouteBegin) {
            console.group("${new Date} ${locales.config.COMPILE_ERROR_PREFIX.format("page")}")
            console.error("${locales.config.SCRIPT_ERROR_OR_INCORRECTLY_CALL.format([b+".js","Page()"])}")
            console.groupEnd()
          }
        `)}}),g.forEach((a)=>{const b=a.replace(/\.js$/,"");j[b]||0!==a.indexOf(i.root)||l.push(`${encodeURI(a)}`)});let r=Date.now()+""+Math.random();r=r.replace(/\./,"");const s=o.concat(l).concat(n).concat(k),t=[`
        var scriptCounter${r} = ${s.length}
        var requireScript${r} = document.createElement('script')
        requireScript${r}.text = \`${m.join("\n")}\`
        var requireScriptAppended${r} = false
        var scriptLoaded = function(event) {
          if (this.__loaded) {
            return
          }
          this.__loaded = true
          scriptCounter${r} --
          if (!requireScriptAppended${r} && scriptCounter${r} <= 0) {
            requireScriptAppended${r} = true
            document.head.appendChild(requireScript${r})
            let __alert = window.alert || window.__global && window.__global.alert
            __alert('SUBPACKAGE_READY_${b}')
          }
        }
      `];for(let a=0,b=s.length;a<b;a++)t.push(`var script${r}${a} = document.createElement('script')
        script${r}${a}.src = '${s[a]}'
        script${r}${a}.onload = scriptLoaded.bind(script${r}${a})
        script${r}${a}.onreadystatechange = function() {
          if (this.readyState == 'complete') {
            scriptLoaded.call(this)
          }
        }
        document.head.appendChild(script${r}${a})`);f=t.join("\n"),compileCache.set(d,e,f)}}return f}module.exports=getSubPackage;
;}(require("lazyload"), require);
