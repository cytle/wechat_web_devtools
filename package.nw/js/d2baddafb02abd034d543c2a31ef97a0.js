'use strict';var _extends=Object.assign||function(a){for(var b,c=1;c<arguments.length;c++)for(var d in b=arguments[c],b)Object.prototype.hasOwnProperty.call(b,d)&&(a[d]=b[d]);return a};!function(require,directRequire){const a=require('url'),b=require('./1dea83a77e99a7c94f6b6f01f5c175b0.js'),c=require('./3e4c71c2a2cc438e1b3afc3fb10bd4b6.js'),d=require('./709f7f8328edb932b1169de8b7e694dd.js'),e=require('./0a856a8f0b27fbeca81fbaabad89dd1e.js'),f=require('./ef8cdc2a3b4b27b6f8bef14c2ab3dfd9.js'),g=require('./d3976cc01aeebc5b09e11c4135b6bd8d.js'),h=require('./b6d8659542036f6a35f417e0693e56db.js');module.exports=async(a,i)=>{if(a.isOnline)return await f(a,i);let j=await b(a),k=j.global&&j.global.window||{};if(j&&j.page&&j.page[`${i}.html`]){let a=j.page[`${i}.html`];k=_extends({},k,a.window)}let l={window:k},m=[],n=g.checkIsInSubPackage(j,i);if(n&&n.plugins)for(var o in n.plugins){const{provider:b,version:c}=n.plugins[o];let d=await h.getWebviewCode(a,{pluginId:b,version:c});m.push(d.replace(/\\/g,'\\\\').replace(/`/g,'\\`'))}let p='',q=await c(a,{page:i});q.code&&(p=q.code.replace(/\\/g,'\\\\').replace(/`/g,'\\`'));let r=[],s=await d(a,{page:i});s.comm&&r.push(`${s.comm}`),s.page&&r.push(`${s.page}()`);let t=await e(a,{page:i}),u=i.replace(/\"/g,'\\"').replace(/`/g,'\\`'),v=`
    var generateFunc = ${q.name}("./${u}.wxml")
    if (generateFunc) {
      document.dispatchEvent(new CustomEvent("generateFuncReady", {
        detail: {
          generateFunc: generateFunc
        }
     }))
    } else {
      document.body.innerText = "未找到 ${u}.wxml 文件"
      console.error("未找到 ${u}.wxml 文件")
    }
  `,w=`
      __wxConfig=${JSON.stringify(l)};
      ${l.window.enablePullDownRefresh?'window.enablePullDownRefresh();':''};
      ${m.join('\n')}
      ${p};
      ${r.join('\n')};
      ${t.join('\n')}
      ${v};
    `;return l.window.disableScroll&&(w+=`
    var style = document.createElement('style')
    style.innerText = 'body{overflow-y:hidden;}'
    document.head.appendChild(style)
    `),w}}(require('lazyload'),require);