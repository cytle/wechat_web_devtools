;!function(require, directRequire){;'use strict';const path=require('path'),getOnlineMainPackage=require('./8949abbd6215fb487be93ea3b1bf7433.js'),contentWatcher=require('./162bf2ee28b76d3b3d95b685cede4146.js'),checkAppConfig=require('./1dea83a77e99a7c94f6b6f01f5c175b0.js'),checkCustomComponent=require('./6b5520e429c60abf5d2f924c0fa05fd0.js'),getWxAppCode=require('./334bc661e13bd1837a230f0835d0a1ee.js'),C=require('./56c390e04c10e91a4aa2a2c19d9a885d.js'),fileRules=require('./1c8a8c710417d102ab574145dc51b4b0.js');module.exports=async function(a){if(a.isOnline)return await getOnlineMainPackage(a);let b=await contentWatcher(a),c=b.getAllJSFiles(),d=await checkAppConfig(a),e={},f=[],g=[],h=[],i=[],j=[],k=[];if(d.mainPlugins)for(var l in d.mainPlugins){const{provider:a,version:b}=d.mainPlugins[l];'dev'==b?g.push(`__devplugin__/${a}/${b}/appservice.js`):g.push(`__onlineplugin__/${a}/${b}/appservice.js`)}const m=await getWxAppCode(a);k.push(m);let n=await checkCustomComponent.getFileList(a,d);n.forEach((a)=>{if(!e[a]){e[a]=!0;let b=a.replace(/\"/g,'\\"');i.push(`${encodeURI(a)}.js`),k.push(`
      __wxRoute = "${b}"
      __wxRouteBegin = true
      __wxAppCurrentFile__ = "${b}.js"
      require("${b}.js")
    `)}});let o=d.pages;o.forEach((a)=>{if(!e[a]){e[a]=!0;let b=a.replace(/\"/g,'\\"');h.push(`${encodeURI(a)}.js`),k.push(`
      __wxRoute = "${b}"
      __wxRouteBegin = true
      __wxAppCurrentFile__ = "${b}.js"
      require("${b}.js")
      if(__wxRouteBegin) {
        console.group("${new Date} page 编译错误")
        console.error("${b}.js 出现脚本错误或者未正确调用 Page()")
        console.groupEnd()
      }
    `)}}),c.forEach((a)=>{let b=a.replace(/\.js$/,'');if(!e[b])if('app.js'==a)f.push(`${encodeURI(a)}`),k.unshift(`require("app.js")`);else{if(d.subPackages){let b=!1;if(d.subPackages.forEach((c)=>{0==a.indexOf(c.root)&&(b=!0)}),b)return}j.push(`${encodeURI(a)}`)}});var p=g.concat(j).concat(i).concat(h).concat(f),q=[`
    var scriptCounter = ${p.length}
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
  `];for(let b=0,c=p.length;b<c;b++)q.push(`var script${b} = document.createElement('script')
    script${b}.src = '${p[b]}'
    script${b}.onload = scriptLoaded.bind(script${b})
    script${b}.onerror = function() {
      scriptLoaded.call(this)
    }
    document.head.appendChild(script${b})`);return q.join('\n')};
;}(require("lazyload"), require);
