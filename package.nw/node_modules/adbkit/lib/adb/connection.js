var Connection, EventEmitter, Net, Parser, debug, dump, execFile,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Net = require('net');

debug = require('debug')('adb:connection');

EventEmitter = require('events').EventEmitter;

execFile = require('child_process').execFile;

Parser = require('./parser');

dump = require('./dump');

Connection = (function(superClass) {
  extend(Connection, superClass);

  function Connection(options1) {
    this.options = options1;
    this.socket = null;
    this.parser = null;
    this.triedStarting = false;
  }

  Connection.prototype.connect = function() {
    this.socket = Net.connect(this.options);
    this.socket.setNoDelay(true);
    this.parser = new Parser(this.socket);
    this.socket.on('connect', (function(_this) {
      return function() {
        return _this.emit('connect');
      };
    })(this));
    this.socket.on('end', (function(_this) {
      return function() {
        return _this.emit('end');
      };
    })(this));
    this.socket.on('drain', (function(_this) {
      return function() {
        return _this.emit('drain');
      };
    })(this));
    this.socket.on('timeout', (function(_this) {
      return function() {
        return _this.emit('timeout');
      };
    })(this));
    this.socket.on('error', (function(_this) {
      return function(err) {
        return _this._handleError(err);
      };
    })(this));
    this.socket.on('close', (function(_this) {
      return function(hadError) {
        return _this.emit('close', hadError);
      };
    })(this));
    return this;
  };

  Connection.prototype.end = function() {
    this.socket.end();
    return this;
  };

  Connection.prototype.write = function(data, callback) {
    this.socket.write(dump(data), callback);
    return this;
  };

  Connection.prototype.startServer = function(callback) {
    debug("Starting ADB server via '" + this.options.bin + " start-server'");
    return this._exec(['start-server'], {}, callback);
  };

  Connection.prototype._exec = function(args, options, callback) {
    debug("CLI: " + this.options.bin + " " + (args.join(' ')));
    execFile(this.options.bin, args, options, callback);
    return this;
  };

  Connection.prototype._handleError = function(err) {
    if (err.code === 'ECONNREFUSED' && !this.triedStarting) {
      debug("Connection was refused, let's try starting the server once");
      this.triedStarting = true;
      this.startServer((function(_this) {
        return function(err) {
          if (err) {
            return _this._handleError(err);
          }
          return _this.connect();
        };
      })(this));
    } else {
      debug("Connection had an error: " + err.message);
      this.emit('error', err);
      this.end();
    }
  };

  return Connection;

})(EventEmitter);

module.exports = Connection;
