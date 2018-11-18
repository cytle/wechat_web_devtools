;!function(require, directRequire){;"use strict";Object.defineProperty(exports,"__esModule",{value:!0});const checkAppConfig=require('./1dea83a77e99a7c94f6b6f01f5c175b0.js'),transWXMLToJS=require('./3e4c71c2a2cc438e1b3afc3fb10bd4b6.js'),transWXSSToJS=require('./709f7f8328edb932b1169de8b7e694dd.js'),getWxAppCode=require('./0a856a8f0b27fbeca81fbaabad89dd1e.js'),getOnlineSubPackage=require('./ef8cdc2a3b4b27b6f8bef14c2ab3dfd9.js'),tools=require('./d3976cc01aeebc5b09e11c4135b6bd8d.js'),plugin=require('./b6d8659542036f6a35f417e0693e56db.js'),locales=require('./common/locales/index.js'),getSubPackage=async(a,b)=>{if(a.isOnline)return getOnlineSubPackage(a,b);const c=/__plugin__\//.test(b);if(c)return plugin.getPluginSubPackage(a,b);const d=await checkAppConfig(a);let e=d.global&&d.global.window||{};if(d&&d.page&&d.page[`${b}.html`]){const a=d.page[`${b}.html`];e=Object.assign({},e,a.window)}const f={window:e},g=[],h=tools.checkIsInSubPackage(d,b);if(h&&h.plugins)for(const b in h.plugins){const{provider:c,version:d}=h.plugins[b],e=await plugin.getWebviewCode(a,{pluginId:c,version:d});g.push(e)}let i="";const j=await transWXMLToJS(a,{page:b});j.code&&(i=j.code);const k=[],l=await transWXSSToJS(a,{page:b});l.comm&&k.push(`${l.comm}`),l.page&&k.push(`${l.page}()`);const m=await getWxAppCode(a,{page:b}),n=encodeURI(`./${b}.wxml`),o=`
    var decodeName = decodeURI("${n}")
    var generateFunc = ${j.name}(decodeName)
    if (generateFunc) {
      document.dispatchEvent(new CustomEvent("generateFuncReady", {
        detail: {
          generateFunc: generateFunc
        }
     }))
    } else {
      document.body.innerText = decodeName + " not found"
      console.error(decodeName + " not found")
    }
  `;let p=`
      __wxConfig=${JSON.stringify(f)};
      ${f.window.enablePullDownRefresh?"window.enablePullDownRefresh();":""};
      ${g.join("\n;")}
      ${i};
      eval('${k.join(";")}');
      ${m}
      ${o};
    `;return f.window.disableScroll&&(p+=`
    var style = document.createElement('style')
    style.innerText = 'body{overflow-y:hidden;}'
    document.head.appendChild(style)
    `),p.replace(/\\/g,"\\\\").replace(/`/g,"\\`")};module.exports=getSubPackage;
;}(require("lazyload"), require);
