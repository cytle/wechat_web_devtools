'use strict';var _extends=Object.assign||function(a){for(var b,c=1;c<arguments.length;c++)for(var d in b=arguments[c],b)Object.prototype.hasOwnProperty.call(b,d)&&(a[d]=b[d]);return a};!function(require,directRequire){const a=require('redux'),b=require('./d559680a1a0c2551cbce1a9fb152cb99.js'),c=require('./ba23d8b47b1f4ea08b9fd49939b9443f.js'),d=require('./f95c72a853f9f39f52b19b1f02806d98.js'),e=require('./a1dd553cc059d528bb0ef56afed53968.js'),f=require('./c4190a2430506f3602ca550e1e75d620.js'),g=require('./d3976cc01aeebc5b09e11c4135b6bd8d.js'),h=require('./5b7e808cbfe14a62c21959fb1771749d.js'),{connect:i}=require('react-redux');module.exports=i((a)=>{let b,c=a.simulator.currentWebviewID,d=a.simulator.webviewInfos[c],e=d&&d.navigationBar||{},f=a.toolbar.deviceInfo,g=d&&d.htmlwebviewInfo||{},i=a.simulator.anyHtmlWebviewInfo||{},j=(a.project.current||{}).libVersion,k=a.simulator.appConfig||{},l=j&&170<=parseInt(j.replace(/\./g,'')),m=((k.global||{}).window||{}).navigationStyle||'default',n=((k.global||{}).window||{}).enableFullScreen||!1,o='rgba(255,255,255,1)';try{b=h.fromHex(e.backgroundColor||'#ffffff'),b.a=null==e.alpha||e.alpha==void 0?1:e.alpha,n||'custom'===m||(b.a=1),o=b.toRGBA()}catch(a){o='rgba(255,255,255,1)'}return _extends({frontColor:'#ffffff'},e,{useCapsuleNavigationBar:l,customNavigationBar:l&&'custom'===m,backgroundColor:o,showLeftBtn:i.url||e.showLeftBtn,title:i.documentTitle||g.documentTitle||e.title,height:f.navigationbarHeight,webviewID:c,baseURL:`http://127.0.0.1:${global.proxyPort}/__pageframe__/`})},(a)=>{return{onLeftBtnClick:g.bindActionCreators(()=>{return(a,b)=>{const c=b(),e=c.simulator.currentWebviewID,g=c.simulator.webviewInfos[e],h=g.htmlwebviewInfo;return h&&h.cangoback&&!h.forceRedirect?void a(f.setActions('back')):void d.navigateBack(a,{api:'navigateBack',args:{delta:1},callbackID:-1})}},a),onRightBtnClick:()=>{a(c.setRightBtnActionSheet({show:!0})),e.triggerOnEvent({eventName:'onTapNavigationBarRightButton',data:{}})},onRightExitBtnClick:()=>{a(c.toggleBackground())},onHomeClick:()=>{a(c.reLaunchToIndexPage())},onCustomRightClick(){e.triggerOnEvent({eventName:'onTapNavigationBarRightButton',data:{}})}}})(b)}(require('lazyload'),require);