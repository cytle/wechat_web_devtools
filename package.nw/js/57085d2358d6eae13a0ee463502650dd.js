var path = require("path"),
  fs = require("fs")

module.exports = {
  summary: function() {
    var tip = "the default rule for AnyProxy which supports CORS."
    return tip
  },

  shouldUseLocalResponse: function(req, reqBody) {
    //intercept all options request
    if (req.method == "OPTIONS") {
      return true
    } else {
      var simpleUrl = (req.headers.host || "") + (req.url || "")
      mapConfig.map(function(item) {
        var key = item.keyword
        if (simpleUrl.indexOf(key) >= 0) {
          req.anyproxy_map_local = item.local
          return false
        }
      })
      return !!req.anyproxy_map_local
    }
  },

  dealLocalResponse: function(req, reqBody, callback) {
    if (req.method == "OPTIONS") {
      callback(200, mergeCORSHeader(req.headers), "")
    } else if (req.anyproxy_map_local) {
      fs.readFile(req.anyproxy_map_local, function(err, buffer) {
        if (err) {
          callback(200, {}, "[AnyProxy failed to load local file] " + err)
        } else {
          callback(200, {}, buffer)
        }
      })
    }
  },

  replaceRequestProtocol: function(req, protocol) {},

  replaceRequestOption: function(req, option) {},

  replaceRequestData: function(req, data) {},

  replaceResponseStatusCode: function(req, res, statusCode) {},

  replaceResponseHeader: function(req, res, header) {
    return mergeCORSHeader(req.headers, header)
  },

  // Deprecated
  // replaceServerResData: function(req,res,serverResData){
  //     return serverResData;
  // },

  replaceServerResDataAsync: function(req, res, serverResData, callback) {
    callback(serverResData)
  },

  pauseBeforeSendingResponse: function(req, res) {},

  saveAllHttpResponse: function(req, statusCode, resHeader, serverResData) {},
  //[beta]
  //fetch entire traffic data
  fetchTrafficData: function(id, info) {}
}

function mergeCORSHeader(reqHeader, originHeader) {
  var targetObj = originHeader || {}

  delete targetObj["Access-Control-Allow-Credentials"]
  delete targetObj["Access-Control-Allow-Origin"]
  delete targetObj["Access-Control-Allow-Methods"]
  delete targetObj["Access-Control-Allow-Headers"]

  targetObj["access-control-allow-credentials"] = "true"
  targetObj["access-control-allow-origin"] = reqHeader['origin'] || reqHeader['Origin'] || "-___-||"
  targetObj["access-control-allow-methods"] = "GET, POST, PUT"
  targetObj["access-control-allow-headers"] = reqHeader['access-control-request-headers'] || "-___-||"

  return targetObj
}
