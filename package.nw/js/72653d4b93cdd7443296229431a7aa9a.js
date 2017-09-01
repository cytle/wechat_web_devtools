const path = require('path')
const log = require('./b22d389f507598d040002f99ddfae35d.js')



let parentFileName

var handler = {
  get:  function(target, name){
    if (!parentFileName) {
      parentFileName = module.parent.filename
      if (path.basename(parentFileName) == 'lazy-require.js') {
        parentFileName = module.parent.parent.filename
      }
    }
    log.parentFileName = parentFileName
    return log[name]
  }
}

// 通过 getter 和 setter 让 lazyRequire 这个 module 不被 cache
function preventCache() {
  const modulePath = require.resolve(module.filename)

  if (require.cache[modulePath]) {
    require.cache[modulePath] = undefined

    Object.defineProperty(require.cache, modulePath, {
      configurable: true,
      enumerable: true,
      set() { },
      get() {
        return undefined
      }
    })
  }
}

preventCache()

module.exports = new Proxy({}, handler)
