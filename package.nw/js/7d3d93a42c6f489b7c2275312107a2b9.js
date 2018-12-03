;!function(require, directRequire){;"use strict";Object.defineProperty(exports,"__esModule",{value:!0});const path=require("path"),vendorManager=require('./d28a711224425b00101635efe1034c99.js'),contentWatcher=require('./162bf2ee28b76d3b3d95b685cede4146.js'),checkGameJSON=require('./48679210e49dc5028a8b6642263eba75.js'),compileCache=require('./2e9637e8a0816a626f7db9a0dee5efe8.js'),fileRules=require('./1c8a8c710417d102ab574145dc51b4b0.js'),{subcontextHtmlTpl,subAsDebug,devSubContextList,subvendorList,subVendorPlaceholder,subAppservicejslistPlaceholder}=require('./d9ce5316cc172b6017fdd2399a91117a.js'),isDev=global.appConfig.isDev,subVendors=isDev&&!nw.App.manifest.forceVendor?devSubContextList:subvendorList;function resetCache(){compileCache.remove(compileCache.CACHE_KEYS.JS_SUBCONTEXT_FRAME)}function hidedInDevtoolsMaker(a){const b=path.posix.join("appservice",a);return`// ${a} has been hided by project.config.json~\n//# sourceURL=http://127.0.0.1:${global.proxyPort}/${b}\n`}async function getSubContextJS(a,b={}){await compileCache.init(a);const c=compileCache.CACHE_KEYS.JS_SUBCONTEXT_JS;let d=compileCache.get(c);if(d)return d;const e=await contentWatcher(a),f=e.getAllJSFiles(),g=[],h=await checkGameJSON(a),i=h.openDataContext||h.subContext;if(!i)return"";f.forEach((a)=>{i&&0===a.indexOf(i)&&g.push(a)});const j=[],k=[];if(i&&g.length){for(const a of g)k.push(encodeURI(a));const a=encodeURI(`${i}${h.openDataContext?"index.js":"sub.js"}`);j.push(`var decodePathName = decodeURI("${a}")`),j.push(`require(decodePathName)`)}const l=(a.debugOptions||{}).hidedInDevtools||[],m=[];for(let c=0;c<k.length;c++){const a=k[c];fileRules.isFileHidedInDevtools(a,l)&&(m[c]=hidedInDevtoolsMaker(a))}const n=[`
    var scriptCounter = ${k.length}
    var requireScript = document.createElement('script')
    requireScript.text = \`${j.join("\n")}\`
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
      }
    }
  `];for(let c=0,d=k.length;c<d;c++){const a=m[c]?encodeURIComponent(m[c]):null;n.push(`var script${c} = document.createElement('script')
    script${c}.src = '${k[c]}'
    script${c}.onload = `+(a?`function() {
      scriptLoaded.apply(script${c}, arguments)
      var s = document.createElement('script')
      s.text = decodeURIComponent("${a}")
      document.head.appendChild(s)
    }`:`scriptLoaded.bind(script${c})`)+`
    script${c}.onerror = function() {
      scriptLoaded.call(this)
    }
    document.head.appendChild(script${c})`)}return d=n.join("\n"),d}async function getSubContextFrame(a,b={}){await compileCache.init(a);const c=compileCache.CACHE_KEYS.JS_SUBCONTEXT_FRAME;let d=compileCache.get(c);if(!d||b.force){let b=subcontextHtmlTpl;const e=await checkGameJSON(a),f=e.openDataContext||e.subContext;f&&(b=b.replace(subVendorPlaceholder,()=>{const a=[];for(let b=0,c=subVendors.length;b<c;b++){const c=subVendors[b],d=path.extname(c);".js"===d?a.push(`<script src="__subdev__/${c}" charset="UTF-8"></script>`):".css"===d&&a.push(`<link rel="stylesheet" type="text/css" href="__subdev__/${c}" />`)}return a.join("\n")})),d=b,compileCache.set(c,d)}return d}vendorManager.on("VENDOR_CONFIG_CHANGE",resetCache),vendorManager.on("VENDOR_VERSION_CHANGE",resetCache),module.exports={getSubContextJS,getSubContextFrame};
;}(require("lazyload"), require);
