const path = require('path')
const tools = require('../js/84b183688a46c9e2626d3e6f83365e13.js')
// nw & foreground variables
const Win = nw.Window.get()
global.Win = Win
global.appConfig = tools.getAppConfig()
// global.appConfig.isDev = false
global.appConfig.isGamma = true
global.appVersion = nw.App.manifest.version

global.contentDocument = document
global.contentDocumentBody = document.body
global.contentWindow = window

global.windowMap = new Map
global.windowMap.set('LOGIN', global.Win)

global.reload = () => {
  for (key in require.cache) {
    require.cache[key] = undefined
  }

  location.reload()
}

// enter background

function init() {
  // to prevent drag image or html
  document.body.addEventListener('dragover', function(e){
    e.preventDefault();
    e.stopPropagation();
  }, false);
  document.body.addEventListener('drop', function(e){
    e.preventDefault();
    e.stopPropagation();
  }, false);

  require('../js/29cbb96f0d87ca0a3ee63c5dbbd8107c.js')

  // 打开 inspect 窗口
  if (nw.App.argv.indexOf('inspect') !== -1) {
    tools.openInspectWin()
  }

  // 阻止右键打开菜单
  !global.appConfig.isDev && !global.appConfig.isGamma && window.addEventListener('contextmenu', (event) => {
    event.preventDefault()
  })

  // 禁用滚轮缩放
  document.addEventListener('mousewheel', (event) => {
    if(event.ctrlKey)
      event.preventDefault()
  })

  Win.on('new-win-policy', (frame, url, policy) => {
    policy.ignore()
  })

  Win.on('close', () => {
    global.windowMap.forEach((win) => {
      win.close()
    })
    global.windowMap.clear()
    nw.App.quit()
    //process.exit()
  })
}


// 检查是否需要更新
tools.checkUpdateApp()
  .then(()=>{
    init()
  })


