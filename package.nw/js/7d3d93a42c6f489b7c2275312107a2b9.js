;!function(require, directRequire){;"use strict";Object.defineProperty(exports,"__esModule",{value:!0});const path=require("path"),vendorManager=require('./d28a711224425b00101635efe1034c99.js'),contentWatcher=require('./162bf2ee28b76d3b3d95b685cede4146.js'),checkGameJSON=require('./48679210e49dc5028a8b6642263eba75.js'),compileCache=require('./2e9637e8a0816a626f7db9a0dee5efe8.js'),fileRules=require('./1c8a8c710417d102ab574145dc51b4b0.js'),topTools=require('./84b183688a46c9e2626d3e6f83365e13.js'),{subcontextHtmlTpl,devSubContextList,subvendorList,subVendorPlaceholder}=require('./d9ce5316cc172b6017fdd2399a91117a.js'),isDev=global.appConfig.isDev,subVendors=isDev&&!nw.App.manifest.forceVendor?devSubContextList:subvendorList;function resetCache(){compileCache.remove(compileCache.CACHE_KEYS.JS_SUBCONTEXT_FRAME)}function hidedInDevtoolsMaker(a){const b=path.posix.join("game",a);return`// ${a} has been hided by project.config.json~\n//# sourceURL=http://127.0.0.1:${global.proxyPort}/${b}\n`}const getCodeFrame=(a)=>{const{links:b,ignoreds:c,innerText:d}=a;return`;(function(){
    const links = ${JSON.stringify(b)}
    const ignoreds = ${JSON.stringify(c)}
    let scriptCounter = links.length
    let requireScriptAppended = false

    const scriptLoaded = function() {
      if (this.__loaded) {
        return
      }
      this.__loaded = true
      scriptCounter--
      if (!requireScriptAppended && scriptCounter <= 0) {
        const innerScript = document.createElement('script')
        innerScript.text = \`${topTools.escapeQuot(d,"`")}\`
        document.head.appendChild(innerScript)
        requireScriptAppended = true
      }
    }

    for (const link of links) {
      const script = document.createElement('script')
      const ignoreText = ignoreds[link]
      script.src = link
      script.onload = function() {
        scriptLoaded.apply(this, arguments)
        if (ignoreText) {
          const s = document.createElement('script')
          s.text = ignoreText
          document.head.appendChild(s)
        }
      }
      script.onerror = scriptLoaded.bind(script)
      document.head.appendChild(script)
    }
  })()`};async function getSubContextJS(a,b={}){await compileCache.init(a);const c=compileCache.CACHE_KEYS.JS_SUBCONTEXT_JS;let d=compileCache.get(c);if(d)return d;const e=await contentWatcher(a),f=e.getAllJSFiles(),g=[],h=await checkGameJSON(a),i=h.openDataContext||h.subContext;if(!i)return"";f.forEach((a)=>{i&&0===a.indexOf(i)&&g.push(a)});const j=[],k=[];if(i&&g.length){for(const a of g)k.push(encodeURI(a));const a=encodeURI(`${i}${h.openDataContext?"index.js":"sub.js"}`);j.push(`var decodePathName = decodeURI("${a}")`),j.push(`require(decodePathName)`)}const l=(a.debugOptions||{}).hidedInDevtools||[],m={};for(const c of k)fileRules.isFileHidedInDevtools(c,l)&&(m[c]=hidedInDevtoolsMaker(c));return d=getCodeFrame({links:k,innerText:j.join(";"),ignoreds:m}),compileCache.set(c,d),d}async function getSubContextFrame(a,b={}){await compileCache.init(a);const c=compileCache.CACHE_KEYS.JS_SUBCONTEXT_FRAME;let d=compileCache.get(c);if(!d||b.force){let b=subcontextHtmlTpl;const e=await checkGameJSON(a),f=e.openDataContext||e.subContext;f&&(b=b.replace(subVendorPlaceholder,()=>{const a=[];for(let b=0,c=subVendors.length;b<c;b++){const c=subVendors[b],d=path.extname(c);".js"===d?a.push(`<script src="__subdev__/${c}" charset="UTF-8"></script>`):".css"===d&&a.push(`<link rel="stylesheet" type="text/css" href="__subdev__/${c}" />`)}return a.join("\n")})),d=b,compileCache.set(c,d)}return d}vendorManager.on("VENDOR_CONFIG_CHANGE",resetCache),vendorManager.on("VENDOR_VERSION_CHANGE",resetCache),module.exports={getSubContextJS,getSubContextFrame};
;}(require("lazyload"), require);
