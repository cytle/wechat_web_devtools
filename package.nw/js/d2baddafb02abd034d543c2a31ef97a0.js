'use strict';var _extends=Object.assign||function(a){for(var b,c=1;c<arguments.length;c++)for(var d in b=arguments[c],b)Object.prototype.hasOwnProperty.call(b,d)&&(a[d]=b[d]);return a};!function(require,directRequire){const a=require('url'),b=require('./1dea83a77e99a7c94f6b6f01f5c175b0.js'),c=require('./3e4c71c2a2cc438e1b3afc3fb10bd4b6.js'),d=require('./709f7f8328edb932b1169de8b7e694dd.js'),e=require('./0a856a8f0b27fbeca81fbaabad89dd1e.js'),f=require('./ef8cdc2a3b4b27b6f8bef14c2ab3dfd9.js'),g=require('./d3976cc01aeebc5b09e11c4135b6bd8d.js'),h=require('./b6d8659542036f6a35f417e0693e56db.js'),i=require('./common/locales/index.js');module.exports=async(a,j)=>{if(a.isOnline)return await f(a,j);const k=/__plugin__\//.test(j);if(k)return await h.getPluginSubPackage(a,j);const l=await b(a);let m=l.global&&l.global.window||{};if(l&&l.page&&l.page[`${j}.html`]){const a=l.page[`${j}.html`];m=_extends({},m,a.window)}const n={window:m},o=[],p=g.checkIsInSubPackage(l,j);if(p&&p.plugins)for(const b in p.plugins){const{provider:c,version:d}=p.plugins[b],e=await h.getWebviewCode(a,{pluginId:c,version:d});o.push(e.replace(/\\/g,'\\\\').replace(/`/g,'\\`'))}let q='';const r=await c(a,{page:j});r.code&&(q=r.code.replace(/\\/g,'\\\\').replace(/`/g,'\\`'));const s=[],t=await d(a,{page:j});t.comm&&s.push(`${t.comm}`),t.page&&s.push(`${t.page}()`);const u=await e(a,{page:j}),v=j.replace(/\"/g,'\\"').replace(/`/g,'\\`'),w=`
    var generateFunc = ${r.name}("./${v}.wxml")
    if (generateFunc) {
      document.dispatchEvent(new CustomEvent("generateFuncReady", {
        detail: {
          generateFunc: generateFunc
        }
     }))
    } else {
      document.body.innerText = "${i.config.CANNOT_BE_FOUND.format(v+'.wxml')}"
      console.error("${i.config.CANNOT_BE_FOUND.format(v+'.wxml')}")
    }
  `;let x=`
      __wxConfig=${JSON.stringify(n)};
      ${n.window.enablePullDownRefresh?'window.enablePullDownRefresh();':''};
      ${o.join('\n;')}
      ${q};
      ${s.join('\n')};
      ${u.join('\n')}
      ${w};
    `;return n.window.disableScroll&&(x+=`
    var style = document.createElement('style')
    style.innerText = 'body{overflow-y:hidden;}'
    document.head.appendChild(style)
    `),x}}(require('lazyload'),require);