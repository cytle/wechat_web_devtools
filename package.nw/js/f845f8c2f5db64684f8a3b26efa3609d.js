const log = require('./72653d4b93cdd7443296229431a7aa9a.js')
async function setChromeProxy(config) {
  return new Promise((resolve, reject) => {
    chrome.proxy.settings.set({
      value: config,
      scope: 'regular'
    }, () => {
      log.info(`setChromeProxy config: ${JSON.stringify(config)}`)
      resolve()
    })
  })
}

module.exports = setChromeProxy