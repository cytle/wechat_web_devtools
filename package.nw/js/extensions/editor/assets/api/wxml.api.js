window.WXMLAPI = {
  "audio": {
    "link": "https://mp.weixin.qq.com/debug/wxadoc/dev/component/audio.html#audio",
    "attributes": {
      "id": {
        "doc": "audio 组件的唯一标识符",
        "type": "String"
      },
      "class": {
        "type": "String",
        "doc": "组件的样式类"
      },
      "style": {
        "type": "String",
        "doc": "组件的内联样式"
      },
      "hidden": {
        "type": "Boolean",
        "doc": "组件是否显示"
      },
      "data-": {
        "type": "Any",
        "doc": "自定义属性"
      },
      "bindtap": {
        "doc": "tap事件绑定，不阻止冒泡"
      },
      "catchtap": {
        "doc": "tap事件绑定，阻止冒泡"
      },
      "bindlongtap": {
        "doc": "longtap事件绑定，不阻止冒泡"
      },
      "catchlongtap": {
        "doc": "longtap事件绑定，阻止冒泡"
      },
      "bindtouchstart": {
        "doc": "touchstart事件绑定，不阻止冒泡"
      },
      "catchtouchstart": {
        "doc": "touchstart事件绑定，阻止冒泡"
      },
      "bindtouchmove": {
        "doc": "touchmove事件绑定，不阻止冒泡"
      },
      "catchtouchmove": {
        "doc": "touchmove事件绑定，阻止冒泡"
      },
      "bindtouchend": {
        "doc": "touchend事件绑定，不阻止冒泡"
      },
      "catchtouchend": {
        "doc": "touchend事件绑定，阻止冒泡"
      },
      "bindtouchcancel": {
        "doc": "touchcancel事件绑定，不阻止冒泡"
      },
      "catchtouchcancel": {
        "doc": "touchcancel事件绑定，阻止冒泡"
      },
      "src": {
        "doc": "要播放音频的资源地址",
        "type": "String"
      },
      "loop": {
        "doc": "是否循环播放",
        "type": "Boolean",
        "default": false,
        "valid": [
          {
            "value": true
          },
          {
            "value": false
          }
        ]
      },
      "controls": {
        "doc": "是否显示默认控件",
        "type": "Boolean",
        "default": false,
        "valid": [
          {
            "value": true
          },
          {
            "value": false
          }
        ]
      },
      "poster": {
        "doc": "默认控件上的音频封面的图片资源地址，如果 controls 属性值为 false 则设置 poster 无效",
        "type": "String"
      },
      "name": {
        "doc": "默认控件上的音频名字，如果 controls 属性值为 false 则设置 name 无效",
        "type": "String",
        "default": "未知音频"
      },
      "author": {
        "doc": "默认控件上的作者名字，如果 controls 属性值为 false 则设置 author 无效",
        "type": "String",
        "default": "未知作者"
      },
      "binderror": {
        "doc": "当发生错误时触发 error 事件，detail = {errMsg: MediaError.code}",
        "type": "EventHandle"
      },
      "bindplay": {
        "doc": "当开始/继续播放时触发play事件",
        "type": "EventHandle"
      },
      "bindpause": {
        "doc": "当暂停播放时触发 pause 事件",
        "type": "EventHandle"
      },
      "bindtimeupdate": {
        "doc": "当播放进度改变时触发 timeupdate 事件，detail = {currentTime, duration}",
        "type": "EventHandle"
      },
      "bindended": {
        "doc": "当播放到末尾时触发 ended 事件",
        "type": "EventHandle"
      }
    }
  },
  "button": {
    "link": "https://mp.weixin.qq.com/debug/wxadoc/dev/component/button.html#button",
    "attributes": {
      "id": {
        "type": "String",
        "doc": "组件的唯一标示"
      },
      "class": {
        "type": "String",
        "doc": "组件的样式类"
      },
      "style": {
        "type": "String",
        "doc": "组件的内联样式"
      },
      "hidden": {
        "type": "Boolean",
        "doc": "组件是否显示"
      },
      "data-": {
        "type": "Any",
        "doc": "自定义属性"
      },
      "bindtap": {
        "doc": "tap事件绑定，不阻止冒泡"
      },
      "catchtap": {
        "doc": "tap事件绑定，阻止冒泡"
      },
      "bindlongtap": {
        "doc": "longtap事件绑定，不阻止冒泡"
      },
      "catchlongtap": {
        "doc": "longtap事件绑定，阻止冒泡"
      },
      "bindtouchstart": {
        "doc": "touchstart事件绑定，不阻止冒泡"
      },
      "catchtouchstart": {
        "doc": "touchstart事件绑定，阻止冒泡"
      },
      "bindtouchmove": {
        "doc": "touchmove事件绑定，不阻止冒泡"
      },
      "catchtouchmove": {
        "doc": "touchmove事件绑定，阻止冒泡"
      },
      "bindtouchend": {
        "doc": "touchend事件绑定，不阻止冒泡"
      },
      "catchtouchend": {
        "doc": "touchend事件绑定，阻止冒泡"
      },
      "bindtouchcancel": {
        "doc": "touchcancel事件绑定，不阻止冒泡"
      },
      "catchtouchcancel": {
        "doc": "touchcancel事件绑定，阻止冒泡"
      },
      "size": {
        "doc": "按钮的大小",
        "type": "String",
        "default": "default"
      },
      "type": {
        "doc": "按钮的样式类型",
        "type": "String",
        "default": "default"
      },
      "plain": {
        "doc": "按钮是否镂空，背景色透明",
        "type": "Boolean",
        "default": false,
        "valid": [
          {
            "value": true
          },
          {
            "value": false
          }
        ]
      },
      "disabled": {
        "doc": "是否禁用",
        "type": "Boolean",
        "default": false,
        "valid": [
          {
            "value": true
          },
          {
            "value": false
          }
        ]
      },
      "loading": {
        "doc": "名称前是否带 loading 图标",
        "type": "Boolean",
        "default": false,
        "valid": [
          {
            "value": true
          },
          {
            "value": false
          }
        ]
      },
      "form-type": {
        "doc": "用于 `<form/>` 组件，点击分别会触发 `<form/>` 组件的 submit/reset 事件",
        "type": "String"
      },
      "open-type": {
        "doc": "微信开放能力",
        "type": "String"
      },
      "app-parameter": {
        "doc": "打开 APP 时，向 APP 传递的参数",
        "type": "String"
      },
      "hover-class": {
        "doc": "指定按钮按下去的样式类。当 `hover-class=\"none\"` 时，没有点击态效果",
        "type": "String",
        "default": "button-hover"
      },
      "hover-stop-propagation": {
        "doc": "指定是否阻止本节点的祖先节点出现点击态",
        "type": "Boolean",
        "default": false,
        "valid": [
          {
            "value": true
          },
          {
            "value": false
          }
        ]
      },
      "hover-start-time": {
        "doc": "按住后多久出现点击态，单位毫秒",
        "type": "Number",
        "default": 20
      },
      "hover-stay-time": {
        "doc": "手指松开后点击态保留时间，单位毫秒",
        "type": "Number",
        "default": 70
      },
      "bindgetuserinfo": {
        "doc": "用户点击该按钮时，会返回获取到的用户信息，从返回参数的detail中获取到的值同[wx.getUserInfo](../api/open.md#wxgetuserinfoobject)",
        "type": "Handler"
      },
      "lang": {
        "doc": "指定返回用户信息的语言，zh_CN 简体中文，zh_TW 繁体中文，en 英文。",
        "type": "String",
        "default": "en"
      },
      "session-from": {
        "doc": "会话来源",
        "type": "String"
      },
      "send-message-title": {
        "doc": "会话内消息卡片标题",
        "type": "String",
        "default": "当前标题"
      },
      "send-message-path": {
        "doc": "会话内消息卡片点击跳转小程序路径",
        "type": "String",
        "default": "当前分享路径"
      },
      "send-message-img": {
        "doc": "会话内消息卡片图片",
        "type": "String",
        "default": "截图"
      },
      "show-message-card": {
        "doc": "显示会话内消息卡片",
        "type": "Boolean",
        "default": false,
        "valid": [
          {
            "value": true
          },
          {
            "value": false
          }
        ]
      },
      "bindcontact": {
        "doc": "客服消息回调",
        "type": "Handler"
      },
      "bindgetphonenumber": {
        "doc": "获取用户手机号回调",
        "type": "Handler"
      },
      "binderrror": {
        "doc": "当使用开放能力时，发生错误的回调",
        "type": "Handler"
      }
    }
  },
  "camera": {
    "link": "https://mp.weixin.qq.com/debug/wxadoc/dev/component/camera.html#camera",
    "attributes": {
      "id": {
        "type": "String",
        "doc": "组件的唯一标示"
      },
      "class": {
        "type": "String",
        "doc": "组件的样式类"
      },
      "style": {
        "type": "String",
        "doc": "组件的内联样式"
      },
      "hidden": {
        "type": "Boolean",
        "doc": "组件是否显示"
      },
      "data-": {
        "type": "Any",
        "doc": "自定义属性"
      },
      "bindtap": {
        "doc": "tap事件绑定，不阻止冒泡"
      },
      "catchtap": {
        "doc": "tap事件绑定，阻止冒泡"
      },
      "bindlongtap": {
        "doc": "longtap事件绑定，不阻止冒泡"
      },
      "catchlongtap": {
        "doc": "longtap事件绑定，阻止冒泡"
      },
      "bindtouchstart": {
        "doc": "touchstart事件绑定，不阻止冒泡"
      },
      "catchtouchstart": {
        "doc": "touchstart事件绑定，阻止冒泡"
      },
      "bindtouchmove": {
        "doc": "touchmove事件绑定，不阻止冒泡"
      },
      "catchtouchmove": {
        "doc": "touchmove事件绑定，阻止冒泡"
      },
      "bindtouchend": {
        "doc": "touchend事件绑定，不阻止冒泡"
      },
      "catchtouchend": {
        "doc": "touchend事件绑定，阻止冒泡"
      },
      "bindtouchcancel": {
        "doc": "touchcancel事件绑定，不阻止冒泡"
      },
      "catchtouchcancel": {
        "doc": "touchcancel事件绑定，阻止冒泡"
      },
      "device-position": {
        "doc": "前置或后置，值为front, back",
        "type": "String",
        "default": "back"
      },
      "flash": {
        "doc": "闪光灯，值为auto, on, off",
        "type": "String",
        "default": "auto"
      },
      "bindstop": {
        "doc": "摄像头在非正常终止时触发，如退出后台等情况",
        "type": "EventHandle"
      },
      "binderror": {
        "doc": "用户不允许使用摄像头时触发",
        "type": "EventHandle"
      }
    }
  },
  "canvas": {
    "link": "https://mp.weixin.qq.com/debug/wxadoc/dev/component/canvas.html#canvas",
    "attributes": {
      "id": {
        "type": "String",
        "doc": "组件的唯一标示"
      },
      "class": {
        "type": "String",
        "doc": "组件的样式类"
      },
      "style": {
        "type": "String",
        "doc": "组件的内联样式"
      },
      "hidden": {
        "type": "Boolean",
        "doc": "组件是否显示"
      },
      "data-": {
        "type": "Any",
        "doc": "自定义属性"
      },
      "bindtap": {
        "doc": "tap事件绑定，不阻止冒泡"
      },
      "catchtap": {
        "doc": "tap事件绑定，阻止冒泡"
      },
      "bindlongtap": {
        "doc": "手指长按 500ms 之后触发，触发了长按事件后进行移动不会触发屏幕的滚动",
        "type": "EventHandle"
      },
      "catchlongtap": {
        "doc": "longtap事件绑定，阻止冒泡"
      },
      "bindtouchstart": {
        "doc": "手指触摸动作开始",
        "type": "EventHandle"
      },
      "catchtouchstart": {
        "doc": "touchstart事件绑定，阻止冒泡"
      },
      "bindtouchmove": {
        "doc": "手指触摸后移动",
        "type": "EventHandle"
      },
      "catchtouchmove": {
        "doc": "touchmove事件绑定，阻止冒泡"
      },
      "bindtouchend": {
        "doc": "手指触摸动作结束",
        "type": "EventHandle"
      },
      "catchtouchend": {
        "doc": "touchend事件绑定，阻止冒泡"
      },
      "bindtouchcancel": {
        "doc": "手指触摸动作被打断，如来电提醒，弹窗",
        "type": "EventHandle"
      },
      "catchtouchcancel": {
        "doc": "touchcancel事件绑定，阻止冒泡"
      },
      "canvas-id": {
        "doc": "canvas 组件的唯一标识符",
        "type": "String"
      },
      "disable-scroll": {
        "doc": "当在 canvas 中移动时且有绑定手势事件时，禁止屏幕滚动以及下拉刷新",
        "type": "Boolean",
        "default": false,
        "valid": [
          {
            "value": true
          },
          {
            "value": false
          }
        ]
      },
      "binderror": {
        "doc": "当发生错误时触发 error 事件，detail = {errMsg: 'something wrong'}",
        "type": "EventHandle"
      }
    }
  },
  "checkbox-group": {
    "link": "https://mp.weixin.qq.com/debug/wxadoc/dev/component/checkbox.html#checkbox-group",
    "attributes": {
      "id": {
        "type": "String",
        "doc": "组件的唯一标示"
      },
      "class": {
        "type": "String",
        "doc": "组件的样式类"
      },
      "style": {
        "type": "String",
        "doc": "组件的内联样式"
      },
      "hidden": {
        "type": "Boolean",
        "doc": "组件是否显示"
      },
      "data-": {
        "type": "Any",
        "doc": "自定义属性"
      },
      "bindtap": {
        "doc": "tap事件绑定，不阻止冒泡"
      },
      "catchtap": {
        "doc": "tap事件绑定，阻止冒泡"
      },
      "bindlongtap": {
        "doc": "longtap事件绑定，不阻止冒泡"
      },
      "catchlongtap": {
        "doc": "longtap事件绑定，阻止冒泡"
      },
      "bindtouchstart": {
        "doc": "touchstart事件绑定，不阻止冒泡"
      },
      "catchtouchstart": {
        "doc": "touchstart事件绑定，阻止冒泡"
      },
      "bindtouchmove": {
        "doc": "touchmove事件绑定，不阻止冒泡"
      },
      "catchtouchmove": {
        "doc": "touchmove事件绑定，阻止冒泡"
      },
      "bindtouchend": {
        "doc": "touchend事件绑定，不阻止冒泡"
      },
      "catchtouchend": {
        "doc": "touchend事件绑定，阻止冒泡"
      },
      "bindtouchcancel": {
        "doc": "touchcancel事件绑定，不阻止冒泡"
      },
      "catchtouchcancel": {
        "doc": "touchcancel事件绑定，阻止冒泡"
      },
      "bindchange": {
        "doc": "`<checkbox-group/>`中选中项发生改变是触发 change 事件，detail = {value:[选中的checkbox的value的数组]}",
        "type": "EventHandle"
      }
    }
  },
  "checkbox": {
    "link": "https://mp.weixin.qq.com/debug/wxadoc/dev/component/checkbox.html#checkbox",
    "attributes": {
      "id": {
        "type": "String",
        "doc": "组件的唯一标示"
      },
      "class": {
        "type": "String",
        "doc": "组件的样式类"
      },
      "style": {
        "type": "String",
        "doc": "组件的内联样式"
      },
      "hidden": {
        "type": "Boolean",
        "doc": "组件是否显示"
      },
      "data-": {
        "type": "Any",
        "doc": "自定义属性"
      },
      "bindtap": {
        "doc": "tap事件绑定，不阻止冒泡"
      },
      "catchtap": {
        "doc": "tap事件绑定，阻止冒泡"
      },
      "bindlongtap": {
        "doc": "longtap事件绑定，不阻止冒泡"
      },
      "catchlongtap": {
        "doc": "longtap事件绑定，阻止冒泡"
      },
      "bindtouchstart": {
        "doc": "touchstart事件绑定，不阻止冒泡"
      },
      "catchtouchstart": {
        "doc": "touchstart事件绑定，阻止冒泡"
      },
      "bindtouchmove": {
        "doc": "touchmove事件绑定，不阻止冒泡"
      },
      "catchtouchmove": {
        "doc": "touchmove事件绑定，阻止冒泡"
      },
      "bindtouchend": {
        "doc": "touchend事件绑定，不阻止冒泡"
      },
      "catchtouchend": {
        "doc": "touchend事件绑定，阻止冒泡"
      },
      "bindtouchcancel": {
        "doc": "touchcancel事件绑定，不阻止冒泡"
      },
      "catchtouchcancel": {
        "doc": "touchcancel事件绑定，阻止冒泡"
      },
      "value": {
        "doc": "`<checkbox/>`标识，选中时触发`<checkbox-group/>`的 change 事件，并携带 `<checkbox/>` 的 value",
        "type": "String"
      },
      "disabled": {
        "doc": "是否禁用",
        "type": "Boolean",
        "default": false,
        "valid": [
          {
            "value": true
          },
          {
            "value": false
          }
        ]
      },
      "checked": {
        "doc": "当前是否选中，可用来设置默认选中",
        "type": "Boolean",
        "default": false,
        "valid": [
          {
            "value": true
          },
          {
            "value": false
          }
        ]
      },
      "color": {
        "doc": "checkbox的颜色，同css的color",
        "type": "Color"
      }
    }
  },
  "contact-button": {
    "link": "https://mp.weixin.qq.com/debug/wxadoc/dev/component/contact.html#contact-button",
    "attributes": {
      "id": {
        "type": "String",
        "doc": "组件的唯一标示"
      },
      "class": {
        "type": "String",
        "doc": "组件的样式类"
      },
      "style": {
        "type": "String",
        "doc": "组件的内联样式"
      },
      "hidden": {
        "type": "Boolean",
        "doc": "组件是否显示"
      },
      "data-": {
        "type": "Any",
        "doc": "自定义属性"
      },
      "bindtap": {
        "doc": "tap事件绑定，不阻止冒泡"
      },
      "catchtap": {
        "doc": "tap事件绑定，阻止冒泡"
      },
      "bindlongtap": {
        "doc": "longtap事件绑定，不阻止冒泡"
      },
      "catchlongtap": {
        "doc": "longtap事件绑定，阻止冒泡"
      },
      "bindtouchstart": {
        "doc": "touchstart事件绑定，不阻止冒泡"
      },
      "catchtouchstart": {
        "doc": "touchstart事件绑定，阻止冒泡"
      },
      "bindtouchmove": {
        "doc": "touchmove事件绑定，不阻止冒泡"
      },
      "catchtouchmove": {
        "doc": "touchmove事件绑定，阻止冒泡"
      },
      "bindtouchend": {
        "doc": "touchend事件绑定，不阻止冒泡"
      },
      "catchtouchend": {
        "doc": "touchend事件绑定，阻止冒泡"
      },
      "bindtouchcancel": {
        "doc": "touchcancel事件绑定，不阻止冒泡"
      },
      "catchtouchcancel": {
        "doc": "touchcancel事件绑定，阻止冒泡"
      },
      "size": {
        "doc": "会话按钮大小，有效值 18-27，单位：px",
        "type": "Number",
        "default": 18
      },
      "type": {
        "doc": "会话按钮的样式类型",
        "type": "String",
        "default": "default-dark",
        "valid": [
          {
            "value": "default-dark",
            "doc": ""
          },
          {
            "value": "default-light",
            "doc": ""
          }
        ]
      },
      "session-from": {
        "doc": "用户从该按钮进入会话时，开发者将收到带上本参数的事件推送。本参数可用于区分用户进入客服会话的来源。",
        "type": "String"
      }
    }
  },
  "cover-view": {
    "link": "https://mp.weixin.qq.com/debug/wxadoc/dev/component/cover.html#cover-view",
    "attributes": {
      "id": {
        "type": "String",
        "doc": "组件的唯一标示"
      },
      "class": {
        "type": "String",
        "doc": "组件的样式类"
      },
      "style": {
        "type": "String",
        "doc": "组件的内联样式"
      },
      "hidden": {
        "type": "Boolean",
        "doc": "组件是否显示"
      },
      "data-": {
        "type": "Any",
        "doc": "自定义属性"
      },
      "bindtap": {
        "doc": "tap事件绑定，不阻止冒泡"
      },
      "catchtap": {
        "doc": "tap事件绑定，阻止冒泡"
      },
      "bindlongtap": {
        "doc": "longtap事件绑定，不阻止冒泡"
      },
      "catchlongtap": {
        "doc": "longtap事件绑定，阻止冒泡"
      },
      "bindtouchstart": {
        "doc": "touchstart事件绑定，不阻止冒泡"
      },
      "catchtouchstart": {
        "doc": "touchstart事件绑定，阻止冒泡"
      },
      "bindtouchmove": {
        "doc": "touchmove事件绑定，不阻止冒泡"
      },
      "catchtouchmove": {
        "doc": "touchmove事件绑定，阻止冒泡"
      },
      "bindtouchend": {
        "doc": "touchend事件绑定，不阻止冒泡"
      },
      "catchtouchend": {
        "doc": "touchend事件绑定，阻止冒泡"
      },
      "bindtouchcancel": {
        "doc": "touchcancel事件绑定，不阻止冒泡"
      },
      "catchtouchcancel": {
        "doc": "touchcancel事件绑定，阻止冒泡"
      },
      "无": {
        "type": ""
      }
    }
  },
  "cover-image": {
    "link": "https://mp.weixin.qq.com/debug/wxadoc/dev/component/cover.html#cover-image",
    "attributes": {
      "id": {
        "type": "String",
        "doc": "组件的唯一标示"
      },
      "class": {
        "type": "String",
        "doc": "组件的样式类"
      },
      "style": {
        "type": "String",
        "doc": "组件的内联样式"
      },
      "hidden": {
        "type": "Boolean",
        "doc": "组件是否显示"
      },
      "data-": {
        "type": "Any",
        "doc": "自定义属性"
      },
      "bindtap": {
        "doc": "tap事件绑定，不阻止冒泡"
      },
      "catchtap": {
        "doc": "tap事件绑定，阻止冒泡"
      },
      "bindlongtap": {
        "doc": "longtap事件绑定，不阻止冒泡"
      },
      "catchlongtap": {
        "doc": "longtap事件绑定，阻止冒泡"
      },
      "bindtouchstart": {
        "doc": "touchstart事件绑定，不阻止冒泡"
      },
      "catchtouchstart": {
        "doc": "touchstart事件绑定，阻止冒泡"
      },
      "bindtouchmove": {
        "doc": "touchmove事件绑定，不阻止冒泡"
      },
      "catchtouchmove": {
        "doc": "touchmove事件绑定，阻止冒泡"
      },
      "bindtouchend": {
        "doc": "touchend事件绑定，不阻止冒泡"
      },
      "catchtouchend": {
        "doc": "touchend事件绑定，阻止冒泡"
      },
      "bindtouchcancel": {
        "doc": "touchcancel事件绑定，不阻止冒泡"
      },
      "catchtouchcancel": {
        "doc": "touchcancel事件绑定，阻止冒泡"
      },
      "src": {
        "doc": "图标路径，支持临时路径、网络地址（1.6.0起支持）。暂不支持base64格式。",
        "type": "String"
      }
    }
  },
  "form": {
    "link": "https://mp.weixin.qq.com/debug/wxadoc/dev/component/form.html#form",
    "attributes": {
      "id": {
        "type": "String",
        "doc": "组件的唯一标示"
      },
      "class": {
        "type": "String",
        "doc": "组件的样式类"
      },
      "style": {
        "type": "String",
        "doc": "组件的内联样式"
      },
      "hidden": {
        "type": "Boolean",
        "doc": "组件是否显示"
      },
      "data-": {
        "type": "Any",
        "doc": "自定义属性"
      },
      "bindtap": {
        "doc": "tap事件绑定，不阻止冒泡"
      },
      "catchtap": {
        "doc": "tap事件绑定，阻止冒泡"
      },
      "bindlongtap": {
        "doc": "longtap事件绑定，不阻止冒泡"
      },
      "catchlongtap": {
        "doc": "longtap事件绑定，阻止冒泡"
      },
      "bindtouchstart": {
        "doc": "touchstart事件绑定，不阻止冒泡"
      },
      "catchtouchstart": {
        "doc": "touchstart事件绑定，阻止冒泡"
      },
      "bindtouchmove": {
        "doc": "touchmove事件绑定，不阻止冒泡"
      },
      "catchtouchmove": {
        "doc": "touchmove事件绑定，阻止冒泡"
      },
      "bindtouchend": {
        "doc": "touchend事件绑定，不阻止冒泡"
      },
      "catchtouchend": {
        "doc": "touchend事件绑定，阻止冒泡"
      },
      "bindtouchcancel": {
        "doc": "touchcancel事件绑定，不阻止冒泡"
      },
      "catchtouchcancel": {
        "doc": "touchcancel事件绑定，阻止冒泡"
      },
      "report-submit": {
        "doc": "是否返回 formId 用于发送[模板消息](../api/notice.md)",
        "type": "Boolean",
        "valid": [
          {
            "value": true
          },
          {
            "value": false
          }
        ]
      },
      "bindsubmit": {
        "doc": "",
        "type": "EventHandle",
        "default": "携带 form 中的数据触发 submit 事件，event.detail = {value : {'name': 'value'} , formId: ''}"
      },
      "bindreset": {
        "doc": "",
        "type": "EventHandle",
        "default": "表单重置时会触发 reset 事件"
      }
    }
  },
  "icon": {
    "link": "https://mp.weixin.qq.com/debug/wxadoc/dev/component/icon.html#icon",
    "attributes": {
      "id": {
        "type": "String",
        "doc": "组件的唯一标示"
      },
      "class": {
        "type": "String",
        "doc": "组件的样式类"
      },
      "style": {
        "type": "String",
        "doc": "组件的内联样式"
      },
      "hidden": {
        "type": "Boolean",
        "doc": "组件是否显示"
      },
      "data-": {
        "type": "Any",
        "doc": "自定义属性"
      },
      "bindtap": {
        "doc": "tap事件绑定，不阻止冒泡"
      },
      "catchtap": {
        "doc": "tap事件绑定，阻止冒泡"
      },
      "bindlongtap": {
        "doc": "longtap事件绑定，不阻止冒泡"
      },
      "catchlongtap": {
        "doc": "longtap事件绑定，阻止冒泡"
      },
      "bindtouchstart": {
        "doc": "touchstart事件绑定，不阻止冒泡"
      },
      "catchtouchstart": {
        "doc": "touchstart事件绑定，阻止冒泡"
      },
      "bindtouchmove": {
        "doc": "touchmove事件绑定，不阻止冒泡"
      },
      "catchtouchmove": {
        "doc": "touchmove事件绑定，阻止冒泡"
      },
      "bindtouchend": {
        "doc": "touchend事件绑定，不阻止冒泡"
      },
      "catchtouchend": {
        "doc": "touchend事件绑定，阻止冒泡"
      },
      "bindtouchcancel": {
        "doc": "touchcancel事件绑定，不阻止冒泡"
      },
      "catchtouchcancel": {
        "doc": "touchcancel事件绑定，阻止冒泡"
      },
      "type": {
        "doc": "icon的类型，有效值：success, success_no_circle, info, warn, waiting, cancel, download, search, clear",
        "type": "String"
      },
      "size": {
        "doc": "icon的大小，单位px",
        "type": "Number",
        "default": 23
      },
      "color": {
        "doc": "icon的颜色，同css的color",
        "type": "Color"
      }
    }
  },
  "image": {
    "link": "https://mp.weixin.qq.com/debug/wxadoc/dev/component/image.html#image",
    "attributes": {
      "id": {
        "type": "String",
        "doc": "组件的唯一标示"
      },
      "class": {
        "type": "String",
        "doc": "组件的样式类"
      },
      "style": {
        "type": "String",
        "doc": "组件的内联样式"
      },
      "hidden": {
        "type": "Boolean",
        "doc": "组件是否显示"
      },
      "data-": {
        "type": "Any",
        "doc": "自定义属性"
      },
      "bindtap": {
        "doc": "tap事件绑定，不阻止冒泡"
      },
      "catchtap": {
        "doc": "tap事件绑定，阻止冒泡"
      },
      "bindlongtap": {
        "doc": "longtap事件绑定，不阻止冒泡"
      },
      "catchlongtap": {
        "doc": "longtap事件绑定，阻止冒泡"
      },
      "bindtouchstart": {
        "doc": "touchstart事件绑定，不阻止冒泡"
      },
      "catchtouchstart": {
        "doc": "touchstart事件绑定，阻止冒泡"
      },
      "bindtouchmove": {
        "doc": "touchmove事件绑定，不阻止冒泡"
      },
      "catchtouchmove": {
        "doc": "touchmove事件绑定，阻止冒泡"
      },
      "bindtouchend": {
        "doc": "touchend事件绑定，不阻止冒泡"
      },
      "catchtouchend": {
        "doc": "touchend事件绑定，阻止冒泡"
      },
      "bindtouchcancel": {
        "doc": "touchcancel事件绑定，不阻止冒泡"
      },
      "catchtouchcancel": {
        "doc": "touchcancel事件绑定，阻止冒泡"
      },
      "src": {
        "doc": "图片资源地址",
        "type": "String"
      },
      "mode": {
        "doc": "图片裁剪、缩放的模式",
        "type": "String",
        "default": "'scaleToFill'",
        "valid": [
          {
            "value": "scaleToFill",
            "doc": "不保持纵横比缩放图片，使图片的宽高完全拉伸至填满 image 元素"
          },
          {
            "value": "aspectFit",
            "doc": "保持纵横比缩放图片，使图片的长边能完全显示出来。也就是说，可以完整地将图片显示出来。"
          },
          {
            "value": "aspectFill",
            "doc": "保持纵横比缩放图片，只保证图片的短边能完全显示出来。也就是说，图片通常只在水平或垂直方向是完整的，另一个方向将会发生截取。"
          },
          {
            "value": "widthFix",
            "doc": "宽度不变，高度自动变化，保持原图宽高比不变"
          },
          {
            "value": "top",
            "doc": "不缩放图片，只显示图片的顶部区域"
          },
          {
            "value": "bottom",
            "doc": "不缩放图片，只显示图片的底部区域"
          },
          {
            "value": "center",
            "doc": "不缩放图片，只显示图片的中间区域"
          },
          {
            "value": "left",
            "doc": "不缩放图片，只显示图片的左边区域"
          },
          {
            "value": "right",
            "doc": "不缩放图片，只显示图片的右边区域"
          },
          {
            "value": "top left",
            "doc": "不缩放图片，只显示图片的左上边区域"
          },
          {
            "value": "top right",
            "doc": "不缩放图片，只显示图片的右上边区域"
          },
          {
            "value": "bottom left",
            "doc": "不缩放图片，只显示图片的左下边区域"
          },
          {
            "value": "bottom right",
            "doc": "不缩放图片，只显示图片的右下边区域"
          }
        ]
      },
      "lazy-load": {
        "doc": "图片懒加载。只针对page与scroll-view下的image有效",
        "type": "Boolean",
        "default": false,
        "valid": [
          {
            "value": true
          },
          {
            "value": false
          }
        ]
      },
      "binderror": {
        "doc": "当错误发生时，发布到 AppService 的事件名，事件对象event.detail = {errMsg: 'something wrong'}",
        "type": "HandleEvent"
      },
      "bindload": {
        "doc": "当图片载入完毕时，发布到 AppService 的事件名，事件对象event.detail = {height:'图片高度px', width:'图片宽度px'}",
        "type": "HandleEvent"
      }
    }
  },
  "input": {
    "link": "https://mp.weixin.qq.com/debug/wxadoc/dev/component/input.html#input",
    "attributes": {
      "id": {
        "type": "String",
        "doc": "组件的唯一标示"
      },
      "class": {
        "type": "String",
        "doc": "组件的样式类"
      },
      "style": {
        "type": "String",
        "doc": "组件的内联样式"
      },
      "hidden": {
        "type": "Boolean",
        "doc": "组件是否显示"
      },
      "data-": {
        "type": "Any",
        "doc": "自定义属性"
      },
      "bindtap": {
        "doc": "tap事件绑定，不阻止冒泡"
      },
      "catchtap": {
        "doc": "tap事件绑定，阻止冒泡"
      },
      "bindlongtap": {
        "doc": "longtap事件绑定，不阻止冒泡"
      },
      "catchlongtap": {
        "doc": "longtap事件绑定，阻止冒泡"
      },
      "bindtouchstart": {
        "doc": "touchstart事件绑定，不阻止冒泡"
      },
      "catchtouchstart": {
        "doc": "touchstart事件绑定，阻止冒泡"
      },
      "bindtouchmove": {
        "doc": "touchmove事件绑定，不阻止冒泡"
      },
      "catchtouchmove": {
        "doc": "touchmove事件绑定，阻止冒泡"
      },
      "bindtouchend": {
        "doc": "touchend事件绑定，不阻止冒泡"
      },
      "catchtouchend": {
        "doc": "touchend事件绑定，阻止冒泡"
      },
      "bindtouchcancel": {
        "doc": "touchcancel事件绑定，不阻止冒泡"
      },
      "catchtouchcancel": {
        "doc": "touchcancel事件绑定，阻止冒泡"
      },
      "value": {
        "doc": "输入框的初始内容",
        "type": "String"
      },
      "type": {
        "doc": "input 的类型",
        "type": "String",
        "default": "\"text\""
      },
      "password": {
        "doc": "是否是密码类型",
        "type": "Boolean",
        "default": false,
        "valid": [
          {
            "value": true
          },
          {
            "value": false
          }
        ]
      },
      "placeholder": {
        "doc": "输入框为空时占位符",
        "type": "String"
      },
      "placeholder-style": {
        "doc": "指定 placeholder 的样式",
        "type": "String"
      },
      "placeholder-class": {
        "doc": "指定 placeholder 的样式类",
        "type": "String",
        "default": "\"input-placeholder\""
      },
      "disabled": {
        "doc": "是否禁用",
        "type": "Boolean",
        "default": false,
        "valid": [
          {
            "value": true
          },
          {
            "value": false
          }
        ]
      },
      "maxlength": {
        "doc": "最大输入长度，设置为 -1 的时候不限制最大长度",
        "type": "Number",
        "default": 140
      },
      "cursor-spacing": {
        "doc": "指定光标与键盘的距离，单位 px 。取 input 距离底部的距离和 cursor-spacing 指定的距离的最小值作为光标与键盘的距离",
        "type": "Number",
        "default": 0
      },
      "auto-focus": {
        "doc": "(即将废弃，请直接使用 focus )自动聚焦，拉起键盘",
        "type": "Boolean",
        "default": false,
        "valid": [
          {
            "value": true
          },
          {
            "value": false
          }
        ]
      },
      "focus": {
        "doc": "获取焦点",
        "type": "Boolean",
        "default": false,
        "valid": [
          {
            "value": true
          },
          {
            "value": false
          }
        ]
      },
      "confirm-type": {
        "doc": "设置键盘右下角按钮的文字",
        "type": "String",
        "default": "\"done\""
      },
      "confirm-hold": {
        "doc": "点击键盘右下角按钮时是否保持键盘不收起",
        "type": "Boolean",
        "default": false,
        "valid": [
          {
            "value": true
          },
          {
            "value": false
          }
        ]
      },
      "cursor": {
        "doc": "指定focus时的光标位置",
        "type": "Number"
      },
      "selection-start": {
        "doc": "光标起始位置，自动聚集时有效，需与selection-end搭配使用",
        "type": "Number",
        "default": -1
      },
      "selection-end": {
        "doc": "光标结束位置，自动聚集时有效，需与selection-start搭配使用",
        "type": "Number",
        "default": -1
      },
      "bindinput": {
        "doc": "当键盘输入时，触发input事件，event.detail = {value, cursor}，处理函数可以直接 return 一个字符串，将替换输入框的内容。",
        "type": "EventHandle"
      },
      "bindfocus": {
        "doc": "输入框聚焦时触发，event.detail = {value: value}",
        "type": "EventHandle"
      },
      "bindblur": {
        "doc": "输入框失去焦点时触发，event.detail = {value: value}",
        "type": "EventHandle"
      },
      "bindconfirm": {
        "doc": "点击完成按钮时触发，event.detail = {value: value}",
        "type": "EventHandle"
      }
    }
  },
  "label": {
    "link": "https://mp.weixin.qq.com/debug/wxadoc/dev/component/label.html#label",
    "attributes": {
      "id": {
        "type": "String",
        "doc": "组件的唯一标示"
      },
      "class": {
        "type": "String",
        "doc": "组件的样式类"
      },
      "style": {
        "type": "String",
        "doc": "组件的内联样式"
      },
      "hidden": {
        "type": "Boolean",
        "doc": "组件是否显示"
      },
      "data-": {
        "type": "Any",
        "doc": "自定义属性"
      },
      "bindtap": {
        "doc": "tap事件绑定，不阻止冒泡"
      },
      "catchtap": {
        "doc": "tap事件绑定，阻止冒泡"
      },
      "bindlongtap": {
        "doc": "longtap事件绑定，不阻止冒泡"
      },
      "catchlongtap": {
        "doc": "longtap事件绑定，阻止冒泡"
      },
      "bindtouchstart": {
        "doc": "touchstart事件绑定，不阻止冒泡"
      },
      "catchtouchstart": {
        "doc": "touchstart事件绑定，阻止冒泡"
      },
      "bindtouchmove": {
        "doc": "touchmove事件绑定，不阻止冒泡"
      },
      "catchtouchmove": {
        "doc": "touchmove事件绑定，阻止冒泡"
      },
      "bindtouchend": {
        "doc": "touchend事件绑定，不阻止冒泡"
      },
      "catchtouchend": {
        "doc": "touchend事件绑定，阻止冒泡"
      },
      "bindtouchcancel": {
        "doc": "touchcancel事件绑定，不阻止冒泡"
      },
      "catchtouchcancel": {
        "doc": "touchcancel事件绑定，阻止冒泡"
      },
      "for": {
        "type": "String",
        "default": "绑定控件的 id"
      }
    }
  },
  "live-player": {
    "link": "https://mp.weixin.qq.com/debug/wxadoc/dev/component/live.html#live-player",
    "attributes": {
      "id": {
        "type": "String",
        "doc": "组件的唯一标示"
      },
      "class": {
        "type": "String",
        "doc": "组件的样式类"
      },
      "style": {
        "type": "String",
        "doc": "组件的内联样式"
      },
      "hidden": {
        "type": "Boolean",
        "doc": "组件是否显示"
      },
      "data-": {
        "type": "Any",
        "doc": "自定义属性"
      },
      "bindtap": {
        "doc": "tap事件绑定，不阻止冒泡"
      },
      "catchtap": {
        "doc": "tap事件绑定，阻止冒泡"
      },
      "bindlongtap": {
        "doc": "longtap事件绑定，不阻止冒泡"
      },
      "catchlongtap": {
        "doc": "longtap事件绑定，阻止冒泡"
      },
      "bindtouchstart": {
        "doc": "touchstart事件绑定，不阻止冒泡"
      },
      "catchtouchstart": {
        "doc": "touchstart事件绑定，阻止冒泡"
      },
      "bindtouchmove": {
        "doc": "touchmove事件绑定，不阻止冒泡"
      },
      "catchtouchmove": {
        "doc": "touchmove事件绑定，阻止冒泡"
      },
      "bindtouchend": {
        "doc": "touchend事件绑定，不阻止冒泡"
      },
      "catchtouchend": {
        "doc": "touchend事件绑定，阻止冒泡"
      },
      "bindtouchcancel": {
        "doc": "touchcancel事件绑定，不阻止冒泡"
      },
      "catchtouchcancel": {
        "doc": "touchcancel事件绑定，阻止冒泡"
      },
      "社交": {
        "type": "直播"
      },
      "教育": {
        "type": "在线教育"
      },
      "医疗": {
        "type": "互联网医院，公立医院"
      },
      "政务民生": {
        "type": "所有二级类目"
      },
      "金融": {
        "type": "基金、信托、保险、银行、证券/期货、非金融机构自营小额贷款、征信业务、消费金融"
      }
    }
  },
  "live-pusher": {
    "link": "https://mp.weixin.qq.com/debug/wxadoc/dev/component/live.html#live-pusher",
    "attributes": {
      "id": {
        "type": "String",
        "doc": "组件的唯一标示"
      },
      "class": {
        "type": "String",
        "doc": "组件的样式类"
      },
      "style": {
        "type": "String",
        "doc": "组件的内联样式"
      },
      "hidden": {
        "type": "Boolean",
        "doc": "组件是否显示"
      },
      "data-": {
        "type": "Any",
        "doc": "自定义属性"
      },
      "bindtap": {
        "doc": "tap事件绑定，不阻止冒泡"
      },
      "catchtap": {
        "doc": "tap事件绑定，阻止冒泡"
      },
      "bindlongtap": {
        "doc": "longtap事件绑定，不阻止冒泡"
      },
      "catchlongtap": {
        "doc": "longtap事件绑定，阻止冒泡"
      },
      "bindtouchstart": {
        "doc": "touchstart事件绑定，不阻止冒泡"
      },
      "catchtouchstart": {
        "doc": "touchstart事件绑定，阻止冒泡"
      },
      "bindtouchmove": {
        "doc": "touchmove事件绑定，不阻止冒泡"
      },
      "catchtouchmove": {
        "doc": "touchmove事件绑定，阻止冒泡"
      },
      "bindtouchend": {
        "doc": "touchend事件绑定，不阻止冒泡"
      },
      "catchtouchend": {
        "doc": "touchend事件绑定，阻止冒泡"
      },
      "bindtouchcancel": {
        "doc": "touchcancel事件绑定，不阻止冒泡"
      },
      "catchtouchcancel": {
        "doc": "touchcancel事件绑定，阻止冒泡"
      },
      "社交": {
        "type": "直播"
      },
      "教育": {
        "type": "在线教育"
      },
      "医疗": {
        "type": "互联网医院，公立医院"
      },
      "政务民生": {
        "type": "所有二级类目"
      },
      "金融": {
        "type": "基金、信托、保险、银行、证券/期货、非金融机构自营小额贷款、征信业务、消费金融"
      }
    }
  },
  "map": {
    "link": "https://mp.weixin.qq.com/debug/wxadoc/dev/component/map.html#map",
    "attributes": {
      "id": {
        "type": "String",
        "doc": "组件的唯一标示"
      },
      "class": {
        "type": "String",
        "doc": "组件的样式类"
      },
      "style": {
        "type": "String",
        "doc": "组件的内联样式"
      },
      "hidden": {
        "type": "Boolean",
        "doc": "组件是否显示"
      },
      "data-": {
        "type": "Any",
        "doc": "自定义属性"
      },
      "bindtap": {
        "doc": "点击地图时触发",
        "type": "EventHandle"
      },
      "catchtap": {
        "doc": "tap事件绑定，阻止冒泡"
      },
      "bindlongtap": {
        "doc": "longtap事件绑定，不阻止冒泡"
      },
      "catchlongtap": {
        "doc": "longtap事件绑定，阻止冒泡"
      },
      "bindtouchstart": {
        "doc": "touchstart事件绑定，不阻止冒泡"
      },
      "catchtouchstart": {
        "doc": "touchstart事件绑定，阻止冒泡"
      },
      "bindtouchmove": {
        "doc": "touchmove事件绑定，不阻止冒泡"
      },
      "catchtouchmove": {
        "doc": "touchmove事件绑定，阻止冒泡"
      },
      "bindtouchend": {
        "doc": "touchend事件绑定，不阻止冒泡"
      },
      "catchtouchend": {
        "doc": "touchend事件绑定，阻止冒泡"
      },
      "bindtouchcancel": {
        "doc": "touchcancel事件绑定，不阻止冒泡"
      },
      "catchtouchcancel": {
        "doc": "touchcancel事件绑定，阻止冒泡"
      },
      "longitude": {
        "doc": "中心经度",
        "type": "Number"
      },
      "latitude": {
        "doc": "中心纬度",
        "type": "Number"
      },
      "scale": {
        "doc": "缩放级别，取值范围为5-18",
        "type": "Number",
        "default": 16
      },
      "markers": {
        "doc": "标记点",
        "type": "Array"
      },
      "covers": {
        "doc": "**即将移除，请使用 markers**",
        "type": "Array"
      },
      "polyline": {
        "doc": "路线",
        "type": "Array"
      },
      "circles": {
        "doc": "圆",
        "type": "Array"
      },
      "controls": {
        "doc": "控件",
        "type": "Array"
      },
      "include-points": {
        "doc": "缩放视野以包含所有给定的坐标点",
        "type": "Array"
      },
      "show-location": {
        "doc": "显示带有方向的当前定位点",
        "type": "Boolean",
        "valid": [
          {
            "value": true
          },
          {
            "value": false
          }
        ]
      },
      "bindmarkertap": {
        "doc": "点击标记点时触发",
        "type": "EventHandle"
      },
      "bindcallouttap": {
        "doc": "点击标记点对应的气泡时触发",
        "type": "EventHandle"
      },
      "bindcontroltap": {
        "doc": "点击控件时触发",
        "type": "EventHandle"
      },
      "bindregionchange": {
        "doc": "视野发生变化时触发",
        "type": "EventHandle"
      },
      "bindupdated": {
        "doc": "在地图渲染更新完成时触发",
        "type": "EventHandle"
      }
    }
  },
  "movable-area": {
    "link": "https://mp.weixin.qq.com/debug/wxadoc/dev/component/movable.html#movable-area",
    "attributes": {
      "id": {
        "type": "String",
        "doc": "组件的唯一标示"
      },
      "class": {
        "type": "String",
        "doc": "组件的样式类"
      },
      "style": {
        "type": "String",
        "doc": "组件的内联样式"
      },
      "hidden": {
        "type": "Boolean",
        "doc": "组件是否显示"
      },
      "data-": {
        "type": "Any",
        "doc": "自定义属性"
      },
      "bindtap": {
        "doc": "tap事件绑定，不阻止冒泡"
      },
      "catchtap": {
        "doc": "tap事件绑定，阻止冒泡"
      },
      "bindlongtap": {
        "doc": "longtap事件绑定，不阻止冒泡"
      },
      "catchlongtap": {
        "doc": "longtap事件绑定，阻止冒泡"
      },
      "bindtouchstart": {
        "doc": "touchstart事件绑定，不阻止冒泡"
      },
      "catchtouchstart": {
        "doc": "touchstart事件绑定，阻止冒泡"
      },
      "bindtouchmove": {
        "doc": "touchmove事件绑定，不阻止冒泡"
      },
      "catchtouchmove": {
        "doc": "touchmove事件绑定，阻止冒泡"
      },
      "bindtouchend": {
        "doc": "touchend事件绑定，不阻止冒泡"
      },
      "catchtouchend": {
        "doc": "touchend事件绑定，阻止冒泡"
      },
      "bindtouchcancel": {
        "doc": "touchcancel事件绑定，不阻止冒泡"
      },
      "catchtouchcancel": {
        "doc": "touchcancel事件绑定，阻止冒泡"
      },
      "direction": {
        "doc": "movable-view的移动方向，属性值有all、vertical、horizontal、none",
        "type": "String",
        "default": "none"
      },
      "inertia": {
        "doc": "movable-view是否带有惯性",
        "type": "Boolean",
        "default": false,
        "valid": [
          {
            "value": true
          },
          {
            "value": false
          }
        ]
      },
      "out-of-bounds": {
        "doc": "超过可移动区域后，movable-view是否还可以移动",
        "type": "Boolean",
        "default": false,
        "valid": [
          {
            "value": true
          },
          {
            "value": false
          }
        ]
      },
      "x": {
        "doc": "定义x轴方向的偏移，如果x的值不在可移动范围内，会自动移动到可移动范围；改变x的值会触发动画",
        "type": "Number"
      },
      "y": {
        "doc": "定义y轴方向的偏移，如果y的值不在可移动范围内，会自动移动到可移动范围；改变y的值会触发动画",
        "type": "Number"
      },
      "damping": {
        "doc": "阻尼系数，用于控制x或y改变时的动画和过界回弹的动画，值越大移动越快",
        "type": "Number",
        "default": 20
      },
      "friction": {
        "doc": "摩擦系数，用于控制惯性滑动的动画，值越大摩擦力越大，滑动越快停止；必须大于0，否则会被设置成默认值",
        "type": "Number",
        "default": 2
      }
    }
  },
  "movable-view": {
    "link": "https://mp.weixin.qq.com/debug/wxadoc/dev/component/movable.html#movable-view",
    "attributes": {
      "id": {
        "type": "String",
        "doc": "组件的唯一标示"
      },
      "class": {
        "type": "String",
        "doc": "组件的样式类"
      },
      "style": {
        "type": "String",
        "doc": "组件的内联样式"
      },
      "hidden": {
        "type": "Boolean",
        "doc": "组件是否显示"
      },
      "data-": {
        "type": "Any",
        "doc": "自定义属性"
      },
      "bindtap": {
        "doc": "tap事件绑定，不阻止冒泡"
      },
      "catchtap": {
        "doc": "tap事件绑定，阻止冒泡"
      },
      "bindlongtap": {
        "doc": "longtap事件绑定，不阻止冒泡"
      },
      "catchlongtap": {
        "doc": "longtap事件绑定，阻止冒泡"
      },
      "bindtouchstart": {
        "doc": "touchstart事件绑定，不阻止冒泡"
      },
      "catchtouchstart": {
        "doc": "touchstart事件绑定，阻止冒泡"
      },
      "bindtouchmove": {
        "doc": "touchmove事件绑定，不阻止冒泡"
      },
      "catchtouchmove": {
        "doc": "touchmove事件绑定，阻止冒泡"
      },
      "bindtouchend": {
        "doc": "touchend事件绑定，不阻止冒泡"
      },
      "catchtouchend": {
        "doc": "touchend事件绑定，阻止冒泡"
      },
      "bindtouchcancel": {
        "doc": "touchcancel事件绑定，不阻止冒泡"
      },
      "catchtouchcancel": {
        "doc": "touchcancel事件绑定，阻止冒泡"
      },
      "direction": {
        "doc": "movable-view的移动方向，属性值有all、vertical、horizontal、none",
        "type": "String",
        "default": "none"
      },
      "inertia": {
        "doc": "movable-view是否带有惯性",
        "type": "Boolean",
        "default": false,
        "valid": [
          {
            "value": true
          },
          {
            "value": false
          }
        ]
      },
      "out-of-bounds": {
        "doc": "超过可移动区域后，movable-view是否还可以移动",
        "type": "Boolean",
        "default": false,
        "valid": [
          {
            "value": true
          },
          {
            "value": false
          }
        ]
      },
      "x": {
        "doc": "定义x轴方向的偏移，如果x的值不在可移动范围内，会自动移动到可移动范围；改变x的值会触发动画",
        "type": "Number"
      },
      "y": {
        "doc": "定义y轴方向的偏移，如果y的值不在可移动范围内，会自动移动到可移动范围；改变y的值会触发动画",
        "type": "Number"
      },
      "damping": {
        "doc": "阻尼系数，用于控制x或y改变时的动画和过界回弹的动画，值越大移动越快",
        "type": "Number",
        "default": 20
      },
      "friction": {
        "doc": "摩擦系数，用于控制惯性滑动的动画，值越大摩擦力越大，滑动越快停止；必须大于0，否则会被设置成默认值",
        "type": "Number",
        "default": 2
      }
    }
  },
  "navigator": {
    "link": "https://mp.weixin.qq.com/debug/wxadoc/dev/component/navigator.html#navigator",
    "attributes": {
      "id": {
        "type": "String",
        "doc": "组件的唯一标示"
      },
      "class": {
        "type": "String",
        "doc": "组件的样式类"
      },
      "style": {
        "type": "String",
        "doc": "组件的内联样式"
      },
      "hidden": {
        "type": "Boolean",
        "doc": "组件是否显示"
      },
      "data-": {
        "type": "Any",
        "doc": "自定义属性"
      },
      "bindtap": {
        "doc": "tap事件绑定，不阻止冒泡"
      },
      "catchtap": {
        "doc": "tap事件绑定，阻止冒泡"
      },
      "bindlongtap": {
        "doc": "longtap事件绑定，不阻止冒泡"
      },
      "catchlongtap": {
        "doc": "longtap事件绑定，阻止冒泡"
      },
      "bindtouchstart": {
        "doc": "touchstart事件绑定，不阻止冒泡"
      },
      "catchtouchstart": {
        "doc": "touchstart事件绑定，阻止冒泡"
      },
      "bindtouchmove": {
        "doc": "touchmove事件绑定，不阻止冒泡"
      },
      "catchtouchmove": {
        "doc": "touchmove事件绑定，阻止冒泡"
      },
      "bindtouchend": {
        "doc": "touchend事件绑定，不阻止冒泡"
      },
      "catchtouchend": {
        "doc": "touchend事件绑定，阻止冒泡"
      },
      "bindtouchcancel": {
        "doc": "touchcancel事件绑定，不阻止冒泡"
      },
      "catchtouchcancel": {
        "doc": "touchcancel事件绑定，阻止冒泡"
      },
      "url": {
        "doc": "应用内的跳转链接",
        "type": "String"
      },
      "open-type": {
        "doc": "跳转方式",
        "type": "String",
        "default": "navigate",
        "valid": [
          {
            "value": "navigate",
            "doc": "对应 `wx.navigateTo` 的功能"
          },
          {
            "value": "redirect",
            "doc": "对应 `wx.redirectTo` 的功能"
          },
          {
            "value": "switchTab",
            "doc": "对应 `wx.switchTab` 的功能"
          },
          {
            "value": "reLaunch",
            "doc": "对应 `wx.reLaunch` 的功能"
          },
          {
            "value": "navigateBack",
            "doc": "对应 `wx.navigateBack` 的功能"
          }
        ]
      },
      "delta": {
        "doc": "当 open-type 为 'navigateBack' 时有效，表示回退的层数",
        "type": "Number"
      },
      "hover-class": {
        "doc": "指定点击时的样式类，当`hover-class=\"none\"`时，没有点击态效果",
        "type": "String",
        "default": "navigator-hover"
      },
      "hover-stop-propagation": {
        "doc": "指定是否阻止本节点的祖先节点出现点击态",
        "type": "Boolean",
        "default": false,
        "valid": [
          {
            "value": true
          },
          {
            "value": false
          }
        ]
      },
      "hover-start-time": {
        "doc": "按住后多久出现点击态，单位毫秒",
        "type": "Number",
        "default": 50
      },
      "hover-stay-time": {
        "doc": "手指松开后点击态保留时间，单位毫秒",
        "type": "Number",
        "default": 600
      }
    }
  },
  "open-data": {
    "link": "https://mp.weixin.qq.com/debug/wxadoc/dev/component/open.html#open-data",
    "attributes": {
      "id": {
        "type": "String",
        "doc": "组件的唯一标示"
      },
      "class": {
        "type": "String",
        "doc": "组件的样式类"
      },
      "style": {
        "type": "String",
        "doc": "组件的内联样式"
      },
      "hidden": {
        "type": "Boolean",
        "doc": "组件是否显示"
      },
      "data-": {
        "type": "Any",
        "doc": "自定义属性"
      },
      "bindtap": {
        "doc": "tap事件绑定，不阻止冒泡"
      },
      "catchtap": {
        "doc": "tap事件绑定，阻止冒泡"
      },
      "bindlongtap": {
        "doc": "longtap事件绑定，不阻止冒泡"
      },
      "catchlongtap": {
        "doc": "longtap事件绑定，阻止冒泡"
      },
      "bindtouchstart": {
        "doc": "touchstart事件绑定，不阻止冒泡"
      },
      "catchtouchstart": {
        "doc": "touchstart事件绑定，阻止冒泡"
      },
      "bindtouchmove": {
        "doc": "touchmove事件绑定，不阻止冒泡"
      },
      "catchtouchmove": {
        "doc": "touchmove事件绑定，阻止冒泡"
      },
      "bindtouchend": {
        "doc": "touchend事件绑定，不阻止冒泡"
      },
      "catchtouchend": {
        "doc": "touchend事件绑定，阻止冒泡"
      },
      "bindtouchcancel": {
        "doc": "touchcancel事件绑定，不阻止冒泡"
      },
      "catchtouchcancel": {
        "doc": "touchcancel事件绑定，阻止冒泡"
      },
      "type": {
        "doc": "开放数据类型",
        "type": "String",
        "valid": [
          {
            "value": "groupName",
            "doc": "拉取群名称"
          }
        ]
      },
      "open-gid": {
        "doc": "当 type=\"groupName\" 时生效, 群id",
        "type": "String"
      }
    }
  },
  "picker-view": {
    "link": "https://mp.weixin.qq.com/debug/wxadoc/dev/component/picker.html#picker-view",
    "attributes": {
      "id": {
        "type": "String",
        "doc": "组件的唯一标示"
      },
      "class": {
        "type": "String",
        "doc": "组件的样式类"
      },
      "style": {
        "type": "String",
        "doc": "组件的内联样式"
      },
      "hidden": {
        "type": "Boolean",
        "doc": "组件是否显示"
      },
      "data-": {
        "type": "Any",
        "doc": "自定义属性"
      },
      "bindtap": {
        "doc": "tap事件绑定，不阻止冒泡"
      },
      "catchtap": {
        "doc": "tap事件绑定，阻止冒泡"
      },
      "bindlongtap": {
        "doc": "longtap事件绑定，不阻止冒泡"
      },
      "catchlongtap": {
        "doc": "longtap事件绑定，阻止冒泡"
      },
      "bindtouchstart": {
        "doc": "touchstart事件绑定，不阻止冒泡"
      },
      "catchtouchstart": {
        "doc": "touchstart事件绑定，阻止冒泡"
      },
      "bindtouchmove": {
        "doc": "touchmove事件绑定，不阻止冒泡"
      },
      "catchtouchmove": {
        "doc": "touchmove事件绑定，阻止冒泡"
      },
      "bindtouchend": {
        "doc": "touchend事件绑定，不阻止冒泡"
      },
      "catchtouchend": {
        "doc": "touchend事件绑定，阻止冒泡"
      },
      "bindtouchcancel": {
        "doc": "touchcancel事件绑定，不阻止冒泡"
      },
      "catchtouchcancel": {
        "doc": "touchcancel事件绑定，阻止冒泡"
      },
      "value": {
        "doc": "数组中的数字依次表示 picker-view 内的 picker-view-colume 选择的第几项（下标从 0 开始），数字大于 picker-view-column 可选项长度时，选择最后一项。",
        "type": "NumberArray"
      },
      "indicator-style": {
        "doc": "",
        "type": "String",
        "default": "设置选择器中间选中框的样式"
      },
      "indicator-class": {
        "doc": "{% version('1.1.0') %}",
        "type": "String",
        "default": "设置选择器中间选中框的类名"
      },
      "mask-style": {
        "doc": "{% version('1.5.0') %}",
        "type": "String",
        "default": "设置蒙层的样式"
      },
      "mask-class": {
        "doc": "{% version('1.5.0') %}",
        "type": "String",
        "default": "设置蒙层的类名"
      },
      "bindchange": {
        "doc": "",
        "type": "EventHandle",
        "default": "当滚动选择，value 改变时触发 change 事件，event.detail = {value: value}；value为数组，表示 picker-view 内的 picker-view-column 当前选择的是第几项（下标从 0 开始）"
      }
    }
  },
  "picker": {
    "link": "https://mp.weixin.qq.com/debug/wxadoc/dev/component/picker.html#picker",
    "attributes": {
      "id": {
        "type": "String",
        "doc": "组件的唯一标示"
      },
      "class": {
        "type": "String",
        "doc": "组件的样式类"
      },
      "style": {
        "type": "String",
        "doc": "组件的内联样式"
      },
      "hidden": {
        "type": "Boolean",
        "doc": "组件是否显示"
      },
      "data-": {
        "type": "Any",
        "doc": "自定义属性"
      },
      "bindtap": {
        "doc": "tap事件绑定，不阻止冒泡"
      },
      "catchtap": {
        "doc": "tap事件绑定，阻止冒泡"
      },
      "bindlongtap": {
        "doc": "longtap事件绑定，不阻止冒泡"
      },
      "catchlongtap": {
        "doc": "longtap事件绑定，阻止冒泡"
      },
      "bindtouchstart": {
        "doc": "touchstart事件绑定，不阻止冒泡"
      },
      "catchtouchstart": {
        "doc": "touchstart事件绑定，阻止冒泡"
      },
      "bindtouchmove": {
        "doc": "touchmove事件绑定，不阻止冒泡"
      },
      "catchtouchmove": {
        "doc": "touchmove事件绑定，阻止冒泡"
      },
      "bindtouchend": {
        "doc": "touchend事件绑定，不阻止冒泡"
      },
      "catchtouchend": {
        "doc": "touchend事件绑定，阻止冒泡"
      },
      "bindtouchcancel": {
        "doc": "touchcancel事件绑定，不阻止冒泡"
      },
      "catchtouchcancel": {
        "doc": "touchcancel事件绑定，阻止冒泡"
      },
      "range": {
        "doc": "mode为 selector 或 multiSelector 时，range 有效",
        "type": "Array / Object Array",
        "default": "[]"
      },
      "range-key": {
        "doc": "当 range 是一个 Object Array 时，通过 range-key 来指定 Object 中 key 的值作为选择器显示内容",
        "type": "String"
      },
      "value": {
        "doc": "value 的值表示选择了 range 中的第几个（下标从 0 开始）",
        "type": "Number",
        "default": 0
      },
      "bindchange": {
        "doc": "value 改变时触发 change 事件，event.detail = {value: value}",
        "type": "EventHandle"
      },
      "disabled": {
        "doc": "是否禁用",
        "type": "Boolean",
        "default": false,
        "valid": [
          {
            "value": true
          },
          {
            "value": false
          }
        ]
      }
    }
  },
  "progress": {
    "link": "https://mp.weixin.qq.com/debug/wxadoc/dev/component/progress.html#progress",
    "attributes": {
      "id": {
        "type": "String",
        "doc": "组件的唯一标示"
      },
      "class": {
        "type": "String",
        "doc": "组件的样式类"
      },
      "style": {
        "type": "String",
        "doc": "组件的内联样式"
      },
      "hidden": {
        "type": "Boolean",
        "doc": "组件是否显示"
      },
      "data-": {
        "type": "Any",
        "doc": "自定义属性"
      },
      "bindtap": {
        "doc": "tap事件绑定，不阻止冒泡"
      },
      "catchtap": {
        "doc": "tap事件绑定，阻止冒泡"
      },
      "bindlongtap": {
        "doc": "longtap事件绑定，不阻止冒泡"
      },
      "catchlongtap": {
        "doc": "longtap事件绑定，阻止冒泡"
      },
      "bindtouchstart": {
        "doc": "touchstart事件绑定，不阻止冒泡"
      },
      "catchtouchstart": {
        "doc": "touchstart事件绑定，阻止冒泡"
      },
      "bindtouchmove": {
        "doc": "touchmove事件绑定，不阻止冒泡"
      },
      "catchtouchmove": {
        "doc": "touchmove事件绑定，阻止冒泡"
      },
      "bindtouchend": {
        "doc": "touchend事件绑定，不阻止冒泡"
      },
      "catchtouchend": {
        "doc": "touchend事件绑定，阻止冒泡"
      },
      "bindtouchcancel": {
        "doc": "touchcancel事件绑定，不阻止冒泡"
      },
      "catchtouchcancel": {
        "doc": "touchcancel事件绑定，阻止冒泡"
      },
      "percent": {
        "doc": "百分比0~100",
        "type": "Float",
        "default": "无"
      },
      "show-info": {
        "doc": "在进度条右侧显示百分比",
        "type": "Boolean",
        "default": false,
        "valid": [
          {
            "value": true
          },
          {
            "value": false
          }
        ]
      },
      "stroke-width": {
        "doc": "进度条线的宽度，单位px",
        "type": "Number",
        "default": 6
      },
      "color": {
        "doc": "进度条颜色 （请使用 activeColor）",
        "type": "Color",
        "default": "#09BB07"
      },
      "activeColor": {
        "doc": "已选择的进度条的颜色",
        "type": "Color"
      },
      "backgroundColor": {
        "doc": "未选择的进度条的颜色",
        "type": "Color"
      },
      "active": {
        "doc": "进度条从左往右的动画",
        "type": "Boolean",
        "default": false,
        "valid": [
          {
            "value": true
          },
          {
            "value": false
          }
        ]
      },
      "active-mode": {
        "doc": "backwards: 动画从头播；forwards：动画从上次结束点接着播",
        "type": "String",
        "default": "backwards"
      }
    }
  },
  "radio-group": {
    "link": "https://mp.weixin.qq.com/debug/wxadoc/dev/component/radio.html#radio-group",
    "attributes": {
      "id": {
        "type": "String",
        "doc": "组件的唯一标示"
      },
      "class": {
        "type": "String",
        "doc": "组件的样式类"
      },
      "style": {
        "type": "String",
        "doc": "组件的内联样式"
      },
      "hidden": {
        "type": "Boolean",
        "doc": "组件是否显示"
      },
      "data-": {
        "type": "Any",
        "doc": "自定义属性"
      },
      "bindtap": {
        "doc": "tap事件绑定，不阻止冒泡"
      },
      "catchtap": {
        "doc": "tap事件绑定，阻止冒泡"
      },
      "bindlongtap": {
        "doc": "longtap事件绑定，不阻止冒泡"
      },
      "catchlongtap": {
        "doc": "longtap事件绑定，阻止冒泡"
      },
      "bindtouchstart": {
        "doc": "touchstart事件绑定，不阻止冒泡"
      },
      "catchtouchstart": {
        "doc": "touchstart事件绑定，阻止冒泡"
      },
      "bindtouchmove": {
        "doc": "touchmove事件绑定，不阻止冒泡"
      },
      "catchtouchmove": {
        "doc": "touchmove事件绑定，阻止冒泡"
      },
      "bindtouchend": {
        "doc": "touchend事件绑定，不阻止冒泡"
      },
      "catchtouchend": {
        "doc": "touchend事件绑定，阻止冒泡"
      },
      "bindtouchcancel": {
        "doc": "touchcancel事件绑定，不阻止冒泡"
      },
      "catchtouchcancel": {
        "doc": "touchcancel事件绑定，阻止冒泡"
      },
      "bindchange": {
        "doc": "`<radio-group/>` 中的选中项发生变化时触发 change 事件，event.detail = {value: 选中项radio的value}",
        "type": "EventHandle"
      }
    }
  },
  "radio": {
    "link": "https://mp.weixin.qq.com/debug/wxadoc/dev/component/radio.html#radio",
    "attributes": {
      "id": {
        "type": "String",
        "doc": "组件的唯一标示"
      },
      "class": {
        "type": "String",
        "doc": "组件的样式类"
      },
      "style": {
        "type": "String",
        "doc": "组件的内联样式"
      },
      "hidden": {
        "type": "Boolean",
        "doc": "组件是否显示"
      },
      "data-": {
        "type": "Any",
        "doc": "自定义属性"
      },
      "bindtap": {
        "doc": "tap事件绑定，不阻止冒泡"
      },
      "catchtap": {
        "doc": "tap事件绑定，阻止冒泡"
      },
      "bindlongtap": {
        "doc": "longtap事件绑定，不阻止冒泡"
      },
      "catchlongtap": {
        "doc": "longtap事件绑定，阻止冒泡"
      },
      "bindtouchstart": {
        "doc": "touchstart事件绑定，不阻止冒泡"
      },
      "catchtouchstart": {
        "doc": "touchstart事件绑定，阻止冒泡"
      },
      "bindtouchmove": {
        "doc": "touchmove事件绑定，不阻止冒泡"
      },
      "catchtouchmove": {
        "doc": "touchmove事件绑定，阻止冒泡"
      },
      "bindtouchend": {
        "doc": "touchend事件绑定，不阻止冒泡"
      },
      "catchtouchend": {
        "doc": "touchend事件绑定，阻止冒泡"
      },
      "bindtouchcancel": {
        "doc": "touchcancel事件绑定，不阻止冒泡"
      },
      "catchtouchcancel": {
        "doc": "touchcancel事件绑定，阻止冒泡"
      },
      "value": {
        "doc": "`<radio/>` 标识。当该`<radio/>` 选中时，`<radio-group/>` 的 change 事件会携带`<radio/>`的value",
        "type": "String"
      },
      "checked": {
        "doc": "当前是否选中",
        "type": "Boolean",
        "default": false,
        "valid": [
          {
            "value": true
          },
          {
            "value": false
          }
        ]
      },
      "disabled": {
        "doc": "是否禁用",
        "type": "Boolean",
        "default": false,
        "valid": [
          {
            "value": true
          },
          {
            "value": false
          }
        ]
      },
      "color": {
        "doc": "radio的颜色，同css的color",
        "type": "Color"
      }
    }
  },
  "rich-text": {
    "link": "https://mp.weixin.qq.com/debug/wxadoc/dev/component/rich.html#rich-text",
    "attributes": {
      "id": {
        "type": "String",
        "doc": "组件的唯一标示"
      },
      "class": {
        "type": "String",
        "doc": "组件的样式类"
      },
      "style": {
        "type": "String",
        "doc": "组件的内联样式"
      },
      "hidden": {
        "type": "Boolean",
        "doc": "组件是否显示"
      },
      "data-": {
        "type": "Any",
        "doc": "自定义属性"
      },
      "bindtap": {
        "doc": "tap事件绑定，不阻止冒泡"
      },
      "catchtap": {
        "doc": "tap事件绑定，阻止冒泡"
      },
      "bindlongtap": {
        "doc": "longtap事件绑定，不阻止冒泡"
      },
      "catchlongtap": {
        "doc": "longtap事件绑定，阻止冒泡"
      },
      "bindtouchstart": {
        "doc": "touchstart事件绑定，不阻止冒泡"
      },
      "catchtouchstart": {
        "doc": "touchstart事件绑定，阻止冒泡"
      },
      "bindtouchmove": {
        "doc": "touchmove事件绑定，不阻止冒泡"
      },
      "catchtouchmove": {
        "doc": "touchmove事件绑定，阻止冒泡"
      },
      "bindtouchend": {
        "doc": "touchend事件绑定，不阻止冒泡"
      },
      "catchtouchend": {
        "doc": "touchend事件绑定，阻止冒泡"
      },
      "bindtouchcancel": {
        "doc": "touchcancel事件绑定，不阻止冒泡"
      },
      "catchtouchcancel": {
        "doc": "touchcancel事件绑定，阻止冒泡"
      },
      "nodes": {
        "doc": "节点列表 / HTML String",
        "type": "Array / String",
        "default": "[]"
      }
    }
  },
  "scroll-view": {
    "link": "https://mp.weixin.qq.com/debug/wxadoc/dev/component/scroll.html#scroll-view",
    "attributes": {
      "id": {
        "type": "String",
        "doc": "组件的唯一标示"
      },
      "class": {
        "type": "String",
        "doc": "组件的样式类"
      },
      "style": {
        "type": "String",
        "doc": "组件的内联样式"
      },
      "hidden": {
        "type": "Boolean",
        "doc": "组件是否显示"
      },
      "data-": {
        "type": "Any",
        "doc": "自定义属性"
      },
      "bindtap": {
        "doc": "tap事件绑定，不阻止冒泡"
      },
      "catchtap": {
        "doc": "tap事件绑定，阻止冒泡"
      },
      "bindlongtap": {
        "doc": "longtap事件绑定，不阻止冒泡"
      },
      "catchlongtap": {
        "doc": "longtap事件绑定，阻止冒泡"
      },
      "bindtouchstart": {
        "doc": "touchstart事件绑定，不阻止冒泡"
      },
      "catchtouchstart": {
        "doc": "touchstart事件绑定，阻止冒泡"
      },
      "bindtouchmove": {
        "doc": "touchmove事件绑定，不阻止冒泡"
      },
      "catchtouchmove": {
        "doc": "touchmove事件绑定，阻止冒泡"
      },
      "bindtouchend": {
        "doc": "touchend事件绑定，不阻止冒泡"
      },
      "catchtouchend": {
        "doc": "touchend事件绑定，阻止冒泡"
      },
      "bindtouchcancel": {
        "doc": "touchcancel事件绑定，不阻止冒泡"
      },
      "catchtouchcancel": {
        "doc": "touchcancel事件绑定，阻止冒泡"
      },
      "scroll-x": {
        "doc": "允许横向滚动",
        "type": "Boolean",
        "default": false,
        "valid": [
          {
            "value": true
          },
          {
            "value": false
          }
        ]
      },
      "scroll-y": {
        "doc": "允许纵向滚动",
        "type": "Boolean",
        "default": false,
        "valid": [
          {
            "value": true
          },
          {
            "value": false
          }
        ]
      },
      "upper-threshold": {
        "doc": "距顶部/左边多远时（单位px），触发 scrolltoupper 事件",
        "type": "Number",
        "default": 50
      },
      "lower-threshold": {
        "doc": "距底部/右边多远时（单位px），触发 scrolltolower 事件",
        "type": "Number",
        "default": 50
      },
      "scroll-top": {
        "doc": "设置竖向滚动条位置",
        "type": "Number"
      },
      "scroll-left": {
        "doc": "设置横向滚动条位置",
        "type": "Number"
      },
      "scroll-into-view": {
        "doc": "值应为某子元素id（id不能以数字开头）。设置哪个方向可滚动，则在哪个方向滚动到该元素",
        "type": "String"
      },
      "scroll-with-animation": {
        "doc": "在设置滚动条位置时使用动画过渡",
        "type": "Boolean",
        "default": false,
        "valid": [
          {
            "value": true
          },
          {
            "value": false
          }
        ]
      },
      "enable-back-to-top": {
        "doc": "iOS点击顶部状态栏、安卓双击标题栏时，滚动条返回顶部，只支持竖向",
        "type": "Boolean",
        "default": false,
        "valid": [
          {
            "value": true
          },
          {
            "value": false
          }
        ]
      },
      "bindscrolltoupper": {
        "doc": "滚动到顶部/左边，会触发 scrolltoupper 事件",
        "type": "EventHandle"
      },
      "bindscrolltolower": {
        "doc": "滚动到底部/右边，会触发 scrolltolower 事件",
        "type": "EventHandle"
      },
      "bindscroll": {
        "doc": "滚动时触发，event.detail = {scrollLeft, scrollTop, scrollHeight, scrollWidth, deltaX, deltaY}",
        "type": "EventHandle"
      }
    }
  },
  "slider": {
    "link": "https://mp.weixin.qq.com/debug/wxadoc/dev/component/slider.html#slider",
    "attributes": {
      "id": {
        "type": "String",
        "doc": "组件的唯一标示"
      },
      "class": {
        "type": "String",
        "doc": "组件的样式类"
      },
      "style": {
        "type": "String",
        "doc": "组件的内联样式"
      },
      "hidden": {
        "type": "Boolean",
        "doc": "组件是否显示"
      },
      "data-": {
        "type": "Any",
        "doc": "自定义属性"
      },
      "bindtap": {
        "doc": "tap事件绑定，不阻止冒泡"
      },
      "catchtap": {
        "doc": "tap事件绑定，阻止冒泡"
      },
      "bindlongtap": {
        "doc": "longtap事件绑定，不阻止冒泡"
      },
      "catchlongtap": {
        "doc": "longtap事件绑定，阻止冒泡"
      },
      "bindtouchstart": {
        "doc": "touchstart事件绑定，不阻止冒泡"
      },
      "catchtouchstart": {
        "doc": "touchstart事件绑定，阻止冒泡"
      },
      "bindtouchmove": {
        "doc": "touchmove事件绑定，不阻止冒泡"
      },
      "catchtouchmove": {
        "doc": "touchmove事件绑定，阻止冒泡"
      },
      "bindtouchend": {
        "doc": "touchend事件绑定，不阻止冒泡"
      },
      "catchtouchend": {
        "doc": "touchend事件绑定，阻止冒泡"
      },
      "bindtouchcancel": {
        "doc": "touchcancel事件绑定，不阻止冒泡"
      },
      "catchtouchcancel": {
        "doc": "touchcancel事件绑定，阻止冒泡"
      },
      "min": {
        "doc": "最小值",
        "type": "Number",
        "default": 0
      },
      "max": {
        "doc": "最大值",
        "type": "Number",
        "default": 100
      },
      "step": {
        "doc": "步长，取值必须大于 0，并且可被(max - min)整除",
        "type": "Number",
        "default": 1
      },
      "disabled": {
        "doc": "是否禁用",
        "type": "Boolean",
        "default": false,
        "valid": [
          {
            "value": true
          },
          {
            "value": false
          }
        ]
      },
      "value": {
        "doc": "当前取值",
        "type": "Number",
        "default": 0
      },
      "color": {
        "doc": "背景条的颜色（请使用 backgroundColor）",
        "type": "Color",
        "default": "#e9e9e9"
      },
      "selected-color": {
        "doc": "已选择的颜色（请使用 activeColor）",
        "type": "Color",
        "default": "#1aad19"
      },
      "activeColor": {
        "doc": "已选择的颜色",
        "type": "Color",
        "default": "#1aad19"
      },
      "backgroundColor": {
        "doc": "背景条的颜色",
        "type": "Color",
        "default": "#e9e9e9"
      },
      "block-size": {
        "doc": "滑块的大小，取值范围为 12 - 28",
        "type": "Number",
        "default": 28
      },
      "block-color": {
        "doc": "滑块的颜色",
        "type": "Color",
        "default": "#ffffff"
      },
      "show-value": {
        "doc": "是否显示当前 value",
        "type": "Boolean",
        "default": false,
        "valid": [
          {
            "value": true
          },
          {
            "value": false
          }
        ]
      },
      "bindchange": {
        "doc": "完成一次拖动后触发的事件，event.detail = {value: value}",
        "type": "EventHandle"
      },
      "bindchanging": {
        "doc": "拖动过程中触发的事件，event.detail = {value: value}",
        "type": "EventHandle"
      }
    }
  },
  "swiper": {
    "link": "https://mp.weixin.qq.com/debug/wxadoc/dev/component/swiper.html#swiper",
    "attributes": {
      "id": {
        "type": "String",
        "doc": "组件的唯一标示"
      },
      "class": {
        "type": "String",
        "doc": "组件的样式类"
      },
      "style": {
        "type": "String",
        "doc": "组件的内联样式"
      },
      "hidden": {
        "type": "Boolean",
        "doc": "组件是否显示"
      },
      "data-": {
        "type": "Any",
        "doc": "自定义属性"
      },
      "bindtap": {
        "doc": "tap事件绑定，不阻止冒泡"
      },
      "catchtap": {
        "doc": "tap事件绑定，阻止冒泡"
      },
      "bindlongtap": {
        "doc": "longtap事件绑定，不阻止冒泡"
      },
      "catchlongtap": {
        "doc": "longtap事件绑定，阻止冒泡"
      },
      "bindtouchstart": {
        "doc": "touchstart事件绑定，不阻止冒泡"
      },
      "catchtouchstart": {
        "doc": "touchstart事件绑定，阻止冒泡"
      },
      "bindtouchmove": {
        "doc": "touchmove事件绑定，不阻止冒泡"
      },
      "catchtouchmove": {
        "doc": "touchmove事件绑定，阻止冒泡"
      },
      "bindtouchend": {
        "doc": "touchend事件绑定，不阻止冒泡"
      },
      "catchtouchend": {
        "doc": "touchend事件绑定，阻止冒泡"
      },
      "bindtouchcancel": {
        "doc": "touchcancel事件绑定，不阻止冒泡"
      },
      "catchtouchcancel": {
        "doc": "touchcancel事件绑定，阻止冒泡"
      },
      "indicator-dots": {
        "doc": "是否显示面板指示点",
        "type": "Boolean",
        "default": false,
        "valid": [
          {
            "value": true
          },
          {
            "value": false
          }
        ]
      },
      "indicator-color": {
        "doc": "指示点颜色",
        "type": "Color",
        "default": "rgba(0, 0, 0, .3)"
      },
      "indicator-active-color": {
        "doc": "当前选中的指示点颜色",
        "type": "Color",
        "default": "#000000"
      },
      "autoplay": {
        "doc": "是否自动切换",
        "type": "Boolean",
        "default": false,
        "valid": [
          {
            "value": true
          },
          {
            "value": false
          }
        ]
      },
      "current": {
        "doc": "当前所在滑块的 index",
        "type": "Number",
        "default": 0
      },
      "current-item-id": {
        "doc": "当前所在滑块的 item-id ，不能与 current 被同时指定",
        "type": "String",
        "default": "\"\""
      },
      "interval": {
        "doc": "自动切换时间间隔",
        "type": "Number",
        "default": 5000
      },
      "duration": {
        "doc": "滑动动画时长",
        "type": "Number",
        "default": 500
      },
      "circular": {
        "doc": "是否采用衔接滑动",
        "type": "Boolean",
        "default": false,
        "valid": [
          {
            "value": true
          },
          {
            "value": false
          }
        ]
      },
      "vertical": {
        "doc": "滑动方向是否为纵向",
        "type": "Boolean",
        "default": false,
        "valid": [
          {
            "value": true
          },
          {
            "value": false
          }
        ]
      },
      "previous-margin": {
        "doc": "前边距，可用于露出前一项的一小部分，接受 px 和 rpx 值",
        "type": "String",
        "default": "\"0px\""
      },
      "next-margin": {
        "doc": "后边距，可用于露出后一项的一小部分，接受 px 和 rpx 值",
        "type": "String",
        "default": "\"0px\""
      },
      "display-multiple-items": {
        "doc": "同时显示的滑块数量",
        "type": "Number",
        "default": 1
      },
      "skip-hidden-item-layout": {
        "doc": "是否跳过未显示的滑块布局，设为 true 可优化复杂情况下的滑动性能，但会丢失隐藏状态滑块的布局信息",
        "type": "Boolean",
        "default": false,
        "valid": [
          {
            "value": true
          },
          {
            "value": false
          }
        ]
      },
      "bindchange": {
        "doc": "current 改变时会触发 change 事件，event.detail = {current: current, source: source}",
        "type": "EventHandle"
      },
      "bindanimationfinish": {
        "doc": "动画结束时会触发 animationfinish 事件，event.detail 同上",
        "type": "EventHandle"
      }
    }
  },
  "swiper-item": {
    "link": "https://mp.weixin.qq.com/debug/wxadoc/dev/component/swiper.html#swiper-item",
    "attributes": {
      "id": {
        "type": "String",
        "doc": "组件的唯一标示"
      },
      "class": {
        "type": "String",
        "doc": "组件的样式类"
      },
      "style": {
        "type": "String",
        "doc": "组件的内联样式"
      },
      "hidden": {
        "type": "Boolean",
        "doc": "组件是否显示"
      },
      "data-": {
        "type": "Any",
        "doc": "自定义属性"
      },
      "bindtap": {
        "doc": "tap事件绑定，不阻止冒泡"
      },
      "catchtap": {
        "doc": "tap事件绑定，阻止冒泡"
      },
      "bindlongtap": {
        "doc": "longtap事件绑定，不阻止冒泡"
      },
      "catchlongtap": {
        "doc": "longtap事件绑定，阻止冒泡"
      },
      "bindtouchstart": {
        "doc": "touchstart事件绑定，不阻止冒泡"
      },
      "catchtouchstart": {
        "doc": "touchstart事件绑定，阻止冒泡"
      },
      "bindtouchmove": {
        "doc": "touchmove事件绑定，不阻止冒泡"
      },
      "catchtouchmove": {
        "doc": "touchmove事件绑定，阻止冒泡"
      },
      "bindtouchend": {
        "doc": "touchend事件绑定，不阻止冒泡"
      },
      "catchtouchend": {
        "doc": "touchend事件绑定，阻止冒泡"
      },
      "bindtouchcancel": {
        "doc": "touchcancel事件绑定，不阻止冒泡"
      },
      "catchtouchcancel": {
        "doc": "touchcancel事件绑定，阻止冒泡"
      },
      "item-id": {
        "doc": "该 swiper-item 的标识符",
        "type": "String",
        "default": "\"\""
      }
    }
  },
  "switch": {
    "link": "https://mp.weixin.qq.com/debug/wxadoc/dev/component/switch.html#switch",
    "attributes": {
      "id": {
        "type": "String",
        "doc": "组件的唯一标示"
      },
      "class": {
        "type": "String",
        "doc": "组件的样式类"
      },
      "style": {
        "type": "String",
        "doc": "组件的内联样式"
      },
      "hidden": {
        "type": "Boolean",
        "doc": "组件是否显示"
      },
      "data-": {
        "type": "Any",
        "doc": "自定义属性"
      },
      "bindtap": {
        "doc": "tap事件绑定，不阻止冒泡"
      },
      "catchtap": {
        "doc": "tap事件绑定，阻止冒泡"
      },
      "bindlongtap": {
        "doc": "longtap事件绑定，不阻止冒泡"
      },
      "catchlongtap": {
        "doc": "longtap事件绑定，阻止冒泡"
      },
      "bindtouchstart": {
        "doc": "touchstart事件绑定，不阻止冒泡"
      },
      "catchtouchstart": {
        "doc": "touchstart事件绑定，阻止冒泡"
      },
      "bindtouchmove": {
        "doc": "touchmove事件绑定，不阻止冒泡"
      },
      "catchtouchmove": {
        "doc": "touchmove事件绑定，阻止冒泡"
      },
      "bindtouchend": {
        "doc": "touchend事件绑定，不阻止冒泡"
      },
      "catchtouchend": {
        "doc": "touchend事件绑定，阻止冒泡"
      },
      "bindtouchcancel": {
        "doc": "touchcancel事件绑定，不阻止冒泡"
      },
      "catchtouchcancel": {
        "doc": "touchcancel事件绑定，阻止冒泡"
      },
      "checked": {
        "doc": "是否选中",
        "type": "Boolean",
        "default": false,
        "valid": [
          {
            "value": true
          },
          {
            "value": false
          }
        ]
      },
      "type": {
        "doc": "样式，有效值：switch, checkbox",
        "type": "String",
        "default": "switch"
      },
      "bindchange": {
        "doc": "checked 改变时触发 change 事件，event.detail={ value:checked}",
        "type": "EventHandle"
      },
      "color": {
        "doc": "switch 的颜色，同 css 的 color",
        "type": "Color"
      }
    }
  },
  "text": {
    "link": "https://mp.weixin.qq.com/debug/wxadoc/dev/component/text.html#text",
    "attributes": {
      "id": {
        "type": "String",
        "doc": "组件的唯一标示"
      },
      "class": {
        "type": "String",
        "doc": "组件的样式类"
      },
      "style": {
        "type": "String",
        "doc": "组件的内联样式"
      },
      "hidden": {
        "type": "Boolean",
        "doc": "组件是否显示"
      },
      "data-": {
        "type": "Any",
        "doc": "自定义属性"
      },
      "bindtap": {
        "doc": "tap事件绑定，不阻止冒泡"
      },
      "catchtap": {
        "doc": "tap事件绑定，阻止冒泡"
      },
      "bindlongtap": {
        "doc": "longtap事件绑定，不阻止冒泡"
      },
      "catchlongtap": {
        "doc": "longtap事件绑定，阻止冒泡"
      },
      "bindtouchstart": {
        "doc": "touchstart事件绑定，不阻止冒泡"
      },
      "catchtouchstart": {
        "doc": "touchstart事件绑定，阻止冒泡"
      },
      "bindtouchmove": {
        "doc": "touchmove事件绑定，不阻止冒泡"
      },
      "catchtouchmove": {
        "doc": "touchmove事件绑定，阻止冒泡"
      },
      "bindtouchend": {
        "doc": "touchend事件绑定，不阻止冒泡"
      },
      "catchtouchend": {
        "doc": "touchend事件绑定，阻止冒泡"
      },
      "bindtouchcancel": {
        "doc": "touchcancel事件绑定，不阻止冒泡"
      },
      "catchtouchcancel": {
        "doc": "touchcancel事件绑定，阻止冒泡"
      },
      "selectable": {
        "doc": "文本是否可选",
        "type": "Boolean",
        "default": false,
        "valid": [
          {
            "value": true
          },
          {
            "value": false
          }
        ]
      },
      "space": {
        "doc": "显示连续空格",
        "type": "String",
        "default": "false",
        "valid": [
          {
            "value": "ensp",
            "doc": "中文字符空格一半大小"
          },
          {
            "value": "emsp",
            "doc": "中文字符空格大小"
          },
          {
            "value": "nbsp",
            "doc": "根据字体设置的空格大小"
          }
        ]
      },
      "decode": {
        "doc": "是否解码",
        "type": "Boolean",
        "default": false,
        "valid": [
          {
            "value": true
          },
          {
            "value": false
          }
        ]
      }
    }
  },
  "textarea": {
    "link": "https://mp.weixin.qq.com/debug/wxadoc/dev/component/textarea.html#textarea",
    "attributes": {
      "id": {
        "type": "String",
        "doc": "组件的唯一标示"
      },
      "class": {
        "type": "String",
        "doc": "组件的样式类"
      },
      "style": {
        "type": "String",
        "doc": "组件的内联样式"
      },
      "hidden": {
        "type": "Boolean",
        "doc": "组件是否显示"
      },
      "data-": {
        "type": "Any",
        "doc": "自定义属性"
      },
      "bindtap": {
        "doc": "tap事件绑定，不阻止冒泡"
      },
      "catchtap": {
        "doc": "tap事件绑定，阻止冒泡"
      },
      "bindlongtap": {
        "doc": "longtap事件绑定，不阻止冒泡"
      },
      "catchlongtap": {
        "doc": "longtap事件绑定，阻止冒泡"
      },
      "bindtouchstart": {
        "doc": "touchstart事件绑定，不阻止冒泡"
      },
      "catchtouchstart": {
        "doc": "touchstart事件绑定，阻止冒泡"
      },
      "bindtouchmove": {
        "doc": "touchmove事件绑定，不阻止冒泡"
      },
      "catchtouchmove": {
        "doc": "touchmove事件绑定，阻止冒泡"
      },
      "bindtouchend": {
        "doc": "touchend事件绑定，不阻止冒泡"
      },
      "catchtouchend": {
        "doc": "touchend事件绑定，阻止冒泡"
      },
      "bindtouchcancel": {
        "doc": "touchcancel事件绑定，不阻止冒泡"
      },
      "catchtouchcancel": {
        "doc": "touchcancel事件绑定，阻止冒泡"
      },
      "value": {
        "doc": "输入框的内容",
        "type": "String"
      },
      "placeholder": {
        "doc": "输入框为空时占位符",
        "type": "String"
      },
      "placeholder-style": {
        "doc": "指定 placeholder 的样式",
        "type": "String"
      },
      "placeholder-class": {
        "doc": "指定 placeholder 的样式类",
        "type": "String",
        "default": "textarea-placeholder"
      },
      "disabled": {
        "doc": "是否禁用",
        "type": "Boolean",
        "default": false,
        "valid": [
          {
            "value": true
          },
          {
            "value": false
          }
        ]
      },
      "maxlength": {
        "doc": "最大输入长度，设置为 -1 的时候不限制最大长度",
        "type": "Number",
        "default": 140
      },
      "auto-focus": {
        "doc": "自动聚焦，拉起键盘。",
        "type": "Boolean",
        "default": false,
        "valid": [
          {
            "value": true
          },
          {
            "value": false
          }
        ]
      },
      "focus": {
        "doc": "获取焦点",
        "type": "Boolean",
        "default": false,
        "valid": [
          {
            "value": true
          },
          {
            "value": false
          }
        ]
      },
      "auto-height": {
        "doc": "是否自动增高，设置auto-height时，style.height不生效",
        "type": "Boolean",
        "default": false,
        "valid": [
          {
            "value": true
          },
          {
            "value": false
          }
        ]
      },
      "fixed": {
        "doc": "如果 textarea 是在一个 `position:fixed` 的区域，需要显示指定属性 fixed 为 true",
        "type": "Boolean",
        "default": false,
        "valid": [
          {
            "value": true
          },
          {
            "value": false
          }
        ]
      },
      "cursor-spacing": {
        "doc": "指定光标与键盘的距离，单位 px 。取 textarea 距离底部的距离和 cursor-spacing 指定的距离的最小值作为光标与键盘的距离",
        "type": "Number",
        "default": 0
      },
      "cursor": {
        "doc": "指定focus时的光标位置",
        "type": "Number"
      },
      "show-confirm-bar": {
        "doc": "是否显示键盘上方带有”完成“按钮那一栏",
        "type": "Boolean",
        "default": true,
        "valid": [
          {
            "value": true
          },
          {
            "value": false
          }
        ]
      },
      "selection-start": {
        "doc": "光标起始位置，自动聚集时有效，需与selection-end搭配使用",
        "type": "Number",
        "default": -1
      },
      "selection-end": {
        "doc": "光标结束位置，自动聚集时有效，需与selection-start搭配使用",
        "type": "Number",
        "default": -1
      },
      "bindfocus": {
        "doc": "输入框聚焦时触发，event.detail = {value: value}",
        "type": "EventHandle"
      },
      "bindblur": {
        "doc": "输入框失去焦点时触发，event.detail = {value, cursor}",
        "type": "EventHandle"
      },
      "bindlinechange": {
        "doc": "输入框行数变化时调用，event.detail = {height: 0, heightRpx: 0, lineCount: 0}",
        "type": "EventHandle"
      },
      "bindinput": {
        "doc": "当键盘输入时，触发 input 事件，event.detail = {value, cursor}，** bindinput 处理函数的返回值并不会反映到 textarea 上 **",
        "type": "EventHandle"
      },
      "bindconfirm": {
        "doc": "点击完成时， 触发 confirm 事件，event.detail = {value: value}",
        "type": "EventHandle"
      }
    }
  },
  "video": {
    "link": "https://mp.weixin.qq.com/debug/wxadoc/dev/component/video.html#video",
    "attributes": {
      "id": {
        "type": "String",
        "doc": "组件的唯一标示"
      },
      "class": {
        "type": "String",
        "doc": "组件的样式类"
      },
      "style": {
        "type": "String",
        "doc": "组件的内联样式"
      },
      "hidden": {
        "type": "Boolean",
        "doc": "组件是否显示"
      },
      "data-": {
        "type": "Any",
        "doc": "自定义属性"
      },
      "bindtap": {
        "doc": "tap事件绑定，不阻止冒泡"
      },
      "catchtap": {
        "doc": "tap事件绑定，阻止冒泡"
      },
      "bindlongtap": {
        "doc": "longtap事件绑定，不阻止冒泡"
      },
      "catchlongtap": {
        "doc": "longtap事件绑定，阻止冒泡"
      },
      "bindtouchstart": {
        "doc": "touchstart事件绑定，不阻止冒泡"
      },
      "catchtouchstart": {
        "doc": "touchstart事件绑定，阻止冒泡"
      },
      "bindtouchmove": {
        "doc": "touchmove事件绑定，不阻止冒泡"
      },
      "catchtouchmove": {
        "doc": "touchmove事件绑定，阻止冒泡"
      },
      "bindtouchend": {
        "doc": "touchend事件绑定，不阻止冒泡"
      },
      "catchtouchend": {
        "doc": "touchend事件绑定，阻止冒泡"
      },
      "bindtouchcancel": {
        "doc": "touchcancel事件绑定，不阻止冒泡"
      },
      "catchtouchcancel": {
        "doc": "touchcancel事件绑定，阻止冒泡"
      },
      "src": {
        "doc": "要播放视频的资源地址",
        "type": "String"
      },
      "initial-time": {
        "doc": "指定视频初始播放位置",
        "type": "Number"
      },
      "duration": {
        "doc": "指定视频时长",
        "type": "Number"
      },
      "controls": {
        "doc": "是否显示默认播放控件（播放/暂停按钮、播放进度、时间）",
        "type": "Boolean",
        "default": true,
        "valid": [
          {
            "value": true
          },
          {
            "value": false
          }
        ]
      },
      "danmu-list": {
        "doc": "弹幕列表",
        "type": "Object Array"
      },
      "danmu-btn": {
        "doc": "是否显示弹幕按钮，只在初始化时有效，不能动态变更",
        "type": "Boolean",
        "default": false,
        "valid": [
          {
            "value": true
          },
          {
            "value": false
          }
        ]
      },
      "enable-danmu": {
        "doc": "是否展示弹幕，只在初始化时有效，不能动态变更",
        "type": "Boolean",
        "default": false,
        "valid": [
          {
            "value": true
          },
          {
            "value": false
          }
        ]
      },
      "autoplay": {
        "doc": "是否自动播放",
        "type": "Boolean",
        "default": false,
        "valid": [
          {
            "value": true
          },
          {
            "value": false
          }
        ]
      },
      "loop": {
        "doc": "是否循环播放",
        "type": "Boolean",
        "default": false,
        "valid": [
          {
            "value": true
          },
          {
            "value": false
          }
        ]
      },
      "muted": {
        "doc": "是否静音播放",
        "type": "Boolean",
        "default": false,
        "valid": [
          {
            "value": true
          },
          {
            "value": false
          }
        ]
      },
      "page-gesture": {
        "doc": "在非全屏模式下，是否开启亮度与音量调节手势",
        "type": "Boolean",
        "default": false,
        "valid": [
          {
            "value": true
          },
          {
            "value": false
          }
        ]
      },
      "direction": {
        "doc": "设置全屏时视频的方向，不指定则根据宽高比自动判断。有效值为 0（正常竖向）, 90（屏幕逆时针90度）, -90（屏幕顺时针90度）",
        "type": "Number"
      },
      "show-progress": {
        "doc": "若不设置，宽度大于240时才会显示",
        "type": "Boolean",
        "default": true,
        "valid": [
          {
            "value": true
          },
          {
            "value": false
          }
        ]
      },
      "show-fullscreen-btn": {
        "doc": "是否显示全屏按钮",
        "type": "Boolean",
        "default": true,
        "valid": [
          {
            "value": true
          },
          {
            "value": false
          }
        ]
      },
      "show-play-btn": {
        "doc": "是否显示视频底部控制栏的播放按钮",
        "type": "Boolean",
        "default": true,
        "valid": [
          {
            "value": true
          },
          {
            "value": false
          }
        ]
      },
      "show-center-play-btn": {
        "doc": "是否显示视频中间的播放按钮",
        "type": "Boolean",
        "default": true,
        "valid": [
          {
            "value": true
          },
          {
            "value": false
          }
        ]
      },
      "enable-progress-gesture": {
        "doc": "是否开启控制进度的手势",
        "type": "Boolean",
        "default": true,
        "valid": [
          {
            "value": true
          },
          {
            "value": false
          }
        ]
      },
      "bindplay": {
        "doc": "当开始/继续播放时触发play事件",
        "type": "EventHandle"
      },
      "bindpause": {
        "doc": "当暂停播放时触发 pause 事件",
        "type": "EventHandle"
      },
      "bindended": {
        "doc": "当播放到末尾时触发 ended 事件",
        "type": "EventHandle"
      },
      "bindtimeupdate": {
        "doc": "播放进度变化时触发，event.detail = {currentTime, duration} 。触发频率 250ms 一次",
        "type": "EventHandle"
      },
      "bindfullscreenchange": {
        "doc": "当视频进入和退出全屏是触发，event.detail = {fullScreen, direction}，direction取为 vertical 或 horizontal",
        "type": "EventHandle"
      },
      "objectFit": {
        "doc": "当视频大小与 video 容器大小不一致时，视频的表现形式。contain：包含，fill：填充，cover：覆盖",
        "type": "String",
        "default": "contain"
      },
      "poster": {
        "doc": "视频封面的图片网络资源地址，如果 controls 属性值为 false 则设置 poster 无效",
        "type": "String"
      }
    }
  },
  "view": {
    "link": "https://mp.weixin.qq.com/debug/wxadoc/dev/component/view.html#view",
    "attributes": {
      "id": {
        "type": "String",
        "doc": "组件的唯一标示"
      },
      "class": {
        "type": "String",
        "doc": "组件的样式类"
      },
      "style": {
        "type": "String",
        "doc": "组件的内联样式"
      },
      "hidden": {
        "type": "Boolean",
        "doc": "组件是否显示"
      },
      "data-": {
        "type": "Any",
        "doc": "自定义属性"
      },
      "bindtap": {
        "doc": "tap事件绑定，不阻止冒泡"
      },
      "catchtap": {
        "doc": "tap事件绑定，阻止冒泡"
      },
      "bindlongtap": {
        "doc": "longtap事件绑定，不阻止冒泡"
      },
      "catchlongtap": {
        "doc": "longtap事件绑定，阻止冒泡"
      },
      "bindtouchstart": {
        "doc": "touchstart事件绑定，不阻止冒泡"
      },
      "catchtouchstart": {
        "doc": "touchstart事件绑定，阻止冒泡"
      },
      "bindtouchmove": {
        "doc": "touchmove事件绑定，不阻止冒泡"
      },
      "catchtouchmove": {
        "doc": "touchmove事件绑定，阻止冒泡"
      },
      "bindtouchend": {
        "doc": "touchend事件绑定，不阻止冒泡"
      },
      "catchtouchend": {
        "doc": "touchend事件绑定，阻止冒泡"
      },
      "bindtouchcancel": {
        "doc": "touchcancel事件绑定，不阻止冒泡"
      },
      "catchtouchcancel": {
        "doc": "touchcancel事件绑定，阻止冒泡"
      },
      "hover-class": {
        "doc": "指定按下去的样式类。当 `hover-class=\"none\"` 时，没有点击态效果",
        "type": "String",
        "default": "none"
      },
      "hover-stop-propagation": {
        "doc": "指定是否阻止本节点的祖先节点出现点击态",
        "type": "Boolean",
        "default": false,
        "valid": [
          {
            "value": true
          },
          {
            "value": false
          }
        ]
      },
      "hover-start-time": {
        "doc": "按住后多久出现点击态，单位毫秒",
        "type": "Number",
        "default": 50
      },
      "hover-stay-time": {
        "doc": "手指松开后点击态保留时间，单位毫秒",
        "type": "Number",
        "default": 400
      }
    }
  },
  "web-view": {
    "link": "https://mp.weixin.qq.com/debug/wxadoc/dev/component/web.html#web-view",
    "attributes": {
      "id": {
        "type": "String",
        "doc": "组件的唯一标示"
      },
      "class": {
        "type": "String",
        "doc": "组件的样式类"
      },
      "style": {
        "type": "String",
        "doc": "组件的内联样式"
      },
      "hidden": {
        "type": "Boolean",
        "doc": "组件是否显示"
      },
      "data-": {
        "type": "Any",
        "doc": "自定义属性"
      },
      "bindtap": {
        "doc": "tap事件绑定，不阻止冒泡"
      },
      "catchtap": {
        "doc": "tap事件绑定，阻止冒泡"
      },
      "bindlongtap": {
        "doc": "longtap事件绑定，不阻止冒泡"
      },
      "catchlongtap": {
        "doc": "longtap事件绑定，阻止冒泡"
      },
      "bindtouchstart": {
        "doc": "touchstart事件绑定，不阻止冒泡"
      },
      "catchtouchstart": {
        "doc": "touchstart事件绑定，阻止冒泡"
      },
      "bindtouchmove": {
        "doc": "touchmove事件绑定，不阻止冒泡"
      },
      "catchtouchmove": {
        "doc": "touchmove事件绑定，阻止冒泡"
      },
      "bindtouchend": {
        "doc": "touchend事件绑定，不阻止冒泡"
      },
      "catchtouchend": {
        "doc": "touchend事件绑定，阻止冒泡"
      },
      "bindtouchcancel": {
        "doc": "touchcancel事件绑定，不阻止冒泡"
      },
      "catchtouchcancel": {
        "doc": "touchcancel事件绑定，阻止冒泡"
      },
      "src": {
        "doc": "webview 指向网页的链接。需登录[小程序管理后台](https://mp.weixin.qq.com/)配置域名白名单。",
        "type": "String"
      },
      "bindmessage": {
        "doc": "网页向小程序 postMessage 时，会在特定时机（小程序后退、组件销毁、分享）触发并收到消息。e.detail = { data }",
        "type": "EventHandler"
      }
    }
  },
  "template": {
    "link": "https://developers.weixin.qq.com/miniprogram/dev/reference/wxml/template.html",
    "attributes": {
      "name": {
        "type": "String",
        "doc": "组件的唯一标示"
      },
      "is": {
        "type": "String",
        "doc": "声明需要的使用的模板"
      },
      "data": {
        "type": "Any",
        "doc": "模板所需要的数据"
      }
    }
  },
  "block": {}
}