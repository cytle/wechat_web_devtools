var Adb, Client, Keycode, util;

Client = require('./adb/client');

Keycode = require('./adb/keycode');

util = require('./adb/util');

Adb = (function() {
  function Adb() {}

  Adb.createClient = function(options) {
    if (options == null) {
      options = {};
    }
    options.host || (options.host = process.env.ADB_HOST);
    options.port || (options.port = process.env.ADB_PORT);
    return new Client(options);
  };

  return Adb;

})();

Adb.Keycode = Keycode;

Adb.util = util;

module.exports = Adb;
