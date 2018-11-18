;!function(require, directRequire){;'use strict';const path=require('path'),compileCache=require('./2e9637e8a0816a626f7db9a0dee5efe8.js'),contentWatcher=require('./162bf2ee28b76d3b3d95b685cede4146.js'),checkGameAppConfig=require('./1bd2563d13db26950ae47494b2c34454.js'),tools=require('./d3976cc01aeebc5b09e11c4135b6bd8d.js'),locales=require('./common/locales/index.js'),fileRules=require('./1c8a8c710417d102ab574145dc51b4b0.js');function hidedInDevtoolsMaker(a){const b=path.posix.join('game',a);return`// ${a} has been hided by project.config.json\n//# sourceURL=http://127.0.0.1:${global.proxyPort}/${b}\n`}function ignoreByProjectConfigMaker(a){return`console.warn(\`${a}\`)`}const getMainPackage=async(a)=>{await compileCache.init(a);const b=compileCache.CACHE_KEYS.JS_APPSERVICE_GAME_MAIN;let c=compileCache.get(b);if(c)return c;const d=await contentWatcher(a),e=await checkGameAppConfig(a),f=e.openDataContext||e.subContext,g=e.workers,h=d.getAllJSFiles(),i=[],j=[],k=[];let l=!1;if(h.forEach((b)=>{if(f&&0===b.indexOf(f));else if(g&&0===b.indexOf(g))j.push(b);else{if(e.subPackages&&2001000<=tools.getLibVersionNumber(a.libVersion)){const a=tools.checkInGameSubPackage(e,b);if(a)return}'game.js'===b?l=!0:i.push(`${encodeURI(b)}`)}}),!l)return`console.group("${new Date} ${locales.config.COMPILE_ERROR_PREFIX.format('game')}")
console.error(\` ${locales.config.NOT_FOUND.format('game.js')} \`)
console.groupEnd()`;k.push('require("game.js")'),k.push(`setTimeout(() => {
    window.__global.alert('NEED_ENTER_FOREGROUND')
  })`);const m=j.concat(i).concat(['game.js']),n=(a.debugOptions||{}).hidedInDevtools||[],o=[];for(let b=0;b<m.length;b++){const a=m[b];fileRules.isFileHidedInDevtools(a,n)&&(o[b]=hidedInDevtoolsMaker(a))}const p=[`
    var scriptCounter = ${m.length}
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
        __alert('MAIN_PACKAGE_LOADED')
      }
    }
  `];for(let b=0,c=m.length;b<c;b++){const a=o[b]?encodeURIComponent(o[b]):null;p.push(`var script${b} = document.createElement('script')
    script${b}.src = '${m[b]}'
    script${b}.onload = `+(a?`function() {
      scriptLoaded.apply(script${b}, arguments)
      var s = document.createElement('script')
      s.text = decodeURIComponent("${a}")
      document.head.appendChild(s)
    }`:`scriptLoaded.bind(script${b})`)+`
    script${b}.onerror = function() {
      scriptLoaded.call(this)
    }
    document.head.appendChild(script${b})`)}return c=p.join('\n'),compileCache.set(b,c),c};module.exports=getMainPackage;
;}(require("lazyload"), require);
