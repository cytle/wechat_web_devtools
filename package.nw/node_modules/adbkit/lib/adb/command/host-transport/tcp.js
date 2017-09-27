var Command, Protocol, TcpCommand,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Command = require('../../command');

Protocol = require('../../protocol');

TcpCommand = (function(superClass) {
  extend(TcpCommand, superClass);

  function TcpCommand() {
    return TcpCommand.__super__.constructor.apply(this, arguments);
  }

  TcpCommand.prototype.execute = function(port, host) {
    this._send(("tcp:" + port) + (host ? ":" + host : ''));
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

  return TcpCommand;

})(Command);

module.exports = TcpCommand;
