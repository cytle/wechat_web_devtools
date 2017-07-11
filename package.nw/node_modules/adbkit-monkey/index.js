(function() {
  var Path;

  Path = require('path');

  module.exports = (function() {
    switch (Path.extname(__filename)) {
      case '.coffee':
        return require('./src/monkey');
      default:
        return require('./lib/monkey');
    }
  })();

}).call(this);
