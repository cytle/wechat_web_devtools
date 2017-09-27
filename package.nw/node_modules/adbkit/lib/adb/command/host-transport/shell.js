var Command, Protocol, ShellCommand,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Command = require('../../command');

Protocol = require('../../protocol');

ShellCommand = (function(superClass) {
  extend(ShellCommand, superClass);

  function ShellCommand() {
    return ShellCommand.__super__.constructor.apply(this, arguments);
  }

  ShellCommand.prototype.execute = function(command) {
    if (Array.isArray(command)) {
      command = command.map(this._escape).join(' ');
    }
    this._send("shell:" + command);
    return this.parser.readAscii(4).then((function(_this) {
      return function(reply) {
        switch (reply) {
          case Protocol.OKAY:
            return _this.parser.raw();
          case Protocol.FAIL:
            return _this.parser.readError();
          default:
            return _this.parser.unexpected(reply, 'OKAY or FAIL');
        }
      };
    })(this));
  };

  return ShellCommand;

})(Command);

module.exports = ShellCommand;
