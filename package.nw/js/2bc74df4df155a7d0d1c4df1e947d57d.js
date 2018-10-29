// config passed from outside
let originalConfig = []
// the instance of config in use
let config = []

const getType = object => Object.prototype.toString.call(object).slice(8, -1).toLowerCase()

/**
 * if x < y return -1
 * if x = y return 0
 * if x > y return 1
 * @param {string} x
 * @param {string} y
 */
function compareLibVersion(x, y) {
  if (!x && !y) return 0
  if (!x) return -1
  if (!y) return 1

  const reg = /\d+/g
  const xMatch = x.match(reg)
  const yMatch = y.match(reg)

  if (!xMatch) return -1
  if (!yMatch) return 1

  const xVersionNumbers = xMatch.map(n => parseInt(n))
  const yVersionNumbers = yMatch.map(n => parseInt(n))

  const iterLen = xMatch.length > yMatch.length ? yMatch.length : xMatch.length
  for (let i = 0; i < iterLen; i++) {
    if (xVersionNumbers[i] < yVersionNumbers[i]) {
      return -1
    } else if (xVersionNumbers[i] > yVersionNumbers[i]) {
      return 1
    }
  }

  if (xVersionNumbers.length === yVersionNumbers.length) {
    return 0
  } else {
    return xVersionNumbers.length < yVersionNumbers.length ? -1 : 1
  }
}

function reply(error, result, ext) {
  self.postMessage({
    error,
    result,
    ext,
  })
}

function evaluate(message, context, ext) {
  const rules = config || []
  for (const rule of rules) {
    try {
      if (rule.used) break
      // filter based on lib version
      const config = rule.config
      let passed = true
      if (config.scope && getType(config.scope) === 'array' && config.scope.length > 0) {
        passed = false
        for (const condition of config.scope) {
          switch (condition.type) {
            case 'lib': {
              if (!context) continue
              const libVersion = context.libVersion
              if (condition.target) {
                switch (condition.operator) {
                  case '=': {
                    const type = getType(condition.target)
                    if (type === 'string') {
                      if (libVersion === condition.target) {
                        passed = true
                        break
                      }
                    } else if (type === 'array') {
                      for (const t of condition.target) {
                        if (t === libVersion) {
                          passed = true
                          break
                        }
                      }
                    }
                    break
                  }
                  case '<': {
                    const type = getType(condition.target)
                    if (type === 'string') {
                      if (compareLibVersion(libVersion, condition.target) < 0) {
                        passed = true
                        break
                      }
                    }
                    break
                  }
                  case '>': {
                    const type = getType(condition.target)
                    if (type === 'string') {
                      if (compareLibVersion(libVersion, condition.target) > 0) {
                        passed = true
                        break
                      }
                    }
                    break
                  }
                  case '<=': {
                    const type = getType(condition.target)
                    if (type === 'string') {
                      if (!(compareLibVersion(libVersion, condition.target) > 0)) {
                        passed = true
                        break
                      }
                    }
                    break
                  }
                  case '>=': {
                    const type = getType(condition.target)
                    if (type === 'string') {
                      if (!(compareLibVersion(libVersion, condition.target) < 0)) {
                        passed = true
                        break
                      }
                    }
                    break
                  }
                }
              }
              break
            }
            default: {
              break
            }
          }
        }
      }
      if (!passed) continue
      // filter based on message
      if (((config.matchType === 'full') && (config.match === message)) ||
        ((config.matchType === 'reg') && ((new RegExp(config.match)).test(message)))) {
        reply(null, {config}, ext)
        rule.used = true
        break
      }
    } catch (err) {
      reply(`appservice.js error while processing rule ${rule.logid}: ${err}`)
      // avoid using the rule any further
      if (rule) {
        rule.used = true
      }
    }
  }
}

self.onmessage = event => {
  if (event.data) {
    switch (event.data.msgType) {
      case 'evaluate': {
        if (event.data.msgData) {
          if (event.data.msgData.message) {
            evaluate(event.data.msgData.message, event.data.msgData.context, event.data.msgData.ext)
          }
        }
        break
      }
      case 'refreshSession': {
        config = JSON.parse(JSON.stringify(originalConfig || '[]'))
        break
      }
      case 'updateConfig': {
        originalConfig = event.data.msgData
        config = JSON.parse(JSON.stringify(originalConfig || '[]'))
        break
      }
    }
  }
}
