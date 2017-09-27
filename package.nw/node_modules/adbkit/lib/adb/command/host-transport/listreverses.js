var Command, ListReversesCommand, Protocol,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Command = require('../../command');

Protocol = require('../../protocol');

ListReversesCommand = (function(superClass) {
  extend(ListReversesCommand, superClass);

  function ListReversesCommand() {
    return ListReversesCommand.__super__.constructor.apply(this, arguments);
  }

  ListReversesCommand.prototype.execute = function() {
    this._send("reverse:list-forward");
    return this.parser.readAscii(4).then((function(_this) {
      return function(reply) {
        switch (reply) {
          case Protocol.OKAY:
            return _this.parser.readValue().then(function(value) {
              return _this._parseReverses(value);
            });
          case Protocol.FAIL:
            return _this.parser.readError();
          default:
            return _this.parser.unexpected(reply, 'OKAY or FAIL');
        }
      };
    })(this));
  };

  ListReversesCommand.prototype._parseReverses = function(value) {
    var i, len, local, ref, ref1, remote, reverse, reverses, serial;
    reverses = [];
    ref = value.toString().split('\n');
    for (i = 0, len = ref.length; i < len; i++) {
      reverse = ref[i];
      if (reverse) {
        ref1 = reverse.split(/\s+/), serial = ref1[0], remote = ref1[1], local = ref1[2];
        reverses.push({
          remote: remote,
          local: local
        });
      }
    }
    return reverses;
  };

  return ListReversesCommand;

})(Command);

module.exports = ListReversesCommand;
