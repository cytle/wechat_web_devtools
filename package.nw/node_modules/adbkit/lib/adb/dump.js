var fs, out;

fs = require('fs');

if (process.env.ADBKIT_DUMP) {
  out = fs.createWriteStream('adbkit.dump');
  module.exports = function(chunk) {
    out.write(chunk);
    return chunk;
  };
} else {
  module.exports = function(chunk) {
    return chunk;
  };
}
