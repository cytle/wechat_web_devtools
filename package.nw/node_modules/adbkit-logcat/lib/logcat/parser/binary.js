(function() {
  var Binary, Entry, Parser, Priority,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Parser = require('../parser');

  Entry = require('../entry');

  Priority = require('../priority');

  Binary = (function(superClass) {
    var HEADER_SIZE_MAX, HEADER_SIZE_V1;

    extend(Binary, superClass);

    HEADER_SIZE_V1 = 20;

    HEADER_SIZE_MAX = 100;

    function Binary() {
      this.buffer = new Buffer('');
    }

    Binary.prototype.parse = function(chunk) {
      var cursor, data, entry, headerSize, length, nsec, sec;
      this.buffer = Buffer.concat([this.buffer, chunk]);
      while (this.buffer.length > 4) {
        cursor = 0;
        length = this.buffer.readUInt16LE(cursor);
        cursor += 2;
        headerSize = this.buffer.readUInt16LE(cursor);
        if (headerSize < HEADER_SIZE_V1 || headerSize > HEADER_SIZE_MAX) {
          headerSize = HEADER_SIZE_V1;
        }
        cursor += 2;
        if (this.buffer.length < headerSize + length) {
          break;
        }
        entry = new Entry;
        entry.setPid(this.buffer.readInt32LE(cursor));
        cursor += 4;
        entry.setTid(this.buffer.readInt32LE(cursor));
        cursor += 4;
        sec = this.buffer.readInt32LE(cursor);
        cursor += 4;
        nsec = this.buffer.readInt32LE(cursor);
        entry.setDate(new Date(sec * 1000 + nsec / 1000000));
        cursor += 4;
        cursor = headerSize;
        data = this.buffer.slice(cursor, cursor + length);
        cursor += length;
        this.buffer = this.buffer.slice(cursor);
        this._processEntry(entry, data);
      }
      if (this.buffer.length) {
        this.emit('wait');
      } else {
        this.emit('drain');
      }
    };

    Binary.prototype._processEntry = function(entry, data) {
      var cursor, length;
      entry.setPriority(data[0]);
      cursor = 1;
      length = data.length;
      while (cursor < length) {
        if (data[cursor] === 0) {
          entry.setTag(data.slice(1, cursor).toString());
          entry.setMessage(data.slice(cursor + 1, length - 1).toString());
          this.emit('entry', entry);
          return;
        }
        cursor += 1;
      }
      this.emit('error', new Error("Unprocessable entry data '" + data + "'"));
    };

    return Binary;

  })(Parser);

  module.exports = Binary;

}).call(this);
