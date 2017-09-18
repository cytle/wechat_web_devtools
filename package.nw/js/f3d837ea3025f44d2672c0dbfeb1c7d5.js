const log = require('./72653d4b93cdd7443296229431a7aa9a.js')
const setChromeProxy = require('./f845f8c2f5db64684f8a3b26efa3609d.js')
const makeDirectConfig = require('./48969480d9f0994301a5318db62ad632.js')
const makeUrlConfig = require('./0afbad142d4f00103a01de2e1668a665.js')
const makeSystemConfig = require('./4e4d52f38623c65500a0844fc765b023.js')
const isWin = process.platform === 'win32'

let currentProxyType = 'SYSTEM'
const setSystemProxy = async function() {
  let config = await makeSystemConfig()
  if (currentProxyType != 'SYSTEM') {
    // 如果这里不是 SYSTEM 说明有另一个 update 请求来了，这里就放过设置
    return
  }
  return await setChromeProxy(config)
}

/** direct **/
const setDirectProxy = async function() {
  let config = makeDirectConfig()
  return await setChromeProxy(config)
}

/** url **/
const setUrlProxy = async function(options) {
  let config = makeUrlConfig(options)
  return await setChromeProxy(config)
}

async function set(type) {
  currentProxyType = type
  if (type === 'SYSTEM') {
    return setSystemProxy()
  } else if (type === 'DIRECT') {
    return setDirectProxy()
  } else {
    return setUrlProxy({
      ProxyServer: type.replace('PROXY ', '')
    })
  }
}

async function up(type) {
  return await set(type)
}

module.exports = {
  set,
  up
}