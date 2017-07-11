var Auth, EventEmitter, Forge, Packet, PacketReader, Parser, Promise, Protocol, RollingCounter, Service, ServiceMap, Socket, crypto, debug,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

crypto = require('crypto');

EventEmitter = require('events').EventEmitter;

Promise = require('bluebird');

Forge = require('node-forge');

debug = require('debug')('adb:tcpusb:socket');

Parser = require('../parser');

Protocol = require('../protocol');

Auth = require('../auth');

Packet = require('./packet');

PacketReader = require('./packetreader');

Service = require('./service');

ServiceMap = require('./servicemap');

RollingCounter = require('./rollingcounter');

Socket = (function(superClass) {
  var AUTH_RSAPUBLICKEY, AUTH_SIGNATURE, AUTH_TOKEN, TOKEN_LENGTH, UINT16_MAX, UINT32_MAX;

  extend(Socket, superClass);

  UINT32_MAX = 0xFFFFFFFF;

  UINT16_MAX = 0xFFFF;

  AUTH_TOKEN = 1;

  AUTH_SIGNATURE = 2;

  AUTH_RSAPUBLICKEY = 3;

  TOKEN_LENGTH = 20;

  function Socket(client, serial, socket, options) {
    var base;
    this.client = client;
    this.serial = serial;
    this.socket = socket;
    this.options = options != null ? options : {};
    (base = this.options).auth || (base.auth = Promise.resolve(true));
    this.ended = false;
    this.socket.setNoDelay(true);
    this.reader = new PacketReader(this.socket).on('packet', this._handle.bind(this)).on('error', (function(_this) {
      return function(err) {
        debug("PacketReader error: " + err.message);
        return _this.end();
      };
    })(this)).on('end', this.end.bind(this));
    this.version = 1;
    this.maxPayload = 4096;
    this.authorized = false;
    this.syncToken = new RollingCounter(UINT32_MAX);
    this.remoteId = new RollingCounter(UINT32_MAX);
    this.services = new ServiceMap;
    this.remoteAddress = this.socket.remoteAddress;
    this.token = null;
    this.signature = null;
  }

  Socket.prototype.end = function() {
    if (this.ended) {
      return this;
    }
    this.services.end();
    this.socket.end();
    this.ended = true;
    this.emit('end');
    return this;
  };

  Socket.prototype._error = function(err) {
    this.emit('error', err);
    return this.end();
  };

  Socket.prototype._handle = function(packet) {
    if (this.ended) {
      return;
    }
    this.emit('userActivity', packet);
    return Promise["try"]((function(_this) {
      return function() {
        switch (packet.command) {
          case Packet.A_SYNC:
            return _this._handleSyncPacket(packet);
          case Packet.A_CNXN:
            return _this._handleConnectionPacket(packet);
          case Packet.A_OPEN:
            return _this._handleOpenPacket(packet);
          case Packet.A_OKAY:
          case Packet.A_WRTE:
          case Packet.A_CLSE:
            return _this._forwardServicePacket(packet);
          case Packet.A_AUTH:
            return _this._handleAuthPacket(packet);
          default:
            throw new Error("Unknown command " + packet.command);
        }
      };
    })(this))["catch"](Socket.AuthError, (function(_this) {
      return function() {
        return _this.end();
      };
    })(this))["catch"](Socket.UnauthorizedError, (function(_this) {
      return function() {
        return _this.end();
      };
    })(this))["catch"]((function(_this) {
      return function(err) {
        return _this._error(err);
      };
    })(this));
  };

  Socket.prototype._handleSyncPacket = function(packet) {
    debug('I:A_SYNC');
    debug('O:A_SYNC');
    return this.write(Packet.assemble(Packet.A_SYNC, 1, this.syncToken.next(), null));
  };

  Socket.prototype._handleConnectionPacket = function(packet) {
    var version;
    debug('I:A_CNXN', packet);
    version = Packet.swap32(packet.arg0);
    this.maxPayload = Math.min(UINT16_MAX, packet.arg1);
    return this._createToken().then((function(_this) {
      return function(token) {
        _this.token = token;
        debug("Created challenge '" + (_this.token.toString('base64')) + "'");
        debug('O:A_AUTH');
        return _this.write(Packet.assemble(Packet.A_AUTH, AUTH_TOKEN, 0, _this.token));
      };
    })(this));
  };

  Socket.prototype._handleAuthPacket = function(packet) {
    debug('I:A_AUTH', packet);
    switch (packet.arg0) {
      case AUTH_SIGNATURE:
        debug("Received signature '" + (packet.data.toString('base64')) + "'");
        if (!this.signature) {
          this.signature = packet.data;
        }
        debug('O:A_AUTH');
        return this.write(Packet.assemble(Packet.A_AUTH, AUTH_TOKEN, 0, this.token));
      case AUTH_RSAPUBLICKEY:
        if (!this.signature) {
          throw new Socket.AuthError("Public key sent before signature");
        }
        if (!(packet.data && packet.data.length >= 2)) {
          throw new Socket.AuthError("Empty RSA public key");
        }
        debug("Received RSA public key '" + (packet.data.toString('base64')) + "'");
        return Auth.parsePublicKey(this._skipNull(packet.data)).then((function(_this) {
          return function(key) {
            var digest, sig;
            digest = _this.token.toString('binary');
            sig = _this.signature.toString('binary');
            if (!key.verify(digest, sig)) {
              debug("Signature mismatch");
              throw new Socket.AuthError("Signature mismatch");
            }
            debug("Signature verified");
            return key;
          };
        })(this)).then((function(_this) {
          return function(key) {
            return _this.options.auth(key)["catch"](function(err) {
              debug("Connection rejected by user-defined auth handler");
              throw new Socket.AuthError("Rejected by user-defined handler");
            });
          };
        })(this)).then((function(_this) {
          return function() {
            return _this._deviceId();
          };
        })(this)).then((function(_this) {
          return function(id) {
            _this.authorized = true;
            debug('O:A_CNXN');
            return _this.write(Packet.assemble(Packet.A_CNXN, Packet.swap32(_this.version), _this.maxPayload, id));
          };
        })(this));
      default:
        throw new Error("Unknown authentication method " + packet.arg0);
    }
  };

  Socket.prototype._handleOpenPacket = function(packet) {
    var localId, name, remoteId, service;
    if (!this.authorized) {
      throw new Socket.UnauthorizedError();
    }
    remoteId = packet.arg0;
    localId = this.remoteId.next();
    if (!(packet.data && packet.data.length >= 2)) {
      throw new Error("Empty service name");
    }
    name = this._skipNull(packet.data);
    debug("Calling " + name);
    service = new Service(this.client, this.serial, localId, remoteId, this);
    return new Promise((function(_this) {
      return function(resolve, reject) {
        service.on('error', reject);
        service.on('end', resolve);
        _this.services.insert(localId, service);
        debug("Handling " + _this.services.count + " services simultaneously");
        return service.handle(packet);
      };
    })(this))["catch"](function(err) {
      return true;
    })["finally"]((function(_this) {
      return function() {
        _this.services.remove(localId);
        debug("Handling " + _this.services.count + " services simultaneously");
        return service.end();
      };
    })(this));
  };

  Socket.prototype._forwardServicePacket = function(packet) {
    var localId, remoteId, service;
    if (!this.authorized) {
      throw new Socket.UnauthorizedError();
    }
    remoteId = packet.arg0;
    localId = packet.arg1;
    if (service = this.services.get(localId)) {
      return service.handle(packet);
    } else {
      return debug("Received a packet to a service that may have been closed already");
    }
  };

  Socket.prototype.write = function(chunk) {
    if (this.ended) {
      return;
    }
    return this.socket.write(chunk);
  };

  Socket.prototype._createToken = function() {
    return Promise.promisify(crypto.randomBytes)(TOKEN_LENGTH);
  };

  Socket.prototype._skipNull = function(data) {
    return data.slice(0, -1);
  };

  Socket.prototype._deviceId = function() {
    debug("Loading device properties to form a standard device ID");
    return this.client.getProperties(this.serial).then(function(properties) {
      var id, prop;
      id = ((function() {
        var i, len, ref, results;
        ref = ['ro.product.name', 'ro.product.model', 'ro.product.device'];
        results = [];
        for (i = 0, len = ref.length; i < len; i++) {
          prop = ref[i];
          results.push(prop + "=" + properties[prop] + ";");
        }
        return results;
      })()).join('');
      return new Buffer("device::" + id + "\0");
    });
  };

  return Socket;

})(EventEmitter);

Socket.AuthError = (function(superClass) {
  extend(AuthError, superClass);

  function AuthError(message) {
    this.message = message;
    Error.call(this);
    this.name = 'AuthError';
    Error.captureStackTrace(this, Socket.AuthError);
  }

  return AuthError;

})(Error);

Socket.UnauthorizedError = (function(superClass) {
  extend(UnauthorizedError, superClass);

  function UnauthorizedError() {
    Error.call(this);
    this.name = 'UnauthorizedError';
    this.message = "Unauthorized access";
    Error.captureStackTrace(this, Socket.UnauthorizedError);
  }

  return UnauthorizedError;

})(Error);

module.exports = Socket;
