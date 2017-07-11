var Entry, EventEmitter, Fs, Parser, Path, Promise, Protocol, PullTransfer, PushTransfer, Stats, Sync, debug,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Fs = require('fs');

Path = require('path');

Promise = require('bluebird');

EventEmitter = require('events').EventEmitter;

debug = require('debug')('adb:sync');

Parser = require('./parser');

Protocol = require('./protocol');

Stats = require('./sync/stats');

Entry = require('./sync/entry');

PushTransfer = require('./sync/pushtransfer');

PullTransfer = require('./sync/pulltransfer');

Sync = (function(superClass) {
  var DATA_MAX_LENGTH, DEFAULT_CHMOD, TEMP_PATH;

  extend(Sync, superClass);

  TEMP_PATH = '/data/local/tmp';

  DEFAULT_CHMOD = 0x1a4;

  DATA_MAX_LENGTH = 65536;

  Sync.temp = function(path) {
    return TEMP_PATH + "/" + (Path.basename(path));
  };

  function Sync(connection) {
    this.connection = connection;
    this.parser = this.connection.parser;
  }

  Sync.prototype.stat = function(path, callback) {
    this._sendCommandWithArg(Protocol.STAT, path);
    return this.parser.readAscii(4).then((function(_this) {
      return function(reply) {
        switch (reply) {
          case Protocol.STAT:
            return _this.parser.readBytes(12).then(function(stat) {
              var mode, mtime, size;
              mode = stat.readUInt32LE(0);
              size = stat.readUInt32LE(4);
              mtime = stat.readUInt32LE(8);
              if (mode === 0) {
                return _this._enoent(path);
              } else {
                return new Stats(mode, size, mtime);
              }
            });
          case Protocol.FAIL:
            return _this._readError();
          default:
            return _this.parser.unexpected(reply, 'STAT or FAIL');
        }
      };
    })(this)).nodeify(callback);
  };

  Sync.prototype.readdir = function(path, callback) {
    var files, readNext;
    files = [];
    readNext = (function(_this) {
      return function() {
        return _this.parser.readAscii(4).then(function(reply) {
          switch (reply) {
            case Protocol.DENT:
              return _this.parser.readBytes(16).then(function(stat) {
                var mode, mtime, namelen, size;
                mode = stat.readUInt32LE(0);
                size = stat.readUInt32LE(4);
                mtime = stat.readUInt32LE(8);
                namelen = stat.readUInt32LE(12);
                return _this.parser.readBytes(namelen).then(function(name) {
                  name = name.toString();
                  if (!(name === '.' || name === '..')) {
                    files.push(new Entry(name, mode, size, mtime));
                  }
                  return readNext();
                });
              });
            case Protocol.DONE:
              return _this.parser.readBytes(16).then(function(zero) {
                return files;
              });
            case Protocol.FAIL:
              return _this._readError();
            default:
              return _this.parser.unexpected(reply, 'DENT, DONE or FAIL');
          }
        });
      };
    })(this);
    this._sendCommandWithArg(Protocol.LIST, path);
    return readNext().nodeify(callback);
  };

  Sync.prototype.push = function(contents, path, mode) {
    if (typeof contents === 'string') {
      return this.pushFile(contents, path, mode);
    } else {
      return this.pushStream(contents, path, mode);
    }
  };

  Sync.prototype.pushFile = function(file, path, mode) {
    if (mode == null) {
      mode = DEFAULT_CHMOD;
    }
    mode || (mode = DEFAULT_CHMOD);
    return this.pushStream(Fs.createReadStream(file), path, mode);
  };

  Sync.prototype.pushStream = function(stream, path, mode) {
    if (mode == null) {
      mode = DEFAULT_CHMOD;
    }
    mode |= Stats.S_IFREG;
    this._sendCommandWithArg(Protocol.SEND, path + "," + mode);
    return this._writeData(stream, Math.floor(Date.now() / 1000));
  };

  Sync.prototype.pull = function(path) {
    this._sendCommandWithArg(Protocol.RECV, "" + path);
    return this._readData();
  };

  Sync.prototype.end = function() {
    this.connection.end();
    return this;
  };

  Sync.prototype.tempFile = function(path) {
    return Sync.temp(path);
  };

  Sync.prototype._writeData = function(stream, timeStamp) {
    var readReply, reader, transfer, writeData, writer;
    transfer = new PushTransfer;
    writeData = (function(_this) {
      return function() {
        var endListener, errorListener, readableListener, resolver, track, waitForDrain, writeNext, writer;
        resolver = Promise.defer();
        writer = Promise.resolve().cancellable();
        stream.on('end', endListener = function() {
          return writer.then(function() {
            _this._sendCommandWithLength(Protocol.DONE, timeStamp);
            return resolver.resolve();
          });
        });
        waitForDrain = function() {
          var drainListener;
          resolver = Promise.defer();
          _this.connection.on('drain', drainListener = function() {
            return resolver.resolve();
          });
          return resolver.promise["finally"](function() {
            return _this.connection.removeListener('drain', drainListener);
          });
        };
        track = function() {
          return transfer.pop();
        };
        writeNext = function() {
          var chunk;
          if (chunk = stream.read(DATA_MAX_LENGTH) || stream.read()) {
            _this._sendCommandWithLength(Protocol.DATA, chunk.length);
            transfer.push(chunk.length);
            if (_this.connection.write(chunk, track)) {
              return writeNext();
            } else {
              return waitForDrain().then(writeNext);
            }
          } else {
            return Promise.resolve();
          }
        };
        stream.on('readable', readableListener = function() {
          return writer.then(writeNext);
        });
        stream.on('error', errorListener = function(err) {
          return resolver.reject(err);
        });
        return resolver.promise["finally"](function() {
          stream.removeListener('end', endListener);
          stream.removeListener('readable', readableListener);
          stream.removeListener('error', errorListener);
          return writer.cancel();
        });
      };
    })(this);
    readReply = (function(_this) {
      return function() {
        return _this.parser.readAscii(4).then(function(reply) {
          switch (reply) {
            case Protocol.OKAY:
              return _this.parser.readBytes(4).then(function(zero) {
                return true;
              });
            case Protocol.FAIL:
              return _this._readError();
            default:
              return _this.parser.unexpected(reply, 'OKAY or FAIL');
          }
        });
      };
    })(this);
    writer = writeData().cancellable()["catch"](Promise.CancellationError, (function(_this) {
      return function(err) {
        return _this.connection.end();
      };
    })(this))["catch"](function(err) {
      transfer.emit('error', err);
      return reader.cancel();
    });
    reader = readReply().cancellable()["catch"](Promise.CancellationError, function(err) {
      return true;
    })["catch"](function(err) {
      transfer.emit('error', err);
      return writer.cancel();
    })["finally"](function() {
      return transfer.end();
    });
    transfer.on('cancel', function() {
      writer.cancel();
      return reader.cancel();
    });
    return transfer;
  };

  Sync.prototype._readData = function() {
    var cancelListener, readNext, reader, transfer;
    transfer = new PullTransfer;
    readNext = (function(_this) {
      return function() {
        return _this.parser.readAscii(4).cancellable().then(function(reply) {
          switch (reply) {
            case Protocol.DATA:
              return _this.parser.readBytes(4).then(function(lengthData) {
                var length;
                length = lengthData.readUInt32LE(0);
                return _this.parser.readByteFlow(length, transfer).then(readNext);
              });
            case Protocol.DONE:
              return _this.parser.readBytes(4).then(function(zero) {
                return true;
              });
            case Protocol.FAIL:
              return _this._readError();
            default:
              return _this.parser.unexpected(reply, 'DATA, DONE or FAIL');
          }
        });
      };
    })(this);
    reader = readNext()["catch"](Promise.CancellationError, (function(_this) {
      return function(err) {
        return _this.connection.end();
      };
    })(this))["catch"](function(err) {
      return transfer.emit('error', err);
    })["finally"](function() {
      transfer.removeListener('cancel', cancelListener);
      return transfer.end();
    });
    transfer.on('cancel', cancelListener = function() {
      return reader.cancel();
    });
    return transfer;
  };

  Sync.prototype._readError = function() {
    return this.parser.readBytes(4).then((function(_this) {
      return function(length) {
        return _this.parser.readBytes(length.readUInt32LE(0)).then(function(buf) {
          return Promise.reject(new Parser.FailError(buf.toString()));
        });
      };
    })(this))["finally"]((function(_this) {
      return function() {
        return _this.parser.end();
      };
    })(this));
  };

  Sync.prototype._sendCommandWithLength = function(cmd, length) {
    var payload;
    if (cmd !== Protocol.DATA) {
      debug(cmd);
    }
    payload = new Buffer(cmd.length + 4);
    payload.write(cmd, 0, cmd.length);
    payload.writeUInt32LE(length, cmd.length);
    return this.connection.write(payload);
  };

  Sync.prototype._sendCommandWithArg = function(cmd, arg) {
    var payload, pos;
    debug(cmd + " " + arg);
    payload = new Buffer(cmd.length + 4 + arg.length);
    pos = 0;
    payload.write(cmd, pos, cmd.length);
    pos += cmd.length;
    payload.writeUInt32LE(arg.length, pos);
    pos += 4;
    payload.write(arg, pos);
    return this.connection.write(payload);
  };

  Sync.prototype._enoent = function(path) {
    var err;
    err = new Error("ENOENT, no such file or directory '" + path + "'");
    err.errno = 34;
    err.code = 'ENOENT';
    err.path = path;
    return Promise.reject(err);
  };

  return Sync;

})(EventEmitter);

module.exports = Sync;
