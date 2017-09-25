const fs = require('fs')
const path = require('path')
const Log = require('log')
const fmt = require('util').format

const MAX_LOG_NUM = 10
const ts = Date.now()
const dirConfig = global.appConfig.isNodeTest
  ? { WeappLog: path.join(__dirname, '../test') }
  : require('./92320c1386e6db6a6f2556736a9bc280.js')
const WeappLog = dirConfig.WeappLog

const isDev = global.appConfig && global.appConfig.isDev
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
        fs.unlink(fileInfo.filePath, () => {})
      }
    }
  } catch (e) { }
}


var log
var fileStream
if (isDev) {
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
  let logFilePath = path.join(WeappLog, logName)
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
      fileStream.cork()
    } catch (e) { }
  })
}

if (!isDev) {
  setInterval(() => {
    log.flush()
  }, 60000 * 5)
}



module.exports = log