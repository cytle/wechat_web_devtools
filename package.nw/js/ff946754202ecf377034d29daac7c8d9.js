"use strict"
const log = require('./72653d4b93cdd7443296229431a7aa9a.js')
const WebSocket = require('ws');
const WebsocketServer = WebSocket.Server
const PING_PONG_INTERVAL = 3000

let wss, pingpongTimer
let clientMap = {}
let msgQueue = {}

let _events = {}

const pushQueue = (protocol, msg) => {
  if (!msgQueue[protocol]) {
    msgQueue[protocol] = []
  }
  msgQueue[protocol].push(msg)
}

const cleanQueue = (protocol) => {
  delete msgQueue[protocol]
}

const sendQueue = (protocol) => {
  let queue = msgQueue[protocol] || []
  queue.forEach((msg) => {
    sendMessage(protocol, msg)
  })
  delete msgQueue[protocol]
}

const _onMessage = (protocol, data) => {
  let [mainProtocol, subProtocol] = getProtocol(protocol)

  let handlers = _events[protocol]
  if (handlers) {
    handlers.forEach((cb) => {
      cb(data)
    })
  }

  // 可以只监听主协议
  if (mainProtocol != protocol) {
    handlers = _events[mainProtocol]
    if (handlers) {
      handlers.forEach((cb) => {
        cb(data)
      })
    }
  }
}

const getProtocol = (protocol) => {
  let result = protocol.split('_')
  let mainProtocol = result[0] || ''
  let subProtocol = result.slice(1).join('_') || ''
  return [mainProtocol, subProtocol]
}

const addClient = (ws) => {
  let [mainProtocol, subProtocol] = getProtocol(ws.protocol)

  if (!clientMap[mainProtocol]) {
    clientMap[mainProtocol] = {}
  }

  clientMap[mainProtocol][subProtocol] = ws
  sendQueue(ws.protocol)
}

const removeClient = (ws) => {
  let [mainProtocol, subProtocol] = getProtocol(ws.protocol)

  if (clientMap[mainProtocol]) {
    delete clientMap[mainProtocol][subProtocol]
  }
}

const start = (port) => {
  wss = new WebsocketServer({
    perMessageDeflate: false,
    port: port
  })

  wss.on('connection', (ws) => {
    addClient(ws)
    ws.on('message', function(data) {
      _onMessage(this.protocol, data)
    })

    ws.on('pong', function () {
      this.isAlive = true
    })

    ws.on('close', function() {
      removeClient(this)
    })
  })

  pingpongTimer = setInterval(() => {
    if (wss) {
      wss.clients.forEach((ws) => {
        if (ws.isAlive === false) {
          removeClient(ws)
          return ws.terminate();
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
  let protocol = ws.protocol
  if (ws && ws.readyState === WebSocket.OPEN) {
    try {
      ws.send(data)
    } catch(e) {
      log.error(`msgcenter.js sendMessage error ${e}`)
      pushQueue(protocol, data)
    }
  } else {
    pushQueue(protocol, data)
  }
}

const sendMessage = (protocol, data) => {
  let [mainProtocol, subProtocol] = getProtocol(protocol)
  let ws = clientMap[mainProtocol] && clientMap[mainProtocol][subProtocol]
  if (ws) {
    send(ws, data)
  } else {
    pushQueue(protocol, data)
  }
}


const broadcast = (mainProtocol, data) => {
  if (wss) {
    if (mainProtocol) {
      let clients = clientMap[mainProtocol] || {}
      for (let key in clients) {
        send(clients[key], data)
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
  on: function(protocol, func) {
    if (!_events[protocol]) {
      _events[protocol] = []
    }
    _events[protocol].push(func)
  },
  off: function(protocol, func) {
    if (!_events[protocol]) {
      return
    }

    _events[protocol] = _events[protocol].filter((item) => {
      return item !== func
    })

    if (_events[protocol].length == 0) {
      delete _events[protocol]
    }
  }
}
