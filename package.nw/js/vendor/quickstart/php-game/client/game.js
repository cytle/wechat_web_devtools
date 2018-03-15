import './js/libs/weapp-adapter'
import './js/libs/symbol'
import Main from './js/main'

var qcloud = require('./js/libs/wafer2-client-sdk/index')
var config = require('./config')
var runtime = require('./js/runtime/index')
var util = require('./js/utils/util.js')

qcloud.setLoginUrl(config.service.loginUrl)

window._globalData = {
  tunnelStatus: 'unconnected', //只建立一个长连接websocket
  isLogin: false,
  userInfo: {}, //登录账号信息
  realTimeRank: [] // 榜单
};

//登录
runtime.handleLogin()

//打开websocket信道长连接
runtime.openTunnel()

//监听小游戏隐藏到后台事件。锁屏、按 HOME 键退到桌面、显示在聊天顶部等操作会触发此事件
//wx.onHide(() => { console.log("主动关闭信道"); runtime.closeTunnel() } )


//游戏主程序
new Main();

