(function() {
  var EventEmitter, Parser,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  EventEmitter = require('events').EventEmitter;

  Parser = (function(superClass) {
    extend(Parser, superClass);

    function Parser() {
      return Parser.__super__.constructor.apply(this, arguments);
    }

    Parser.get = function(type) {
      var parser;
      parser = require("./parser/" + type);
      return new parser();
    };

    Parser.prototype.parse = function() {
      throw new Error("parse() is unimplemented");
    };

    return Parser;

  })(EventEmitter);

  module.exports = Parser;

}).call(this);
