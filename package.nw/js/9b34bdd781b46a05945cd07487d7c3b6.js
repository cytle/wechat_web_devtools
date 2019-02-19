;!function(require, directRequire){;'use strict';const checkAppConfig=require('./1dea83a77e99a7c94f6b6f01f5c175b0.js'),tools=require('./d3976cc01aeebc5b09e11c4135b6bd8d.js'),getWebviewCode=require('./26407b6d0ea17270c5f9d72eabdaab4e.js'),locales=require('./common/locales/index.js'),topTools=require('./84b183688a46c9e2626d3e6f83365e13.js'),getSubPackage=async(a,b)=>{const c=/__plugin__\/([^\/]*)\/(.*)/,d=c.exec(b);if(!d)return'';const e=await checkAppConfig(a),f=[],g=tools.checkIsInSubPackage(e,b),h=d[1]||'';if(b=d[2],g&&g.plugins)for(const b in g.plugins){const{provider:c,version:d}=g.plugins[b],e=await getWebviewCode(a,{pluginId:c,version:d});f.push(e)}const i={window:e.global&&e.global.window||{}},j=topTools.escapeQuot(b,'"'),k=`
    var generateFunc = $gwx_${h} && $gwx_${h}("./${j}.wxml")
    if (generateFunc) {
      document.dispatchEvent(new CustomEvent("generateFuncReady", {
        detail: {
          generateFunc: generateFunc
        }
     }))
    } else {
      document.body.innerText = "${locales.config.CANNOT_BE_FOUND.format(j+'.wxml')}"
      console.error("${locales.config.CANNOT_BE_FOUND.format(j+'.wxml')}")
    }
  `,l=`plugin-private://${h}/${b}`,m=topTools.escapeQuot(l,'\''),n=`
      __wxConfig=${JSON.stringify(i)};
      __wxConfig={
        window: {
          ...__wxConfig.window,
          ...__wxAppCode__['${m}.json']
        }
      }
      ${i.window.enablePullDownRefresh?'window.enablePullDownRefresh();':''};
      ${f.join(';\n')}
      __wxAppCode__['${m}.wxss'] && __wxAppCode__['${m}.wxss']();
      ${k};

      if (__wxConfig.window.disableScroll) {
        var style = document.createElement('style')
        style.innerText = 'body{overflow-y:hidden;}'
        document.head.appendChild(style)
      }
    `;return n};module.exports=getSubPackage;
;}(require("lazyload"), require);
