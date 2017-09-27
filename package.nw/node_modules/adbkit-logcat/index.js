(function() {
  var Path;

  Path = require('path');

  module.exports = (function() {
    switch (Path.extname(__filename)) {
      case '.coffee':
        return require('./src/logcat');
      default:
        return require('./lib/logcat');
    }
  })();

}).call(this);
