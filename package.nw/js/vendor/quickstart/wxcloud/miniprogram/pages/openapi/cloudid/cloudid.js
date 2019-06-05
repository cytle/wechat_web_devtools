// miniprogram/pages/openapi/cloudid/cloudid.js
Page({

  data: {
    weRunResult: '',
    userInfoResult: '',
  },

  onGetWeRunData() {
    wx.getWeRunData({
      success: res => {
        wx.cloud.callFunction({
          name: 'echo',
          data: {
            // info 字段在云函数 event 对象中会被自动替换为相应的敏感数据
            info: wx.cloud.CloudID(res.cloudID),
          },
        }).then(res => {
          console.log('[onGetWeRunData] 收到 echo 回包：', res)

          this.setData({
            weRunResult: JSON.stringify(res.result),
          })

          wx.showToast({
            title: '敏感数据获取成功',
          })
        }).catch(err => {
          console.log('[onGetWeRunData] 失败：', err)
        })
      }
    })

  },

  onGetUserInfo(e) {
    console.log(e)
    wx.cloud.callFunction({
      name: 'openapi',
      data: {
        action: 'getOpenData',
        openData: {
          list: [
            e.detail.cloudID,
          ]
        }
      }
    }).then(res => {
      console.log('[onGetUserInfo] 调用成功：', res)

      this.setData({
        userInfoResult: JSON.stringify(res.result),
      })

      wx.showToast({
        title: '敏感数据获取成功',
      })
    })
  }
})
