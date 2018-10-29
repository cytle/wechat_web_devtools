var runtime = require('./index')
var qcloud = require('../libs/wafer2-client-sdk/index')
var config = require('../../config')

const screenWidth  = window.innerWidth
const screenHeight = window.innerHeight

let atlas = new Image()
atlas.src = 'images/Common.png'

export default class GameInfo {

  sendScore(ctx, score) { 
    runtime.sendMessage('rscore', {'score': score})
  }

  renderGameScore(ctx, score) {
    ctx.fillStyle = "#ffffff"
    ctx.font      = "20px Arial"

    var usernicname = _globalData.userInfo.nickName? _globalData.userInfo.nickName : '当前得分:'
    ctx.fillText(
      usernicname + ': ' + score,
      10,
      40
    )
    
    if (_globalData.realTimeRank && _globalData.realTimeRank.length > 0){
      _globalData.realTimeRank.forEach(function (value, index) {
        if (value.username != _globalData.userInfo.nickName){
          //不在这渲染自己的分数
          ctx.fillText(
            value.username + '得分: ' + value.score,
            10,
            40 + (index+1) * 20
          ); 
        }
      })
    } 
  }

  renderGameOver(ctx, score) {
    ctx.drawImage(atlas, 0, 0, 119, 108, screenWidth / 2 - 150, screenHeight / 2 - 100, 300, 300)

    ctx.fillStyle = "#ffffff"
    ctx.font    = "20px Arial"

    ctx.fillText(
      '游戏结束',
      screenWidth / 2 - 40,
      screenHeight / 2 - 100 + 50
    )

    if (_globalData.userInfo && _globalData.userInfo.nickName){
      ctx.fillText(
        _globalData.userInfo.nickName + ' 得分: ' + score,
        screenWidth / 2 - 60,
        screenHeight / 2 - 100 + 130
      )
    }

    ctx.drawImage(
      atlas,
      120, 6, 39, 24,
      screenWidth / 2 - 60,
      screenHeight / 2 - 100 + 180,
      120, 40
    )

    ctx.fillText(
      '重新开始',
      screenWidth / 2 - 40,
      screenHeight / 2 - 100 + 205
    )

    /**
     * 重新开始按钮区域
     * 方便简易判断按钮点击
     */
    this.btnArea = {
      startX: screenWidth / 2 - 40,
      startY: screenHeight / 2 - 100 + 180,
      endX  : screenWidth / 2  + 50,
      endY  : screenHeight / 2 - 100 + 255
    }
  }
}

