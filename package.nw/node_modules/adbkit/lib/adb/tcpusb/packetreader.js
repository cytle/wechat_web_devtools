var EventEmitter, Packet, PacketReader,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

EventEmitter = require('events').EventEmitter;

Packet = require('./packet');

PacketReader = (function(superClass) {
  extend(PacketReader, superClass);

  function PacketReader(stream) {
    this.stream = stream;
    PacketReader.__super__.constructor.call(this);
    this.inBody = false;
    this.buffer = null;
    this.packet = null;
    this.stream.on('readable', this._tryRead.bind(this));
    this.stream.on('error', (function(_this) {
      return function(err) {
        return _this.emit('error', err);
      };
    })(this));
    this.stream.on('end', (function(_this) {
      return function() {
        return _this.emit('end');
      };
    })(this));
    setImmediate(this._tryRead.bind(this));
  }

  PacketReader.prototype._tryRead = function() {
    var header;
    while (this._appendChunk()) {
      while (this.buffer) {
        if (this.inBody) {
          if (!(this.buffer.length >= this.packet.length)) {
            break;
          }
          this.packet.data = this._consume(this.packet.length);
          if (!this.packet.verifyChecksum()) {
            this.emit('error', new PacketReader.ChecksumError(this.packet));
            return;
          }
          this.emit('packet', this.packet);
          this.inBody = false;
        } else {
          if (!(this.buffer.length >= 24)) {
            break;
          }
          header = this._consume(24);
          this.packet = new Packet(header.readUInt32LE(0), header.readUInt32LE(4), header.readUInt32LE(8), header.readUInt32LE(12), header.readUInt32LE(16), header.readUInt32LE(20), new Buffer(0));
          if (!this.packet.verifyMagic()) {
            this.emit('error', new PacketReader.MagicError(this.packet));
            return;
          }
          if (this.packet.length === 0) {
            this.emit('packet', this.packet);
          } else {
            this.inBody = true;
          }
        }
      }
    }
  };

  PacketReader.prototype._appendChunk = function() {
    var chunk;
    if (chunk = this.stream.read()) {
      if (this.buffer) {
        return this.buffer = Buffer.concat([this.buffer, chunk], this.buffer.length + chunk.length);
      } else {
        return this.buffer = chunk;
      }
    } else {
      return null;
    }
  };

  PacketReader.prototype._consume = function(length) {
    var chunk;
    chunk = this.buffer.slice(0, length);
    this.buffer = length === this.buffer.length ? null : this.buffer.slice(length);
    return chunk;
  };

  return PacketReader;

})(EventEmitter);

PacketReader.ChecksumError = (function(superClass) {
  extend(ChecksumError, superClass);

  function ChecksumError(packet) {
    this.packet = packet;
    Error.call(this);
    this.name = 'ChecksumError';
    this.message = "Checksum mismatch";
    Error.captureStackTrace(this, PacketReader.ChecksumError);
  }

  return ChecksumError;

})(Error);

PacketReader.MagicError = (function(superClass) {
  extend(MagicError, superClass);

  function MagicError(packet) {
    this.packet = packet;
    Error.call(this);
    this.name = 'MagicError';
    this.message = "Magic value mismatch";
    Error.captureStackTrace(this, PacketReader.MagicError);
  }

  return MagicError;

})(Error);

module.exports = PacketReader;
