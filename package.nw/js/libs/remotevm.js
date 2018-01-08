const VM = require('vm')
const fs = require('fs')
const path = require('path')
const inspector = require('inspector')

const syncSDKList = {
  getSystemInfo: true,
  getBackgroundAudioState: true,
  setBackgroundAudioState: true,
  operateBackgroundAudio: true,
  createRequestTask: true,
  createUploadTask: true,
  createDownloadTask: true,
  createSocketTask: true,
  operateSocketTask: true,
  createAudioInstance: true
}

function isSyncSDK (sdkName) {
  if(syncSDKList[sdkName])
    return true
  return /Sync$/.test(sdkName)
}

// 同步 API  超时时间 10 秒
const MAX_SYNC_TIME = 10 * 1000
const remoteLogPrefix = '[REMOTE] '

var {
  fileSort,
  fileRootPath,
  tempFilePath,
  devVendorList,
  devVendorPath,
  isDev
} = process.env

fileSort = JSON.parse(fileSort)

let beginPort = 1219
let initPubLib = 0
while(true) {
  try {
    inspector.open(beginPort)
    break
  } catch (e) {
    beginPort++
  }
}
// SDK 会修改 console的某些方法，导致调试时的 log 不能定位到相应文件
// 把 console 保护起来
const protectedConsole = Object.assign({}, console)
Object.freeze(protectedConsole)
// init
var vmGlobal = {
  console: protectedConsole,
  nodeRequire: function(p) {
    return require(path.join(fileRootPath, p))
  },
  setTimeout: setTimeout,
  setInterval: setInterval
}

var jsVm = VM.createContext(vmGlobal)

process.on('message', (msg) => {
  let {
    cliMsg,
    type
  } = msg
  console.warn(`${remoteLogPrefix} receive msg id: ${cliMsg.id}` )
  if (type === 'handleAddInterface') {
    handleAddInterface(cliMsg)
  } else if (type === 'handleEvaluateJavascript') {
    handleEvaluateJavascript(cliMsg)
  }
})

function sendMsgToCli(data) {
  process.send({
    type: 'sendMsgToCli',
    data
  })
}

function handleEvaluateJavascript(cliMsg) {
  let pubLib = cliMsg.pubLib
  let js = cliMsg.script
  const callbackId = cliMsg.callbackId
  let ret
  console.log(cliMsg)
  // 如果是 appservice js
  if (initPubLib === 1){ //js && js.trim().startsWith('var __wxAppData = {}')) {
    initPubLib++
    fileSort.forEach((s) => {
      let js = `
        var code = nodeRequire('${s}');
        var define = this.define
        var require = this.require
        var App = this.App
        var Page = this.Page
        var getApp = this.getApp
        var wx = this.wx

        code(define, require, App, Page, getApp, wx)`

      try {
        ret = VM.runInContext(js, jsVm)
      } catch (e) {
        console.error(`[remoteLogPrefix] run appservice error ${e}`)
      }
    })

    js = 'var a = 100;'
    console.warn(`${remoteLogPrefix} run init appservice.js` )
  } else if (js && js.indexOf('!__wxRouteBegin') > 0) {
    js = js.replace('!__wxRouteBegin', 'false').replace('__wxRouteBegin', 'var __wxRouteBegin')
  } else if (pubLib ) {
    // 如果是基础库代码
    if(initPubLib === 0) {
      js = fs.readFileSync(path.join(devVendorPath, 'publib_ios.js'), 'utf8')
      js = js.replace('!__wxRouteBegin', 'false').replace('__wxRouteBegin', 'var __wxRouteBegin')
      console.warn(`${remoteLogPrefix} run init pubLib.js` )
      initPubLib++
    } else {
      js = 'var a = 10'
    }

  }

  try {
    ret = VM.runInContext(js, jsVm)
  } catch (e) {
    console.error(`[remoteLogPrefix] run vm error ${e}`)
  }
  // special 说这样 因为客户端不了解复杂的结构只认识 string
  console.log('ret :', ret)
  if(typeof ret === 'object')
    ret = ''
  sendMsgToCli({
    callbackId,
    event: 'evaluateCallback',
    ret: typeof ret === 'undefined' ? '' : JSON.stringify(ret) //ret.toString()
  })
}

function handleAddInterface(cliMsg) {
  const name = cliMsg.name
  const methods = cliMsg.methods
  const face = {}

  methods.forEach((m) => {
    face[m.name] = function() {
      let _arguments = arguments

      function sendMsg(callbackId = 0) {
        sendMsgToCli({
          event: 'callInterface',
          method: m.name,
          args: Array.prototype.slice.call(_arguments),
          callbackId
        })
      }

      // 如果是同步的api需要特殊处理
      let sdkName = arguments[0]
      if (m.name === 'invokeHandler' && isSyncSDK(sdkName)) {
        // sendMsgToCli(`[fork ${sdkName} argumets ${_arguments}`
        let callbackId = arguments[2]
        sendMsg(callbackId)

        let t = Date.now()
        let timeout = false
        let tempFile = path.join(tempFilePath, `${callbackId}`)
        while (!fs.existsSync(tempFile)) {
          if(Date.now() - t > MAX_SYNC_TIME) {
            console.error(`call sync api ${sdkName} time out`)
            timeout = true
            break
          }
        }

        console.warn(`${remoteLogPrefix} sync api ${sdkName} cost time : ${Date.now() - t}` )

        if(!timeout) {
          let data = fs.readFileSync(tempFile, 'utf8')
          fs.unlinkSync(tempFile)
          return data
        } else {
          return JSON.stringify({
            errMsg: `${sdkName}:fail sync timeout`
          })
        }

      } else {
        sendMsg()
      }
    }
  })

  vmGlobal[name] = face
}

process.send({
  type: 'vm_init',
  url: inspector.url()
})

console.warn(`${remoteLogPrefix} inspector url ${inspector.url()}` )
