/* global Buffer */
var debug = require('debug')('mdns-packet:lib:dns:bufferconsumer');
var util = require('util');

var LABEL_POINTER = 0xc0;

var BufferConsumer = module.exports = function BufferConsumer(arg) {
  if (!(arg instanceof Buffer)) {
    debug('arg', arg);
    throw new Error('Expected instance of Buffer');
  }
  this.buffer = arg;
  this.length = this.buffer.length;
  debug('new consumer of %d bytes', this.length);
  this._offset = 0;
};

BufferConsumer.prototype.tell = function () {
  return this._offset;
};


BufferConsumer.prototype.seek = function (pos) {
  debug('seek(%d)', pos);
  if (pos < 0) {
    throw new Error('Negative pos not allowed');
  }
  if (pos > this.length) {
    debug('bad packet', this.buffer.toString('hex'));
    throw new Error(util.format('Cannot seek after EOF. %d > %d',
      pos, this.length));
  }
  this._offset = pos;
  return this;
};

BufferConsumer.prototype.slice = function (length) {
  var v;
  if (typeof length === 'undefined') {
    v = this.buffer.slice(this._offset);
    this._offset = this.length - 1;
    return v;
  }
  else {
    if ((this._offset + length) > this.length) {
      debug('Buffer owerflow. Slice beyond buffer.', {
        offset: this._offset,
        length: length,
        bufferLength: this.length
      });
      debug('so far', this);
      throw new Error('Buffer overflow');
    }
    v = this.buffer.slice(this._offset, this._offset + length);
    this._offset += length;
    return v;
  }
};


BufferConsumer.prototype.isEOF = function () {
  return this._offset >= this.length;
};

BufferConsumer.prototype.byte = function () {
  this._offset += 1;
  return this.buffer.readUInt8(this._offset - 1);
};

BufferConsumer.prototype.short = function () {
  debug('reading short at %d of %d', this._offset, this.length);
  this._offset += 2;
  return this.buffer.readUInt16BE(this._offset - 2);
};

BufferConsumer.prototype.long = function () {
  this._offset += 4;
  return this.buffer.readUInt32BE(this._offset - 4);
};

BufferConsumer.prototype.string = function (encoding, length) {
  var end;
  var ret;

  if (length === undefined) {
    end = this.buffer.length;
  }
  else {
    end = this.tell() + length;
    // if (end > this.length) {
    //   throw new errors.MalformedPacket(
    //     'Trying to read past eof. Start=%d, End=%s, Length=%s',
    //     this.tell(), end, this.length);
    // }
  }

  if (!encoding) {
    encoding = 'utf8';
  }
  ret = this.buffer.toString(encoding, this._offset, end);
  debug('got a %s character string:', length, ret);
  this.seek(end);
  return ret;
};


/**
 * Consumes a DNS name, which will either finish with a NULL byte or a suffix
 * reference (i.e., 0xc0 <ref>).
 */
BufferConsumer.prototype.name = function (join, endAt) {
  debug('.name(join:%s, endAt:%s)', join, endAt);
  if (typeof join === 'undefined') { join = true; }
  var parts = [];
  var ret;
  var len;
  var pos;
  var end;
  var comp = false;
  len = this.byte();
  debug('name initial len', len);
  if (len === 0) {
    parts.push('');
  }
  while (len !== 0) {
    if ((len & LABEL_POINTER) === LABEL_POINTER) {
      debug('has label');
      len -= LABEL_POINTER;
      len = len << 8;
      pos = len + this.byte();
      if (!comp) {
        end = this.tell();
      }
      this.seek(pos);
      len = this.byte();
      comp = true;
      continue;
    }
    debug('no label');

    // Otherwise, consume a string!
    var v = this.string('utf8', len);
    if (v.length > 0) {
      parts.push(v);
    }

    if (endAt && this.tell() >= endAt) {
      debug('leaving at', endAt);
      break;
    }
    len = this.byte();
    debug('got len', len);
  }
  if (!comp) {
    end = this.tell();
  }
  debug('ended with %d parts at %d', parts.length, end);
  this.seek(end);
  if (join) {
    ret = parts.join('.');
  }
  else {
    ret = parts;
  }
  debug('ret', ret);
  return ret;
};


