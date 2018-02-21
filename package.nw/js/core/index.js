const path = require('path')
const tools = require('../js/84b183688a46c9e2626d3e6f83365e13.js')

function getQueryParameter(key) {
  const m = location.search.match(new RegExp(`${key}=(.*?)(&|$)`))
  if (m && m[1]) {
    return decodeURIComponent(m[1])
  }
  return ''
}

global.devInfo = {}
if (location.search) {
  global.isDevWindow = true
  global.devType = location.search.match(/devtype=(.*?)(&|$)/)[1]
  switch (global.devType) {
    case 'webdebugger': {
      global.devInfo.id = getQueryParameter('devid')
      break
    }
    default: {
      global.devInfo.id = getQueryParameter('devid')
      global.devInfo.appid = getQueryParameter('appid')
      global.devInfo.projectname = getQueryParameter('projectname')
      global.devInfo.projectpath = getQueryParameter('projectpath')
      global.devInfo.projectid = `${global.devInfo.appid}_${encodeURIComponent(global.devInfo.projectname)}`

      global.devInfo.isTemp = Boolean(getQueryParameter('isTemp'))
      global.devInfo.isOnline = Boolean(getQueryParameter('isOnline'))

      if (global.devInfo.isTemp) {
        const tempLocalStorageKey = `temp_${global.devInfo.appid}_${global.devInfo.projectname}`
        global.devInfo.project = JSON.parse(localStorage[tempLocalStorageKey])
        delete localStorage[tempLocalStorageKey]
      }
    }
  }
}

// nw & foreground variables
const Win = nw.Window.get()
global.useChromeRemoteDebugProtocal = false
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

global.CLI = {}

// 记录工具开始运行的时间
global.beginTime = Date.now()

// worker 懒加载
global.worker = {}
Object.defineProperties(global.worker, {
  bbsLogWorker: {
    get() {
      if (!this._bbsLogWoker) {
        this._bbsLogWoker = new Worker('../js/2bc74df4df155a7d0d1c4df1e947d57d.js')
      }
      return this._bbsLogWoker
    },
  },
})

global.reload = () => {
  for (key in require.cache) {
    require.cache[key] = undefined
  }

  location.reload()
}

// init initial menu in case of failure
try {
  if (global.isDevWindow || process.platform === 'darwin') {
    const menu = new nw.Menu({ type: 'menubar' })
    const ideMenu = new nw.Menu()
    const debugMenu = new nw.Menu()
    if (global.isDevWindow) {
      debugMenu.append(new nw.MenuItem({
        label: '调试微信开发者工具',
        click: () => global.Win.showDevTools(),
      }))
    } else {
      debugMenu.append(new nw.MenuItem({
        label: '调试微信开发者工具',
        click: () => {
          chrome.developerPrivate.openDevTools({
            renderViewId: -1,
            renderProcessId: -1,
            extensionId: chrome.runtime.id
          })
        },
      })) 
    }
    ideMenu.append(new nw.MenuItem({
      label: '调试',
      submenu: debugMenu,
    }))
    ideMenu.append(new nw.MenuItem({
      label: '关闭窗口',
      click: () => global.Win.close(true),
    }))
    ideMenu.append(new nw.MenuItem({
      label: '退出',
      click: () => nw.App.quit(),
    }))
    menu.append(new nw.MenuItem({
      label: '微信开发者工具',
      submenu: ideMenu,
    }))
    global.Win.menu = menu
  }
} catch (err) {}

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
      if (win !== Win) {
        win.close()
      }
    })
    global.windowMap.clear()

    if (global.isDevWindow) {
      // dev window
      const clientWindowSync = require('../js/881e653f19d837f2408386047cb8c38c.js')
      clientWindowSync.notifyCloseWindow()
      Win.close(true)
    } else {
      // original main window
      const serverWindowSync = require('../js/b543ae2da406cea63b3ad8951f17b6c0.js')
      if (serverWindowSync.clientWindows.size > 0) {
        Win.hide()
      } else {
        // 几秒之后项目窗口数还是 0 说明没有正在打开的窗口了，可以正常退出
        Win.hide()
        setTimeout(() => {
          if (serverWindowSync.clientWindows.size === 0) {
            tools.quit()
          }
        }, 2000)
      }
    }
  })
}

const checkUpdate = require('../js/e5184416014aff2809a9dee32cc447c8.js')
checkUpdate.loop()

// 检查是否需要更新
tools.checkUpdateApp()
  .then(()=>{
    init()
  })


