var Command, InstallCommand, Protocol,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Command = require('../../command');

Protocol = require('../../protocol');

InstallCommand = (function(superClass) {
  extend(InstallCommand, superClass);

  function InstallCommand() {
    return InstallCommand.__super__.constructor.apply(this, arguments);
  }

  InstallCommand.prototype.execute = function(apk) {
    this._send("shell:pm install -r " + (this._escapeCompat(apk)));
    return this.parser.readAscii(4).then((function(_this) {
      return function(reply) {
        switch (reply) {
          case Protocol.OKAY:
            return _this.parser.searchLine(/^(Success|Failure \[(.*?)\])$/).then(function(match) {
              var code, err;
              if (match[1] === 'Success') {
                return true;
              } else {
                code = match[2];
                err = new Error(apk + " could not be installed [" + code + "]");
                err.code = code;
                throw err;
              }
            })["finally"](function() {
              return _this.parser.readAll();
            });
          case Protocol.FAIL:
            return _this.parser.readError();
          default:
            return _this.parser.unexpected(reply, 'OKAY or FAIL');
        }
      };
    })(this));
  };

  return InstallCommand;

})(Command);

module.exports = InstallCommand;
