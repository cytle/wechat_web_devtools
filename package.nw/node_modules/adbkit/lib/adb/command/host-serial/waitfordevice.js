var Command, Protocol, WaitForDeviceCommand,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Command = require('../../command');

Protocol = require('../../protocol');

WaitForDeviceCommand = (function(superClass) {
  extend(WaitForDeviceCommand, superClass);

  function WaitForDeviceCommand() {
    return WaitForDeviceCommand.__super__.constructor.apply(this, arguments);
  }

  WaitForDeviceCommand.prototype.execute = function(serial) {
    this._send("host-serial:" + serial + ":wait-for-any");
    return this.parser.readAscii(4).then((function(_this) {
      return function(reply) {
        switch (reply) {
          case Protocol.OKAY:
            return _this.parser.readAscii(4).then(function(reply) {
              switch (reply) {
                case Protocol.OKAY:
                  return serial;
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

  return WaitForDeviceCommand;

})(Command);

module.exports = WaitForDeviceCommand;
