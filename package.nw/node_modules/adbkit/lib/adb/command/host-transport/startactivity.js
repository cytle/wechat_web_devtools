var Command, Parser, Protocol, StartActivityCommand,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Command = require('../../command');

Protocol = require('../../protocol');

Parser = require('../../parser');

StartActivityCommand = (function(superClass) {
  var EXTRA_TYPES, RE_ERROR;

  extend(StartActivityCommand, superClass);

  function StartActivityCommand() {
    return StartActivityCommand.__super__.constructor.apply(this, arguments);
  }

  RE_ERROR = /^Error: (.*)$/;

  EXTRA_TYPES = {
    string: 's',
    "null": 'sn',
    bool: 'z',
    int: 'i',
    long: 'l',
    float: 'l',
    uri: 'u',
    component: 'cn'
  };

  StartActivityCommand.prototype.execute = function(options) {
    var args;
    args = this._intentArgs(options);
    if (options.debug) {
      args.push('-D');
    }
    if (options.wait) {
      args.push('-W');
    }
    if (options.user || options.user === 0) {
      args.push('--user', this._escape(options.user));
    }
    return this._run('start', args);
  };

  StartActivityCommand.prototype._run = function(command, args) {
    this._send("shell:am " + command + " " + (args.join(' ')));
    return this.parser.readAscii(4).then((function(_this) {
      return function(reply) {
        switch (reply) {
          case Protocol.OKAY:
            return _this.parser.searchLine(RE_ERROR)["finally"](function() {
              return _this.parser.end();
            }).then(function(match) {
              throw new Error(match[1]);
            })["catch"](Parser.PrematureEOFError, function(err) {
              return true;
            });
          case Protocol.FAIL:
            return _this.parser.readError();
          default:
            return _this.parser.unexpected(reply, 'OKAY or FAIL');
        }
      };
    })(this));
  };

  StartActivityCommand.prototype._intentArgs = function(options) {
    var args;
    args = [];
    if (options.extras) {
      args.push.apply(args, this._formatExtras(options.extras));
    }
    if (options.action) {
      args.push('-a', this._escape(options.action));
    }
    if (options.data) {
      args.push('-d', this._escape(options.data));
    }
    if (options.mimeType) {
      args.push('-t', this._escape(options.mimeType));
    }
    if (options.category) {
      if (Array.isArray(options.category)) {
        options.category.forEach((function(_this) {
          return function(category) {
            return args.push('-c', _this._escape(category));
          };
        })(this));
      } else {
        args.push('-c', this._escape(options.category));
      }
    }
    if (options.component) {
      args.push('-n', this._escape(options.component));
    }
    if (options.flags) {
      args.push('-f', this._escape(options.flags));
    }
    return args;
  };

  StartActivityCommand.prototype._formatExtras = function(extras) {
    if (!extras) {
      return [];
    }
    if (Array.isArray(extras)) {
      return extras.reduce((function(_this) {
        return function(all, extra) {
          return all.concat(_this._formatLongExtra(extra));
        };
      })(this), []);
    } else {
      return Object.keys(extras).reduce((function(_this) {
        return function(all, key) {
          return all.concat(_this._formatShortExtra(key, extras[key]));
        };
      })(this), []);
    }
  };

  StartActivityCommand.prototype._formatShortExtra = function(key, value) {
    var sugared;
    sugared = {
      key: key
    };
    if (value === null) {
      sugared.type = 'null';
    } else if (Array.isArray(value)) {
      throw new Error("Refusing to format array value '" + key + "' using short syntax; empty array would cause unpredictable results due to unknown type. Please use long syntax instead.");
    } else {
      switch (typeof value) {
        case 'string':
          sugared.type = 'string';
          sugared.value = value;
          break;
        case 'boolean':
          sugared.type = 'bool';
          sugared.value = value;
          break;
        case 'number':
          sugared.type = 'int';
          sugared.value = value;
          break;
        case 'object':
          sugared = value;
          sugared.key = key;
      }
    }
    return this._formatLongExtra(sugared);
  };

  StartActivityCommand.prototype._formatLongExtra = function(extra) {
    var args, type;
    args = [];
    if (!extra.type) {
      extra.type = 'string';
    }
    type = EXTRA_TYPES[extra.type];
    if (!type) {
      throw new Error("Unsupported type '" + extra.type + "' for extra '" + extra.key + "'");
    }
    if (extra.type === 'null') {
      args.push("--e" + type);
      args.push(this._escape(extra.key));
    } else if (Array.isArray(extra.value)) {
      args.push("--e" + type + "a");
      args.push(this._escape(extra.key));
      args.push(this._escape(extra.value.join(',')));
    } else {
      args.push("--e" + type);
      args.push(this._escape(extra.key));
      args.push(this._escape(extra.value));
    }
    return args;
  };

  return StartActivityCommand;

})(Command);

module.exports = StartActivityCommand;
