'use strict';var _extends=Object.assign||function(a){for(var b,c=1;c<arguments.length;c++)for(var d in b=arguments[c],b)Object.prototype.hasOwnProperty.call(b,d)&&(a[d]=b[d]);return a};!function(require,directRequire){const a=require('url'),b=require('./1dea83a77e99a7c94f6b6f01f5c175b0.js'),c=require('./3e4c71c2a2cc438e1b3afc3fb10bd4b6.js'),d=require('./709f7f8328edb932b1169de8b7e694dd.js'),e=require('./0a856a8f0b27fbeca81fbaabad89dd1e.js'),f=require('./ef8cdc2a3b4b27b6f8bef14c2ab3dfd9.js'),g=require('./d3976cc01aeebc5b09e11c4135b6bd8d.js'),h=require('./b6d8659542036f6a35f417e0693e56db.js');module.exports=async(a,i)=>{if(a.isOnline)return await f(a,i);let j=/__plugin__\//.test(i);if(j)return await h.getPluginSubPackage(a,i);let k=await b(a),l=k.global&&k.global.window||{};if(k&&k.page&&k.page[`${i}.html`]){let a=k.page[`${i}.html`];l=_extends({},l,a.window)}let m={window:l},n=[],o=g.checkIsInSubPackage(k,i);if(o&&o.plugins)for(var p in o.plugins){const{provider:b,version:c}=o.plugins[p];let d=await h.getWebviewCode(a,{pluginId:b,version:c});n.push(d.replace(/\\/g,'\\\\').replace(/`/g,'\\`'))}let q='',r=await c(a,{page:i});r.code&&(q=r.code.replace(/\\/g,'\\\\').replace(/`/g,'\\`'));let s=[],t=await d(a,{page:i});t.comm&&s.push(`${t.comm}`),t.page&&s.push(`${t.page}()`);let u=await e(a,{page:i}),v=i.replace(/\"/g,'\\"').replace(/`/g,'\\`'),w=`
    var generateFunc = ${r.name}("./${v}.wxml")
    if (generateFunc) {
      document.dispatchEvent(new CustomEvent("generateFuncReady", {
        detail: {
          generateFunc: generateFunc
        }
     }))
    } else {
      document.body.innerText = "未找到 ${v}.wxml 文件"
      console.error("未找到 ${v}.wxml 文件")
    }
  `,x=`
      __wxConfig=${JSON.stringify(m)};
      ${m.window.enablePullDownRefresh?'window.enablePullDownRefresh();':''};
      ${n.join('\n;')}
      ${q};
      ${s.join('\n')};
      ${u.join('\n')}
      ${w};
    `;return m.window.disableScroll&&(x+=`
    var style = document.createElement('style')
    style.innerText = 'body{overflow-y:hidden;}'
    document.head.appendChild(style)
    `),x}}(require('lazyload'),require);