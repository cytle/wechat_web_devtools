'use strict';var _extends=Object.assign||function(a){for(var b,c=1;c<arguments.length;c++)for(var d in b=arguments[c],b)Object.prototype.hasOwnProperty.call(b,d)&&(a[d]=b[d]);return a};!function(require,directRequire){const a=require('url'),b=require('./1dea83a77e99a7c94f6b6f01f5c175b0.js'),c=require('./3e4c71c2a2cc438e1b3afc3fb10bd4b6.js'),d=require('./709f7f8328edb932b1169de8b7e694dd.js'),e=require('./0a856a8f0b27fbeca81fbaabad89dd1e.js'),f=require('./d3976cc01aeebc5b09e11c4135b6bd8d.js'),g=require('./b6d8659542036f6a35f417e0693e56db.js');module.exports=async(a,h)=>{let i=await b(a),j=i.global&&i.global.window||{};if(i&&i.page&&i.page[`${h}.html`]){let a=i.page[`${h}.html`];j=_extends({},j,a.window)}let k={window:j},l=[],m=f.checkIsInSubPackage(i,h);if(m&&m.plugins)for(var n in m.plugins){const{provider:b,version:c}=m.plugins[n];let d=await g.getWebviewCode(a,{pluginId:b,version:c});l.push(d.replace(/\\/g,'\\\\').replace(/`/g,'\\`'))}let o='',p=await c(a,{page:h});p.code&&(o=p.code.replace(/\\/g,'\\\\').replace(/`/g,'\\`'));let q=[],r=await d(a,{page:h});r.comm&&q.push(`${r.comm}`),r.page&&q.push(`${r.page}()`);let s=await e(a,{page:h}),t=`
    var generateFunc = ${p.name}('./${h}.wxml')
    if (generateFunc) {
      document.dispatchEvent(new CustomEvent("generateFuncReady", {
        detail: {
          generateFunc: generateFunc
        }
     }))
    } else {
      document.body.innerText = '未找到 ${h}.wxml 文件'
      console.error('未找到 ${h}.wxml 文件')
    }
  `,u=`
      __wxConfig=${JSON.stringify(k)};
      ${k.window.enablePullDownRefresh?'window.enablePullDownRefresh();':''};
      ${l.join('\n')}
      ${o};
      ${q.join('\n')};
      ${s.join('\n')}
      ${t};
    `;return k.window.disableScroll&&(u+=`
    var style = document.createElement('style')
    style.innerText = 'body{overflow-y:hidden;}'
    document.head.appendChild(style)
    `),u}}(require('lazyload'),require);