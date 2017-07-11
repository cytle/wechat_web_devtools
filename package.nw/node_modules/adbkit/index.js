(function() {
  var Path;

  Path = require('path');

  module.exports = (function() {
    switch (Path.extname(__filename)) {
      case '.coffee':
        return require('./src/adb');
      default:
        return require('./lib/adb');
    }
  })();

}).call(this);
