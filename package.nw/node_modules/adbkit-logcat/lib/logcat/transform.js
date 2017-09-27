(function() {
  var Stream, Transform,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Stream = require('stream');

  Transform = (function(superClass) {
    extend(Transform, superClass);

    function Transform(options) {
      this.savedR = null;
      Transform.__super__.constructor.call(this, options);
    }

    Transform.prototype._transform = function(chunk, encoding, done) {
      var hi, last, lo;
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

    return Transform;

  })(Stream.Transform);

  module.exports = Transform;

}).call(this);
