;!function(require, directRequire){;'use strict';const path=require('path'),getOnlineMainPackage=require('./8949abbd6215fb487be93ea3b1bf7433.js'),contentWatcher=require('./162bf2ee28b76d3b3d95b685cede4146.js'),checkAppConfig=require('./1dea83a77e99a7c94f6b6f01f5c175b0.js'),checkCustomComponent=require('./6b5520e429c60abf5d2f924c0fa05fd0.js'),getWxAppCode=require('./334bc661e13bd1837a230f0835d0a1ee.js'),C=require('./56c390e04c10e91a4aa2a2c19d9a885d.js'),fileRules=require('./1c8a8c710417d102ab574145dc51b4b0.js');function hidedInDevtoolsMaker(a){const b=path.posix.join('appservice',a);return`// ${a} has been hided by project.config.json~\n//# sourceURL=http://127.0.0.1:${global.proxyPort}/${b}\n`}module.exports=async function(a){if(a.isOnline)return await getOnlineMainPackage(a);const b=await contentWatcher(a),c=b.getAllJSFiles(),d=await checkAppConfig(a),e={},f=[],g=[],h=[],i=[],j=[],k=[];if(d.mainPlugins)for(const a in d.mainPlugins){const{provider:b,version:c}=d.mainPlugins[a];'dev'===c?g.push(encodeURI(`__devplugin__/${b}/${c}/appservice.js`)):g.push(encodeURI(`__onlineplugin__/${b}/${c}/appservice.js`))}const l=await getWxAppCode(a);k.push(l);const m=await checkCustomComponent.getFileList(a,d);m.forEach((a)=>{if(!e[a]){e[a]=!0;const b=encodeURI(a);i.push(`${b}.js`),k.push(`
      var decodePathName = decodeURI("${b}")
      __wxRoute = decodePathName
      __wxRouteBegin = true
      __wxAppCurrentFile__ = decodePathName + ".js"
      require(decodePathName + ".js")
    `)}});const n=d.pages;n.forEach((a)=>{if(!e[a]){e[a]=!0;const b=encodeURI(a);h.push(`${b}.js`),k.push(`
      var decodePathName = decodeURI("${b}")
      __wxRoute = decodePathName
      __wxRouteBegin = true
      __wxAppCurrentFile__ = decodePathName + ".js"
      require(__wxAppCurrentFile__)
      if(__wxRouteBegin) {
        console.group("${new Date} page 编译错误")
        console.error(decodePathName + ".js 出现脚本错误或者未正确调用 Page()")
        console.groupEnd()
      }
    `)}}),c.forEach((a)=>{const b=a.replace(/\.js$/,'');if(!e[b])if('app.js'===a)f.push('app.js'),k.unshift(`require("app.js")`);else{if(d.subPackages){let b=!1;if(d.subPackages.forEach((c)=>{0===a.indexOf(c.root)&&(b=!0)}),b)return}j.push(`${encodeURI(a)}`)}});const o=g.concat(j).concat(i).concat(h).concat(f),p=(a.debugOptions||{}).hidedInDevtools||[],q=[];for(let b=0;b<o.length;b++){const a=o[b];fileRules.isFileHidedInDevtools(a,p)&&(q[b]=hidedInDevtoolsMaker(a))}const r=[`
    var scriptCounter = ${o.length}
    var requireScript = document.createElement('script')
    requireScript.text = \`${k.join('\n')}\`
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
        let __alert = window.alert || window.__global && window.__global.alert
        __alert('SUBPACKAGE_READY_${C.MINI_PROGRAM_MAIN_PACKAGE_ROOT}')
      }
    }
  `];for(let b=0,c=o.length;b<c;b++){const a=q[b]?encodeURIComponent(q[b]):null;r.push(`var script${b} = document.createElement('script')
    script${b}.src = '${o[b]}'
    script${b}.onload = `+(a?`function() {
      scriptLoaded.apply(script${b}, arguments)
      var s = document.createElement('script')
      s.text = decodeURIComponent("${a}")
      document.head.appendChild(s)
    }`:`scriptLoaded.bind(script${b})`)+`
    script${b}.onerror = function() {
      scriptLoaded.call(this)
    }
    document.head.appendChild(script${b})`)}return r.join('\n')};
;}(require("lazyload"), require);
