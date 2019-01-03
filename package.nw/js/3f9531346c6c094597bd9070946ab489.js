;!function(require, directRequire){;"use strict";Object.defineProperty(exports,"__esModule",{value:!0});const path=require("path"),contentWatcher=require('./162bf2ee28b76d3b3d95b685cede4146.js'),checkGameAppConfig=require('./1bd2563d13db26950ae47494b2c34454.js'),getFile=require('./3a0e2a5a82dc34230808dd17fc084d06.js'),compileCache=require('./2e9637e8a0816a626f7db9a0dee5efe8.js'),tools=require('./d3976cc01aeebc5b09e11c4135b6bd8d.js'),weappConfig=require('./6242f55dbdfe53c2f07b7a51568311f2.js'),fileRules=require('./1c8a8c710417d102ab574145dc51b4b0.js'),topTools=require('./84b183688a46c9e2626d3e6f83365e13.js');function hidedInDevtoolsMaker(a){const b=path.posix.join("game",a);return`// ${a} has been hided by project.config.json~\n//# sourceURL=http://127.0.0.1:${global.proxyPort}/${b}\n`}const getCodeFrame=(a)=>{const{links:b,ignoreds:c,innerText:d,totalSize:e,rootPath:f}=a,g=topTools.escapeQuot(f,"'");return`;(function(){
    const links = ${JSON.stringify(b)}
    const ignoreds = ${JSON.stringify(c)}
    const total = links.length
    let scriptCounter = links.length
    let requireScriptAppended = false

    const scriptLoaded = function() {
      if (this.__loaded) {
        return
      }
      this.__loaded = true
      scriptCounter--

      // 进度。。。。
      var progress = (total - scriptCounter) / total
      alert('SUBPACKAGE_PROGRESS_' + progress + '_${e}_${g}')

      if (!requireScriptAppended && scriptCounter <= 0) {
        const innerScript = document.createElement('script')
        innerScript.text = \`${topTools.escapeQuot(d,"`")}\`
        document.head.appendChild(innerScript)
        requireScriptAppended = true
        alert('SUBPACKAGE_READY_${g}')
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
  })()`};async function getSubPackage(a,b){const c=b.replace(/^\//,""),d=/\.js$/.test(c);await compileCache.init(a);const e=await contentWatcher(a),f=compileCache.CACHE_KEYS.JS_SUBPACKAGE_GAME,g=path.posix.join(e.srcPath,b);let h=compileCache.get(f,g);if(h)return h;const j=e.getAllJSFiles(),i=await checkGameAppConfig(a),k=[],l=tools.calculatePathSize(path.join(e.srcPath,c),weappConfig.gameWhiteFileExtName);for(let e=0,f=j.length;e<f;e++){const a=j[e];(d&&a===c||0===a.indexOf(c))&&k.push(`${a}`)}const m=[];let n="";n=d?c:`${c}game.js`,n=encodeURI(n),m.push(`var decodePathName = decodeURI("${n}")`),m.push(`require(decodePathName)`);const o=(a.debugOptions||{}).hidedInDevtools||[],p={};for(const c of k)fileRules.isFileHidedInDevtools(c,o)&&(p[c]=hidedInDevtoolsMaker(c));let q=Date.now()+""+Math.random();return q=q.replace(/\./,""),h=getCodeFrame({links:k,innerText:m.join(";"),ignoreds:p,totalSize:l,rootPath:b}),compileCache.set(f,g,h),h}module.exports=getSubPackage;
;}(require("lazyload"), require);
