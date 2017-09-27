var Assert, RgbTransform, Stream,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Assert = require('assert');

Stream = require('stream');

RgbTransform = (function(superClass) {
  extend(RgbTransform, superClass);

  function RgbTransform(meta, options) {
    this.meta = meta;
    this._buffer = new Buffer('');
    Assert.ok(this.meta.bpp === 24 || this.meta.bpp === 32, 'Only 24-bit and 32-bit raw images with 8-bits per color are supported');
    this._r_pos = this.meta.red_offset / 8;
    this._g_pos = this.meta.green_offset / 8;
    this._b_pos = this.meta.blue_offset / 8;
    this._a_pos = this.meta.alpha_offset / 8;
    this._pixel_bytes = this.meta.bpp / 8;
    RgbTransform.__super__.constructor.call(this, options);
  }

  RgbTransform.prototype._transform = function(chunk, encoding, done) {
    var b, g, r, sourceCursor, target, targetCursor;
    if (this._buffer.length) {
      this._buffer = Buffer.concat([this._buffer, chunk], this._buffer.length + chunk.length);
    } else {
      this._buffer = chunk;
    }
    sourceCursor = 0;
    targetCursor = 0;
    target = this._pixel_bytes === 3 ? this._buffer : new Buffer(Math.max(4, chunk.length / this._pixel_bytes * 3));
    while (this._buffer.length - sourceCursor >= this._pixel_bytes) {
      r = this._buffer[sourceCursor + this._r_pos];
      g = this._buffer[sourceCursor + this._g_pos];
      b = this._buffer[sourceCursor + this._b_pos];
      target[targetCursor + 0] = r;
      target[targetCursor + 1] = g;
      target[targetCursor + 2] = b;
      sourceCursor += this._pixel_bytes;
      targetCursor += 3;
    }
    if (targetCursor) {
      this.push(target.slice(0, targetCursor));
      this._buffer = this._buffer.slice(sourceCursor);
    }
    done();
  };

  return RgbTransform;

})(Stream.Transform);

module.exports = RgbTransform;
