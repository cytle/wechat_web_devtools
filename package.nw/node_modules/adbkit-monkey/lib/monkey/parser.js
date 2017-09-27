(function() {
  var EventEmitter, Parser, Reply,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  EventEmitter = require('events').EventEmitter;

  Reply = require('./reply');

  Parser = (function(_super) {
    __extends(Parser, _super);

    function Parser(options) {
      this.column = 0;
      this.buffer = new Buffer('');
    }

    Parser.prototype.parse = function(chunk) {
      this.buffer = Buffer.concat([this.buffer, chunk]);
      while (this.column < this.buffer.length) {
        if (this.buffer[this.column] === 0x0a) {
          this._parseLine(this.buffer.slice(0, this.column));
          this.buffer = this.buffer.slice(this.column + 1);
          this.column = 0;
        }
        this.column += 1;
      }
      if (this.buffer.length) {
        this.emit('wait');
      } else {
        this.emit('drain');
      }
    };

    Parser.prototype._parseLine = function(line) {
      switch (line[0]) {
        case 0x4f:
          if (line.length === 2) {
            this.emit('reply', new Reply(Reply.OK, null));
          } else {
            this.emit('reply', new Reply(Reply.OK, line.toString('ascii', 3)));
          }
          break;
        case 0x45:
          if (line.length === 5) {
            this.emit('reply', new Reply(Reply.ERROR, null));
          } else {
            this.emit('reply', new Reply(Reply.ERROR, line.toString('ascii', 6)));
          }
          break;
        default:
          this._complain(line);
      }
    };

    Parser.prototype._complain = function(line) {
      this.emit('error', new SyntaxError("Unparseable line '" + line + "'"));
    };

    return Parser;

  })(EventEmitter);

  module.exports = Parser;

}).call(this);
