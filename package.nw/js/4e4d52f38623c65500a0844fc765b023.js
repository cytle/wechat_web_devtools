const path = require('path')
const fs = require('fs')
const request = require('request')
const log = require('./72653d4b93cdd7443296229431a7aa9a.js')

const getSystemProxy = require('./f0b5bbf49e36d51f92c5cfe399db6716.js')
const proxyLocal = require('./69d7142a54ea62832f5ad2d8fb08d0ae.js')
const makeUrlConfig = require('./0afbad142d4f00103a01de2e1668a665.js')
const makeDirectConfig = require('./48969480d9f0994301a5318db62ad632.js')
const dirConfig = require('./92320c1386e6db6a6f2556736a9bc280.js')
const proxyCachePath = dirConfig.ProxyCache
const isWin = process.platform === 'win32'

function initProxy(proxySetting) {
  return new Promise((resolve, reject) => {
    if (proxySetting.AutoConfigURL) {
      request(proxySetting.AutoConfigURL, (error, resp, body) => {
        if (!error) {
          try {
            let temppacPath = path.join(proxyCachePath, 'temppac.pac')
            fs.writeFileSync(temppacPath, body + `\n module.exports=FindProxyForURL`, 'utf8')
            let FindProxyForURL = require(temppacPath)
            let FindProxyForURLFun = FindProxyForURL.toString()

            log.info(`setAppProxy.js initProxy FindProxyForURLFun: ${FindProxyForURLFun}`)

            let hackProxyForURLFun = body.replace(FindProxyForURLFun, `
                function FindProxyForURL(url, host) {
                  ${proxyLocal.config}
                  ${FindProxyForURLFun}
                  return FindProxyForURL(url, host)
                }
              `)

            let pacFile = path.join(proxyCachePath, 'pacFile.pac')

            fs.writeFileSync(pacFile, body.replace(FindProxyForURLFun, hackProxyForURLFun))

            if (isWin) {
              let imgTemp = document.createElement('img')
              imgTemp.src = pacFile
              proxySetting.AutoConfigURL = `${imgTemp.src}?${+new Date()}`
            } else {
              proxySetting.AutoConfigURL = encodeURI(`file:///${pacFile}?${+new Date()}`)
            }

            resolve(proxySetting)
          } catch (e) {
            reject(`init proxy error ${e}`)
          }
        } else {
          reject(`init proxy error ${error}`)
        }
      })
    } else {
      resolve(proxySetting)
    }
  })
}

function makePacConfig(proxySetting) {
  return {
    mode: 'pac_script',
    pacScript: {
      url: proxySetting.AutoConfigURL
    }
  }
}

const makeSystemConfig = async function() {
  let proxySetting = await getSystemProxy()
  proxySetting = await initProxy(proxySetting)

  let isUrlConfig = (isWin && proxySetting.ProxyEnable) || (!isWin && (proxySetting.httpProxyEnable || proxySetting.httpsProxyEnable))
  let config

  if (proxySetting.AutoConfigURL) {
    config = makePacConfig(proxySetting)
  } else if (isUrlConfig) {
    config = makeUrlConfig(proxySetting)
  } else {
    config = makeDirectConfig()
  }

  return config
}

module.exports = makeSystemConfig