const fs = require('fs')
const path = require('path')
const chokidar = require('chokidar')
const events = require('events')
const glob = require('glob')
const chokidarConfig = require('./c7fae7f9b9c1f62958ed51cf16850a95.js')

const {
  EventEmitter
} = events

class FileUtils extends EventEmitter {
  constructor(dirPath) {
    super()

    this.dirPath = dirPath

    this._cache = {
      fileList: [],
      fileData: {}
    }

    this._getAllFile = this._getAllFile.bind(this)
    this.getFilesByExtName = this.getFilesByExtName.bind(this)
    this._all = this._all.bind(this)
    this.ready = this.ready.bind(this)

    this._getAllFile()

    this._watcher = chokidar.watch(dirPath, chokidarConfig)

    this._watcher.on('ready', () => {
      this._ready = true
    })
    this._watcher.on('all', this._all)
  }

  _getAllFile() {
    let dirPath = this.dirPath

    try {
      let fileList = glob.sync('**/*.*', {
        nodir: true,
        ignore: ['node_modules/**/*'],
        nosort: true,
        strict: false,
        silent: true,
        cwd: dirPath,
        absolute: false,
      })

      // Though windows uses either / or \ as its path separator, only / characters are used
      this._cache.fileList = fileList.filter((file) => {
        return file.replace(/\\/g, path.sep)
      })
    } catch (e) {
      throw (e)
    }
  }

  _all(eventType, fileName, details) {

    let cache = this._cache
    let fileData = cache.fileData || {}

    if (fileData[fileName]) {
      delete fileData[fileName]
    }

    let fileList = cache.fileList
    if (eventType === 'unlink') {

      let index = fileList.indexOf(fileName)
      if (index !== -1) {
        fileList.splice(index, 1)
      }
    } else if (eventType === 'add') {
      fileList.push(fileName)
    }

    this.emit('all', eventType, fileName, details)
  }


  ready(callback) {
    if (this._ready) {
      callback()
    } else {
      this._watcher.once('ready', () => {
        callback()
      })
    }
  }

  stopWatch() {
    this._watcher.close()

    this._cache = {}

    this.emit('close')
  }

  getAllFile() {
    return this._cache.fileList
  }

  getFilesByExtName(extName = '') {
    let fileList = this._cache.fileList
    if (!extName) {
      return fileList
    }

    let res = []
    fileList.forEach((file) => {
      let extname = path.extname(file)
      if (extname === extName) {
        res.push(file)
      }
    })

    return res
  }

  getAllWXMLFiles() {
    return this.getFilesByExtName('.wxml')
  }

  getAllJSFiles() {
    return this.getFilesByExtName('.js')
  }

  getFile(filePath, encode = 'utf8') {
    let isAbsolute = path.isAbsolute(filePath)
    if (isAbsolute) {
      return
    }

    let cacheKey = encode === null? 'null': encode

    filePath = path.join(this.dirPath, filePath)

    let fileData = this._cache.fileData

    if (!fileData[filePath]) {
      fileData[filePath] = {}
    }

    if (!fileData[filePath][
        [cacheKey]
      ]) {
      fileData[filePath][
        [cacheKey]
      ] = fs.readFileSync(filePath, encode)
    }

    return fileData[filePath][cacheKey]
  }

  exists(filePath) {
    filePath = path.join(this.dirPath, filePath)

    return fs.existsSync(filePath)
  }
}

module.exports = FileUtils