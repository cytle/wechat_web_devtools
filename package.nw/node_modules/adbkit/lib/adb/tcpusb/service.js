var EventEmitter, Packet, Parser, Promise, Protocol, Service, debug,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

EventEmitter = require('events').EventEmitter;

Promise = require('bluebird');

debug = require('debug')('adb:tcpusb:service');

Parser = require('../parser');

Protocol = require('../protocol');

Packet = require('./packet');

Service = (function(superClass) {
  extend(Service, superClass);

  function Service(client, serial, localId1, remoteId, socket) {
    this.client = client;
    this.serial = serial;
    this.localId = localId1;
    this.remoteId = remoteId;
    this.socket = socket;
    Service.__super__.constructor.call(this);
    this.opened = false;
    this.ended = false;
    this.transport = null;
    this.needAck = false;
  }

  Service.prototype.end = function() {
    var err, localId;
    if (this.transport) {
      this.transport.end();
    }
    if (this.ended) {
      return this;
    }
    debug('O:A_CLSE');
    localId = this.opened ? this.localId : 0;
    try {
      this.socket.write(Packet.assemble(Packet.A_CLSE, localId, this.remoteId, null));
    } catch (_error) {
      err = _error;
    }
    this.transport = null;
    this.ended = true;
    this.emit('end');
    return this;
  };

  Service.prototype.handle = function(packet) {
    return Promise["try"]((function(_this) {
      return function() {
        switch (packet.command) {
          case Packet.A_OPEN:
            return _this._handleOpenPacket(packet);
          case Packet.A_OKAY:
            return _this._handleOkayPacket(packet);
          case Packet.A_WRTE:
            return _this._handleWritePacket(packet);
          case Packet.A_CLSE:
            return _this._handleClosePacket(packet);
          default:
            throw new Error("Unexpected packet " + packet.command);
        }
      };
    })(this))["catch"]((function(_this) {
      return function(err) {
        _this.emit('error', err);
        return _this.end();
      };
    })(this));
  };

  Service.prototype._handleOpenPacket = function(packet) {
    debug('I:A_OPEN', packet);
    return this.client.transport(this.serial).then((function(_this) {
      return function(transport) {
        _this.transport = transport;
        if (_this.ended) {
          throw new LateTransportError();
        }
        _this.transport.write(Protocol.encodeData(packet.data.slice(0, -1)));
        return _this.transport.parser.readAscii(4).then(function(reply) {
          switch (reply) {
            case Protocol.OKAY:
              debug('O:A_OKAY');
              _this.socket.write(Packet.assemble(Packet.A_OKAY, _this.localId, _this.remoteId, null));
              return _this.opened = true;
            case Protocol.FAIL:
              return _this.transport.parser.readError();
            default:
              return _this.transport.parser.unexpected(reply, 'OKAY or FAIL');
          }
        });
      };
    })(this)).then((function(_this) {
      return function() {
        return new Promise(function(resolve, reject) {
          _this.transport.socket.on('readable', function() {
            return _this._tryPush();
          }).on('end', resolve).on('error', reject);
          return _this._tryPush();
        });
      };
    })(this))["finally"]((function(_this) {
      return function() {
        return _this.end();
      };
    })(this));
  };

  Service.prototype._handleOkayPacket = function(packet) {
    debug('I:A_OKAY', packet);
    if (this.ended) {
      return;
    }
    if (!this.transport) {
      throw new Service.PrematurePacketError(packet);
    }
    this.needAck = false;
    return this._tryPush();
  };

  Service.prototype._handleWritePacket = function(packet) {
    debug('I:A_WRTE', packet);
    if (this.ended) {
      return;
    }
    if (!this.transport) {
      throw new Service.PrematurePacketError(packet);
    }
    if (packet.data) {
      this.transport.write(packet.data);
    }
    debug('O:A_OKAY');
    return this.socket.write(Packet.assemble(Packet.A_OKAY, this.localId, this.remoteId, null));
  };

  Service.prototype._handleClosePacket = function(packet) {
    debug('I:A_CLSE', packet);
    if (this.ended) {
      return;
    }
    if (!this.transport) {
      throw new Service.PrematurePacketError(packet);
    }
    return this.end();
  };

  Service.prototype._tryPush = function() {
    var chunk;
    if (this.needAck || this.ended) {
      return;
    }
    if (chunk = this._readChunk(this.transport.socket)) {
      debug('O:A_WRTE');
      this.socket.write(Packet.assemble(Packet.A_WRTE, this.localId, this.remoteId, chunk));
      return this.needAck = true;
    }
  };

  Service.prototype._readChunk = function(stream) {
    return stream.read(this.socket.maxPayload) || stream.read();
  };

  return Service;

})(EventEmitter);

Service.PrematurePacketError = (function(superClass) {
  extend(PrematurePacketError, superClass);

  function PrematurePacketError(packet1) {
    this.packet = packet1;
    Error.call(this);
    this.name = 'PrematurePacketError';
    this.message = "Premature packet";
    Error.captureStackTrace(this, Service.PrematurePacketError);
  }

  return PrematurePacketError;

})(Error);

Service.LateTransportError = (function(superClass) {
  extend(LateTransportError, superClass);

  function LateTransportError() {
    Error.call(this);
    this.name = 'LateTransportError';
    this.message = "Late transport";
    Error.captureStackTrace(this, Service.LateTransportError);
  }

  return LateTransportError;

})(Error);

module.exports = Service;
