var evalCode = self.eval
self.onmessage = event => {
  if (event.data) {
    switch (event.data.type) {
      case 'run': {
        evalCode(event.data.code)
        break
      }
      case 'triggerOnMsg': {
        WeixinWorker.appServiceMsgHandler(event.data.msg)
        break
      }
    }
  }
}
