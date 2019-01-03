var debug = require('debug')('mdns-packet:lib:dns:bufferwriter');
var util = require('util');
var Qap = require('qap');

var BufferConsumer = require('./bufferconsumer');
var BufferWriter = module.exports = function (size) {
  this.buf = new Buffer(size || 512);
  this.buf.fill(0);
  this.offset = 0;
};

BufferWriter.prototype.tell = function () {
  return this.offset;
};

BufferWriter.prototype.buffer = function (v) {
  if (typeof v === 'undefined') {
    return this;
  }
  if (v instanceof BufferWriter) {
    v = v.dump();
  }
  if (!(v instanceof Buffer)) {
    throw new Error('VariableError: not a buffer');
  }
  if (v.length > 0) {
    v.copy(this.buf, this.offset);
    this.offset += v.length;
  }
  return this;
};

//4 bytes
BufferWriter.prototype.long = function (v) {
  this.buf.writeInt32BE(v, this.offset);
  this.offset += 4;
  return this;
};

//two bytes
BufferWriter.prototype.short = function (v) {
  this.buf.writeUInt16BE(v & 0xFFFF, this.offset);
  this.offset += 2;
  return this;
};

BufferWriter.prototype.seek = function (pos) {
  debug('seek(%d)', pos);
  if (pos < 0) {
    throw new Error('Negative pos not allowed');
  }
  if (pos > this.buf.length) {
    debug('bad packet', this.buffer.toString('hex'));
    throw new Error(util.format('Cannot seek after EOF. %d > %d',
      pos, this.buf.length));
  }
  this.offset = pos;
  return this;
};

BufferWriter.prototype.byte = function (v) {
  this.buf.writeUInt8(v, this.offset);
  this.offset += 1;
  return this;
};

BufferWriter.prototype.slice = function (start, end) {
  return this.buf.slice(start, end);
};

BufferWriter.prototype.indexOf = function (text) {
  var qap = new Qap(text);
  return qap.parse(this.buf);
};

/**
 * Writes a DNS name. If ref is specified, will finish this name with a
 * suffix reference (i.e., 0xc0 <ref>). If not, then will terminate with a NULL
 * byte.
 */
BufferWriter.prototype.name = function (v) {
  var self = this;
  debug('#name', v);
  var ref;
  var i;
  var j;
  var part;
  var parts = v.split('.');
  var parts2 = v.split('.');
  var consumer = new BufferConsumer(self.buf);
  var qap = new Qap('');
  var lastPart = parts.length;
  if (v.length > 0) {
    for (i = 0; i < parts.length; i++) {
      if (parts[i].length === 0) {
        lastPart = i;
        continue;
      }
      part = new Buffer(parts[i]);
      qap.set(Buffer.concat([ new Buffer([ part.length ]), part ]));
      var location = qap.parse(self.buf)[0];
      if (location) {
        var tr = consumer.seek(location).name();
        if (tr === parts2.join('.')) {
          debug('found index: %s, from %s at %d', i, tr, location);
          ref = location;
          lastPart = i;
          break;
        }
      }
      parts2.shift();
    }
  }
  var out = new BufferWriter();
  debug('lastPart', lastPart, parts);
  for (i = 0; i < lastPart; i++) {
    part = new Buffer(parts[i]);
    debug('writing part', part);
    out.byte(part.length);
    for (j = 0; j < part.length; ++j) {
      out.byte(part[j]);
    }
  }

  if (ref) {
    debug('writing a name ref to %d', ref);
    out.byte(0xc0).byte(ref);
  }
  else {
    out.byte(0);
  }
  this.buffer(out);
  return this;
};

BufferWriter.prototype.dump = function () {
  return this.slice(0, this.tell());
};
