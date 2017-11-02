'use strict';var _extends=Object.assign||function(a){for(var b,c=1;c<arguments.length;c++)for(var d in b=arguments[c],b)Object.prototype.hasOwnProperty.call(b,d)&&(a[d]=b[d]);return a};!function(require,directRequire){const a=require('url'),b=require('./1dea83a77e99a7c94f6b6f01f5c175b0.js'),c=require('./3e4c71c2a2cc438e1b3afc3fb10bd4b6.js'),d=require('./709f7f8328edb932b1169de8b7e694dd.js'),e=require('./0a856a8f0b27fbeca81fbaabad89dd1e.js');module.exports=async(a,f)=>{let g=await b(a),h=g.global&&g.global.window||{};if(g&&g.page&&g.page[`${f}.html`]){let a=g.page[`${f}.html`];h=_extends({},h,a.window)}let i={window:h},j='',k=await c(a,{page:f});k.code&&(j=k.code.replace(/\\/g,'\\\\').replace(/`/g,'\\`'));let l=[],m=await d(a,{page:f});m.comm&&l.push(`${m.comm}`),m.page&&l.push(`${m.page}()`);let n=await e(a,{page:f}),o=`
    var generateFunc = ${k.name}('./${f}.wxml')
    if (generateFunc) {
      document.dispatchEvent(new CustomEvent("generateFuncReady", {
        detail: {
          generateFunc: generateFunc
        }
     }))
    } else {
      document.body.innerText = '未找到 ${f}.wxml 文件'
      console.error('未找到 ${f}.wxml 文件')
    }
  `,p=`
      __wxConfig=${JSON.stringify(i)};
      ${i.window.enablePullDownRefresh?'window.enablePullDownRefresh();':''};
      ${j};
      ${l.join('\n')};
      ${n.join('\n')}
      ${o};
    `;return i.window.disableScroll&&(p+=`
      var style = document.createElement('style')
      style.innerText = 'body{overflow-y:hidden;}'
      document.head.appendChild(style)
      `),p}}(require('lazyload'),require);