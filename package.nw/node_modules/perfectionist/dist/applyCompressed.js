'use strict';

exports.__esModule = true;
exports.default = applyCompressed;

var _commentRegex = require('comment-regex');

var _postcssValueParser = require('postcss-value-parser');

var _postcssValueParser2 = _interopRequireDefault(_postcssValueParser);

var _applyTransformFeatures = require('./applyTransformFeatures');

var _applyTransformFeatures2 = _interopRequireDefault(_applyTransformFeatures);

var _isSassVariable = require('./isSassVariable');

var _isSassVariable2 = _interopRequireDefault(_isSassVariable);

var _walk = require('./walk');

var _walk2 = _interopRequireDefault(_walk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function applyCompressed(css, opts) {
    css.walk(function (rule) {
        var raws = rule.raws,
            type = rule.type;

        rule.raws.semicolon = false;
        if (type === 'comment' && raws.inline) {
            rule.raws.inline = null;
        }
        if (type === 'rule' || type === 'atrule') {
            rule.raws.between = rule.raws.after = '';
        }
        if (type === 'decl' && !(0, _commentRegex.block)().test(raws.between)) {
            rule.raws.between = ':';
        }
        if (rule.type === 'decl') {
            if (raws.value) {
                rule.value = raws.value.raw.trim();
            }

            var ast = (0, _postcssValueParser2.default)(rule.value);

            (0, _walk2.default)(ast, function (node, index, parent) {
                var next = parent.nodes[index + 1];
                if (node.type === 'div' && node.value === ',' || node.type === 'function') {
                    node.before = node.after = '';
                }
                if (node.type === 'space') {
                    node.value = ' ';
                    if (next.type === 'word' && next.value[0] === '!') {
                        node.value = '';
                    }
                }
                if (node.type === 'word' && node.value === '!' && parent.nodes[index + 2] && next.type === 'space' && parent.nodes[index + 2].type === 'word') {
                    next.type = 'word';
                    next.value = '';
                }
                if (node.type === 'word') {
                    (0, _applyTransformFeatures2.default)(node, opts);
                }
            });

            rule.value = ast.toString();

            if ((0, _isSassVariable2.default)(rule)) {
                rule.raws.before = '';
            }

            // Format `!important`
            if (rule.important) {
                rule.raws.important = '!important';
            }

            if (raws.value) {
                rule.raws.value.raw = rule.value;
            }
        }
    });
    // Remove final newline
    css.raws.after = '';
}
module.exports = exports['default'];