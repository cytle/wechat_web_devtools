var qcloud = require('../libs/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../utils/util.js')

export function handleLogin() {
  if (_globalData.isLogin) return

  util.showBusy('正在登录')
  qcloud.login({
    success(result) {
      if (result) {
        util.showSuccess('登录成功')
        _globalData.isLogin = true
        _globalData.userInfo = result
      } else {
        // 如果不是首次登录，不会返回用户信息，请求用户信息接口获取
        qcloud.request({
          url: config.service.requestUrl,
          login: true,
          success(result) {
            util.showSuccess('登录成功')
            _globalData.isLogin = true
            _globalData.userInfo = result.data.data
          },

          fail(error) {
            util.showModel('请求失败', error)
            console.log('request fail', error)
          }
        })
      }
    },

    fail(error) {
      util.showModel('登录失败', error)
      console.log('登录失败', error)
    }
  })
}

export function openTunnel() {
  if (_globalData.tunnelStatus == 'connected') return

  console.log('WebSocket 信道连接中...', " tunnelUrl:", config.service.tunnelUrl)
  // 创建信道，需要给定后台服务地址
  var tunnel = _globalData.tunnel = new qcloud.Tunnel(config.service.tunnelUrl)

  // 监听信道内置消息，包括 connect/close/reconnecting/reconnect/error
  tunnel.on('connect', () => {
    //util.showSuccess('信道已连接')
    console.log('WebSocket 信道已连接')
    _globalData.tunnelStatus = 'connected'
  })

  tunnel.on('close', () => {
    //util.showSuccess('信道已断开')
    console.log('WebSocket 信道已断开')
    _globalData.tunnelStatus = 'closed'
  })

  tunnel.on('reconnecting', () => {
    //util.showBusy('信道正在重连')
    console.log('WebSocket 信道正在重连...')
  })

  tunnel.on('reconnect', () => {
    //util.showSuccess('重连成功')
    console.log('WebSocket 信道重连成功')
  })

  tunnel.on('error', error => {
    //util.showModel('信道发生错误', error)
    console.error('信道发生错误：', error)
  })

  // 监听自定义消息（服务器进行推送）
  tunnel.on('rscore', msg => {
    console.log('收到榜单刷新', msg)
    updateRealTimeRank(msg.who.nickName, msg.score)
  })

  // 监听自定义消息，用户上线下线（服务器进行推送）
  tunnel.on('people', msg => {
    if (msg.online){
      console.log('用户上线,', msg.who)
      if (msg.who.nickName != _globalData.userInfo.nickName){
        util.showSuccess(msg.who.nickName + '上线')
      }
    }
    else if (msg.offline){
      console.log('用户下线,', msg.who)
      removeRealTimeRank(msg.who.nickName)
    }
    else{
      console.log('未识别的消息,', msg)
    }
  })

  // 打开信道
  tunnel.open()

  _globalData.tunnelStatus = 'connecting'
}


export function sendMessage(cmd, msg) {
  if (!_globalData.tunnelStatus || !_globalData.tunnelStatus === 'connected'){
    console.log("未连接信道，信道当前状态:", _globalData.tunnelStatus)
    return
  }
  // 使用 tunnel.isActive() 来检测当前信道是否处于可用状态
  if (_globalData.tunnel && _globalData.tunnel.isActive()) {
    // 使用信道给服务器推送消息
    _globalData.tunnel.emit(cmd, msg);
  }
}


//榜单删除离线用户， 只简单以nickName为key
function removeRealTimeRank(nickName) {
  var removeIndex = -1
  if (_globalData.realTimeRank && _globalData.realTimeRank.length > 0) {
    for (var i = 0; i < _globalData.realTimeRank.length; i++) {
      if (_globalData.realTimeRank[i].username === nickName) {
        removeIndex = i
      }
    }
  }

  if (removeIndex >= 0){
    _globalData.realTimeRank.splice(removeIndex, removeIndex)
  }
}


//更新下榜单
function updateRealTimeRank(nickName, score){
  if (_globalData.realTimeRank && _globalData.realTimeRank.length > 0){
    for (var i = 0; i < _globalData.realTimeRank.length; i++){
      if (_globalData.realTimeRank[i].username === nickName){
        _globalData.realTimeRank[i].score = score
        return
      }
    }
  }
  _globalData.realTimeRank.push({ username: nickName, score: score})
}

export function closeTunnel() {
  console.log("closeTunnel", _globalData.tunnel, _globalData.tunnelStatus)
  if (_globalData.tunnel) {
    _globalData.tunnel.close();
  }
  _globalData.tunnelStatus = 'closed'
}