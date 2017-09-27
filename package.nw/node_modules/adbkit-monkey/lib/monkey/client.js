(function() {
  var Api, Client, Command, Multi, Parser, Queue, Reply,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Api = require('./api');

  Command = require('./command');

  Reply = require('./reply');

  Queue = require('./queue');

  Multi = require('./multi');

  Parser = require('./parser');

  Client = (function(_super) {
    __extends(Client, _super);

    function Client() {
      this.commandQueue = new Queue;
      this.parser = new Parser;
      this.stream = null;
    }

    Client.prototype._hook = function() {
      var _this = this;
      this.stream.on('data', function(data) {
        return _this.parser.parse(data);
      });
      this.stream.on('error', function(err) {
        return _this.emit('error', err);
      });
      this.stream.on('end', function() {
        return _this.emit('end');
      });
      this.stream.on('finish', function() {
        return _this.emit('finish');
      });
      this.parser.on('reply', function(reply) {
        return _this._consume(reply);
      });
      this.parser.on('error', function(err) {
        return _this.emit('error', err);
      });
    };

    Client.prototype._consume = function(reply) {
      var command;
      if (command = this.commandQueue.dequeue()) {
        if (reply.isError()) {
          command.callback(reply.toError(), null, command.command);
        } else {
          command.callback(null, reply.value, command.command);
        }
      } else {
        throw new Error("Command queue depleted, but replies still coming in");
      }
    };

    Client.prototype.connect = function(stream) {
      this.stream = stream;
      this._hook();
      return this;
    };

    Client.prototype.end = function() {
      this.stream.end();
      return this;
    };

    Client.prototype.send = function(commands, callback) {
      var command, _i, _len;
      if (Array.isArray(commands)) {
        for (_i = 0, _len = commands.length; _i < _len; _i++) {
          command = commands[_i];
          this.commandQueue.enqueue(new Command(command, callback));
        }
        this.stream.write("" + (commands.join('\n')) + "\n");
      } else {
        this.commandQueue.enqueue(new Command(commands, callback));
        this.stream.write("" + commands + "\n");
      }
      return this;
    };

    Client.prototype.multi = function() {
      return new Multi(this);
    };

    return Client;

  })(Api);

  module.exports = Client;

}).call(this);
