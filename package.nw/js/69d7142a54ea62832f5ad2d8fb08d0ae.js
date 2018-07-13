let proxyLocalCache


// 强制代理到本地
const makeProxyLocal = (port, rules = []) => {
  let res = []
  rules.forEach(item => {
    let type = Object.prototype.toString.call(item)
    if (type == '[object RegExp]') {
      res.push(`${item}.test(url)`)
    } else if (type == '[object String]') {
      res.push(`url.indexOf('${item}') === 0`)
    }
  })

  let forceDirectReg = /^(http|ws)s?\:\/\/(localhost|127.0.0.1)/

  proxyLocalCache = `if (${res.join('||')}) {
    return 'PROXY 127.0.0.1:${port}'
  }

  if (${forceDirectReg}.test(url)){
    return 'DIRECT'
  }`
}


module.exports = {
  makeProxyLocal,
  get config(){
    return proxyLocalCache
  },
  set config(value) {
    proxyLocalCache = value
  }
}