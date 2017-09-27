var Command, ForwardCommand, Protocol,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Command = require('../../command');

Protocol = require('../../protocol');

ForwardCommand = (function(superClass) {
  extend(ForwardCommand, superClass);

  function ForwardCommand() {
    return ForwardCommand.__super__.constructor.apply(this, arguments);
  }

  ForwardCommand.prototype.execute = function(serial, local, remote) {
    this._send("host-serial:" + serial + ":forward:" + local + ";" + remote);
    return this.parser.readAscii(4).then((function(_this) {
      return function(reply) {
        switch (reply) {
          case Protocol.OKAY:
            return _this.parser.readAscii(4).then(function(reply) {
              switch (reply) {
                case Protocol.OKAY:
                  return true;
                case Protocol.FAIL:
                  return _this.parser.readError();
                default:
                  return _this.parser.unexpected(reply, 'OKAY or FAIL');
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

  return ForwardCommand;

})(Command);

module.exports = ForwardCommand;
