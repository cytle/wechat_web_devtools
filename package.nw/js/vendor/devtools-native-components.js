// 获取数据初始化数据
var search = location.href.split('?')[1] || ''
var hiddenVideoCenterBtnStyle = document.createElement('style')
hiddenVideoCenterBtnStyle.innerHTML = `
wx-video .wx-video-cover {
  display: none;
}
`
search = search.split('&')
var query = {}
for (var i = 0, len = search.length; i < len; i++) {
  var result = search[i]
  if (result) {
    let [key, value] = result.split('=')
    // 这两个key 需要 JSON.parse
    if (key == 'data' || key == 'origin') {
      try {
        query[key] = JSON.parse(decodeURIComponent(value))
      } catch(e) {
        query[key] = {}
      }
    } else {
      query[key] = decodeURIComponent(value)
    }
  }
}

var dom
var temp = document.getElementById('container')

// 创建容器
var parent = exparser.createElement('div')
parent.setAttribute('style', 'height:100%;')
exparser.Element.replaceDocumentElement(parent, temp)

// 监听组件更新
WeixinJSBridge.on('updateNativeView', function(data) {
  if (!dom)return

  for (let key in data) {
    if (key == 'showCenterPlayBtn') {
      if (data[key]) {
        hiddenVideoCenterBtnStyle.remove()
      } else if(!hiddenVideoCenterBtnStyle.parentElement){
        document.body.appendChild(hiddenVideoCenterBtnStyle)
      }
    }

    dom[key] = data[key]
    if (query.data) {
      query.data[key] = data[key]
    }
  }
})

// 监听组件操作
WeixinJSBridge.on('operateNativeView', function(data) {
  if (!dom)return

  switch(query.name) {
    case 'video':
    {
      dom.actionChanged(data)
      break
    }
  }
})

var forcePaused = false
WeixinJSBridge.on('onAppEnterBackground', function() {
  if (dom && dom.is == 'wx-video') {
    if (!dom.paused) {
      dom.actionChanged({
        method: 'pause'
      })
     forcePaused = true
    }
  }
})

WeixinJSBridge.on('onAppEnterForeground', function() {
  if (dom && dom.is == 'wx-video') {
    if (forcePaused) {
      dom.actionChanged({
        method: 'play'
      })
      forcePaused = false
    }
  }
})


if (query.name) {
  // 创建组件
  dom = exparser.createElement('wx-' + query.name)
  dom.$$.setAttribute('style', 'height:100%;width:100%')
  if (query.data) {
    for (let key in query.data) {
      if (key == 'showCenterPlayBtn' && !query.data[key]) {
        document.body.appendChild(hiddenVideoCenterBtnStyle)
      }
      dom[key] = query.data[key]
    }
  }
  parent.appendChild(dom)

  // 组件的事件
  if (query.name == 'video') {
    dom.addListener('play', function (e) {
      e._hasListeners = true;
      WeixinJSBridge.publish('onNativeViewEvent', {
        eventName: 'onVideoPlay',
        data: {
          timeStamp: e.timeStamp,
          videoPlayerId: query.videoPlayerId,
          data: query.data.data || ''
        }
      })
    }, { capture: false });


    dom.addListener('pause', function (e) {
      e._hasListeners = true;
      WeixinJSBridge.publish('onNativeViewEvent', {
        eventName: 'onVideoPause',
        data: {
          videoPlayerId: query.videoPlayerId,
          data: query.data.data || ''
        }
      })
    })

    dom.addListener('ended', function (e) {
      e._hasListeners = true;
      WeixinJSBridge.publish('onNativeViewEvent', {
        eventName: 'onVideoEnded',
        data: {
          videoPlayerId: query.videoPlayerId,
          data: query.data.data || ''
        }
      })
    })

    dom.addListener('timeupdate', function (e) {
      e._hasListeners = true;
      WeixinJSBridge.publish('onNativeViewEvent', {
        eventName: 'onVideoTimeUpdate',
        data: {
          position: e.detail.currentTime,
          duration: e.detail.duration,
          videoPlayerId: query.videoPlayerId,
          data: query.data.data || ''
        }
      })
    })

    dom.addListener('fullscreenchange', function (e) {
      e._hasListeners = true;
      WeixinJSBridge.publish('onNativeViewEvent', {
        eventName: 'onVideoFullScreenChange',
        data: {
          fullScreen: e.detail.fullScreen,
          direction: dom.direction,
          videoPlayerId: query.videoPlayerId,
          data: query.data.data || ''
        }
      })
    })
  }
}