var Command, HostVersionCommand, Protocol,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Command = require('../../command');

Protocol = require('../../protocol');

HostVersionCommand = (function(superClass) {
  extend(HostVersionCommand, superClass);

  function HostVersionCommand() {
    return HostVersionCommand.__super__.constructor.apply(this, arguments);
  }

  HostVersionCommand.prototype.execute = function() {
    this._send('host:version');
    return this.parser.readAscii(4).then((function(_this) {
      return function(reply) {
        switch (reply) {
          case Protocol.OKAY:
            return _this.parser.readValue().then(function(value) {
              return _this._parseVersion(value);
            });
          case Protocol.FAIL:
            return _this.parser.readError();
          default:
            return _this._parseVersion(reply);
        }
      };
    })(this));
  };

  HostVersionCommand.prototype._parseVersion = function(version) {
    return parseInt(version, 16);
  };

  return HostVersionCommand;

})(Command);

module.exports = HostVersionCommand;
