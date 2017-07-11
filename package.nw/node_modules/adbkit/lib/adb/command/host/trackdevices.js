var Command, HostDevicesCommand, HostTrackDevicesCommand, Protocol, Tracker,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Command = require('../../command');

Protocol = require('../../protocol');

Tracker = require('../../tracker');

HostDevicesCommand = require('./devices');

HostTrackDevicesCommand = (function(superClass) {
  extend(HostTrackDevicesCommand, superClass);

  function HostTrackDevicesCommand() {
    return HostTrackDevicesCommand.__super__.constructor.apply(this, arguments);
  }

  HostTrackDevicesCommand.prototype.execute = function() {
    this._send('host:track-devices');
    return this.parser.readAscii(4).then((function(_this) {
      return function(reply) {
        switch (reply) {
          case Protocol.OKAY:
            return new Tracker(_this);
          case Protocol.FAIL:
            return _this.parser.readError();
          default:
            return _this.parser.unexpected(reply, 'OKAY or FAIL');
        }
      };
    })(this));
  };

  return HostTrackDevicesCommand;

})(HostDevicesCommand);

module.exports = HostTrackDevicesCommand;
