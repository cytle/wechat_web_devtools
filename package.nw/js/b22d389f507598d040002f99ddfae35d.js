const fs = require('fs')
const path = require('path')
const Log = require('log')
const fmt = require('util').format

const MAX_LOG_NUM = 10
const MAX_LOG_BYTES = 10 * 1024 * 1024 // 10 MB
// const MAX_LOG_BYTES = 50
const ts = Date.now()
const dirConfig = global.appConfig.isNodeTest
  ? { WeappLog: path.join(__dirname, '../test') }
  : require('./92320c1386e6db6a6f2556736a9bc280.js')
const WeappLog = dirConfig.WeappLog

try {

  if (nw.App.argv.indexOf('--log-file') > -1) {
    const logFilePath = nw.App.argv[nw.App.argv.indexOf('--log-file') + 1]
    if (logFilePath && !logFilePath.startsWith('-')) {
      global.logFilePath = logFilePath
    }

    if (nw.App.argv.indexOf('--log-interval') > -1) {
      const logInterval = parseInt(nw.App.argv[nw.App.argv.indexOf('--log-interval') + 1])
      if (Number.isSafeInteger(logInterval)) {
        global.logInterval = logInterval
      }
    }
  }

} catch (err) {
  // nothing to do
}

const isDev = global.appConfig && global.appConfig.isDev
// const isDev = false
const getSortedFileList = () => {
  try {
    let fileNameList = fs.readdirSync(WeappLog)
    let sortFileList = fileNameList.reduce((array, item) => {
      let fullpath = path.join(WeappLog, item)
      let stat = fs.statSync(fullpath)
      array.push({
        filePath: fullpath,
        createTime: parseInt(stat.birthtime.getTime() / 1000)
      })
      return array
    }, [])
    sortFileList = sortFileList.sort(function (a, b) {
      return a.createTime < b.createTime ? 1 : -1
    })
    return sortFileList
  } catch (e) { }
  return []
}

const limitLogFileNumber = () => {
  try {
    let fileList = getSortedFileList()
    if (fileList.length >= MAX_LOG_NUM) {
      for (let i = MAX_LOG_NUM; i < fileList.length; i++) {
        let fileInfo = fileList[i]
        fs.unlink(fileInfo.filePath, () => { })
      }
    }
  } catch (e) { }
}

const limitLogFileSize = () => {
  try {

  } catch (e) { }
}

var log
var fileStream
let _interval
function start() {
  if (isDev && !global.logFilePath) {
    const boundConsole = {}
    var props = Object.getOwnPropertyNames(console)
    props.forEach(key => {
      if (typeof console[key] === 'function') boundConsole[key] = console[key].bind(console)
      else Object.defineProperty(boundConsole, key, Object.getOwnPropertyDescriptor(console, key))
    })
    log = boundConsole
  } else {
    limitLogFileNumber()
    let currentTime = new Date()
    let logName = `${currentTime.getFullYear()}-${currentTime.getMonth() + 1}-${currentTime.getDate()}-${currentTime.getHours()}-${currentTime.getMinutes()}-${currentTime.getSeconds()}.log`
    let logFilePath = global.logFilePath || path.join(WeappLog, logName)
    fileStream = fs.createWriteStream(logFilePath)

    Log.prototype.log = function (levelStr, args) {
      if (Log[levelStr] <= this.level) {
        var msg = fmt.apply(null, args);
        var now = new Date()
        if (!this.parentFileName) {
          this.parentFileName = module.parent.filename
        }
        msg = `[${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}T${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}] ${levelStr} ${this.parentFileName} ${msg}\n`
        if (levelStr == 'ERROR') {
          console.error(msg)
        } else {
          console.log(msg)
        }
        this.stream.write(msg)
      }
    }

    log = new Log('info', fileStream)
    fileStream.cork()
    log.filePath = logFilePath
  }

  log.getLogFile = (count) => {
    let fileList = getSortedFileList()
    return fileList.slice(0, count)
  }

  log.cleanSync = () => {
    let fileNameList = fs.readdirSync(WeappLog)
    fileNameList.forEach(item => {
      fs.unlinkSync(path.join(WeappLog, item))
    })
  }


  log.flush = () => {
    process.nextTick(() => {
      try {
        fileStream.uncork()
        const size = fileStream.bytesWritten || 0
        if (size > MAX_LOG_BYTES && !global.logFilePath) {
          try {
            fileStream.end()
            // restart
            start()
          } catch (e) {
            // errors
            console.error(e)
          }
        } else {
          fileStream.cork()
        }
      } catch (e) { }
    })
  }

  if (!isDev || global.logFilePath) {
    const LOG_FLUSH_INTERVAL = global.logInterval || 60000 * 5
    clearInterval(_interval)
    _interval = setInterval(() => {
      log.flush()
    }, LOG_FLUSH_INTERVAL)
  }
}  

start()

module.exports = function getLog() {
  return log
}
