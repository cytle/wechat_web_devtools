var Command, GetPackagesCommand, Protocol,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Command = require('../../command');

Protocol = require('../../protocol');

GetPackagesCommand = (function(superClass) {
  var RE_PACKAGE;

  extend(GetPackagesCommand, superClass);

  function GetPackagesCommand() {
    return GetPackagesCommand.__super__.constructor.apply(this, arguments);
  }

  RE_PACKAGE = /^package:(.*?)\r?$/gm;

  GetPackagesCommand.prototype.execute = function() {
    this._send('shell:pm list packages 2>/dev/null');
    return this.parser.readAscii(4).then((function(_this) {
      return function(reply) {
        switch (reply) {
          case Protocol.OKAY:
            return _this.parser.readAll().then(function(data) {
              return _this._parsePackages(data.toString());
            });
          case Protocol.FAIL:
            return _this.parser.readError();
          default:
            return _this.parser.unexpected(reply, 'OKAY or FAIL');
        }
      };
    })(this));
  };

  GetPackagesCommand.prototype._parsePackages = function(value) {
    var features, match;
    features = [];
    while (match = RE_PACKAGE.exec(value)) {
      features.push(match[1]);
    }
    return features;
  };

  return GetPackagesCommand;

})(Command);

module.exports = GetPackagesCommand;
