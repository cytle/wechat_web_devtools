const fs = require('fs')
const path = require('path')
const chokidar = require('chokidar')
const events = require('events')
const glob = require('glob')
const chokidarConfig = require('./cc434f98c55eed9e8c0b47ac55ef0546.js')

const {
  EventEmitter
} = events

class FileUtils extends EventEmitter {
  constructor(dirPath) {
    super()

    this.dirPath = dirPath.replace(/\\/g, '/')

    this._cache = {
      fileList: [],
      fileData: {},
      fileInfo: {}
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
      const completeFileList = glob.sync('**', {
        nodir: false,
        ignore: ['node_modules/**/*', '**/node_modules/**'],
        nosort: true,
        strict: false,
        silent: true,
        cwd: dirPath,
        absolute: false,
        mark: true,
      })

      // Though windows uses either / or \ as its path separator, only / characters are used
      this._cache.completeFileList = completeFileList.filter(file => {
        return file.replace(/\\/g, path.posix.sep)
      })

      const fileList = this._cache.completeFileList.filter(file => {
        let stat = fs.lstatSync(path.join(dirPath, file))
        let isFile = stat.isFile()
        if(isFile)
          this._cache.fileInfo[file] = stat
        return isFile
      })


      this._cache.fileList = fileList.filter(file => {
        return file.replace(/\\/g, path.posix.sep)
      })
    } catch (e) {
      throw (e)
    }
  }

  _all(eventType, fileName, details) {

    if (fileName) {
      fileName = fileName.replace(/\\/g, '/')
    }

    let cache = this._cache
    let fileData = cache.fileData || {}

    if (fileData[fileName]) {
      delete fileData[fileName]
    }

    let  {
      fileList,
      completeFileList,
      fileInfo
    } = cache

    if (eventType === 'unlink') {
      let p = path.posix.relative(this.dirPath, fileName)
      let index = fileList.indexOf(p)
      if (index !== -1) {
        fileList.splice(index, 1)
      }

      index = completeFileList.indexOf(p)
      if (index !== -1) {
        completeFileList.splice(index, 1)
      }

      delete fileInfo[p]
    } else if (eventType === 'unlinkDir') {
      let index = completeFileList.indexOf(path.posix.relative(this.dirPath, fileName) + '/')
      if (index !== -1) {
        completeFileList.splice(index, 1)
      }
    } else if (eventType === 'add') {
      let p = path.posix.relative(this.dirPath, fileName)
      fileList.push(p)
      completeFileList.push(p)
      fileInfo[p] = details
    } else if (eventType === 'addDir') {
      completeFileList.push(path.posix.relative(this.dirPath, fileName) + '/')
    } else if(eventType === 'change'){
      let p = path.posix.relative(this.dirPath, fileName)
      fileInfo[p] = details
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

  getAllFile(filter = '') {
    if (!filter) {
      return this._cache.fileList
    }

    let res = []
    this._cache.fileList.map(file => {
      if (file.indexOf(filter) == 0) {
        res.push(path.posix.relative(filter, file))
      }
    })
    return res
  }

  getAllFileInfo() {
    return this._cache.fileInfo
  }

  getAllFileWithDir(filter = '') {
    if (!filter) {
      return this._cache.completeFileList
    }

    let res = []
    this._cache.completeFileList.map(file => {
      if (file.indexOf(filter) == 0) {
        res.push(path.posix.relative(filter, file))
      }
    })
    return res
  }

  getFilesByExtName(extName = '', filter = '') {
    if (!extName) {
      return this.getAllFile(filter)
    }

    let fileList = this._cache.fileList
    let res = []
    fileList.forEach((file) => {
      let extname = path.extname(file)
      if (extname === extName && file.indexOf(filter) == 0) {
        res.push(path.posix.relative(filter, file))
      }
    })

    return res
  }

  getFile(filePath, encode = 'utf8') {
    let isAbsolute = path.isAbsolute(filePath)
    if (isAbsolute) {
      return
    }

    let cacheKey = encode === null? 'null': encode

    filePath = path.posix.join(this.dirPath, filePath.replace(/\\/g, '/'))

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
    if (!filePath)
      return false

    filePath = path.posix.join(this.dirPath, filePath)
    return fs.existsSync(filePath)
  }
}

module.exports = FileUtils