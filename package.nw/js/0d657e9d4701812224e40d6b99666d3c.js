let git
try {
  const _realGit = require('git-utils')
  git = {
    open(...argus) {
      let _realRepo
      try {
        _realRepo = _realGit.open(...argus)
      } catch (err) {
        _realRepo = null
      }
      if (!_realRepo) {
        return null
      }
      return new Proxy(_realRepo, {
        get(obj, key) {
          const original = obj[key]
          if (typeof original === 'function') {
            return function (...args) {
              let result
              try {
                result = original.apply(obj, args)
              } catch (e) {
                console.log('proxy intercepted an error', e)
                result = null
              }
              return result
            }
          }
          return original
        }
      })
    }
  }
} catch (e) {
  // import git module failed.
  // fake git
  console.log('import git module failed.')
  git = {
    open() {
      return null
    }
  }
}

module.exports = git
