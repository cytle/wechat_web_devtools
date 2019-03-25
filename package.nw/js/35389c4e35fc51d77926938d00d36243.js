const http = require("http"),
  url = require("url"),
  zlib = require('zlib'),
  async = require('async'),
  Buffer = require('buffer').Buffer,
  util = require('./bb9abe449547967febdee7985332dec4.js'),
  log = require('./72653d4b93cdd7443296229431a7aa9a.js')

var defaultRule = require('./57085d2358d6eae13a0ee463502650dd.js'),
  userRule = defaultRule //init

function userRequestHandler(req, userRes) {
  /*
  note
      req.url is wired
      in http  server : http://www.example.com/a/b/c
      in https server : /a/b/c
  */
  var host = req.headers.host,
    protocol = (!!req.connection.encrypted && !/^http:/.test(req.url)) ? "https" : "http",
    fullUrl = protocol === "http" ? req.url : (protocol + '://' + host + req.url),
    urlPattern = url.parse(fullUrl),
    path = urlPattern.path,
    resourceInfo,
    resourceInfoId = -1,
    reqData

  //record
  resourceInfo = {
    host: host,
    method: req.method,
    path: path,
    protocol: protocol,
    url: protocol + "://" + host + path,
    req: req,
    startTime: new Date().getTime()
  }

  //get request body and route to local or remote
  async.series([
    fetchReqData,
    routeReq
  ], function() {
    //mark some ext info
  })

  //get request body
  function fetchReqData(callback) {
    var postData = []
    req.on("data", function(chunk) {
      postData.push(chunk)
    })
    req.on("end", function() {
      reqData = Buffer.concat(postData)
      resourceInfo.reqBody = reqData.toString()
      callback()
    })
  }

  //route to dealing function
  function routeReq(callback) {
    if (userRule.shouldUseLocalResponse(req, reqData)) {
      dealWithLocalResponse(callback)
    } else {
      dealWithRemoteResonse(callback)
    }
  }

  function dealWithLocalResponse(callback) {
    userRule.dealLocalResponse(req, reqData, function(statusCode, resHeader, resBody) {

      //update record info
      resourceInfo.endTime = new Date().getTime()
      resourceInfo.res = { //construct a self-defined res object
        statusCode: statusCode || "",
        headers: resHeader || {}
      }
      resourceInfo.resHeader = resHeader || {}
      resourceInfo.resBody = resBody
      resourceInfo.length = resBody ? resBody.length : 0
      resourceInfo.statusCode = statusCode

      userRes.writeHead(statusCode, resHeader)
      userRes.end(resBody)
      callback && callback()
    })

    return
  }

  function dealWithRemoteResonse(callback) {
    var options

    //modify request protocol
    protocol = userRule.replaceRequestProtocol(req, protocol) || protocol

    //modify request options
    options = {
      hostname: urlPattern.hostname || req.headers.host,
      port: urlPattern.port || req.port || (/https/.test(protocol) ? 443 : 80),
      path: path,
      method: req.method,
      headers: req.headers
    }

    userRule.replaceRequestOption(req, options, function() {
      //options = userRule.replaceRequestOption(req, options) || options;
      options.rejectUnauthorized = false


      //update request data
      reqData = userRule.replaceRequestData(req, reqData) || reqData
      options.headers = util.lower_keys(options.headers)
      if (options.headers["proxy-connection"]) {
        options.headers["connection"] = options.headers["proxy-connection"]
        delete options.headers["proxy-connection"]
      }
      if (options.headers["accept-language"]) {
        options.headers["accept-language"] = "zh-CN,zh;q=0.8,en;q=0.6,zh-TW;q=0.4"
      }
      options.headers["content-length"] = reqData.length //rewrite content length info

      //send request
      var proxyReq = (/https/.test(protocol) ? https : http).request(options, function(res) {
        //var proxyReq = ( /https/.test(protocol) ? https : http).request(proOptions, function(res) {
        //deal response header
        var statusCode = res.statusCode
        statusCode = userRule.replaceResponseStatusCode(req, res, statusCode) || statusCode

        var resHeader = userRule.replaceResponseHeader(req, res, res.headers) || res.headers
        resHeader = util.lower_keys(resHeader)

        // remove gzip related header, and ungzip the content
        // note there are other compression types like deflate
        var ifServerGzipped = /gzip/i.test(resHeader['content-encoding'])
          // if (ifServerGzipped) {
          //     delete resHeader['content-encoding'];
          // }
          //delete resHeader['content-length'];

        // userRes.writeHead(statusCode, resHeader);

        //deal response data
        var length,
          resData = []

        res.on("data", function(chunk) {
          resData.push(chunk)
        })

        res.on("end", function() {
          var serverResData

          async.series([

            //ungzip server res
            function(callback) {
              serverResData = Buffer.concat(resData)
              if (ifServerGzipped) {
                zlib.gunzip(serverResData, function(err, buff) {
                  serverResData = buff
                  callback()
                })
              } else {
                callback()
              }

              //get custom response
            },
            function(callback) {
              if (userRule.replaceServerResData) {
                serverResData = userRule.replaceServerResData(req, res, serverResData) || serverResData
                callback()
              } else if (userRule.replaceServerResDataAsync) {
                userRule.replaceServerResDataAsync(req, res, serverResData, function(newRes) {
                  serverResData = newRes
                  callback()
                })
              } else {
                callback()
              }

              //delay
            },
            function(callback) {
              var pauseTimeInMS = userRule.pauseBeforeSendingResponse(req, res)
              if (pauseTimeInMS) {
                setTimeout(callback, pauseTimeInMS)
              } else {
                callback()
              }

              //send response
            },
            function(callback) {
              userRule.saveAllHttpResponse(req, statusCode, resHeader, serverResData)
              userRes.writeHead(statusCode, resHeader)

              userRes.end(serverResData)
              callback()

              //udpate record info
            },
            function(callback) {
              resourceInfo.endTime = new Date().getTime()
              resourceInfo.statusCode = statusCode
              resourceInfo.resHeader = resHeader
              resourceInfo.resBody = ifServerGzipped ? zlib.gunzipSync(serverResData) : serverResData
              resourceInfo.length = serverResData ? serverResData.length : 0

              callback()
                //push trafic data to rule file
            },
            function(callback) {
              userRule.fetchTrafficData && userRule.fetchTrafficData(resourceInfoId, resourceInfo)
              callback()
            }

          ], function(err, result) {
            callback && callback()
          })

        })

        res.on('error', function(error) {
          log.error('error' + error)
        })

      })

      proxyReq.on("error", function(e) {
        log.error("err with request :" + e + "  " + req.url)
        userRes.end()
      })

      proxyReq.end(reqData)
    })
  }
}


function setRules(newRule) {
  if (!newRule) return
  userRule = util.merge(defaultRule, newRule)
  if ('function' == typeof(userRule.init)) {
    userRule.init()
  }
}

module.exports = {
  userRequestHandler: userRequestHandler,
  setRules: setRules
}
