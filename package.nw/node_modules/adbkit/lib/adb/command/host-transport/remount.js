var Command, Protocol, RemountCommand,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Command = require('../../command');

Protocol = require('../../protocol');

RemountCommand = (function(superClass) {
  extend(RemountCommand, superClass);

  function RemountCommand() {
    return RemountCommand.__super__.constructor.apply(this, arguments);
  }

  RemountCommand.prototype.execute = function() {
    this._send('remount:');
    return this.parser.readAscii(4).then((function(_this) {
      return function(reply) {
        switch (reply) {
          case Protocol.OKAY:
            return true;
          case Protocol.FAIL:
            return _this.parser.readError();
          default:
            return _this.parser.unexpected(reply, 'OKAY or FAIL');
        }
      };
    })(this));
  };

  return RemountCommand;

})(Command);

module.exports = RemountCommand;
