'use strict';

exports.__esModule = true;

var _comment = require('postcss/lib/comment');

var _comment2 = _interopRequireDefault(_comment);

var _parser = require('postcss/lib/parser');

var _parser2 = _interopRequireDefault(_parser);

var _nestedDeclaration = require('./nested-declaration');

var _nestedDeclaration2 = _interopRequireDefault(_nestedDeclaration);

var _scssTokenize = require('./scss-tokenize');

var _scssTokenize2 = _interopRequireDefault(_scssTokenize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ScssParser = function (_Parser) {
    _inherits(ScssParser, _Parser);

    function ScssParser() {
        _classCallCheck(this, ScssParser);

        return _possibleConstructorReturn(this, _Parser.apply(this, arguments));
    }

    ScssParser.prototype.tokenize = function tokenize() {
        this.tokens = (0, _scssTokenize2.default)(this.input);
    };

    ScssParser.prototype.rule = function rule(tokens) {
        var withColon = false;
        var brackets = 0;
        var value = '';
        for (var _iterator = tokens, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
            var _ref;

            if (_isArray) {
                if (_i >= _iterator.length) break;
                _ref = _iterator[_i++];
            } else {
                _i = _iterator.next();
                if (_i.done) break;
                _ref = _i.value;
            }

            var _i2 = _ref;

            if (withColon) {
                if (_i2[0] !== 'comment' && _i2[0] !== '{') {
                    value += _i2[1];
                }
            } else if (_i2[0] === 'space' && _i2[1].indexOf('\n') !== -1) {
                break;
            } else if (_i2[0] === '(') {
                brackets += 1;
            } else if (_i2[0] === ')') {
                brackets -= 1;
            } else if (brackets === 0 && _i2[0] === ':') {
                withColon = true;
            }
        }

        if (!withColon || value.trim() === '' || /^[a-zA-Z-:#]/.test(value)) {
            _Parser.prototype.rule.call(this, tokens);
        } else {

            tokens.pop();
            var node = new _nestedDeclaration2.default();
            this.init(node);

            var last = tokens[tokens.length - 1];
            if (last[4]) {
                node.source.end = { line: last[4], column: last[5] };
            } else {
                node.source.end = { line: last[2], column: last[3] };
            }

            while (tokens[0][0] !== 'word') {
                node.raws.before += tokens.shift()[1];
            }
            node.source.start = { line: tokens[0][2], column: tokens[0][3] };

            node.prop = '';
            while (tokens.length) {
                var type = tokens[0][0];
                if (type === ':' || type === 'space' || type === 'comment') {
                    break;
                }
                node.prop += tokens.shift()[1];
            }

            node.raws.between = '';

            var token = void 0;
            while (tokens.length) {
                token = tokens.shift();

                if (token[0] === ':') {
                    node.raws.between += token[1];
                    break;
                } else {
                    node.raws.between += token[1];
                }
            }

            if (node.prop[0] === '_' || node.prop[0] === '*') {
                node.raws.before += node.prop[0];
                node.prop = node.prop.slice(1);
            }
            node.raws.between += this.spacesFromStart(tokens);
            this.precheckMissedSemicolon(tokens);

            for (var i = tokens.length - 1; i > 0; i--) {
                token = tokens[i];
                if (token[1] === '!important') {
                    node.important = true;
                    var string = this.stringFrom(tokens, i);
                    string = this.spacesFromEnd(tokens) + string;
                    if (string !== ' !important') {
                        node.raws.important = string;
                    }
                    break;
                } else if (token[1] === 'important') {
                    var cache = tokens.slice(0);
                    var str = '';
                    for (var j = i; j > 0; j--) {
                        var _type = cache[j][0];
                        if (str.trim().indexOf('!') === 0 && _type !== 'space') {
                            break;
                        }
                        str = cache.pop()[1] + str;
                    }
                    if (str.trim().indexOf('!') === 0) {
                        node.important = true;
                        node.raws.important = str;
                        tokens = cache;
                    }
                }

                if (token[0] !== 'space' && token[0] !== 'comment') {
                    break;
                }
            }

            this.raw(node, 'value', tokens);

            if (node.value.indexOf(':') !== -1) {
                this.checkMissedSemicolon(tokens);
            }

            this.current = node;
        }
    };

    ScssParser.prototype.comment = function comment(token) {
        if (token[6] === 'inline') {
            var node = new _comment2.default();
            this.init(node, token[2], token[3]);
            node.raws.inline = true;
            node.source.end = { line: token[4], column: token[5] };

            var text = token[1].slice(2);
            if (/^\s*$/.test(text)) {
                node.text = '';
                node.raws.left = text;
                node.raws.right = '';
            } else {
                var match = text.match(/^(\s*)([^]*[^\s])(\s*)$/);
                node.text = match[2];
                node.raws.left = match[1];
                node.raws.right = match[3];
            }
        } else {
            _Parser.prototype.comment.call(this, token);
        }
    };

    return ScssParser;
}(_parser2.default);

exports.default = ScssParser;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNjc3MtcGFyc2VyLmVzNiJdLCJuYW1lcyI6WyJTY3NzUGFyc2VyIiwidG9rZW5pemUiLCJ0b2tlbnMiLCJpbnB1dCIsInJ1bGUiLCJ3aXRoQ29sb24iLCJicmFja2V0cyIsInZhbHVlIiwiaSIsImluZGV4T2YiLCJ0cmltIiwidGVzdCIsInBvcCIsIm5vZGUiLCJpbml0IiwibGFzdCIsImxlbmd0aCIsInNvdXJjZSIsImVuZCIsImxpbmUiLCJjb2x1bW4iLCJyYXdzIiwiYmVmb3JlIiwic2hpZnQiLCJzdGFydCIsInByb3AiLCJ0eXBlIiwiYmV0d2VlbiIsInRva2VuIiwic2xpY2UiLCJzcGFjZXNGcm9tU3RhcnQiLCJwcmVjaGVja01pc3NlZFNlbWljb2xvbiIsImltcG9ydGFudCIsInN0cmluZyIsInN0cmluZ0Zyb20iLCJzcGFjZXNGcm9tRW5kIiwiY2FjaGUiLCJzdHIiLCJqIiwicmF3IiwiY2hlY2tNaXNzZWRTZW1pY29sb24iLCJjdXJyZW50IiwiY29tbWVudCIsImlubGluZSIsInRleHQiLCJsZWZ0IiwicmlnaHQiLCJtYXRjaCJdLCJtYXBwaW5ncyI6Ijs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFFQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUJBLFU7Ozs7Ozs7Ozt5QkFFakJDLFEsdUJBQVc7QUFDUCxhQUFLQyxNQUFMLEdBQWMsNEJBQWMsS0FBS0MsS0FBbkIsQ0FBZDtBQUNILEs7O3lCQUVEQyxJLGlCQUFLRixNLEVBQVE7QUFDVCxZQUFJRyxZQUFZLEtBQWhCO0FBQ0EsWUFBSUMsV0FBWSxDQUFoQjtBQUNBLFlBQUlDLFFBQVksRUFBaEI7QUFDQSw2QkFBZUwsTUFBZixrSEFBd0I7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQUFBLGdCQUFkTSxHQUFjOztBQUNwQixnQkFBS0gsU0FBTCxFQUFpQjtBQUNiLG9CQUFLRyxJQUFFLENBQUYsTUFBUyxTQUFULElBQXNCQSxJQUFFLENBQUYsTUFBUyxHQUFwQyxFQUEwQztBQUN0Q0QsNkJBQVNDLElBQUUsQ0FBRixDQUFUO0FBQ0g7QUFDSixhQUpELE1BSU8sSUFBS0EsSUFBRSxDQUFGLE1BQVMsT0FBVCxJQUFvQkEsSUFBRSxDQUFGLEVBQUtDLE9BQUwsQ0FBYSxJQUFiLE1BQXVCLENBQUMsQ0FBakQsRUFBcUQ7QUFDeEQ7QUFDSCxhQUZNLE1BRUEsSUFBS0QsSUFBRSxDQUFGLE1BQVMsR0FBZCxFQUFvQjtBQUN2QkYsNEJBQVksQ0FBWjtBQUNILGFBRk0sTUFFQSxJQUFLRSxJQUFFLENBQUYsTUFBUyxHQUFkLEVBQW9CO0FBQ3ZCRiw0QkFBWSxDQUFaO0FBQ0gsYUFGTSxNQUVBLElBQUtBLGFBQWEsQ0FBYixJQUFrQkUsSUFBRSxDQUFGLE1BQVMsR0FBaEMsRUFBc0M7QUFDekNILDRCQUFZLElBQVo7QUFDSDtBQUNKOztBQUVELFlBQUssQ0FBQ0EsU0FBRCxJQUFjRSxNQUFNRyxJQUFOLE9BQWlCLEVBQS9CLElBQXFDLGVBQWVDLElBQWYsQ0FBb0JKLEtBQXBCLENBQTFDLEVBQXVFO0FBQ25FLDhCQUFNSCxJQUFOLFlBQVdGLE1BQVg7QUFDSCxTQUZELE1BRU87O0FBRUhBLG1CQUFPVSxHQUFQO0FBQ0EsZ0JBQUlDLE9BQU8saUNBQVg7QUFDQSxpQkFBS0MsSUFBTCxDQUFVRCxJQUFWOztBQUVBLGdCQUFJRSxPQUFPYixPQUFPQSxPQUFPYyxNQUFQLEdBQWdCLENBQXZCLENBQVg7QUFDQSxnQkFBSUQsS0FBSyxDQUFMLENBQUosRUFBYTtBQUNURixxQkFBS0ksTUFBTCxDQUFZQyxHQUFaLEdBQWtCLEVBQUVDLE1BQU1KLEtBQUssQ0FBTCxDQUFSLEVBQWlCSyxRQUFRTCxLQUFLLENBQUwsQ0FBekIsRUFBbEI7QUFDSCxhQUZELE1BRU87QUFDSEYscUJBQUtJLE1BQUwsQ0FBWUMsR0FBWixHQUFrQixFQUFFQyxNQUFNSixLQUFLLENBQUwsQ0FBUixFQUFpQkssUUFBUUwsS0FBSyxDQUFMLENBQXpCLEVBQWxCO0FBQ0g7O0FBRUQsbUJBQU9iLE9BQU8sQ0FBUCxFQUFVLENBQVYsTUFBaUIsTUFBeEIsRUFBZ0M7QUFDNUJXLHFCQUFLUSxJQUFMLENBQVVDLE1BQVYsSUFBb0JwQixPQUFPcUIsS0FBUCxHQUFlLENBQWYsQ0FBcEI7QUFDSDtBQUNEVixpQkFBS0ksTUFBTCxDQUFZTyxLQUFaLEdBQW9CLEVBQUVMLE1BQU1qQixPQUFPLENBQVAsRUFBVSxDQUFWLENBQVIsRUFBc0JrQixRQUFRbEIsT0FBTyxDQUFQLEVBQVUsQ0FBVixDQUE5QixFQUFwQjs7QUFFQVcsaUJBQUtZLElBQUwsR0FBWSxFQUFaO0FBQ0EsbUJBQU92QixPQUFPYyxNQUFkLEVBQXNCO0FBQ2xCLG9CQUFJVSxPQUFPeEIsT0FBTyxDQUFQLEVBQVUsQ0FBVixDQUFYO0FBQ0Esb0JBQUl3QixTQUFTLEdBQVQsSUFBZ0JBLFNBQVMsT0FBekIsSUFBb0NBLFNBQVMsU0FBakQsRUFBNEQ7QUFDeEQ7QUFDSDtBQUNEYixxQkFBS1ksSUFBTCxJQUFhdkIsT0FBT3FCLEtBQVAsR0FBZSxDQUFmLENBQWI7QUFDSDs7QUFFRFYsaUJBQUtRLElBQUwsQ0FBVU0sT0FBVixHQUFvQixFQUFwQjs7QUFFQSxnQkFBSUMsY0FBSjtBQUNBLG1CQUFPMUIsT0FBT2MsTUFBZCxFQUFzQjtBQUNsQlksd0JBQVExQixPQUFPcUIsS0FBUCxFQUFSOztBQUVBLG9CQUFJSyxNQUFNLENBQU4sTUFBYSxHQUFqQixFQUFzQjtBQUNsQmYseUJBQUtRLElBQUwsQ0FBVU0sT0FBVixJQUFxQkMsTUFBTSxDQUFOLENBQXJCO0FBQ0E7QUFDSCxpQkFIRCxNQUdPO0FBQ0hmLHlCQUFLUSxJQUFMLENBQVVNLE9BQVYsSUFBcUJDLE1BQU0sQ0FBTixDQUFyQjtBQUNIO0FBQ0o7O0FBRUQsZ0JBQUlmLEtBQUtZLElBQUwsQ0FBVSxDQUFWLE1BQWlCLEdBQWpCLElBQXdCWixLQUFLWSxJQUFMLENBQVUsQ0FBVixNQUFpQixHQUE3QyxFQUFrRDtBQUM5Q1oscUJBQUtRLElBQUwsQ0FBVUMsTUFBVixJQUFvQlQsS0FBS1ksSUFBTCxDQUFVLENBQVYsQ0FBcEI7QUFDQVoscUJBQUtZLElBQUwsR0FBWVosS0FBS1ksSUFBTCxDQUFVSSxLQUFWLENBQWdCLENBQWhCLENBQVo7QUFDSDtBQUNEaEIsaUJBQUtRLElBQUwsQ0FBVU0sT0FBVixJQUFxQixLQUFLRyxlQUFMLENBQXFCNUIsTUFBckIsQ0FBckI7QUFDQSxpQkFBSzZCLHVCQUFMLENBQTZCN0IsTUFBN0I7O0FBRUEsaUJBQUssSUFBSU0sSUFBSU4sT0FBT2MsTUFBUCxHQUFnQixDQUE3QixFQUFnQ1IsSUFBSSxDQUFwQyxFQUF1Q0EsR0FBdkMsRUFBNEM7QUFDeENvQix3QkFBUTFCLE9BQU9NLENBQVAsQ0FBUjtBQUNBLG9CQUFJb0IsTUFBTSxDQUFOLE1BQWEsWUFBakIsRUFBK0I7QUFDM0JmLHlCQUFLbUIsU0FBTCxHQUFpQixJQUFqQjtBQUNBLHdCQUFJQyxTQUFTLEtBQUtDLFVBQUwsQ0FBZ0JoQyxNQUFoQixFQUF3Qk0sQ0FBeEIsQ0FBYjtBQUNBeUIsNkJBQVMsS0FBS0UsYUFBTCxDQUFtQmpDLE1BQW5CLElBQTZCK0IsTUFBdEM7QUFDQSx3QkFBSUEsV0FBVyxhQUFmLEVBQThCO0FBQzFCcEIsNkJBQUtRLElBQUwsQ0FBVVcsU0FBVixHQUFzQkMsTUFBdEI7QUFDSDtBQUNEO0FBRUgsaUJBVEQsTUFTTyxJQUFJTCxNQUFNLENBQU4sTUFBYSxXQUFqQixFQUE4QjtBQUNqQyx3QkFBSVEsUUFBUWxDLE9BQU8yQixLQUFQLENBQWEsQ0FBYixDQUFaO0FBQ0Esd0JBQUlRLE1BQVEsRUFBWjtBQUNBLHlCQUFLLElBQUlDLElBQUk5QixDQUFiLEVBQWdCOEIsSUFBSSxDQUFwQixFQUF1QkEsR0FBdkIsRUFBNEI7QUFDeEIsNEJBQUlaLFFBQU9VLE1BQU1FLENBQU4sRUFBUyxDQUFULENBQVg7QUFDQSw0QkFBSUQsSUFBSTNCLElBQUosR0FBV0QsT0FBWCxDQUFtQixHQUFuQixNQUE0QixDQUE1QixJQUNBaUIsVUFBUyxPQURiLEVBRUU7QUFDRTtBQUNIO0FBQ0RXLDhCQUFNRCxNQUFNeEIsR0FBTixHQUFZLENBQVosSUFBaUJ5QixHQUF2QjtBQUNIO0FBQ0Qsd0JBQUlBLElBQUkzQixJQUFKLEdBQVdELE9BQVgsQ0FBbUIsR0FBbkIsTUFBNEIsQ0FBaEMsRUFBbUM7QUFDL0JJLDZCQUFLbUIsU0FBTCxHQUFpQixJQUFqQjtBQUNBbkIsNkJBQUtRLElBQUwsQ0FBVVcsU0FBVixHQUFzQkssR0FBdEI7QUFDQW5DLGlDQUFTa0MsS0FBVDtBQUNIO0FBQ0o7O0FBRUQsb0JBQUlSLE1BQU0sQ0FBTixNQUFhLE9BQWIsSUFBd0JBLE1BQU0sQ0FBTixNQUFhLFNBQXpDLEVBQW9EO0FBQ2hEO0FBQ0g7QUFDSjs7QUFFRCxpQkFBS1csR0FBTCxDQUFTMUIsSUFBVCxFQUFlLE9BQWYsRUFBd0JYLE1BQXhCOztBQUVBLGdCQUFJVyxLQUFLTixLQUFMLENBQVdFLE9BQVgsQ0FBbUIsR0FBbkIsTUFBNEIsQ0FBQyxDQUFqQyxFQUFvQztBQUNoQyxxQkFBSytCLG9CQUFMLENBQTBCdEMsTUFBMUI7QUFDSDs7QUFFRCxpQkFBS3VDLE9BQUwsR0FBZTVCLElBQWY7QUFDSDtBQUNKLEs7O3lCQUVENkIsTyxvQkFBUWQsSyxFQUFPO0FBQ1gsWUFBSUEsTUFBTSxDQUFOLE1BQWEsUUFBakIsRUFBMkI7QUFDdkIsZ0JBQUlmLE9BQU8sdUJBQVg7QUFDQSxpQkFBS0MsSUFBTCxDQUFVRCxJQUFWLEVBQWdCZSxNQUFNLENBQU4sQ0FBaEIsRUFBMEJBLE1BQU0sQ0FBTixDQUExQjtBQUNBZixpQkFBS1EsSUFBTCxDQUFVc0IsTUFBVixHQUFtQixJQUFuQjtBQUNBOUIsaUJBQUtJLE1BQUwsQ0FBWUMsR0FBWixHQUFtQixFQUFFQyxNQUFNUyxNQUFNLENBQU4sQ0FBUixFQUFrQlIsUUFBUVEsTUFBTSxDQUFOLENBQTFCLEVBQW5COztBQUVBLGdCQUFJZ0IsT0FBT2hCLE1BQU0sQ0FBTixFQUFTQyxLQUFULENBQWUsQ0FBZixDQUFYO0FBQ0EsZ0JBQUksUUFBUWxCLElBQVIsQ0FBYWlDLElBQWIsQ0FBSixFQUF3QjtBQUNwQi9CLHFCQUFLK0IsSUFBTCxHQUFrQixFQUFsQjtBQUNBL0IscUJBQUtRLElBQUwsQ0FBVXdCLElBQVYsR0FBa0JELElBQWxCO0FBQ0EvQixxQkFBS1EsSUFBTCxDQUFVeUIsS0FBVixHQUFrQixFQUFsQjtBQUNILGFBSkQsTUFJTztBQUNILG9CQUFJQyxRQUFRSCxLQUFLRyxLQUFMLENBQVcseUJBQVgsQ0FBWjtBQUNBbEMscUJBQUsrQixJQUFMLEdBQWtCRyxNQUFNLENBQU4sQ0FBbEI7QUFDQWxDLHFCQUFLUSxJQUFMLENBQVV3QixJQUFWLEdBQWtCRSxNQUFNLENBQU4sQ0FBbEI7QUFDQWxDLHFCQUFLUSxJQUFMLENBQVV5QixLQUFWLEdBQWtCQyxNQUFNLENBQU4sQ0FBbEI7QUFDSDtBQUNKLFNBakJELE1BaUJPO0FBQ0gsOEJBQU1MLE9BQU4sWUFBY2QsS0FBZDtBQUNIO0FBQ0osSzs7Ozs7a0JBOUlnQjVCLFUiLCJmaWxlIjoic2Nzcy1wYXJzZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQ29tbWVudCBmcm9tICdwb3N0Y3NzL2xpYi9jb21tZW50JztcbmltcG9ydCBQYXJzZXIgIGZyb20gJ3Bvc3Rjc3MvbGliL3BhcnNlcic7XG5cbmltcG9ydCBOZXN0ZWREZWNsYXJhdGlvbiBmcm9tICcuL25lc3RlZC1kZWNsYXJhdGlvbic7XG5pbXBvcnQgc2Nzc1Rva2VuaXplciAgICAgZnJvbSAnLi9zY3NzLXRva2VuaXplJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2Nzc1BhcnNlciBleHRlbmRzIFBhcnNlciB7XG5cbiAgICB0b2tlbml6ZSgpIHtcbiAgICAgICAgdGhpcy50b2tlbnMgPSBzY3NzVG9rZW5pemVyKHRoaXMuaW5wdXQpO1xuICAgIH1cblxuICAgIHJ1bGUodG9rZW5zKSB7XG4gICAgICAgIGxldCB3aXRoQ29sb24gPSBmYWxzZTtcbiAgICAgICAgbGV0IGJyYWNrZXRzICA9IDA7XG4gICAgICAgIGxldCB2YWx1ZSAgICAgPSAnJztcbiAgICAgICAgZm9yICggbGV0IGkgb2YgdG9rZW5zICkge1xuICAgICAgICAgICAgaWYgKCB3aXRoQ29sb24gKSB7XG4gICAgICAgICAgICAgICAgaWYgKCBpWzBdICE9PSAnY29tbWVudCcgJiYgaVswXSAhPT0gJ3snICkge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZSArPSBpWzFdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSBpZiAoIGlbMF0gPT09ICdzcGFjZScgJiYgaVsxXS5pbmRleE9mKCdcXG4nKSAhPT0gLTEgKSB7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKCBpWzBdID09PSAnKCcgKSB7XG4gICAgICAgICAgICAgICAgYnJhY2tldHMgKz0gMTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoIGlbMF0gPT09ICcpJyApIHtcbiAgICAgICAgICAgICAgICBicmFja2V0cyAtPSAxO1xuICAgICAgICAgICAgfSBlbHNlIGlmICggYnJhY2tldHMgPT09IDAgJiYgaVswXSA9PT0gJzonICkge1xuICAgICAgICAgICAgICAgIHdpdGhDb2xvbiA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoICF3aXRoQ29sb24gfHwgdmFsdWUudHJpbSgpID09PSAnJyB8fCAvXlthLXpBLVotOiNdLy50ZXN0KHZhbHVlKSApIHtcbiAgICAgICAgICAgIHN1cGVyLnJ1bGUodG9rZW5zKTtcbiAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgdG9rZW5zLnBvcCgpO1xuICAgICAgICAgICAgbGV0IG5vZGUgPSBuZXcgTmVzdGVkRGVjbGFyYXRpb24oKTtcbiAgICAgICAgICAgIHRoaXMuaW5pdChub2RlKTtcblxuICAgICAgICAgICAgbGV0IGxhc3QgPSB0b2tlbnNbdG9rZW5zLmxlbmd0aCAtIDFdO1xuICAgICAgICAgICAgaWYgKGxhc3RbNF0pIHtcbiAgICAgICAgICAgICAgICBub2RlLnNvdXJjZS5lbmQgPSB7IGxpbmU6IGxhc3RbNF0sIGNvbHVtbjogbGFzdFs1XSB9O1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBub2RlLnNvdXJjZS5lbmQgPSB7IGxpbmU6IGxhc3RbMl0sIGNvbHVtbjogbGFzdFszXSB9O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB3aGlsZSAodG9rZW5zWzBdWzBdICE9PSAnd29yZCcpIHtcbiAgICAgICAgICAgICAgICBub2RlLnJhd3MuYmVmb3JlICs9IHRva2Vucy5zaGlmdCgpWzFdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbm9kZS5zb3VyY2Uuc3RhcnQgPSB7IGxpbmU6IHRva2Vuc1swXVsyXSwgY29sdW1uOiB0b2tlbnNbMF1bM10gfTtcblxuICAgICAgICAgICAgbm9kZS5wcm9wID0gJyc7XG4gICAgICAgICAgICB3aGlsZSAodG9rZW5zLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGxldCB0eXBlID0gdG9rZW5zWzBdWzBdO1xuICAgICAgICAgICAgICAgIGlmICh0eXBlID09PSAnOicgfHwgdHlwZSA9PT0gJ3NwYWNlJyB8fCB0eXBlID09PSAnY29tbWVudCcpIHtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIG5vZGUucHJvcCArPSB0b2tlbnMuc2hpZnQoKVsxXTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbm9kZS5yYXdzLmJldHdlZW4gPSAnJztcblxuICAgICAgICAgICAgbGV0IHRva2VuO1xuICAgICAgICAgICAgd2hpbGUgKHRva2Vucy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA9IHRva2Vucy5zaGlmdCgpO1xuXG4gICAgICAgICAgICAgICAgaWYgKHRva2VuWzBdID09PSAnOicpIHtcbiAgICAgICAgICAgICAgICAgICAgbm9kZS5yYXdzLmJldHdlZW4gKz0gdG9rZW5bMV07XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIG5vZGUucmF3cy5iZXR3ZWVuICs9IHRva2VuWzFdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKG5vZGUucHJvcFswXSA9PT0gJ18nIHx8IG5vZGUucHJvcFswXSA9PT0gJyonKSB7XG4gICAgICAgICAgICAgICAgbm9kZS5yYXdzLmJlZm9yZSArPSBub2RlLnByb3BbMF07XG4gICAgICAgICAgICAgICAgbm9kZS5wcm9wID0gbm9kZS5wcm9wLnNsaWNlKDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbm9kZS5yYXdzLmJldHdlZW4gKz0gdGhpcy5zcGFjZXNGcm9tU3RhcnQodG9rZW5zKTtcbiAgICAgICAgICAgIHRoaXMucHJlY2hlY2tNaXNzZWRTZW1pY29sb24odG9rZW5zKTtcblxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IHRva2Vucy5sZW5ndGggLSAxOyBpID4gMDsgaS0tKSB7XG4gICAgICAgICAgICAgICAgdG9rZW4gPSB0b2tlbnNbaV07XG4gICAgICAgICAgICAgICAgaWYgKHRva2VuWzFdID09PSAnIWltcG9ydGFudCcpIHtcbiAgICAgICAgICAgICAgICAgICAgbm9kZS5pbXBvcnRhbnQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBsZXQgc3RyaW5nID0gdGhpcy5zdHJpbmdGcm9tKHRva2VucywgaSk7XG4gICAgICAgICAgICAgICAgICAgIHN0cmluZyA9IHRoaXMuc3BhY2VzRnJvbUVuZCh0b2tlbnMpICsgc3RyaW5nO1xuICAgICAgICAgICAgICAgICAgICBpZiAoc3RyaW5nICE9PSAnICFpbXBvcnRhbnQnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBub2RlLnJhd3MuaW1wb3J0YW50ID0gc3RyaW5nO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0b2tlblsxXSA9PT0gJ2ltcG9ydGFudCcpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNhY2hlID0gdG9rZW5zLnNsaWNlKDApO1xuICAgICAgICAgICAgICAgICAgICBsZXQgc3RyICAgPSAnJztcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IGk7IGogPiAwOyBqLS0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCB0eXBlID0gY2FjaGVbal1bMF07XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3RyLnRyaW0oKS5pbmRleE9mKCchJykgPT09IDAgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlICE9PSAnc3BhY2UnXG4gICAgICAgICAgICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHN0ciA9IGNhY2hlLnBvcCgpWzFdICsgc3RyO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChzdHIudHJpbSgpLmluZGV4T2YoJyEnKSA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS5pbXBvcnRhbnQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS5yYXdzLmltcG9ydGFudCA9IHN0cjtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRva2VucyA9IGNhY2hlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKHRva2VuWzBdICE9PSAnc3BhY2UnICYmIHRva2VuWzBdICE9PSAnY29tbWVudCcpIHtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLnJhdyhub2RlLCAndmFsdWUnLCB0b2tlbnMpO1xuXG4gICAgICAgICAgICBpZiAobm9kZS52YWx1ZS5pbmRleE9mKCc6JykgIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jaGVja01pc3NlZFNlbWljb2xvbih0b2tlbnMpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnQgPSBub2RlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29tbWVudCh0b2tlbikge1xuICAgICAgICBpZiAodG9rZW5bNl0gPT09ICdpbmxpbmUnKSB7XG4gICAgICAgICAgICBsZXQgbm9kZSA9IG5ldyBDb21tZW50KCk7XG4gICAgICAgICAgICB0aGlzLmluaXQobm9kZSwgdG9rZW5bMl0sIHRva2VuWzNdKTtcbiAgICAgICAgICAgIG5vZGUucmF3cy5pbmxpbmUgPSB0cnVlO1xuICAgICAgICAgICAgbm9kZS5zb3VyY2UuZW5kICA9IHsgbGluZTogdG9rZW5bNF0sIGNvbHVtbjogdG9rZW5bNV0gfTtcblxuICAgICAgICAgICAgbGV0IHRleHQgPSB0b2tlblsxXS5zbGljZSgyKTtcbiAgICAgICAgICAgIGlmICgvXlxccyokLy50ZXN0KHRleHQpKSB7XG4gICAgICAgICAgICAgICAgbm9kZS50ZXh0ICAgICAgID0gJyc7XG4gICAgICAgICAgICAgICAgbm9kZS5yYXdzLmxlZnQgID0gdGV4dDtcbiAgICAgICAgICAgICAgICBub2RlLnJhd3MucmlnaHQgPSAnJztcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbGV0IG1hdGNoID0gdGV4dC5tYXRjaCgvXihcXHMqKShbXl0qW15cXHNdKShcXHMqKSQvKTtcbiAgICAgICAgICAgICAgICBub2RlLnRleHQgICAgICAgPSBtYXRjaFsyXTtcbiAgICAgICAgICAgICAgICBub2RlLnJhd3MubGVmdCAgPSBtYXRjaFsxXTtcbiAgICAgICAgICAgICAgICBub2RlLnJhd3MucmlnaHQgPSBtYXRjaFszXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHN1cGVyLmNvbW1lbnQodG9rZW4pO1xuICAgICAgICB9XG4gICAgfVxuXG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
