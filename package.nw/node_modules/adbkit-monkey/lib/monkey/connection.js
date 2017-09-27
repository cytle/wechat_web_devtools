(function() {
  var Client, Connection, Net, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Net = require('net');

  Client = require('./client');

  Connection = (function(_super) {
    __extends(Connection, _super);

    function Connection() {
      _ref = Connection.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    Connection.prototype.connect = function(options) {
      var stream;
      stream = Net.connect(options);
      stream.setNoDelay(true);
      return Connection.__super__.connect.call(this, stream);
    };

    Connection.prototype._hook = function() {
      var _this = this;
      this.stream.on('connect', function() {
        return _this.emit('connect');
      });
      this.stream.on('close', function(hadError) {
        return _this.emit('close', hadError);
      });
      return Connection.__super__._hook.call(this);
    };

    return Connection;

  })(Client);

  module.exports = Connection;

}).call(this);
