var EventEmitter, Net, Server, Socket,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Net = require('net');

EventEmitter = require('events').EventEmitter;

Socket = require('./socket');

Server = (function(superClass) {
  extend(Server, superClass);

  function Server(client, serial, options) {
    this.client = client;
    this.serial = serial;
    this.options = options;
    this.connections = [];
    this.server = Net.createServer({
      allowHalfOpen: true
    });
    this.server.on('error', (function(_this) {
      return function(err) {
        return _this.emit('error', err);
      };
    })(this));
    this.server.on('listening', (function(_this) {
      return function() {
        return _this.emit('listening');
      };
    })(this));
    this.server.on('close', (function(_this) {
      return function() {
        return _this.emit('close');
      };
    })(this));
    this.server.on('connection', (function(_this) {
      return function(conn) {
        var socket;
        socket = new Socket(_this.client, _this.serial, conn, _this.options);
        _this.connections.push(socket);
        socket.on('error', function(err) {
          return _this.emit('error', err);
        });
        socket.once('end', function() {
          return _this.connections = _this.connections.filter(function(val) {
            return val !== socket;
          });
        });
        return _this.emit('connection', socket);
      };
    })(this));
  }

  Server.prototype.listen = function() {
    this.server.listen.apply(this.server, arguments);
    return this;
  };

  Server.prototype.close = function() {
    this.server.close();
    return this;
  };

  Server.prototype.end = function() {
    var conn, i, len, ref;
    ref = this.connections;
    for (i = 0, len = ref.length; i < len; i++) {
      conn = ref[i];
      conn.end();
    }
    return this;
  };

  return Server;

})(EventEmitter);

module.exports = Server;
