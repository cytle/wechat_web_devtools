
const path = require('path')
const tools = require('../js/84b183688a46c9e2626d3e6f83365e13.js')
const locales = require('../js/common/locales/index.js')

const isMac = (process.platform === 'darwin')
const query = tools.getQuery(location.search)


// 记录工具开始运行的时间
global.beginTime = Date.now()

function hack() {
  // to prevent drag image or html
  document.body.addEventListener('dragover', function (e) {
    e.preventDefault()
    e.stopPropagation()
  }, false)

  document.body.addEventListener('drop', function (e) {
    e.preventDefault()
    e.stopPropagation()
  }, false)


  // 禁用滚轮缩放
  document.addEventListener('mousewheel', (event) => {
    if (event.ctrlKey) event.preventDefault()
  })
}

function initGlobal() {
  global.appVersion = nw.App.manifest.version
  global.useChromeRemoteDebugProtocal = false

  // mac 从application 启动时带的环境变量里没有 :/usr/local/bin
  isMac && (process.env.PATH += ':/usr/local/bin')

  // 在非 new instance 的窗口内可以共享
  global.shareData = {}

  global.appConfig = tools.getAppConfig()
  // global.appConfig.isDev = false
  // global.appConfig.isGamma = true


  // nw & foreground variables
  const Win = nw.Window.get()
  global.Win = Win
  global.contentDocument = document
  global.contentDocumentBody = document.body
  global.contentWindow = window

  global.windowMap = new Map()
  global.windowMap.set('LOGIN', global.Win)

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


  // 提供一个全局 reload 的方法
  global.reload = () => {
    for (key in require.cache) {
      require.cache[key] = undefined
    }

    location.reload()
  }


  global.devInfo = {}
  if (location.search) {
    global.isDevWindow = true
    global.devType = location.search.match(/devtype=(.*?)(&|$)/)[1]
    switch (global.devType) {
      case 'webdebugger': {
        global.devInfo.id = query.devid
        break
      }

      default: {
        global.devInfo.id = query.devid
        global.devInfo.appid = query.appid
        global.devInfo.projectname = query.projectname
        global.devInfo.projectpath = query.projectpath
        global.devInfo.projectid = `${global.devInfo.appid}_${encodeURIComponent(global.devInfo.projectname)}`

        global.devInfo.isTemp = Boolean(query.isTemp)
        global.devInfo.isOnline = Boolean(query.isOnline)

        if (global.devInfo.isTemp) {
          const tempLocalStorageKey = `temp_${global.devInfo.appid}_${global.devInfo.projectname}`
          global.devInfo.project = JSON.parse(localStorage[tempLocalStorageKey])
          delete localStorage[tempLocalStorageKey]
        }
      }
    }


    if (query.simple) {
      // 多账号模式登录
      global.isSimple = true
      global.userInfo = {
        openid: query.openid,
        nickName: query.nickName,
        headUrl: query.headUrl,
        contry: query.contry,
        city: query.city,
        loginStatus: query.loginStatus,
        province: query.province,
        sex: query.sex,
        newticket: query.newticket,
        ticketExpiredTime: parseInt(query.ticketExpiredTime),
        signature: query.signature,
        signatureExpiredTime: parseInt(query.signatureExpiredTime)
      }
    }
  }

  // parse cli
  global.CLI = {}
  try {
    global.CLI.isTestMode = nw.App.argv.indexOf('--test-mode') > -1
    global.autoTest = global.CLI.isTestMode

    if (nw.App.argv.indexOf('--only-simulator') > -1) {
      global.onlySimulator = true
    }

    if (nw.App.argv.indexOf('--online') > -1) {
      global.online = true
    }

    if (global.CLI.isTestMode) {
      const ind = nw.App.argv.indexOf('--id')
      if (ind > -1) {
        const raw = nw.App.argv[ind + 1]
        if (raw) {
          global.CLI.id = raw
        }
      }
    }

    require('../js/09495074395d0f72e0c2a4eb13e1076c.js')
  } catch (err) {
    console.error('init global caught error: ', err)
  }
}


function initMenu() {
  // init initial menu in case of failure
  try {
    if (global.isDevWindow || isMac) {
      const menu = new nw.Menu({type: 'menubar'})
      const ideMenu = new nw.Menu()
      const debugMenu = new nw.Menu()

      if (global.isDevWindow) {
        debugMenu.append(new nw.MenuItem({
          label: locales.config.MENU_INSPECT_APP,
          click: () => global.Win.showDevTools(),
        }))
      } else {
        debugMenu.append(new nw.MenuItem({
          label: locales.config.MENU_INSPECT_APP,
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
        label: locales.config.MENU_INSPECT,
        submenu: debugMenu,
      }))
      ideMenu.append(new nw.MenuItem({
        label: locales.config.CLOSE_WINDOW,
        click: () => global.Win.close(true),
      }))
      ideMenu.append(new nw.MenuItem({
        label: locales.config.MENU_EXIT,
        click: () => nw.App.quit(),
      }))
      menu.append(new nw.MenuItem({
        label: locales.config.MENU_TITLE_APP,
        submenu: ideMenu,
      }))
      global.Win.menu = menu
    }
  } catch (err) {}
}


function init() {
  const Win = global.Win

  Win.on('new-win-policy', (frame, url, policy) => {
    policy.ignore()
  })

  Win.on('close', () => {
    // make all webviews invisible
    const webviews = document.querySelectorAll('webview')
    for (const webview of webviews) {
      try {
        webview.style.display = 'none'
      } catch (e) {
        // nothing to do
      }
    }

    global.windowMap.forEach((win) => {
      try {
        if (win !== Win) {
          win.close(true)
        }
      } catch (e) {}
    })
    global.windowMap.clear()

    if (global.isDevWindow) {
      // dev window
      const clientWindowSync = require('../js/881e653f19d837f2408386047cb8c38c.js')
      clientWindowSync.notifyCloseWindow()
      // 先隐藏， 可能需要处理一些事情，比如上报之后再真正关闭
      // 如果直接 Win.close(true), 别的地方的 Win.on('close') 是不会收到调用的
      Win.hide()
      setTimeout(() => {
        Win.close(true)
      }, 1000)
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

  // 打开 inspect 窗口
  if (nw.App.argv.indexOf('inspect') !== -1) {
    tools.openInspectWin()
  }

  // enter background
  if (query.simple) {
    require('../js/8524207e9ea0bd06cec5e97c74bd6b7d.js')
  } else {
    const observer = require('../js/5f3c86137d346ddffec99d08c1ac2bb0.js').default
    observer.start()
    require('../js/29cbb96f0d87ca0a3ee63c5dbbd8107c.js')
  }
}


hack()
initGlobal()
initMenu()

if (!global.isDevWindow && !global.online) {
  const checkUpdate = require('../js/e5184416014aff2809a9dee32cc447c8.js')
  const idepluginUpdater = require('../js/8a1cb9f18551c9fced04d3b87ddfa687.js')

  checkUpdate.loop()
  idepluginUpdater.loop()

  // 检查是否需要更新
  tools.checkUpdateApp()
    .then(() => {
      init()
    })
} else {
  init()
}