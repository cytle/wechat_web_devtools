var Command, IsInstalledCommand, Parser, Protocol,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Command = require('../../command');

Protocol = require('../../protocol');

Parser = require('../../parser');

IsInstalledCommand = (function(superClass) {
  extend(IsInstalledCommand, superClass);

  function IsInstalledCommand() {
    return IsInstalledCommand.__super__.constructor.apply(this, arguments);
  }

  IsInstalledCommand.prototype.execute = function(pkg) {
    this._send("shell:pm path " + pkg + " 2>/dev/null");
    return this.parser.readAscii(4).then((function(_this) {
      return function(reply) {
        switch (reply) {
          case Protocol.OKAY:
            return _this.parser.readAscii(8).then(function(reply) {
              switch (reply) {
                case 'package:':
                  return true;
                default:
                  return _this.parser.unexpected(reply, "'package:'");
              }
            })["catch"](Parser.PrematureEOFError, function(err) {
              return false;
            });
          case Protocol.FAIL:
            return _this.parser.readError();
          default:
            return _this.parser.unexpected(reply, 'OKAY or FAIL');
        }
      };
    })(this));
  };

  return IsInstalledCommand;

})(Command);

module.exports = IsInstalledCommand;
