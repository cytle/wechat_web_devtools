var Command, Protocol, TcpIpCommand,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Command = require('../../command');

Protocol = require('../../protocol');

TcpIpCommand = (function(superClass) {
  var RE_OK;

  extend(TcpIpCommand, superClass);

  function TcpIpCommand() {
    return TcpIpCommand.__super__.constructor.apply(this, arguments);
  }

  RE_OK = /restarting in/;

  TcpIpCommand.prototype.execute = function(port) {
    this._send("tcpip:" + port);
    return this.parser.readAscii(4).then((function(_this) {
      return function(reply) {
        switch (reply) {
          case Protocol.OKAY:
            return _this.parser.readAll().then(function(value) {
              if (RE_OK.test(value)) {
                return port;
              } else {
                throw new Error(value.toString().trim());
              }
            });
          case Protocol.FAIL:
            return _this.parser.readError();
          default:
            return _this.parser.unexpected(reply, 'OKAY or FAIL');
        }
      };
    })(this));
  };

  return TcpIpCommand;

})(Command);

module.exports = TcpIpCommand;
