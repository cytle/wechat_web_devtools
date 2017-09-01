const URL = require('url')
const proxy = require('./cc701e5fc271629d3b7439bf2942f87c.js')
const setAppProxy = require('./f3d837ea3025f44d2672c0dbfeb1c7d5.js')
const proxyLocal = require('./69d7142a54ea62832f5ad2d8fb08d0ae.js')

let proxyCache = {}

function trasnlateReqToUrlParse(req) {
  let host = req.headers.host
  let protocol = (!!req.connection.encrypted && !/^http:/.test(req.url)) ? "https" : "http"
  let fullUrl = protocol === "http" ? req.url : (protocol + '://' + host + req.url)
  let res = URL.parse(fullUrl)
  res.pureHref = res.href.replace(/\?.*/, '').replace(/\#.*/, '')
  return res
}

async function startProxyServer(options) {
  let {
    port,
    rule,
    type = 'DIRECT',
    hostname = '127.0.0.1'
  } = options

  clearProxyCache()

  if (Object.prototype.toString.call(rule.forceLocalProxy) == '[object Array]') {
    proxyLocal.makeProxyLocal(port, rule.forceLocalProxy)
    var forceLocalProxy = rule.forceLocalProxy
    rule.shouldUseLocalResponse = (req, reqData) => {
      let urlPattern = trasnlateReqToUrlParse(req)
      let pureHref = urlPattern.pureHref

      let result = false
      for (let i = 0, len = forceLocalProxy.length; i < len; i++) {
        let item = forceLocalProxy[i]
        let type = Object.prototype.toString.call(item)
        if (type == '[object RegExp]') {
          if (item.test(pureHref)) {
            result = true
            break
          }
        } else if(type == '[object String]') {
          if (pureHref.indexOf(item) === 0) {
            result = true
            break
          }
        }
      }
      return result
    }
    delete rule.forceLocalProxy
  }

  new proxy.proxyServer({
    port,
    hostname,
    rule,
  })

  return
}

async function updateProxy(type) {
  clearProxyCache()
  return await setAppProxy.up(type)
}

const clearProxyCache = () => {
  proxyCache = {}
}

const getProxyForURL = (url) => {
  let urlObj = URL.parse(url)
  url = `${urlObj.protocol}\/\/${urlObj.hostname}`

  let urlProxyCache = proxyCache[url]
  if (typeof urlProxyCache == 'undefined') {
    let proxy = nw.App.getProxyForURL(url)
    if (proxy === 'DIRECT') {
      proxy = null
    } else {
      proxy = `http://${proxy.replace('PROXY ', '')}`
    }
    urlProxyCache = proxyCache[url] = proxy
  }
  return urlProxyCache
}

module.exports = {
  startProxyServer,
  updateProxy,
  clearProxyCache,
  getProxyForURL
}