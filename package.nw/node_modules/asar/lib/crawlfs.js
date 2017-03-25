(function() {
  var fs, glob;

  fs = require('fs');

  glob = require('glob');

  module.exports = function(dir, options, callback) {
    var metadata;
    metadata = {};
    return glob(dir + '/**/*', options, function(error, filenames) {
      var filename, stat, _i, _len;
      if (error) {
        return callback(error);
      }
      for (_i = 0, _len = filenames.length; _i < _len; _i++) {
        filename = filenames[_i];
        stat = fs.lstatSync(filename);
        if (stat.isFile()) {
          metadata[filename] = {
            type: 'file',
            stat: stat
          };
        } else if (stat.isDirectory()) {
          metadata[filename] = {
            type: 'directory',
            stat: stat
          };
        } else if (stat.isSymbolicLink()) {
          metadata[filename] = {
            type: 'link',
            stat: stat
          };
        }
      }
      return callback(null, filenames, metadata);
    });
  };

}).call(this);
