"use strict"
const log = require('./72653d4b93cdd7443296229431a7aa9a.js')
const WebSocket = require('ws');
const crypto = require('crypto')
const WebsocketServer = WebSocket.Server
const PING_PONG_INTERVAL = 30000

let wss, pingpongTimer
let clientMap = {}
let msgQueue = {}
let tokenMap = {}

let _events = {}

/**
 * 验证 protocol 中的token
 * @param  {string}
 * @return {boolean}
 */
const validateToken = (protocol) => {
  /**
   * protocol
   * WEBVIEW_1[md5token]
   */
  let match = protocol.match(/#(.*)#/)
  if (match && match[1] && tokenMap[match[1]]) {
    let validate = tokenMap[match[1]]
    // 如果是 true 则是所有的 origin 都可以
    if (validate === true) {
      delete tokenMap[match[1]]
      return true
    } else {
      // 否则 则只有 相等才可以
      let [mainProtocol] = splitProtocol(protocol)
      if (validate === mainProtocol) {
        delete tokenMap[match[1]]
        return true
      }
    }
  }
  return false
}

/**
 * 如果向未建立连接的发送消息，先进队列
 * @param  {string} 不带token的 protocol
 * @param  {string} msg
 * @return {undefined}
 */
const pushQueue = (origin, msg) => {
  if (!msgQueue[origin]) {
    msgQueue[origin] = []
  }
  msgQueue[origin].push(msg)
}

/**
 * 清除待发送的队列
 * @param  {string} 不带token的 protocol
 * @return {undefined}
 */
const cleanQueue = (origin) => {
  delete msgQueue[origin]
}


/**
 * 清除待发送的队列
 * @param  {string} 不带token的 protocol
 * @return {undefined}
 */
const sendQueue = (origin) => {
  let queue = msgQueue[origin] || []
  queue.forEach((msg) => {
    sendMessage(origin, msg)
  })
  delete msgQueue[origin]
}

/**
 * 监听 ws 的消息
 * @param  {string} protocol
 * @param  {string} data
 * @return {undefined}
 */
const _onMessage = (protocol, data) => {
  let [mainProtocol, subProtocol, origin] = splitProtocol(protocol)

  let handlers = _events[origin]
  if (handlers) {
    handlers.forEach((cb) => {
      cb(data)
    })
  }

  // 可以只监听主协议
  if (mainProtocol != origin) {
    handlers = _events[mainProtocol]
    if (handlers) {
      handlers.forEach((cb) => {
        cb(data)
      })
    }
  }
}


/**
 * 去掉token之后的原始的协议
 * @param  {string} protocol
 * @return {string}
 */
const getOriginProtocol = (protocol) => {
  return protocol.replace(/#(.*)#/, '')
}

/**
 * 分隔 _ 主协议和副协议
 * @param  {string} protocol
 * @return {Array}
 */
const splitProtocol = (protocol) => {
  /**
   * WEBVIEW_1[md5token] => WEBVIEW_1
   */
  let origin = getOriginProtocol(protocol)
  let result = origin.split('_')
  let mainProtocol = result[0] || ''
  let subProtocol = result.slice(1).join('_') || ''
  return [mainProtocol, subProtocol, origin]
}

const addClient = (ws) => {
  let [mainProtocol, subProtocol, origin] = splitProtocol(ws.protocol)

  if (!clientMap[mainProtocol]) {
    clientMap[mainProtocol] = {}
  }

  if (!clientMap[mainProtocol][subProtocol]) {
    clientMap[mainProtocol][subProtocol] = []
  }

  clientMap[mainProtocol][subProtocol].push(ws)
  sendQueue(origin)
}

const removeClient = (ws) => {
  let [mainProtocol, subProtocol] = splitProtocol(ws.protocol)

  if (clientMap[mainProtocol]) {
    let wsList = clientMap[mainProtocol][subProtocol]
    if (wsList && wsList.length > 0) {
      wsList = wsList.filter(item => {
        return item != ws
      })

      if (wsList.length > 0) {
        clientMap[mainProtocol][subProtocol] = wsList
      } else {
        delete clientMap[mainProtocol][subProtocol]
      }
    }
  }
}

const start = (port) => {
  wss = new WebsocketServer({
    host: '127.0.0.1',
    perMessageDeflate: false,
    port: port
  })

  wss.on('connection', (ws) => {
    if (!validateToken(ws.protocol)) {
      ws.close()
      return
    }
    addClient(ws)

    ws.isAlive = true
    ws.on('message', function(data) {
      _onMessage(this.protocol, data)
    })

    ws.on('pong', function () {
      this.isAlive = true
    })

    ws.on('close', function() {
      removeClient(this)
    })

    ws.on('error', function() {
      removeClient(this)
    })
  })

  pingpongTimer = setInterval(() => {
    if (wss) {
      wss.clients.forEach((ws) => {
        if (ws.isAlive === false) {
          removeClient(ws)
          return ws.terminate()
        }
        ws.isAlive = false;
        ws.ping('', false, true);
      });
    }
  }, PING_PONG_INTERVAL);
}

const close = () => {
  if (pingpongTimer) {
    clearInterval(pingpongTimer)
  }
  clientMap = {}
  msgQueue = {}
  wss && wss.close()
  wss = null
}

const send = (ws, data) => {
  let origin = getOriginProtocol(ws.protocol)
  if (ws && ws.readyState === WebSocket.OPEN) {
    try {
      ws.send(data)
    } catch(e) {
      log.error(`msgcenter.js sendMessage error ${e}`)
      pushQueue(origin, data)
    }
  } else {
    pushQueue(origin, data)
  }
}

const sendMessage = (origin, data) => {
  let [mainProtocol, subProtocol] = splitProtocol(origin)
  let wsList = clientMap[mainProtocol] && clientMap[mainProtocol][subProtocol]
  if (wsList && wsList.length > 0) {
    wsList.forEach((ws) => {
      send(ws, data)
    })
  } else {
    pushQueue(origin, data)
  }
}


const broadcast = (mainProtocol, data) => {
  if (wss) {
    if (mainProtocol) {
      let clients = clientMap[mainProtocol] || {}
      for (let key in clients) {
        let wsList = clients[key] || []
        wsList.forEach(ws => {
          send(ws, data)
        })
      }
    } else {
      wss.clients.forEach((ws) => {
        send(ws, data)
      })
    }
  }
}


/**
protocol 对应的是 ws.protocol
mainProtocol 是 ws.protocol.split('_')[0]
subProtocol 是 ws.protocol.split('_').slice(1).join('_')
*/
module.exports = {
  start,
  close,
  cleanQueue,
  sendMessage,
  broadcast,
  on: function(origin, func) {
    if (!_events[origin]) {
      _events[origin] = []
    }
    _events[origin].push(func)
  },
  off: function(origin, func) {
    if (!_events[origin]) {
      return
    }

    _events[origin] = _events[origin].filter((item) => {
      return item !== func
    })

    if (_events[origin].length == 0) {
      delete _events[origin]
    }
  },
  /**
   * 获取token
   * @param {string | undefined} mainProtocol
   * @return {string}
   */
  getToken: function(mainProtocol) {
    let md5sum = crypto.createHash('md5')
    md5sum.update(Math.random() + '' + Date.now())
    let token = md5sum.digest('hex')

    if (Object.keys(tokenMap).length > 100) {
      tokenMap = {}
    }

    tokenMap[token] = mainProtocol || true
    return token
  }
}
