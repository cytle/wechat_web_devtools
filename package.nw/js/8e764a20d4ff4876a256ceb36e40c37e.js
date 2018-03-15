'use strict';!function(require,directRequire){const a=require('react'),b=require('fs'),c=require('path'),d=require('./3b5f8e2469c474c8d433c1c6926d8999.js'),e=require('./84b183688a46c9e2626d3e6f83365e13.js'),f=require('./d3976cc01aeebc5b09e11c4135b6bd8d.js'),g=require('./fc137838572a83604db39acff8e909e0.js'),h=require('./eadce02c750c875a10680bcfedadec88.js'),i=require('./948f9199c1cd0ba6cb9d19ad84972410.js'),j=require('./bcb48ae14d243711d3b31cb0f602d209.js'),k=require('./25d0beb4120ce2acafb4e03b95444fda.js'),l=require('./9c906d27ca74e18d0deaaa231e71fdfa.js'),m=require('./cc2c2970ff81ae4a83123e81ee123da2.js'),n=require('./f2b0fd116ee25849124e867e0da34f23.js'),o=require('./56c390e04c10e91a4aa2a2c19d9a885d.js'),p=require('./1fcc6bd55b687d154a4247e57fe3011d.js'),q=require('./92320c1386e6db6a6f2556736a9bc280.js'),r=require('./72653d4b93cdd7443296229431a7aa9a.js'),s=require('child_process').spawn,t='darwin'===process.platform,u=require('./da7c31daaf542cf1796023d8e344b98a.js'),v=require('moment');v.locale(navigator.language);const{connect:w}=require('react-redux'),x={1:'\u5DE5\u5177\u63D0\u9192',2:'\u7CFB\u7EDF\u901A\u77E5',3:'\u793E\u533A\u901A\u77E5',4:'\u817E\u8BAF\u4E91\u901A\u77E5',5:'\u76D1\u63A7\u901A\u77E5'},y=(a)=>{return v(new Date(1e3*a)).calendar()};class z extends a.Component{render(){let b=this.props;return a.createElement('div',{className:'notification-item'},a.createElement('div',{className:'ui-flex'},a.createElement('h3',{className:'notification-type ui-flex-item'},b.type),a.createElement('div',{className:'notification-ext'},a.createElement('p',null,b.time))),a.createElement('div',{className:'ui-flex'},a.createElement('p',{className:'notification-desc'},b.content),a.createElement('a',{onClick:b.onLinkClick,style:b.link?{}:d.displayNone},b.link)))}}class A extends a.Component{constructor(a){super(a),this.state={list:[],loginQRCodeShow:a.showQRCode||a.loginStatus==o.LOGIN_STATUS.EXPIRED}}componentDidMount(){i.open().then(()=>{return i.getFirstPage()}).then((a)=>{this.setState({list:a})}).catch((a)=>{r.error(`get first page catch ${a}`)})}componentWillReceiveProps(a){a.loginStatus!=this.props.loginStatus&&(a.loginStatus==o.LOGIN_STATUS.SUCCESS?setTimeout(()=>{this.onLoginSuccess()}):a.loginStatus==o.LOGIN_STATUS.EXPIRED&&this.setState({loginQRCodeShow:!0}))}componentWillUnmount(){i.close()}onLoginSuccess(){this.props.project&&this.props.requestProjectAttr(),this.props.toggleClickKey(h.NONE)}onContainerClick(a){a.stopPropagation()}onClose(a){a.stopPropagation(),this.props.toggleClickKey(h.NONE)}onLinkClick(a){if(a.link)if(a.type==j.DBType.bbs)k.BBS(a.link,o.IDE_SCENE.MESSAGE_CENTER),u('weapp_message_center_bbsurl',this.props.project.appid);else if(a.type==j.DBType.alarm)nw.Shell.openExternal(a.link);else if(a.type==j.DBType.system)nw.Shell.openExternal(a.link);else if(a.type==j.DBType.tools){let d=a.link,f=c.join(q.WeappApplication,d);if(!b.existsSync(f))return void this.props.showError('\u66F4\u65B0\u6587\u4EF6\u4E0D\u5B58\u5728\uFF0C\u8BF7\u91CD\u65B0\u4E0B\u8F7D');let g=t?'open':d,h=t?[d]:[];try{s(g,h,{detached:!0,cwd:q.WeappApplication})}catch(a){nw.Shell.openItem(f)}e.quit()}}onScroll(){this.scrollTimer&&clearTimeout(this.scrollTimer),this.scrollTimer=setTimeout(()=>{let a=this.refs.listContainer.getBoundingClientRect();500>a.height+a.top&&i.next().then((a)=>{this.setState({list:this.state.list.concat(a)})}).catch((a)=>{r.error(`get next page catch ${a}`)})},250)}onLogout(){this.setState({loginQRCodeShow:!0})}render(){let b=this.props;return a.createElement('div',{className:'ui-popover',style:{left:10},onClick:this.onContainerClick.bind(this),onScroll:this.onScroll.bind(this)},a.createElement('div',{className:'notification'},a.createElement('div',{className:'notification-hd ui-flex'},a.createElement('h3',{className:'notification-title ui-flex-item'},'\u4E2A\u4EBA\u4E2D\u5FC3'),a.createElement('div',{className:'notification-hd-ext',onClick:this.onClose.bind(this)},a.createElement('i',{className:'ui-icon-close'}))),a.createElement('div',{className:'notification-bd'},a.createElement('div',{className:'ui-flex notification-account'},a.createElement('div',{className:'ui-flex-item'},a.createElement('h4',{className:'notification-account-name'},b.nickName)),a.createElement('div',{className:'notification-toggle',onClick:this.onLogout.bind(this)},a.createElement('i',{className:'ui-icon-toggle'}))),this.state.loginQRCodeShow?a.createElement(n,{from:'noticecenter'}):null,a.createElement('div',{className:'notification-list',style:this.state.loginQRCodeShow?d.displayNone:{},ref:'listContainer'},0==this.state.list.length?a.createElement('div',{className:'notification-item ui-flex'},a.createElement('div',{className:'notification-content'},a.createElement('div',{className:'notification-content-empty'},a.createElement('i',{className:'ui-icon-cup'}),a.createElement('p',null,'\u6682\u65E0\u65B0\u6D88\u606F')))):this.state.list.map((b)=>{return a.createElement(z,{key:b.id,type:x[b.type],content:`${b.content}`,link:b.type==j.DBType.tools?'\u7ACB\u5373\u66F4\u65B0':b.link?'\u524D\u5F80\u67E5\u770B':'',time:y(b.timestamp),onLinkClick:this.onLinkClick.bind(this,b)})})))))}}module.exports=w((a)=>{let b=!1;if(a.user){let c=a.user;if(c){let a=+new Date;a<=c.signatureExpiredTime&&(b=!0)}}return{project:a.project.current,loginStatus:a.user.loginStatus,nickName:b?a.user.nickName:'\u672A\u767B\u5F55'}},(a)=>{return{requestProjectAttr:f.bindActionCreators(m.requestProjectAttr,a),showError:f.bindActionCreators(p.showError,a),toggleClickKey:f.bindActionCreators(g.toggleClickKey,a),loginExpired:f.bindActionCreators(l.loginExpired,a)}})(A)}(require('lazyload'),require);