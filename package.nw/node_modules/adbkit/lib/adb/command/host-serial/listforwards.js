var Command, ListForwardsCommand, Protocol,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Command = require('../../command');

Protocol = require('../../protocol');

ListForwardsCommand = (function(superClass) {
  extend(ListForwardsCommand, superClass);

  function ListForwardsCommand() {
    return ListForwardsCommand.__super__.constructor.apply(this, arguments);
  }

  ListForwardsCommand.prototype.execute = function(serial) {
    this._send("host-serial:" + serial + ":list-forward");
    return this.parser.readAscii(4).then((function(_this) {
      return function(reply) {
        switch (reply) {
          case Protocol.OKAY:
            return _this.parser.readValue().then(function(value) {
              return _this._parseForwards(value);
            });
          case Protocol.FAIL:
            return _this.parser.readError();
          default:
            return _this.parser.unexpected(reply, 'OKAY or FAIL');
        }
      };
    })(this));
  };

  ListForwardsCommand.prototype._parseForwards = function(value) {
    var forward, forwards, i, len, local, ref, ref1, remote, serial;
    forwards = [];
    ref = value.toString().split('\n');
    for (i = 0, len = ref.length; i < len; i++) {
      forward = ref[i];
      if (forward) {
        ref1 = forward.split(/\s+/), serial = ref1[0], local = ref1[1], remote = ref1[2];
        forwards.push({
          serial: serial,
          local: local,
          remote: remote
        });
      }
    }
    return forwards;
  };

  return ListForwardsCommand;

})(Command);

module.exports = ListForwardsCommand;
