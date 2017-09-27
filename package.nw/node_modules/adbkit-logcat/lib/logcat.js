(function() {
  var Logcat, Priority, Reader;

  Reader = require('./logcat/reader');

  Priority = require('./logcat/priority');

  Logcat = (function() {
    function Logcat() {}

    Logcat.readStream = function(stream, options) {
      return new Reader(options).connect(stream);
    };

    return Logcat;

  })();

  Logcat.Reader = Reader;

  Logcat.Priority = Priority;

  module.exports = Logcat;

}).call(this);
