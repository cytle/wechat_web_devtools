var Command, Parser, Protocol, debug;

debug = require('debug')('adb:command');

Parser = require('./parser');

Protocol = require('./protocol');

Command = (function() {
  var RE_ESCAPE, RE_SQUOT;

  RE_SQUOT = /'/g;

  RE_ESCAPE = /([$`\\!"])/g;

  function Command(connection) {
    this.connection = connection;
    this.parser = this.connection.parser;
    this.protocol = Protocol;
  }

  Command.prototype.execute = function() {
    throw new Exception('Missing implementation');
  };

  Command.prototype._send = function(data) {
    var encoded;
    encoded = Protocol.encodeData(data);
    debug("Send '" + encoded + "'");
    this.connection.write(encoded);
    return this;
  };

  Command.prototype._escape = function(arg) {
    switch (typeof arg) {
      case 'number':
        return arg;
      default:
        return "'" + arg.toString().replace(RE_SQUOT, "'\"'\"'") + "'";
    }
  };

  Command.prototype._escapeCompat = function(arg) {
    switch (typeof arg) {
      case 'number':
        return arg;
      default:
        return '"' + arg.toString().replace(RE_ESCAPE, '\\$1') + '"';
    }
  };

  return Command;

})();

module.exports = Command;
