var Command, Protocol, RebootCommand,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Command = require('../../command');

Protocol = require('../../protocol');

RebootCommand = (function(superClass) {
  extend(RebootCommand, superClass);

  function RebootCommand() {
    return RebootCommand.__super__.constructor.apply(this, arguments);
  }

  RebootCommand.prototype.execute = function() {
    this._send('reboot:');
    return this.parser.readAscii(4).then((function(_this) {
      return function(reply) {
        switch (reply) {
          case Protocol.OKAY:
            return _this.parser.readAll()["return"](true);
          case Protocol.FAIL:
            return _this.parser.readError();
          default:
            return _this.parser.unexpected(reply, 'OKAY or FAIL');
        }
      };
    })(this));
  };

  return RebootCommand;

})(Command);

module.exports = RebootCommand;
