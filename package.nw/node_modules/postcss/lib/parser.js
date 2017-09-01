'use strict';

exports.__esModule = true;

var _declaration = require('./declaration');

var _declaration2 = _interopRequireDefault(_declaration);

var _tokenize = require('./tokenize');

var _tokenize2 = _interopRequireDefault(_tokenize);

var _comment = require('./comment');

var _comment2 = _interopRequireDefault(_comment);

var _atRule = require('./at-rule');

var _atRule2 = _interopRequireDefault(_atRule);

var _root = require('./root');

var _root2 = _interopRequireDefault(_root);

var _rule = require('./rule');

var _rule2 = _interopRequireDefault(_rule);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Parser = function () {
    function Parser(input) {
        _classCallCheck(this, Parser);

        this.input = input;

        this.root = new _root2.default();
        this.current = this.root;
        this.spaces = '';
        this.semicolon = false;

        this.createTokenizer();
        this.root.source = { input: input, start: { line: 1, column: 1 } };
    }

    Parser.prototype.createTokenizer = function createTokenizer() {
        this.tokenizer = (0, _tokenize2.default)(this.input);
    };

    Parser.prototype.parse = function parse() {
        var token = void 0;
        while (!this.tokenizer.endOfFile()) {
            token = this.tokenizer.nextToken();

            switch (token[0]) {

                case 'space':
                    this.spaces += token[1];
                    break;

                case ';':
                    this.freeSemicolon(token);
                    break;

                case '}':
                    this.end(token);
                    break;

                case 'comment':
                    this.comment(token);
                    break;

                case 'at-word':
                    this.atrule(token);
                    break;

                case '{':
                    this.emptyRule(token);
                    break;

                default:
                    this.other(token);
                    break;
            }
        }
        this.endFile();
    };

    Parser.prototype.comment = function comment(token) {
        var node = new _comment2.default();
        this.init(node, token[2], token[3]);
        node.source.end = { line: token[4], column: token[5] };

        var text = token[1].slice(2, -2);
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
    };

    Parser.prototype.emptyRule = function emptyRule(token) {
        var node = new _rule2.default();
        this.init(node, token[2], token[3]);
        node.selector = '';
        node.raws.between = '';
        this.current = node;
    };

    Parser.prototype.other = function other(start) {
        var end = false;
        var type = null;
        var colon = false;
        var bracket = null;
        var brackets = [];

        var tokens = [];
        var token = start;
        while (token) {
            type = token[0];
            tokens.push(token);

            if (type === '(' || type === '[') {
                if (!bracket) bracket = token;
                brackets.push(type === '(' ? ')' : ']');
            } else if (brackets.length === 0) {
                if (type === ';') {
                    if (colon) {
                        this.decl(tokens);
                        return;
                    } else {
                        break;
                    }
                } else if (type === '{') {
                    this.rule(tokens);
                    return;
                } else if (type === '}') {
                    this.tokenizer.back(tokens.pop());
                    end = true;
                    break;
                } else if (type === ':') {
                    colon = true;
                }
            } else if (type === brackets[brackets.length - 1]) {
                brackets.pop();
                if (brackets.length === 0) bracket = null;
            }

            token = this.tokenizer.nextToken();
        }

        if (this.tokenizer.endOfFile()) end = true;
        if (brackets.length > 0) this.unclosedBracket(bracket);

        if (end && colon) {
            while (tokens.length) {
                token = tokens[tokens.length - 1][0];
                if (token !== 'space' && token !== 'comment') break;
                this.tokenizer.back(tokens.pop());
            }
            this.decl(tokens);
            return;
        } else {
            this.unknownWord(tokens);
        }
    };

    Parser.prototype.rule = function rule(tokens) {
        tokens.pop();

        var node = new _rule2.default();
        this.init(node, tokens[0][2], tokens[0][3]);

        node.raws.between = this.spacesAndCommentsFromEnd(tokens);
        this.raw(node, 'selector', tokens);
        this.current = node;
    };

    Parser.prototype.decl = function decl(tokens) {
        var node = new _declaration2.default();
        this.init(node);

        var last = tokens[tokens.length - 1];
        if (last[0] === ';') {
            this.semicolon = true;
            tokens.pop();
        }
        if (last[4]) {
            node.source.end = { line: last[4], column: last[5] };
        } else {
            node.source.end = { line: last[2], column: last[3] };
        }

        while (tokens[0][0] !== 'word') {
            if (tokens.length === 1) this.unknownWord(tokens);
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
        node.raws.between += this.spacesAndCommentsFromStart(tokens);
        this.precheckMissedSemicolon(tokens);

        for (var i = tokens.length - 1; i > 0; i--) {
            token = tokens[i];
            if (token[1] === '!important') {
                node.important = true;
                var string = this.stringFrom(tokens, i);
                string = this.spacesFromEnd(tokens) + string;
                if (string !== ' !important') node.raws.important = string;
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

        if (node.value.indexOf(':') !== -1) this.checkMissedSemicolon(tokens);
    };

    Parser.prototype.atrule = function atrule(token) {
        var node = new _atRule2.default();
        node.name = token[1].slice(1);
        if (node.name === '') {
            this.unnamedAtrule(node, token);
        }
        this.init(node, token[2], token[3]);

        var prev = void 0;
        var shift = void 0;
        var last = false;
        var open = false;
        var params = [];

        while (!this.tokenizer.endOfFile()) {
            token = this.tokenizer.nextToken();

            if (token[0] === ';') {
                node.source.end = { line: token[2], column: token[3] };
                this.semicolon = true;
                break;
            } else if (token[0] === '{') {
                open = true;
                break;
            } else if (token[0] === '}') {
                if (params.length > 0) {
                    shift = params.length - 1;
                    prev = params[shift];
                    while (prev && prev[0] === 'space') {
                        prev = params[--shift];
                    }
                    if (prev) {
                        node.source.end = { line: prev[4], column: prev[5] };
                    }
                }
                this.end(token);
                break;
            } else {
                params.push(token);
            }

            if (this.tokenizer.endOfFile()) {
                last = true;
                break;
            }
        }

        node.raws.between = this.spacesAndCommentsFromEnd(params);
        if (params.length) {
            node.raws.afterName = this.spacesAndCommentsFromStart(params);
            this.raw(node, 'params', params);
            if (last) {
                token = params[params.length - 1];
                node.source.end = { line: token[4], column: token[5] };
                this.spaces = node.raws.between;
                node.raws.between = '';
            }
        } else {
            node.raws.afterName = '';
            node.params = '';
        }

        if (open) {
            node.nodes = [];
            this.current = node;
        }
    };

    Parser.prototype.end = function end(token) {
        if (this.current.nodes && this.current.nodes.length) {
            this.current.raws.semicolon = this.semicolon;
        }
        this.semicolon = false;

        this.current.raws.after = (this.current.raws.after || '') + this.spaces;
        this.spaces = '';

        if (this.current.parent) {
            this.current.source.end = { line: token[2], column: token[3] };
            this.current = this.current.parent;
        } else {
            this.unexpectedClose(token);
        }
    };

    Parser.prototype.endFile = function endFile() {
        if (this.current.parent) this.unclosedBlock();
        if (this.current.nodes && this.current.nodes.length) {
            this.current.raws.semicolon = this.semicolon;
        }
        this.current.raws.after = (this.current.raws.after || '') + this.spaces;
    };

    Parser.prototype.freeSemicolon = function freeSemicolon(token) {
        this.spaces += token[1];
        if (this.current.nodes) {
            var prev = this.current.nodes[this.current.nodes.length - 1];
            if (prev && prev.type === 'rule' && !prev.raws.ownSemicolon) {
                prev.raws.ownSemicolon = this.spaces;
                this.spaces = '';
            }
        }
    };

    // Helpers

    Parser.prototype.init = function init(node, line, column) {
        this.current.push(node);

        node.source = { start: { line: line, column: column }, input: this.input };
        node.raws.before = this.spaces;
        this.spaces = '';
        if (node.type !== 'comment') this.semicolon = false;
    };

    Parser.prototype.raw = function raw(node, prop, tokens) {
        var token = void 0,
            type = void 0;
        var length = tokens.length;
        var value = '';
        var clean = true;
        for (var i = 0; i < length; i += 1) {
            token = tokens[i];
            type = token[0];
            if (type === 'comment' || type === 'space' && i === length - 1) {
                clean = false;
            } else {
                value += token[1];
            }
        }
        if (!clean) {
            var raw = tokens.reduce(function (all, i) {
                return all + i[1];
            }, '');
            node.raws[prop] = { value: value, raw: raw };
        }
        node[prop] = value;
    };

    Parser.prototype.spacesAndCommentsFromEnd = function spacesAndCommentsFromEnd(tokens) {
        var lastTokenType = void 0;
        var spaces = '';
        while (tokens.length) {
            lastTokenType = tokens[tokens.length - 1][0];
            if (lastTokenType !== 'space' && lastTokenType !== 'comment') break;
            spaces = tokens.pop()[1] + spaces;
        }
        return spaces;
    };

    Parser.prototype.spacesAndCommentsFromStart = function spacesAndCommentsFromStart(tokens) {
        var next = void 0;
        var spaces = '';
        while (tokens.length) {
            next = tokens[0][0];
            if (next !== 'space' && next !== 'comment') break;
            spaces += tokens.shift()[1];
        }
        return spaces;
    };

    Parser.prototype.spacesFromEnd = function spacesFromEnd(tokens) {
        var lastTokenType = void 0;
        var spaces = '';
        while (tokens.length) {
            lastTokenType = tokens[tokens.length - 1][0];
            if (lastTokenType !== 'space') break;
            spaces = tokens.pop()[1] + spaces;
        }
        return spaces;
    };

    Parser.prototype.stringFrom = function stringFrom(tokens, from) {
        var result = '';
        for (var i = from; i < tokens.length; i++) {
            result += tokens[i][1];
        }
        tokens.splice(from, tokens.length - from);
        return result;
    };

    Parser.prototype.colon = function colon(tokens) {
        var brackets = 0;
        var token = void 0,
            type = void 0,
            prev = void 0;
        for (var i = 0; i < tokens.length; i++) {
            token = tokens[i];
            type = token[0];

            if (type === '(') {
                brackets += 1;
            } else if (type === ')') {
                brackets -= 1;
            } else if (brackets === 0 && type === ':') {
                if (!prev) {
                    this.doubleColon(token);
                } else if (prev[0] === 'word' && prev[1] === 'progid') {
                    continue;
                } else {
                    return i;
                }
            }

            prev = token;
        }
        return false;
    };

    // Errors

    Parser.prototype.unclosedBracket = function unclosedBracket(bracket) {
        throw this.input.error('Unclosed bracket', bracket[2], bracket[3]);
    };

    Parser.prototype.unknownWord = function unknownWord(tokens) {
        throw this.input.error('Unknown word', tokens[0][2], tokens[0][3]);
    };

    Parser.prototype.unexpectedClose = function unexpectedClose(token) {
        throw this.input.error('Unexpected }', token[2], token[3]);
    };

    Parser.prototype.unclosedBlock = function unclosedBlock() {
        var pos = this.current.source.start;
        throw this.input.error('Unclosed block', pos.line, pos.column);
    };

    Parser.prototype.doubleColon = function doubleColon(token) {
        throw this.input.error('Double colon', token[2], token[3]);
    };

    Parser.prototype.unnamedAtrule = function unnamedAtrule(node, token) {
        throw this.input.error('At-rule without name', token[2], token[3]);
    };

    Parser.prototype.precheckMissedSemicolon = function precheckMissedSemicolon(tokens) {
        // Hook for Safe Parser
        tokens;
    };

    Parser.prototype.checkMissedSemicolon = function checkMissedSemicolon(tokens) {
        var colon = this.colon(tokens);
        if (colon === false) return;

        var founded = 0;
        var token = void 0;
        for (var j = colon - 1; j >= 0; j--) {
            token = tokens[j];
            if (token[0] !== 'space') {
                founded += 1;
                if (founded === 2) break;
            }
        }
        throw this.input.error('Missed semicolon', token[2], token[3]);
    };

    return Parser;
}();

exports.default = Parser;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhcnNlci5lczYiXSwibmFtZXMiOlsiUGFyc2VyIiwiaW5wdXQiLCJyb290IiwiY3VycmVudCIsInNwYWNlcyIsInNlbWljb2xvbiIsImNyZWF0ZVRva2VuaXplciIsInNvdXJjZSIsInN0YXJ0IiwibGluZSIsImNvbHVtbiIsInRva2VuaXplciIsInBhcnNlIiwidG9rZW4iLCJlbmRPZkZpbGUiLCJuZXh0VG9rZW4iLCJmcmVlU2VtaWNvbG9uIiwiZW5kIiwiY29tbWVudCIsImF0cnVsZSIsImVtcHR5UnVsZSIsIm90aGVyIiwiZW5kRmlsZSIsIm5vZGUiLCJpbml0IiwidGV4dCIsInNsaWNlIiwidGVzdCIsInJhd3MiLCJsZWZ0IiwicmlnaHQiLCJtYXRjaCIsInNlbGVjdG9yIiwiYmV0d2VlbiIsInR5cGUiLCJjb2xvbiIsImJyYWNrZXQiLCJicmFja2V0cyIsInRva2VucyIsInB1c2giLCJsZW5ndGgiLCJkZWNsIiwicnVsZSIsImJhY2siLCJwb3AiLCJ1bmNsb3NlZEJyYWNrZXQiLCJ1bmtub3duV29yZCIsInNwYWNlc0FuZENvbW1lbnRzRnJvbUVuZCIsInJhdyIsImxhc3QiLCJiZWZvcmUiLCJzaGlmdCIsInByb3AiLCJzcGFjZXNBbmRDb21tZW50c0Zyb21TdGFydCIsInByZWNoZWNrTWlzc2VkU2VtaWNvbG9uIiwiaSIsImltcG9ydGFudCIsInN0cmluZyIsInN0cmluZ0Zyb20iLCJzcGFjZXNGcm9tRW5kIiwiY2FjaGUiLCJzdHIiLCJqIiwidHJpbSIsImluZGV4T2YiLCJ2YWx1ZSIsImNoZWNrTWlzc2VkU2VtaWNvbG9uIiwibmFtZSIsInVubmFtZWRBdHJ1bGUiLCJwcmV2Iiwib3BlbiIsInBhcmFtcyIsImFmdGVyTmFtZSIsIm5vZGVzIiwiYWZ0ZXIiLCJwYXJlbnQiLCJ1bmV4cGVjdGVkQ2xvc2UiLCJ1bmNsb3NlZEJsb2NrIiwib3duU2VtaWNvbG9uIiwiY2xlYW4iLCJyZWR1Y2UiLCJhbGwiLCJsYXN0VG9rZW5UeXBlIiwibmV4dCIs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dUI7O0FBRXZCLFlBQUl1RCxVQUFVLENBQWQ7QUFDQSxZQUFJN0UsY0FBSjtBQUNBLGFBQU0sSUFBSWlELElBQUkzQixRQUFRLENBQXRCLEVBQXlCMkIsS0FBSyxDQUE5QixFQUFpQ0EsR0FBakMsRUFBdUM7QUFDbkNqRCxvQkFBUXlCLE9BQU93QixDQUFQLENBQVI7QUFDQSxnQkFBS2pELE1BQU0sQ0FBTixNQUFhLE9BQWxCLEVBQTRCO0FBQ3hCNkUsMkJBQVcsQ0FBWDtBQUNBLG9CQUFLQSxZQUFZLENBQWpCLEVBQXFCO0FBQ3hCO0FBQ0o7QUFDRCxjQUFNLEtBQUt6RixLQUFMLENBQVd1RixLQUFYLENBQWlCLGtCQUFqQixFQUFxQzNFLE1BQU0sQ0FBTixDQUFyQyxFQUErQ0EsTUFBTSxDQUFOLENBQS9DLENBQU47QUFDSCxLOzs7OztrQkEvZWdCYixNIiwiZmlsZSI6InBhcnNlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBEZWNsYXJhdGlvbiBmcm9tICcuL2RlY2xhcmF0aW9uJztcbmltcG9ydCB0b2tlbml6ZXIgICBmcm9tICcuL3Rva2VuaXplJztcbmltcG9ydCBDb21tZW50ICAgICBmcm9tICcuL2NvbW1lbnQnO1xuaW1wb3J0IEF0UnVsZSAgICAgIGZyb20gJy4vYXQtcnVsZSc7XG5pbXBvcnQgUm9vdCAgICAgICAgZnJvbSAnLi9yb290JztcbmltcG9ydCBSdWxlICAgICAgICBmcm9tICcuL3J1bGUnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQYXJzZXIge1xuXG4gICAgY29uc3RydWN0b3IoaW5wdXQpIHtcbiAgICAgICAgdGhpcy5pbnB1dCA9IGlucHV0O1xuXG4gICAgICAgIHRoaXMucm9vdCAgICAgID0gbmV3IFJvb3QoKTtcbiAgICAgICAgdGhpcy5jdXJyZW50ICAgPSB0aGlzLnJvb3Q7XG4gICAgICAgIHRoaXMuc3BhY2VzICAgID0gJyc7XG4gICAgICAgIHRoaXMuc2VtaWNvbG9uID0gZmFsc2U7XG5cbiAgICAgICAgdGhpcy5jcmVhdGVUb2tlbml6ZXIoKTtcbiAgICAgICAgdGhpcy5yb290LnNvdXJjZSA9IHsgaW5wdXQsIHN0YXJ0OiB7IGxpbmU6IDEsIGNvbHVtbjogMSB9IH07XG4gICAgfVxuXG4gICAgY3JlYXRlVG9rZW5pemVyKCkge1xuICAgICAgICB0aGlzLnRva2VuaXplciA9IHRva2VuaXplcih0aGlzLmlucHV0KTtcbiAgICB9XG5cbiAgICBwYXJzZSgpIHtcbiAgICAgICAgbGV0IHRva2VuO1xuICAgICAgICB3aGlsZSAoICF0aGlzLnRva2VuaXplci5lbmRPZkZpbGUoKSApIHtcbiAgICAgICAgICAgIHRva2VuID0gdGhpcy50b2tlbml6ZXIubmV4dFRva2VuKCk7XG5cbiAgICAgICAgICAgIHN3aXRjaCAoIHRva2VuWzBdICkge1xuXG4gICAgICAgICAgICBjYXNlICdzcGFjZSc6XG4gICAgICAgICAgICAgICAgdGhpcy5zcGFjZXMgKz0gdG9rZW5bMV07XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgJzsnOlxuICAgICAgICAgICAgICAgIHRoaXMuZnJlZVNlbWljb2xvbih0b2tlbik7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgJ30nOlxuICAgICAgICAgICAgICAgIHRoaXMuZW5kKHRva2VuKTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSAnY29tbWVudCc6XG4gICAgICAgICAgICAgICAgdGhpcy5jb21tZW50KHRva2VuKTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSAnYXQtd29yZCc6XG4gICAgICAgICAgICAgICAgdGhpcy5hdHJ1bGUodG9rZW4pO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlICd7JzpcbiAgICAgICAgICAgICAgICB0aGlzLmVtcHR5UnVsZSh0b2tlbik7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgdGhpcy5vdGhlcih0b2tlbik7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5lbmRGaWxlKCk7XG4gICAgfVxuXG4gICAgY29tbWVudCh0b2tlbikge1xuICAgICAgICBsZXQgbm9kZSA9IG5ldyBDb21tZW50KCk7XG4gICAgICAgIHRoaXMuaW5pdChub2RlLCB0b2tlblsyXSwgdG9rZW5bM10pO1xuICAgICAgICBub2RlLnNvdXJjZS5lbmQgPSB7IGxpbmU6IHRva2VuWzRdLCBjb2x1bW46IHRva2VuWzVdIH07XG5cbiAgICAgICAgbGV0IHRleHQgPSB0b2tlblsxXS5zbGljZSgyLCAtMik7XG4gICAgICAgIGlmICggL15cXHMqJC8udGVzdCh0ZXh0KSApIHtcbiAgICAgICAgICAgIG5vZGUudGV4dCAgICAgICA9ICcnO1xuICAgICAgICAgICAgbm9kZS5yYXdzLmxlZnQgID0gdGV4dDtcbiAgICAgICAgICAgIG5vZGUucmF3cy5yaWdodCA9ICcnO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbGV0IG1hdGNoID0gdGV4dC5tYXRjaCgvXihcXHMqKShbXl0qW15cXHNdKShcXHMqKSQvKTtcbiAgICAgICAgICAgIG5vZGUudGV4dCAgICAgICA9IG1hdGNoWzJdO1xuICAgICAgICAgICAgbm9kZS5yYXdzLmxlZnQgID0gbWF0Y2hbMV07XG4gICAgICAgICAgICBub2RlLnJhd3MucmlnaHQgPSBtYXRjaFszXTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGVtcHR5UnVsZSh0b2tlbikge1xuICAgICAgICBsZXQgbm9kZSA9IG5ldyBSdWxlKCk7XG4gICAgICAgIHRoaXMuaW5pdChub2RlLCB0b2tlblsyXSwgdG9rZW5bM10pO1xuICAgICAgICBub2RlLnNlbGVjdG9yID0gJyc7XG4gICAgICAgIG5vZGUucmF3cy5iZXR3ZWVuID0gJyc7XG4gICAgICAgIHRoaXMuY3VycmVudCA9IG5vZGU7XG4gICAgfVxuXG4gICAgb3RoZXIoc3RhcnQpIHtcbiAgICAgICAgbGV0IGVuZCAgICAgID0gZmFsc2U7XG4gICAgICAgIGxldCB0eXBlICAgICA9IG51bGw7XG4gICAgICAgIGxldCBjb2xvbiAgICA9IGZhbHNlO1xuICAgICAgICBsZXQgYnJhY2tldCAgPSBudWxsO1xuICAgICAgICBsZXQgYnJhY2tldHMgPSBbXTtcblxuICAgICAgICBsZXQgdG9rZW5zID0gW107XG4gICAgICAgIGxldCB0b2tlbiA9IHN0YXJ0O1xuICAgICAgICB3aGlsZSAoIHRva2VuICkge1xuICAgICAgICAgICAgdHlwZSA9IHRva2VuWzBdO1xuICAgICAgICAgICAgdG9rZW5zLnB1c2godG9rZW4pO1xuXG4gICAgICAgICAgICBpZiAoIHR5cGUgPT09ICcoJyB8fCB0eXBlID09PSAnWycgKSB7XG4gICAgICAgICAgICAgICAgaWYgKCAhYnJhY2tldCApIGJyYWNrZXQgPSB0b2tlbjtcbiAgICAgICAgICAgICAgICBicmFja2V0cy5wdXNoKHR5cGUgPT09ICcoJyA/ICcpJyA6ICddJyk7XG5cbiAgICAgICAgICAgIH0gZWxzZSBpZiAoIGJyYWNrZXRzLmxlbmd0aCA9PT0gMCApIHtcbiAgICAgICAgICAgICAgICBpZiAoIHR5cGUgPT09ICc7JyApIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCBjb2xvbiApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGVjbCh0b2tlbnMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoIHR5cGUgPT09ICd7JyApIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ydWxlKHRva2Vucyk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoIHR5cGUgPT09ICd9JyApIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50b2tlbml6ZXIuYmFjayh0b2tlbnMucG9wKCkpO1xuICAgICAgICAgICAgICAgICAgICBlbmQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoIHR5cGUgPT09ICc6JyApIHtcbiAgICAgICAgICAgICAgICAgICAgY29sb24gPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSBlbHNlIGlmICggdHlwZSA9PT0gYnJhY2tldHNbYnJhY2tldHMubGVuZ3RoIC0gMV0gKSB7XG4gICAgICAgICAgICAgICAgYnJhY2tldHMucG9wKCk7XG4gICAgICAgICAgICAgICAgaWYgKCBicmFja2V0cy5sZW5ndGggPT09IDAgKSBicmFja2V0ID0gbnVsbDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdG9rZW4gPSB0aGlzLnRva2VuaXplci5uZXh0VG9rZW4oKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICggdGhpcy50b2tlbml6ZXIuZW5kT2ZGaWxlKCkgKSBlbmQgPSB0cnVlO1xuICAgICAgICBpZiAoIGJyYWNrZXRzLmxlbmd0aCA+IDAgKSB0aGlzLnVuY2xvc2VkQnJhY2tldChicmFja2V0KTtcblxuICAgICAgICBpZiAoIGVuZCAmJiBjb2xvbiApIHtcbiAgICAgICAgICAgIHdoaWxlICggdG9rZW5zLmxlbmd0aCApIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA9IHRva2Vuc1t0b2tlbnMubGVuZ3RoIC0gMV1bMF07XG4gICAgICAgICAgICAgICAgaWYgKCB0b2tlbiAhPT0gJ3NwYWNlJyAmJiB0b2tlbiAhPT0gJ2NvbW1lbnQnICkgYnJlYWs7XG4gICAgICAgICAgICAgICAgdGhpcy50b2tlbml6ZXIuYmFjayh0b2tlbnMucG9wKCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5kZWNsKHRva2Vucyk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnVua25vd25Xb3JkKHRva2Vucyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBydWxlKHRva2Vucykge1xuICAgICAgICB0b2tlbnMucG9wKCk7XG5cbiAgICAgICAgbGV0IG5vZGUgPSBuZXcgUnVsZSgpO1xuICAgICAgICB0aGlzLmluaXQobm9kZSwgdG9rZW5zWzBdWzJdLCB0b2tlbnNbMF1bM10pO1xuXG4gICAgICAgIG5vZGUucmF3cy5iZXR3ZWVuID0gdGhpcy5zcGFjZXNBbmRDb21tZW50c0Zyb21FbmQodG9rZW5zKTtcbiAgICAgICAgdGhpcy5yYXcobm9kZSwgJ3NlbGVjdG9yJywgdG9rZW5zKTtcbiAgICAgICAgdGhpcy5jdXJyZW50ID0gbm9kZTtcbiAgICB9XG5cbiAgICBkZWNsKHRva2Vucykge1xuICAgICAgICBsZXQgbm9kZSA9IG5ldyBEZWNsYXJhdGlvbigpO1xuICAgICAgICB0aGlzLmluaXQobm9kZSk7XG5cbiAgICAgICAgbGV0IGxhc3QgPSB0b2tlbnNbdG9rZW5zLmxlbmd0aCAtIDFdO1xuICAgICAgICBpZiAoIGxhc3RbMF0gPT09ICc7JyApIHtcbiAgICAgICAgICAgIHRoaXMuc2VtaWNvbG9uID0gdHJ1ZTtcbiAgICAgICAgICAgIHRva2Vucy5wb3AoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIGxhc3RbNF0gKSB7XG4gICAgICAgICAgICBub2RlLnNvdXJjZS5lbmQgPSB7IGxpbmU6IGxhc3RbNF0sIGNvbHVtbjogbGFzdFs1XSB9O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbm9kZS5zb3VyY2UuZW5kID0geyBsaW5lOiBsYXN0WzJdLCBjb2x1bW46IGxhc3RbM10gfTtcbiAgICAgICAgfVxuXG4gICAgICAgIHdoaWxlICggdG9rZW5zWzBdWzBdICE9PSAnd29yZCcgKSB7XG4gICAgICAgICAgICBpZiAoIHRva2Vucy5sZW5ndGggPT09IDEgKSB0aGlzLnVua25vd25Xb3JkKHRva2Vucyk7XG4gICAgICAgICAgICBub2RlLnJhd3MuYmVmb3JlICs9IHRva2Vucy5zaGlmdCgpWzFdO1xuICAgICAgICB9XG4gICAgICAgIG5vZGUuc291cmNlLnN0YXJ0ID0geyBsaW5lOiB0b2tlbnNbMF1bMl0sIGNvbHVtbjogdG9rZW5zWzBdWzNdIH07XG5cbiAgICAgICAgbm9kZS5wcm9wID0gJyc7XG4gICAgICAgIHdoaWxlICggdG9rZW5zLmxlbmd0aCApIHtcbiAgICAgICAgICAgIGxldCB0eXBlID0gdG9rZW5zWzBdWzBdO1xuICAgICAgICAgICAgaWYgKCB0eXBlID09PSAnOicgfHwgdHlwZSA9PT0gJ3NwYWNlJyB8fCB0eXBlID09PSAnY29tbWVudCcgKSB7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBub2RlLnByb3AgKz0gdG9rZW5zLnNoaWZ0KClbMV07XG4gICAgICAgIH1cblxuICAgICAgICBub2RlLnJhd3MuYmV0d2VlbiA9ICcnO1xuXG4gICAgICAgIGxldCB0b2tlbjtcbiAgICAgICAgd2hpbGUgKCB0b2tlbnMubGVuZ3RoICkge1xuICAgICAgICAgICAgdG9rZW4gPSB0b2tlbnMuc2hpZnQoKTtcblxuICAgICAgICAgICAgaWYgKCB0b2tlblswXSA9PT0gJzonICkge1xuICAgICAgICAgICAgICAgIG5vZGUucmF3cy5iZXR3ZWVuICs9IHRva2VuWzFdO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBub2RlLnJhd3MuYmV0d2VlbiArPSB0b2tlblsxXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICggbm9kZS5wcm9wWzBdID09PSAnXycgfHwgbm9kZS5wcm9wWzBdID09PSAnKicgKSB7XG4gICAgICAgICAgICBub2RlLnJhd3MuYmVmb3JlICs9IG5vZGUucHJvcFswXTtcbiAgICAgICAgICAgIG5vZGUucHJvcCA9IG5vZGUucHJvcC5zbGljZSgxKTtcbiAgICAgICAgfVxuICAgICAgICBub2RlLnJhd3MuYmV0d2VlbiArPSB0aGlzLnNwYWNlc0FuZENvbW1lbnRzRnJvbVN0YXJ0KHRva2Vucyk7XG4gICAgICAgIHRoaXMucHJlY2hlY2tNaXNzZWRTZW1pY29sb24odG9rZW5zKTtcblxuICAgICAgICBmb3IgKCBsZXQgaSA9IHRva2Vucy5sZW5ndGggLSAxOyBpID4gMDsgaS0tICkge1xuICAgICAgICAgICAgdG9rZW4gPSB0b2tlbnNbaV07XG4gICAgICAgICAgICBpZiAoIHRva2VuWzFdID09PSAnIWltcG9ydGFudCcgKSB7XG4gICAgICAgICAgICAgICAgbm9kZS5pbXBvcnRhbnQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGxldCBzdHJpbmcgPSB0aGlzLnN0cmluZ0Zyb20odG9rZW5zLCBpKTtcbiAgICAgICAgICAgICAgICBzdHJpbmcgPSB0aGlzLnNwYWNlc0Zyb21FbmQodG9rZW5zKSArIHN0cmluZztcbiAgICAgICAgICAgICAgICBpZiAoIHN0cmluZyAhPT0gJyAhaW1wb3J0YW50JyApIG5vZGUucmF3cy5pbXBvcnRhbnQgPSBzdHJpbmc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIH0gZWxzZSBpZiAodG9rZW5bMV0gPT09ICdpbXBvcnRhbnQnKSB7XG4gICAgICAgICAgICAgICAgbGV0IGNhY2hlID0gdG9rZW5zLnNsaWNlKDApO1xuICAgICAgICAgICAgICAgIGxldCBzdHIgICA9ICcnO1xuICAgICAgICAgICAgICAgIGZvciAoIGxldCBqID0gaTsgaiA+IDA7IGotLSApIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHR5cGUgPSBjYWNoZVtqXVswXTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCBzdHIudHJpbSgpLmluZGV4T2YoJyEnKSA9PT0gMCAmJiB0eXBlICE9PSAnc3BhY2UnICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgc3RyID0gY2FjaGUucG9wKClbMV0gKyBzdHI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICggc3RyLnRyaW0oKS5pbmRleE9mKCchJykgPT09IDAgKSB7XG4gICAgICAgICAgICAgICAgICAgIG5vZGUuaW1wb3J0YW50ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgbm9kZS5yYXdzLmltcG9ydGFudCA9IHN0cjtcbiAgICAgICAgICAgICAgICAgICAgdG9rZW5zID0gY2FjaGU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIHRva2VuWzBdICE9PSAnc3BhY2UnICYmIHRva2VuWzBdICE9PSAnY29tbWVudCcgKSB7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnJhdyhub2RlLCAndmFsdWUnLCB0b2tlbnMpO1xuXG4gICAgICAgIGlmICggbm9kZS52YWx1ZS5pbmRleE9mKCc6JykgIT09IC0xICkgdGhpcy5jaGVja01pc3NlZFNlbWljb2xvbih0b2tlbnMpO1xuICAgIH1cblxuICAgIGF0cnVsZSh0b2tlbikge1xuICAgICAgICBsZXQgbm9kZSAgPSBuZXcgQXRSdWxlKCk7XG4gICAgICAgIG5vZGUubmFtZSA9IHRva2VuWzFdLnNsaWNlKDEpO1xuICAgICAgICBpZiAoIG5vZGUubmFtZSA9PT0gJycgKSB7XG4gICAgICAgICAgICB0aGlzLnVubmFtZWRBdHJ1bGUobm9kZSwgdG9rZW4pO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuaW5pdChub2RlLCB0b2tlblsyXSwgdG9rZW5bM10pO1xuXG4gICAgICAgIGxldCBwcmV2O1xuICAgICAgICBsZXQgc2hpZnQ7XG4gICAgICAgIGxldCBsYXN0ICAgPSBmYWxzZTtcbiAgICAgICAgbGV0IG9wZW4gICA9IGZhbHNlO1xuICAgICAgICBsZXQgcGFyYW1zID0gW107XG5cbiAgICAgICAgd2hpbGUgKCAhdGhpcy50b2tlbml6ZXIuZW5kT2ZGaWxlKCkgKSB7XG4gICAgICAgICAgICB0b2tlbiA9IHRoaXMudG9rZW5pemVyLm5leHRUb2tlbigpO1xuXG4gICAgICAgICAgICBpZiAoIHRva2VuWzBdID09PSAnOycgKSB7XG4gICAgICAgICAgICAgICAgbm9kZS5zb3VyY2UuZW5kID0geyBsaW5lOiB0b2tlblsyXSwgY29sdW1uOiB0b2tlblszXSB9O1xuICAgICAgICAgICAgICAgIHRoaXMuc2VtaWNvbG9uID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoIHRva2VuWzBdID09PSAneycgKSB7XG4gICAgICAgICAgICAgICAgb3BlbiA9IHRydWU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKCB0b2tlblswXSA9PT0gJ30nKSB7XG4gICAgICAgICAgICAgICAgaWYgKCBwYXJhbXMubGVuZ3RoID4gMCApIHtcbiAgICAgICAgICAgICAgICAgICAgc2hpZnQgPSBwYXJhbXMubGVuZ3RoIC0gMTtcbiAgICAgICAgICAgICAgICAgICAgcHJldiA9IHBhcmFtc1tzaGlmdF07XG4gICAgICAgICAgICAgICAgICAgIHdoaWxlICggcHJldiAmJiBwcmV2WzBdID09PSAnc3BhY2UnICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcHJldiA9IHBhcmFtc1stLXNoaWZ0XTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoIHByZXYgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBub2RlLnNvdXJjZS5lbmQgPSB7IGxpbmU6IHByZXZbNF0sIGNvbHVtbjogcHJldls1XSB9O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuZW5kKHRva2VuKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcGFyYW1zLnB1c2godG9rZW4pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIHRoaXMudG9rZW5pemVyLmVuZE9mRmlsZSgpICkge1xuICAgICAgICAgICAgICAgIGxhc3QgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgbm9kZS5yYXdzLmJldHdlZW4gPSB0aGlzLnNwYWNlc0FuZENvbW1lbnRzRnJvbUVuZChwYXJhbXMpO1xuICAgICAgICBpZiAoIHBhcmFtcy5sZW5ndGggKSB7XG4gICAgICAgICAgICBub2RlLnJhd3MuYWZ0ZXJOYW1lID0gdGhpcy5zcGFjZXNBbmRDb21tZW50c0Zyb21TdGFydChwYXJhbXMpO1xuICAgICAgICAgICAgdGhpcy5yYXcobm9kZSwgJ3BhcmFtcycsIHBhcmFtcyk7XG4gICAgICAgICAgICBpZiAoIGxhc3QgKSB7XG4gICAgICAgICAgICAgICAgdG9rZW4gPSBwYXJhbXNbcGFyYW1zLmxlbmd0aCAtIDFdO1xuICAgICAgICAgICAgICAgIG5vZGUuc291cmNlLmVuZCAgID0geyBsaW5lOiB0b2tlbls0XSwgY29sdW1uOiB0b2tlbls1XSB9O1xuICAgICAgICAgICAgICAgIHRoaXMuc3BhY2VzICAgICAgID0gbm9kZS5yYXdzLmJldHdlZW47XG4gICAgICAgICAgICAgICAgbm9kZS5yYXdzLmJldHdlZW4gPSAnJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG5vZGUucmF3cy5hZnRlck5hbWUgPSAnJztcbiAgICAgICAgICAgIG5vZGUucGFyYW1zICAgICAgICAgPSAnJztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICggb3BlbiApIHtcbiAgICAgICAgICAgIG5vZGUubm9kZXMgICA9IFtdO1xuICAgICAgICAgICAgdGhpcy5jdXJyZW50ID0gbm9kZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGVuZCh0b2tlbikge1xuICAgICAgICBpZiAoIHRoaXMuY3VycmVudC5ub2RlcyAmJiB0aGlzLmN1cnJlbnQubm9kZXMubGVuZ3RoICkge1xuICAgICAgICAgICAgdGhpcy5jdXJyZW50LnJhd3Muc2VtaWNvbG9uID0gdGhpcy5zZW1pY29sb247XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zZW1pY29sb24gPSBmYWxzZTtcblxuICAgICAgICB0aGlzLmN1cnJlbnQucmF3cy5hZnRlciA9ICh0aGlzLmN1cnJlbnQucmF3cy5hZnRlciB8fCAnJykgKyB0aGlzLnNwYWNlcztcbiAgICAgICAgdGhpcy5zcGFjZXMgPSAnJztcblxuICAgICAgICBpZiAoIHRoaXMuY3VycmVudC5wYXJlbnQgKSB7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnQuc291cmNlLmVuZCA9IHsgbGluZTogdG9rZW5bMl0sIGNvbHVtbjogdG9rZW5bM10gfTtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudCA9IHRoaXMuY3VycmVudC5wYXJlbnQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnVuZXhwZWN0ZWRDbG9zZSh0b2tlbik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBlbmRGaWxlKCkge1xuICAgICAgICBpZiAoIHRoaXMuY3VycmVudC5wYXJlbnQgKSB0aGlzLnVuY2xvc2VkQmxvY2soKTtcbiAgICAgICAgaWYgKCB0aGlzLmN1cnJlbnQubm9kZXMgJiYgdGhpcy5jdXJyZW50Lm5vZGVzLmxlbmd0aCApIHtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudC5yYXdzLnNlbWljb2xvbiA9IHRoaXMuc2VtaWNvbG9uO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY3VycmVudC5yYXdzLmFmdGVyID0gKHRoaXMuY3VycmVudC5yYXdzLmFmdGVyIHx8ICcnKSArIHRoaXMuc3BhY2VzO1xuICAgIH1cblxuICAgIGZyZWVTZW1pY29sb24odG9rZW4pIHtcbiAgICAgICAgdGhpcy5zcGFjZXMgKz0gdG9rZW5bMV07XG4gICAgICAgIGlmICggdGhpcy5jdXJyZW50Lm5vZGVzICkge1xuICAgICAgICAgICAgbGV0IHByZXYgPSB0aGlzLmN1cnJlbnQubm9kZXNbdGhpcy5jdXJyZW50Lm5vZGVzLmxlbmd0aCAtIDFdO1xuICAgICAgICAgICAgaWYgKCBwcmV2ICYmIHByZXYudHlwZSA9PT0gJ3J1bGUnICYmICFwcmV2LnJhd3Mub3duU2VtaWNvbG9uICkge1xuICAgICAgICAgICAgICAgIHByZXYucmF3cy5vd25TZW1pY29sb24gPSB0aGlzLnNwYWNlcztcbiAgICAgICAgICAgICAgICB0aGlzLnNwYWNlcyA9ICcnO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gSGVscGVyc1xuXG4gICAgaW5pdChub2RlLCBsaW5lLCBjb2x1bW4pIHtcbiAgICAgICAgdGhpcy5jdXJyZW50LnB1c2gobm9kZSk7XG5cbiAgICAgICAgbm9kZS5zb3VyY2UgPSB7IHN0YXJ0OiB7IGxpbmUsIGNvbHVtbiB9LCBpbnB1dDogdGhpcy5pbnB1dCB9O1xuICAgICAgICBub2RlLnJhd3MuYmVmb3JlID0gdGhpcy5zcGFjZXM7XG4gICAgICAgIHRoaXMuc3BhY2VzID0gJyc7XG4gICAgICAgIGlmICggbm9kZS50eXBlICE9PSAnY29tbWVudCcgKSB0aGlzLnNlbWljb2xvbiA9IGZhbHNlO1xuICAgIH1cblxuICAgIHJhdyhub2RlLCBwcm9wLCB0b2tlbnMpIHtcbiAgICAgICAgbGV0IHRva2VuLCB0eXBlO1xuICAgICAgICBsZXQgbGVuZ3RoID0gdG9rZW5zLmxlbmd0aDtcbiAgICAgICAgbGV0IHZhbHVlICA9ICcnO1xuICAgICAgICBsZXQgY2xlYW4gID0gdHJ1ZTtcbiAgICAgICAgZm9yICggbGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpICs9IDEgKSB7XG4gICAgICAgICAgICB0b2tlbiA9IHRva2Vuc1tpXTtcbiAgICAgICAgICAgIHR5cGUgID0gdG9rZW5bMF07XG4gICAgICAgICAgICBpZiAoIHR5cGUgPT09ICdjb21tZW50JyB8fCB0eXBlID09PSAnc3BhY2UnICYmIGkgPT09IGxlbmd0aCAtIDEgKSB7XG4gICAgICAgICAgICAgICAgY2xlYW4gPSBmYWxzZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdmFsdWUgKz0gdG9rZW5bMV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCAhY2xlYW4gKSB7XG4gICAgICAgICAgICBsZXQgcmF3ID0gdG9rZW5zLnJlZHVjZSggKGFsbCwgaSkgPT4gYWxsICsgaVsxXSwgJycpO1xuICAgICAgICAgICAgbm9kZS5yYXdzW3Byb3BdID0geyB2YWx1ZSwgcmF3IH07XG4gICAgICAgIH1cbiAgICAgICAgbm9kZVtwcm9wXSA9IHZhbHVlO1xuICAgIH1cblxuICAgIHNwYWNlc0FuZENvbW1lbnRzRnJvbUVuZCh0b2tlbnMpIHtcbiAgICAgICAgbGV0IGxhc3RUb2tlblR5cGU7XG4gICAgICAgIGxldCBzcGFjZXMgPSAnJztcbiAgICAgICAgd2hpbGUgKCB0b2tlbnMubGVuZ3RoICkge1xuICAgICAgICAgICAgbGFzdFRva2VuVHlwZSA9IHRva2Vuc1t0b2tlbnMubGVuZ3RoIC0gMV1bMF07XG4gICAgICAgICAgICBpZiAoIGxhc3RUb2tlblR5cGUgIT09ICdzcGFjZScgJiZcbiAgICAgICAgICAgICAgICBsYXN0VG9rZW5UeXBlICE9PSAnY29tbWVudCcgKSBicmVhaztcbiAgICAgICAgICAgIHNwYWNlcyA9IHRva2Vucy5wb3AoKVsxXSArIHNwYWNlcztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc3BhY2VzO1xuICAgIH1cblxuICAgIHNwYWNlc0FuZENvbW1lbnRzRnJvbVN0YXJ0KHRva2Vucykge1xuICAgICAgICBsZXQgbmV4dDtcbiAgICAgICAgbGV0IHNwYWNlcyA9ICcnO1xuICAgICAgICB3aGlsZSAoIHRva2Vucy5sZW5ndGggKSB7XG4gICAgICAgICAgICBuZXh0ID0gdG9rZW5zWzBdWzBdO1xuICAgICAgICAgICAgaWYgKCBuZXh0ICE9PSAnc3BhY2UnICYmIG5leHQgIT09ICdjb21tZW50JyApIGJyZWFrO1xuICAgICAgICAgICAgc3BhY2VzICs9IHRva2Vucy5zaGlmdCgpWzFdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzcGFjZXM7XG4gICAgfVxuXG4gICAgc3BhY2VzRnJvbUVuZCh0b2tlbnMpIHtcbiAgICAgICAgbGV0IGxhc3RUb2tlblR5cGU7XG4gICAgICAgIGxldCBzcGFjZXMgPSAnJztcbiAgICAgICAgd2hpbGUgKCB0b2tlbnMubGVuZ3RoICkge1xuICAgICAgICAgICAgbGFzdFRva2VuVHlwZSA9IHRva2Vuc1t0b2tlbnMubGVuZ3RoIC0gMV1bMF07XG4gICAgICAgICAgICBpZiAoIGxhc3RUb2tlblR5cGUgIT09ICdzcGFjZScgKSBicmVhaztcbiAgICAgICAgICAgIHNwYWNlcyA9IHRva2Vucy5wb3AoKVsxXSArIHNwYWNlcztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc3BhY2VzO1xuICAgIH1cblxuICAgIHN0cmluZ0Zyb20odG9rZW5zLCBmcm9tKSB7XG4gICAgICAgIGxldCByZXN1bHQgPSAnJztcbiAgICAgICAgZm9yICggbGV0IGkgPSBmcm9tOyBpIDwgdG9rZW5zLmxlbmd0aDsgaSsrICkge1xuICAgICAgICAgICAgcmVzdWx0ICs9IHRva2Vuc1tpXVsxXTtcbiAgICAgICAgfVxuICAgICAgICB0b2tlbnMuc3BsaWNlKGZyb20sIHRva2Vucy5sZW5ndGggLSBmcm9tKTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICBjb2xvbih0b2tlbnMpIHtcbiAgICAgICAgbGV0IGJyYWNrZXRzID0gMDtcbiAgICAgICAgbGV0IHRva2VuLCB0eXBlLCBwcmV2O1xuICAgICAgICBmb3IgKCBsZXQgaSA9IDA7IGkgPCB0b2tlbnMubGVuZ3RoOyBpKysgKSB7XG4gICAgICAgICAgICB0b2tlbiA9IHRva2Vuc1tpXTtcbiAgICAgICAgICAgIHR5cGUgID0gdG9rZW5bMF07XG5cbiAgICAgICAgICAgIGlmICggdHlwZSA9PT0gJygnICkge1xuICAgICAgICAgICAgICAgIGJyYWNrZXRzICs9IDE7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKCB0eXBlID09PSAnKScgKSB7XG4gICAgICAgICAgICAgICAgYnJhY2tldHMgLT0gMTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoIGJyYWNrZXRzID09PSAwICYmIHR5cGUgPT09ICc6JyApIHtcbiAgICAgICAgICAgICAgICBpZiAoICFwcmV2ICkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRvdWJsZUNvbG9uKHRva2VuKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKCBwcmV2WzBdID09PSAnd29yZCcgJiYgcHJldlsxXSA9PT0gJ3Byb2dpZCcgKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcHJldiA9IHRva2VuO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICAvLyBFcnJvcnNcblxuICAgIHVuY2xvc2VkQnJhY2tldChicmFja2V0KSB7XG4gICAgICAgIHRocm93IHRoaXMuaW5wdXQuZXJyb3IoJ1VuY2xvc2VkIGJyYWNrZXQnLCBicmFja2V0WzJdLCBicmFja2V0WzNdKTtcbiAgICB9XG5cbiAgICB1bmtub3duV29yZCh0b2tlbnMpIHtcbiAgICAgICAgdGhyb3cgdGhpcy5pbnB1dC5lcnJvcignVW5rbm93biB3b3JkJywgdG9rZW5zWzBdWzJdLCB0b2tlbnNbMF1bM10pO1xuICAgIH1cblxuICAgIHVuZXhwZWN0ZWRDbG9zZSh0b2tlbikge1xuICAgICAgICB0aHJvdyB0aGlzLmlucHV0LmVycm9yKCdVbmV4cGVjdGVkIH0nLCB0b2tlblsyXSwgdG9rZW5bM10pO1xuICAgIH1cblxuICAgIHVuY2xvc2VkQmxvY2soKSB7XG4gICAgICAgIGxldCBwb3MgPSB0aGlzLmN1cnJlbnQuc291cmNlLnN0YXJ0O1xuICAgICAgICB0aHJvdyB0aGlzLmlucHV0LmVycm9yKCdVbmNsb3NlZCBibG9jaycsIHBvcy5saW5lLCBwb3MuY29sdW1uKTtcbiAgICB9XG5cbiAgICBkb3VibGVDb2xvbih0b2tlbikge1xuICAgICAgICB0aHJvdyB0aGlzLmlucHV0LmVycm9yKCdEb3VibGUgY29sb24nLCB0b2tlblsyXSwgdG9rZW5bM10pO1xuICAgIH1cblxuICAgIHVubmFtZWRBdHJ1bGUobm9kZSwgdG9rZW4pIHtcbiAgICAgICAgdGhyb3cgdGhpcy5pbnB1dC5lcnJvcignQXQtcnVsZSB3aXRob3V0IG5hbWUnLCB0b2tlblsyXSwgdG9rZW5bM10pO1xuICAgIH1cblxuICAgIHByZWNoZWNrTWlzc2VkU2VtaWNvbG9uKHRva2Vucykge1xuICAgICAgICAvLyBIb29rIGZvciBTYWZlIFBhcnNlclxuICAgICAgICB0b2tlbnM7XG4gICAgfVxuXG4gICAgY2hlY2tNaXNzZWRTZW1pY29sb24odG9rZW5zKSB7XG4gICAgICAgIGxldCBjb2xvbiA9IHRoaXMuY29sb24odG9rZW5zKTtcbiAgICAgICAgaWYgKCBjb2xvbiA9PT0gZmFsc2UgKSByZXR1cm47XG5cbiAgICAgICAgbGV0IGZvdW5kZWQgPSAwO1xuICAgICAgICBsZXQgdG9rZW47XG4gICAgICAgIGZvciAoIGxldCBqID0gY29sb24gLSAxOyBqID49IDA7IGotLSApIHtcbiAgICAgICAgICAgIHRva2VuID0gdG9rZW5zW2pdO1xuICAgICAgICAgICAgaWYgKCB0b2tlblswXSAhPT0gJ3NwYWNlJyApIHtcbiAgICAgICAgICAgICAgICBmb3VuZGVkICs9IDE7XG4gICAgICAgICAgICAgICAgaWYgKCBmb3VuZGVkID09PSAyICkgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhyb3cgdGhpcy5pbnB1dC5lcnJvcignTWlzc2VkIHNlbWljb2xvbicsIHRva2VuWzJdLCB0b2tlblszXSk7XG4gICAgfVxuXG59XG4iXX0=
