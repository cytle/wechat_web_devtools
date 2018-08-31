'use strict';var _extends=Object.assign||function(a){for(var b,c=1;c<arguments.length;c++)for(var d in b=arguments[c],b)Object.prototype.hasOwnProperty.call(b,d)&&(a[d]=b[d]);return a};!function(require,directRequire){const a=require('url'),b=require('path'),c=require('./1dea83a77e99a7c94f6b6f01f5c175b0.js'),d=require('./8a145c66a3f53e0aff94a871ac692d06.js');module.exports=async(a,e)=>{const f=await d(a),g=await c(a);let h=g.global&&g.global.window||{};if(g&&g.page&&g.page[`${e}.html`]){const a=g.page[`${e}.html`];h=_extends({},h,a.window)}const i={window:h};let j='',k='';g.subPackages&&(g.subPackages.forEach((a)=>{0==e.indexOf(a.root)&&(j=a.root)}),j&&(k=(f['/'+b.posix.join(j,'page-frame.js')]||'').toString(),k=k.replace(/\\/g,'\\\\').replace(/`/g,'\\`')));let l=(f[`/${e}.html`]||'').toString().match(/<script>([\s\S]*)<\/script>/);l=l?l[1].replace(/\\/g,'\\\\'):'';let m=`
      __wxConfig=${JSON.stringify(i)};
      ${i.window.enablePullDownRefresh?'window.enablePullDownRefresh();':''};
      ${k}
      ${l}
    `;return i.window.disableScroll&&(m+=`
      var style = document.createElement('style')
      style.innerText = 'body{overflow-y:hidden;}'
      document.head.appendChild(style)
      `),m}}(require('lazyload'),require);