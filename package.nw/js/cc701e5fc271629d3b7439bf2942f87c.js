const http = require('http'),
  async = require("async"),
  requestHandler = require('./35389c4e35fc51d77926938d00d36243.js')
const log = require('./72653d4b93cdd7443296229431a7aa9a.js')

const DEFAULT_PORT = 8001,
  DEFAULT_HOST = "localhost"

var default_rule = require('./57085d2358d6eae13a0ee463502650dd.js')

//option
//option.port     : 8001(default)
//option.hostname : localhost(default)
//option.rule          : ruleModule
function proxyServer(option) {
  option = option || {}

  var self = this,
    proxyPort = option.port || DEFAULT_PORT,
    proxyHost = option.hostname || DEFAULT_HOST,
    proxyRules = option.rule || default_rule

  requestHandler.setRules(proxyRules) //TODO : optimize calling for set rule
  self.httpProxyServer = null

  async.series(
    [
      //creat proxy server
      function(callback) {
        self.httpProxyServer = http.createServer(requestHandler.userRequestHandler)
        callback(null)
      },

      //start proxy server
      function(callback) {
        self.httpProxyServer.listen(proxyPort, proxyHost)
        callback(null)
      },

      //server status manager
      function(callback) {
        callback(null)
      }
    ],

    //final callback
    function(err, result) {
      if (err) {
        log.error(`err when start proxy server : ${err}`)
      }
    }
  )

  self.close = function() {
    self.httpProxyServer && self.httpProxyServer.close()
  }
}

module.exports.proxyServer = proxyServer
