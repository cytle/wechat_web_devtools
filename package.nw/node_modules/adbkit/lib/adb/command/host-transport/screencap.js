var Command, LineTransform, Parser, Promise, Protocol, ScreencapCommand,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Promise = require('bluebird');

Command = require('../../command');

Protocol = require('../../protocol');

Parser = require('../../parser');

LineTransform = require('../../linetransform');

ScreencapCommand = (function(superClass) {
  extend(ScreencapCommand, superClass);

  function ScreencapCommand() {
    return ScreencapCommand.__super__.constructor.apply(this, arguments);
  }

  ScreencapCommand.prototype.execute = function() {
    this._send('shell:echo && screencap -p 2>/dev/null');
    return this.parser.readAscii(4).then((function(_this) {
      return function(reply) {
        var transform;
        switch (reply) {
          case Protocol.OKAY:
            transform = new LineTransform;
            return _this.parser.readBytes(1).then(function(chunk) {
              transform = new LineTransform({
                autoDetect: true
              });
              transform.write(chunk);
              return _this.parser.raw().pipe(transform);
            })["catch"](Parser.PrematureEOFError, function() {
              throw new Error('No support for the screencap command');
            });
          case Protocol.FAIL:
            return _this.parser.readError();
          default:
            return _this.parser.unexpected(reply, 'OKAY or FAIL');
        }
      };
    })(this));
  };

  return ScreencapCommand;

})(Command);

module.exports = ScreencapCommand;
