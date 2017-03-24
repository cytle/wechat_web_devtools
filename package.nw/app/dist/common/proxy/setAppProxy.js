'use strict';var _exports;function init(){function a(E,F){let G=E.find(H=>{return-1<H.indexOf(F)});return G?(G=G.trim(),G.split(/\s/).pop()):void 0}function b(E){const F=`REG QUERY "HKCU\\SOFTWARE\\MICROSOFT\\WINDOWS\\CURRENTVERSION\\INTERNET SETTINGS"`;l(F,{},(G,H,I)=>{if(!G)try{let J=H.split(/\r?\n/),K={};K.AutoConfigURL=a(J,'AutoConfigURL'),K.ProxyEnable=!!parseInt(a(J,'ProxyEnable')),K.ProxyServer=a(J,'ProxyServer'),K.ProxyOverride=a(J,'ProxyOverride'),K.ProxyOverride&&(K.ProxyOverride=K.ProxyOverride.split(';')),r.info(`setAppProxy.js getWinSystemProxySetting: ${JSON.stringify(K)}`),E(null,K)}catch(J){r.error(`setAppProxy.js getWinSystemProxySetting stdout error ${H} ${JSON.stringify(J)}`),E(J)}else r.error(`setAppProxy.js getWinSystemProxySetting commandStr: ${JSON.stringify(G)}`),E(G)})}function c(E){let F=o.join(__dirname,'getosxproxysetting.sh');l(`sh ${F}`,{},(G,H,I)=>{if(!G){let J=H.split(/\r?\n/);try{let K={};K.httpPrxoyEnable='Enabled: Yes'===J[0];let L=J[1].replace('Server:','').trim(),M=J[2].replace('Port:','').trim();K.httpProxy=L?`${L}:${M}`:'',K.httpsProxyEnable='Enabled: Yes'===J[4];let N=J[5].replace('Server:','').trim(),O=J[6].replace('Port:','').trim();K.httpsProxy=N?`${N}:${O}`:'';let P='Enabled: Yes'===J[9];K.AutoConfigURL=P?J[8].replace('URL:','').trim():'',K.ProxyOverride=0===J[10].indexOf('There aren\'t any bypass domains')?[]:J[10].split(' '),r.info(`setAppProxy.js getOsxSystemProxySetting: ${JSON.stringify(K)}`),E(null,K)}catch(K){r.error(`setAppProxy.js getOsxSystemProxySetting set: ${JSON.stringify(K)}`),E(K)}}else r.error(`setAppProxy.js getOsxSystemProxySetting : ${JSON.stringify(G)}`),E(G)})}function d(E,F){E.AutoConfigURL?m(E.AutoConfigURL,(G,H,I)=>{if(!G)try{let J=o.join(A,'temppac.pac');q.writeFileSync(J,I+`\n module.exports=FindProxyForURL`,'utf8');let K=require(J),L=K.toString();r.info(`setAppProxy.js initProxy FindProxyForURLFun: ${L}`);let M=g(),N=f(),O=I.replace(L,`
              function FindProxyForURL(url, host) {
                ${M}
                ${N}
                ${L}
                return FindProxyForURL(url, host)
              }
            `),P=o.join(A,'pacFile.pac');if(q.writeFileSync(P,I.replace(L,O)),r.info(`setAppProxy.js initProxy write ${P} success`),w){let Q=document.createElement('img');Q.src=P,E.AutoConfigURL=`${Q.src}?${+new Date}`}else E.AutoConfigURL=encodeURI(`file:///${P}?${+new Date}`);F(null,E)}catch(J){F(J)}else F(G)}):F(null,E)}function f(E){try{if(E&&E.length){let F=E.map(G=>{return`host.indexOf('${G}') === 0`});return F=F.join('||'),r.info(`setAppProxy.js makeProxyOverride ${F}`),`if(${F}) {
            return 'DIRECT'
          }`}return''}catch(F){return r.error(`setAppProxy.js makeProxyOverride error: ${JSON.stringify(F)}`),''}}function g(){let E=[];E.push('https://chrome-devtools-frontend.appspot.com/serve_rev/@180870/'),E.push('https://clients1.google.com/tbproxy/af/');let F=E.map(G=>{return`url.indexOf('${G}') === 0`});return F=F.join('||'),F=`${F} || ${B}.test(url) || ${C}.test(url) || ${D}.test(url)`,r.info(`setAppProxy.js makeProxyLocal ${F}`),`if (${F}) {
      return 'PROXY 127.0.0.1:${global._port}'
    }
    `}function h(E,F){if(E===x)return{mode:'pac_script',pacScript:{url:F.AutoConfigURL}};if(E===y){let G=g(),H=f();return{mode:'pac_script',pacScript:{data:`function FindProxyForURL(url, host) {
                ${G}
                ${H}
                return 'DIRECT'
              }`}}}if(w&&E===z){let G=g(),H=f(F.ProxyOverride),I='';if(!F.ProxyServer)I=`return 'DIRECT'`;else if(-1===F.ProxyServer.indexOf('='))I=`return 'PROXY ${F.ProxyServer}'`;else{let J=F.ProxyServer.split(';');J.forEach(K=>{let L=K.replace(/https?=/,'');0===K.indexOf('https')?I+=`
            if(url.indexOf('https') === 0)
              return 'PROXY ${L}'
          `:0===K.indexOf('http')&&(I+=`
            if(url.indexOf('http') === 0 && url.indexOf('https') === -1)
              return 'PROXY ${L}'
          `)})}return{mode:'pac_script',pacScript:{data:`function FindProxyForURL(url, host) {
                ${G}
                ${H}
                ${I}
                return 'DIRECT'
              }`}}}if(!w&&E===z){let G=g(),H=f(F.ProxyOverride),I=``;return F.httpsProxyEnable&&(I+=`
        if(url.indexOf('https:') === 0)
          return 'PROXY ${F.httpsProxy}'
      `),F.httpPrxoyEnable&&(I+=`
        if(url.indexOf('http:') === 0)
          return 'PROXY ${F.httpProxy}'
      `),F.ProxyServer&&(I=`return 'PROXY ${F.ProxyServer}'`),{mode:'pac_script',pacScript:{data:`function FindProxyForURL(url, host) {
                ${G}
                ${H}
                ${I}
                return 'DIRECT'
              }`}}}}function i(E,F){r.info(`setAppProxy.js setChromeProxy config: ${JSON.stringify(E)}`),chrome.proxy.settings.set({value:E,scope:'regular'},()=>{F()})}function j(E,F){let G;G=E.AutoConfigURL?h(x,E):w&&E.ProxyEnable?h(z,E):!w&&(E.httpPrxoyEnable||E.httpsProxyEnable)?h(z,E):h(y),i(G,()=>{F(null,E)})}function k(E){let F=s.getProxySetting();if(t.clearProxyCache(),'SYSTEM'===F){let G=[];w?G.push(b):G.push(c),G.push(d),G.push(j),n.waterfall(G,(H,I)=>{if(!H)E();else{let J=h(y);i(J,()=>{E()}),r.error(`setAppProxy.js set system error ${JSON.stringify(H)}`)}})}else if('DIRECT'===F){let G=h(y);i(G,()=>{E()})}else{let G=h(z,{ProxyServer:F.replace('PROXY ','')});i(G,()=>{E()})}}const l=require('child_process').exec,m=require('request'),n=require('async'),o=require('path'),q=require('fs');nw.App;const r=require('../log/log.js');require('mkdir-p');const s=require('../../stores/windowStores.js'),t=require('../../utils/tools.js'),u=require('../../config/config.js'),v=require('../../config/dirConfig.js'),w='win32'===process.platform,x=0,y=1,z=2,A=v.ProxyCache,B=u.weappURLRegular,C=u.weappASURLRegular,D=u.weappLocalIdRegular;_exports={set:k,up:function(F){k(F)}}}init(),module.exports=_exports;