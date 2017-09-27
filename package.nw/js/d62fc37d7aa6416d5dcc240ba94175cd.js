const FileUtils = require('./8e2026561e71ea67df211489b756510c.js')
const path = require('path')

var cache = {}

module.exports = (dirPath) => {
  return new Promise((resolve, reject) => {
    if (!cache[dirPath]) {
      try {
        cache[dirPath] = new FileUtils(dirPath)
        cache[dirPath].on('close', () => {
          delete cache[dirPath]
        })
        cache[dirPath].ready(() => {
          resolve(cache[dirPath])
        })
      } catch (e) {
        reject(e)
      }
    } else {
      resolve(cache[dirPath])
    }
  })
}