const FileUtils = require('./6a9ad62751ae856c3f866560ed34112d.js')
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