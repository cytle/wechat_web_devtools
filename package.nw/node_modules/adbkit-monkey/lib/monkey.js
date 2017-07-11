(function() {
  var Client, Connection, Monkey;

  Client = require('./monkey/client');

  Connection = require('./monkey/connection');

  Monkey = (function() {
    function Monkey() {}

    Monkey.connect = function(options) {
      return new Connection().connect(options);
    };

    Monkey.connectStream = function(stream) {
      return new Client().connect(stream);
    };

    return Monkey;

  })();

  Monkey.Connection = Connection;

  Monkey.Client = Client;

  module.exports = Monkey;

}).call(this);
