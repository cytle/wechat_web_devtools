var LineTransform, Stream,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Stream = require('stream');

LineTransform = (function(superClass) {
  extend(LineTransform, superClass);

  function LineTransform(options) {
    if (options == null) {
      options = {};
    }
    this.savedR = null;
    this.autoDetect = options.autoDetect || false;
    this.transformNeeded = true;
    this.skipBytes = 0;
    delete options.autoDetect;
    LineTransform.__super__.constructor.call(this, options);
  }

  LineTransform.prototype._nullTransform = function(chunk, encoding, done) {
    this.push(chunk);
    done();
  };

  LineTransform.prototype._transform = function(chunk, encoding, done) {
    var hi, last, lo, skip;
    if (this.autoDetect) {
      if (chunk[0] === 0x0a) {
        this.transformNeeded = false;
        this.skipBytes = 1;
      } else {
        this.skipBytes = 2;
      }
      this.autoDetect = false;
    }
    if (this.skipBytes) {
      skip = Math.min(chunk.length, this.skipBytes);
      chunk = chunk.slice(skip);
      this.skipBytes -= skip;
    }
    if (!chunk.length) {
      return done();
    }
    if (!this.transformNeeded) {
      return this._nullTransform(chunk, encoding, done);
    }
    lo = 0;
    hi = 0;
    if (this.savedR) {
      if (chunk[0] !== 0x0a) {
        this.push(this.savedR);
      }
      this.savedR = null;
    }
    last = chunk.length - 1;
    while (hi <= last) {
      if (chunk[hi] === 0x0d) {
        if (hi === last) {
          this.savedR = chunk.slice(last);
          break;
        } else if (chunk[hi + 1] === 0x0a) {
          this.push(chunk.slice(lo, hi));
          lo = hi + 1;
        }
      }
      hi += 1;
    }
    if (hi !== lo) {
      this.push(chunk.slice(lo, hi));
    }
    done();
  };

  LineTransform.prototype._flush = function(done) {
    if (this.savedR) {
      this.push(this.savedR);
    }
    return done();
  };

  return LineTransform;

})(Stream.Transform);

module.exports = LineTransform;
