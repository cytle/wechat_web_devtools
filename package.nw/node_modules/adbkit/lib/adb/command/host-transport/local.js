var Command, LocalCommand, Protocol,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Command = require('../../command');

Protocol = require('../../protocol');

LocalCommand = (function(superClass) {
  extend(LocalCommand, superClass);

  function LocalCommand() {
    return LocalCommand.__super__.constructor.apply(this, arguments);
  }

  LocalCommand.prototype.execute = function(path) {
    this._send(/:/.test(path) ? path : "localfilesystem:" + path);
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

  return LocalCommand;

})(Command);

module.exports = LocalCommand;
