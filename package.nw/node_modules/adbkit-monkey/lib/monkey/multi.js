(function() {
  var Api, Command, Multi,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Api = require('./api');

  Command = require('./command');

  Multi = (function(_super) {
    __extends(Multi, _super);

    function Multi(monkey) {
      var _this = this;
      this.monkey = monkey;
      this.commands = [];
      this.replies = [];
      this.errors = [];
      this.counter = 0;
      this.sent = false;
      this.callback = null;
      this.collector = function(err, result, cmd) {
        if (err) {
          _this.errors.push("" + cmd + ": " + err.message);
        }
        _this.replies.push(result);
        _this.counter -= 1;
        return _this._maybeFinish();
      };
    }

    Multi.prototype._maybeFinish = function() {
      var _this = this;
      if (this.counter === 0) {
        if (this.errors.length) {
          setImmediate(function() {
            return _this.callback(new Error(_this.errors.join(', ')));
          });
        } else {
          setImmediate(function() {
            return _this.callback(null, _this.replies);
          });
        }
      }
    };

    Multi.prototype._forbidReuse = function() {
      if (this.sent) {
        throw new Error("Reuse not supported");
      }
    };

    Multi.prototype.send = function(command) {
      this._forbidReuse();
      this.commands.push(new Command(command, this.collector));
    };

    Multi.prototype.execute = function(callback) {
      var command, parts, _i, _len, _ref;
      this._forbidReuse();
      this.counter = this.commands.length;
      this.sent = true;
      this.callback = callback;
      if (this.counter === 0) {
        return;
      }
      parts = [];
      _ref = this.commands;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        command = _ref[_i];
        this.monkey.commandQueue.enqueue(command);
        parts.push(command.command);
      }
      parts.push('');
      this.commands = [];
      this.monkey.stream.write(parts.join('\n'));
    };

    return Multi;

  })(Api);

  module.exports = Multi;

}).call(this);
