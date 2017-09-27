var Command, GetFeaturesCommand, Protocol,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Command = require('../../command');

Protocol = require('../../protocol');

GetFeaturesCommand = (function(superClass) {
  var RE_FEATURE;

  extend(GetFeaturesCommand, superClass);

  function GetFeaturesCommand() {
    return GetFeaturesCommand.__super__.constructor.apply(this, arguments);
  }

  RE_FEATURE = /^feature:(.*?)(?:=(.*?))?\r?$/gm;

  GetFeaturesCommand.prototype.execute = function() {
    this._send('shell:pm list features 2>/dev/null');
    return this.parser.readAscii(4).then((function(_this) {
      return function(reply) {
        switch (reply) {
          case Protocol.OKAY:
            return _this.parser.readAll().then(function(data) {
              return _this._parseFeatures(data.toString());
            });
          case Protocol.FAIL:
            return _this.parser.readError();
          default:
            return _this.parser.unexpected(reply, 'OKAY or FAIL');
        }
      };
    })(this));
  };

  GetFeaturesCommand.prototype._parseFeatures = function(value) {
    var features, match;
    features = {};
    while (match = RE_FEATURE.exec(value)) {
      features[match[1]] = match[2] || true;
    }
    return features;
  };

  return GetFeaturesCommand;

})(Command);

module.exports = GetFeaturesCommand;
