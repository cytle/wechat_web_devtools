var fs = require('fs');
var path = require('path');

var mkdir = function (dist, callback) {
  dist = path.resolve(dist);
  fs.exists(dist, function (exists) {
    if (!exists) {
      mkdir(path.dirname(dist), function () {
        fs.mkdir(dist, function (err) {
          callback && callback(err);
        });
      });
    } else {
      callback && callback(null);
    }
  });
};
mkdir.sync = function (dist) {
  dist = path.resolve(dist);
  if (!fs.existsSync(dist)) {
    mkdir.sync(path.dirname(dist));
    fs.mkdirSync(dist);
  }
};
module.exports = mkdir;