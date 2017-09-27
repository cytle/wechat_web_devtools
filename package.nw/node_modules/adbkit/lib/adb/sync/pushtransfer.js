var EventEmitter, PushTransfer,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

EventEmitter = require('events').EventEmitter;

PushTransfer = (function(superClass) {
  extend(PushTransfer, superClass);

  function PushTransfer() {
    this._stack = [];
    this.stats = {
      bytesTransferred: 0
    };
  }

  PushTransfer.prototype.cancel = function() {
    return this.emit('cancel');
  };

  PushTransfer.prototype.push = function(byteCount) {
    return this._stack.push(byteCount);
  };

  PushTransfer.prototype.pop = function() {
    var byteCount;
    byteCount = this._stack.pop();
    this.stats.bytesTransferred += byteCount;
    return this.emit('progress', this.stats);
  };

  PushTransfer.prototype.end = function() {
    return this.emit('end');
  };

  return PushTransfer;

})(EventEmitter);

module.exports = PushTransfer;
