'use strict';!function(require,directRequire){const a=require('./1dea83a77e99a7c94f6b6f01f5c175b0.js'),b=require('./d3976cc01aeebc5b09e11c4135b6bd8d.js'),c=require('./26407b6d0ea17270c5f9d72eabdaab4e.js'),d=require('./common/locales/index.js');module.exports=async(e,f)=>{const g=await a(e),h=[],i=b.checkIsInSubPackage(g,f);if(i&&i.plugins)for(const a in i.plugins){const{provider:b,version:d}=i.plugins[a],f=await c(e,{pluginId:b,version:d});h.push(f.replace(/\\/g,'\\\\').replace(/`/g,'\\`'))}const j=/__plugin__\/([^\/]*)\/(.*)/,k=j.exec(f),l=k[1]||'';f=k[2];const m={window:g.global&&g.global.window||{}},n=f.replace(/\"/g,'\\"').replace(/`/g,'\\`'),o=`
    var generateFunc = $gwx_${l} && $gwx_${l}("./${n}.wxml")
    if (generateFunc) {
      document.dispatchEvent(new CustomEvent("generateFuncReady", {
        detail: {
          generateFunc: generateFunc
        }
     }))
    } else {
      document.body.innerText = "${d.config.CANNOT_BE_FOUND.format(n+'.wxml')}"
      console.error("${d.config.CANNOT_BE_FOUND.format(n+'.wxml')}")
    }
  `,p=`plugin-private://${l}/${f}`,q=`
      __wxConfig=${JSON.stringify(m)};
      __wxConfig={
        window: {
          ...__wxConfig.window,
          ...__wxAppCode__['${p}.json']
        }
      }
      ${m.window.enablePullDownRefresh?'window.enablePullDownRefresh();':''};
      __wxAppCode__['${p}.wxss'] && __wxAppCode__['${p}.wxss']();
      ${h.join('\n;')}
      ${o};

      if (__wxConfig.window.disableScroll) {
        var style = document.createElement('style')
        style.innerText = 'body{overflow-y:hidden;}'
        document.head.appendChild(style)
      }
    `;return q}}(require('lazyload'),require);