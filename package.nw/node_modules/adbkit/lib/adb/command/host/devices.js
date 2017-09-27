var Command, HostDevicesCommand, Protocol,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Command = require('../../command');

Protocol = require('../../protocol');

HostDevicesCommand = (function(superClass) {
  extend(HostDevicesCommand, superClass);

  function HostDevicesCommand() {
    return HostDevicesCommand.__super__.constructor.apply(this, arguments);
  }

  HostDevicesCommand.prototype.execute = function() {
    this._send('host:devices');
    return this.parser.readAscii(4).then((function(_this) {
      return function(reply) {
        switch (reply) {
          case Protocol.OKAY:
            return _this._readDevices();
          case Protocol.FAIL:
            return _this.parser.readError();
          default:
            return _this.parser.unexpected(reply, 'OKAY or FAIL');
        }
      };
    })(this));
  };

  HostDevicesCommand.prototype._readDevices = function() {
    return this.parser.readValue().then((function(_this) {
      return function(value) {
        return _this._parseDevices(value);
      };
    })(this));
  };

  HostDevicesCommand.prototype._parseDevices = function(value) {
    var devices, i, id, len, line, ref, ref1, type;
    devices = [];
    if (!value.length) {
      return devices;
    }
    ref = value.toString('ascii').split('\n');
    for (i = 0, len = ref.length; i < len; i++) {
      line = ref[i];
      if (line) {
        ref1 = line.split('\t'), id = ref1[0], type = ref1[1];
        devices.push({
          id: id,
          type: type
        });
      }
    }
    return devices;
  };

  return HostDevicesCommand;

})(Command);

module.exports = HostDevicesCommand;
