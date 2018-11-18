const URL = require('url')
const tools = require('../js/84b183688a46c9e2626d3e6f83365e13.js')

function init() {
  const webview = document.getElementById('webview')
  const query = tools.getQuery(location.search)

  // enter backgroud
  const idepluginManager = require('../js/f5a748840b272d2bf0223c95f6c8dbe3.js')
  idepluginManager.initPlugin(query.pluginid, webview)

  global.windowMap.get('MAIN').window.postMessage('PLUGIN_READY', '*')
}

if (document.readyState === 'complete') {
  init()
} else {
  document.addEventListener('DOMContentLoaded', init)
}

window.onerror = function (e) {
  document.body.innerText = e.toString()
}
