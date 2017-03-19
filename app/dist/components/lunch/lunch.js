'use strict';var _exposts;function init(){const a=require('../../lib/react.js'),b=require('../../common/request/request.js');require('../../cssStr/cssStr.js');const c=require('../../actions/windowActions.js'),d=require('../../common/log/log.js'),f=require('../../config/urlConfig.js'),g='darwin'===process.platform?'darwin':'win',h=function(j){c.showTipsMsg({msg:j,type:'error'})},i=a.createClass({displayName:'Lunch',handleOnClick:function(){this.props.appQuit()},componentWillUnmount:function(){this.refs.container.innerHTML=''},_loadstop:function(j){let k=this.webview;k.executeScript({code:`
            var s = document.createElement('style')
            s.innerText = \`
              body{
                overflow:hidden;
                background-color: #f0f0f0!important;
                padding: inherit!important;
                color: #373737!important;
              }
              .impowerBox .title {
                display: none;
              }
              .impowerBox .qrcode {
                width: 170px;
                height: 170px;
                margin-top: -7px;
              }\`
              document.head.appendChild(s)
              var normal = document.querySelectorAll('.normal')
              for(var i = 0; i < normal.length; i++) {
                normal[i].classList.remove('normal')
              }
          `}),k.style.display='block';let l=k.request;l.onBeforeRequest.addListener(m=>{if('main_frame'!==m.type)return{};let n=m.url;return n=n.replace('state=login',`state=${g}`),d.info(`lunch.js get URL : ${n}`),b({url:n},(o,p,q)=>{if(!o){d.info(`lunch.js get res ${JSON.stringify(q)}`),q=JSON.parse(q);let r=q.baseresponse,s=r.errcode?parseInt(r.errcode):0;if(0!==s)return h(`登录失败，错误信息：${r.errmsg}`),k.removeEventListener('loadstop',this._loadstop),void this.componentDidMount();for(let y in localStorage)0===y.indexOf('projectattr')&&delete localStorage[y];let t=p.headers,u=t['debugger-signature'],v=t['debugger-newticket'],w=+new Date,x={signature:u,newticket:v,openid:q.openid,nickName:q.nickname,headUrl:q.headurl||'https://res.wx.qq.com/zh_CN/htmledition/v2/images/web_wechat_no_contect.png',ticketExpiredTime:1000*q.ticket_expired_time+w,signatureExpiredTime:1000*q.signature_expired_time+w,sex:1===q.sex?'male':'female',province:q.province,city:q.city,contry:q.contry};c.upDateUserInfo(x)}else h(`网络错误 ${o.toString()}`),k.removeEventListener('loadstop',this._loadstop),this.componentDidMount()}),{cancel:!0}},{urls:['<all_urls>']},['blocking']),d.info(`lunch.js init loginWebview`)},componentDidMount:function(){this.refs.container;let j=this.webview=document.createElement('webview');j.src=f.LOGIN_URL,j.style.display='none',j.addEventListener('loadstop',this._loadstop),this.refs.container.innerHTML='',this.refs.container.appendChild(j)},showSetting:function(){c.showSetting()},render:function(){let j='win32'===process.platform,k=j?'lunch-toolbar lunch-toolbar-win app-drag':'lunch-toolbar app-drag',l=a.createElement('a',{href:'javascript:;',onClick:this.showSetting,className:'create-toolbar-setting app-no-drag'},'\u4EE3\u7406',a.createElement('i',{className:'create-toolbar-setting-icon'}));return j?'lunch-toolbar-close-icon app-no-drag':'app-no-drag',a.createElement('div',{className:'lunch'},a.createElement('div',{className:k},j?l:'',a.createElement('a',{onClick:this.handleOnClick,href:'javascript:;',className:'lunch-toolbar-close app-no-drag'},a.createElement('i',{className:'{{closeClass}}'})),j?'':l),a.createElement('div',{className:'lunch-body'},a.createElement('div',{className:'lunch-logo-wrapper'},a.createElement('i',{className:'lunch-logo'})),a.createElement('div',{className:'lunch-name'},'\u5FAE\u4FE1\u5F00\u53D1\u8005\u5DE5\u5177'),a.createElement('div',{className:'lunch-line'}),a.createElement('div',{ref:'container',className:'lunch-qrcode'})))}});_exposts=i}init(),module.exports=_exposts;