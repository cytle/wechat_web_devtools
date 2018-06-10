'use strict';!function(require,directRequire){const a=require('./1dea83a77e99a7c94f6b6f01f5c175b0.js'),b=require('./d3976cc01aeebc5b09e11c4135b6bd8d.js'),c=require('./26407b6d0ea17270c5f9d72eabdaab4e.js');module.exports=async(d,e)=>{const f=await a(d);let g=[],h=b.checkIsInSubPackage(f,e);if(h&&h.plugins)for(let a in h.plugins){const{provider:b,version:e}=h.plugins[a];let f=await c(d,{pluginId:b,version:e});g.push(f.replace(/\\/g,'\\\\').replace(/`/g,'\\`'))}let i=/__plugin__\/([^\/]*)\/(.*)/,j=i.exec(e),k=j[1]||'';e=j[2];let l={window:f.global&&f.global.window||{}},m=e.replace(/\"/g,'\\"').replace(/`/g,'\\`'),n=`
    var generateFunc = $gwx_${k} && $gwx_${k}("./${m}.wxml")
    if (generateFunc) {
      document.dispatchEvent(new CustomEvent("generateFuncReady", {
        detail: {
          generateFunc: generateFunc
        }
     }))
    } else {
      document.body.innerText = "未找到 ${m}.wxml 文件"
      console.error("未找到 ${m}.wxml 文件")
    }
  `,o=`plugin-private://${k}/${e}`,p=`
      __wxConfig=${JSON.stringify(l)};
      __wxConfig={
        window: {
          ...__wxConfig.window,
          ...__wxAppCode__['${o}.json']
        }
      }
      ${l.window.enablePullDownRefresh?'window.enablePullDownRefresh();':''};
      __wxAppCode__['${o}.wxss'] && __wxAppCode__['${o}.wxss']();
      ${g.join('\n;')}
      ${n};

      if (__wxConfig.window.disableScroll) {
        var style = document.createElement('style')
        style.innerText = 'body{overflow-y:hidden;}'
        document.head.appendChild(style)
      }
    `;return p}}(require('lazyload'),require);