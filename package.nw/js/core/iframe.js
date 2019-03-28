/**
 * for iframe.html
 */
const init = () => {
  const webview = document.getElementById('webview')
  const ua = window.navigator.userAgent
  const isIDEPlugin = ua.indexOf(' wechatideplugin ') > 0
  webview.setUserAgentOverride(ua)

  webview.addEventListener('newwindow', function(e) {
    // 往上传，由上层代码控制
    window.open(e.targetUrl)
  })

  if (isIDEPlugin) {
    webview.addEventListener('dialog', (event) => {
      event.preventDefault()
      const messageType = event.messageType || ''
      const messageText = event.messageText
      if (messageType === 'prompt') {
        if (messageText === 'GET_MESSAGE_TOKEN') {
          const messageCenter = require('../js/ff946754202ecf377034d29daac7c8d9.js')
          event.dialog.ok(messageCenter.getToken('PLUGIN'))
          return
        }
      }
      event.dialog.ok()
    })
  }
}

if (document.readyState === 'complete') {
  init()
} else {
  document.addEventListener('DOMContentLoaded', init)
}