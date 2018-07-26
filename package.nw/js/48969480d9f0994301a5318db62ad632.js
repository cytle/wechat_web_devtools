const proxyLocal = require('./69d7142a54ea62832f5ad2d8fb08d0ae.js')

function makeDirectConfig() {
  return {
    mode: 'pac_script',
    pacScript: {
      data: `function FindProxyForURL(url, host) {
              ${proxyLocal.config}
              return 'DIRECT'
            }`
    }
  }
}

module.exports = makeDirectConfig