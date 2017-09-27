var Command, LineTransform, LogcatCommand, Protocol,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Command = require('../../command');

Protocol = require('../../protocol');

LineTransform = require('../../linetransform');

LogcatCommand = (function(superClass) {
  extend(LogcatCommand, superClass);

  function LogcatCommand() {
    return LogcatCommand.__super__.constructor.apply(this, arguments);
  }

  LogcatCommand.prototype.execute = function(options) {
    var cmd;
    if (options == null) {
      options = {};
    }
    cmd = 'logcat -B *:I 2>/dev/null';
    if (options.clear) {
      cmd = "logcat -c 2>/dev/null && " + cmd;
    }
    this._send("shell:echo && " + cmd);
    return this.parser.readAscii(4).then((function(_this) {
      return function(reply) {
        switch (reply) {
          case Protocol.OKAY:
            return _this.parser.raw().pipe(new LineTransform({
              autoDetect: true
            }));
          case Protocol.FAIL:
            return _this.parser.readError();
          default:
            return _this.parser.unexpected(reply, 'OKAY or FAIL');
        }
      };
    })(this));
  };

  return LogcatCommand;

})(Command);

module.exports = LogcatCommand;
