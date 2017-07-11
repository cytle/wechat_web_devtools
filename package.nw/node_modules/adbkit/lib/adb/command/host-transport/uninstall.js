var Command, Protocol, UninstallCommand,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Command = require('../../command');

Protocol = require('../../protocol');

UninstallCommand = (function(superClass) {
  extend(UninstallCommand, superClass);

  function UninstallCommand() {
    return UninstallCommand.__super__.constructor.apply(this, arguments);
  }

  UninstallCommand.prototype.execute = function(pkg) {
    this._send("shell:pm uninstall " + pkg);
    return this.parser.readAscii(4).then((function(_this) {
      return function(reply) {
        switch (reply) {
          case Protocol.OKAY:
            return _this.parser.searchLine(/^(Success|Failure.*|.*Unknown package:.*)$/).then(function(match) {
              if (match[1] === 'Success') {
                return true;
              } else {
                return true;
              }
            })["finally"](function() {
              return _this.parser.readAll();
            });
          case Protocol.FAIL:
            return _this.parser.readError();
          default:
            return _this.parser.unexpected(reply, "OKAY or FAIL");
        }
      };
    })(this));
  };

  return UninstallCommand;

})(Command);

module.exports = UninstallCommand;
