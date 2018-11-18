;!function(require, directRequire){;"use strict";Object.defineProperty(exports,"__esModule",{value:!0});const path=require("path"),getOnlineCodePack=require('./8a145c66a3f53e0aff94a871ac692d06.js'),getSubPackage=async(a,b)=>{const c=await getOnlineCodePack(a);let d={};try{d=JSON.parse(c["/app-config.json"])}catch(a){d={}}let e=d.global&&d.global.window||{};if(d&&d.page&&d.page[`${b}.html`]){const a=d.page[`${b}.html`];e=Object.assign({},e,a.window)}const f={window:e};let g="",h="";d.subPackages&&(d.subPackages.forEach((a)=>{0===b.indexOf(a.root)&&(g=a.root)}),g&&(h=(c["/"+path.posix.join(g,"page-frame.js")]||"").toString(),h=h.replace(/\\/g,"\\\\").replace(/`/g,"\\`")));let i=(c[`/${b}.html`]||"").toString().match(/<script>([\s\S]*)<\/script>/);i=i?i[1].replace(/\\/g,"\\\\"):"";let j=`
      __wxConfig=${JSON.stringify(f)};
      ${f.window.enablePullDownRefresh?"window.enablePullDownRefresh();":""};
      ${h}
      ${i}
    `;return f.window.disableScroll&&(j+=`
      var style = document.createElement('style')
      style.innerText = 'body{overflow-y:hidden;}'
      document.head.appendChild(style)
      `),j};module.exports=getSubPackage;
;}(require("lazyload"), require);
