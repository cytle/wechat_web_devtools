var Command, GetStateCommand, Protocol,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Command = require('../../command');

Protocol = require('../../protocol');

GetStateCommand = (function(superClass) {
  extend(GetStateCommand, superClass);

  function GetStateCommand() {
    return GetStateCommand.__super__.constructor.apply(this, arguments);
  }

  GetStateCommand.prototype.execute = function(serial) {
    this._send("host-serial:" + serial + ":get-state");
    return this.parser.readAscii(4).then((function(_this) {
      return function(reply) {
        switch (reply) {
          case Protocol.OKAY:
            return _this.parser.readValue().then(function(value) {
              return value.toString();
            });
          case Protocol.FAIL:
            return _this.parser.readError();
          default:
            return _this.parser.unexpected(reply, 'OKAY or FAIL');
        }
      };
    })(this));
  };

  return GetStateCommand;

})(Command);

module.exports = GetStateCommand;
