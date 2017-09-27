'use strict';

exports.__esModule = true;
exports.default = applyCompact;

var _commentRegex = require('comment-regex');

var _postcssValueParser = require('postcss-value-parser');

var _postcssValueParser2 = _interopRequireDefault(_postcssValueParser);

var _applyTransformFeatures = require('./applyTransformFeatures');

var _applyTransformFeatures2 = _interopRequireDefault(_applyTransformFeatures);

var _blank = require('./blank');

var _blank2 = _interopRequireDefault(_blank);

var _deeplyNested = require('./deeplyNested');

var _deeplyNested2 = _interopRequireDefault(_deeplyNested);

var _getIndent = require('./getIndent');

var _getIndent2 = _interopRequireDefault(_getIndent);

var _isSassVariable = require('./isSassVariable');

var _isSassVariable2 = _interopRequireDefault(_isSassVariable);

var _maxSelectorLength = require('./maxSelectorLength');

var _walk = require('./walk');

var _walk2 = _interopRequireDefault(_walk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function applyCompact(css, opts) {
    css.walk(function (rule) {
        if (rule.type === 'decl') {
            if (rule.raws.value) {
                rule.value = rule.raws.value.raw.trim();
            }
            // Format sass variable `$size: 30em;`
            if ((0, _isSassVariable2.default)(rule)) {
                rule.raws.before = '';
                rule.raws.between = ': ';
            }

            var ast = (0, _postcssValueParser2.default)(rule.value);

            (0, _walk2.default)(ast, function (node, index, parent) {
                var next = parent.nodes[index + 1];
                if (node.type === 'div' && node.value === ',') {
                    node.before = '';
                    node.after = ' ';
                }
                if (node.type === 'function') {
                    node.before = node.after = ' ';
                }
                if (node.type === 'space') {
                    node.value = ' ';
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

            // Format `!important`
            if (rule.important) {
                rule.raws.important = ' !important';
            }

            if (rule.raws.value) {
                rule.raws.value.raw = rule.value;
            }
        }
        opts.indentSize = 1;
        if (rule.type === 'comment') {
            if (rule.raws.inline) {
                rule.raws.inline = null;
            }
            var prev = rule.prev();
            if (prev && prev.type === 'decl') {
                rule.raws.before = ' ' + (0, _blank2.default)(rule.raws.before);
            }
            if (rule.parent && rule.parent.type === 'root') {
                var next = rule.next();
                if (next) {
                    next.raws.before = '\n';
                }
                if (rule !== css.first) {
                    rule.raws.before = '\n';
                }
            }
            return;
        }
        var indent = (0, _getIndent2.default)(rule, opts.indentChar, opts.indentSize);
        var deep = (0, _deeplyNested2.default)(rule);
        if (rule.type === 'rule' || rule.type === 'atrule') {
            if (!rule.nodes) {
                rule.raws.between = '';
            } else {
                rule.raws.between = ' ';
            }
            rule.raws.after = ' ';
            rule.raws.before = indent + (0, _blank2.default)(rule.raws.before);
            rule.raws.semicolon = true;
        }
        if (rule.raws.selector && rule.raws.selector.raw) {
            rule.selector = rule.raws.selector.raw;
        }
        (0, _maxSelectorLength.maxSelectorLength)(rule, opts);
        if (rule.type === 'decl') {
            if ((0, _deeplyNested2.default)(rule.parent)) {
                var newline = rule === css.first ? '' : '\n';
                rule.raws.before = newline + indent + (0, _blank2.default)(rule.raws.before);
            } else {
                rule.raws.before = ' ' + (0, _blank2.default)(rule.raws.before);
            }
            if (!(0, _commentRegex.block)().test(rule.raws.between)) {
                rule.raws.between = ': ';
            }
        }
        if ((deep || rule.nodes) && rule !== css.first) {
            rule.raws.before = '\n ';
        }
        if (deep) {
            rule.raws.after = '\n' + indent;
        }
        if (rule.parent && rule !== rule.parent.first && (rule.type === 'rule' || rule.type === 'atrule')) {
            rule.raws.before = '\n' + indent;
        }
    });
    css.raws.after = '\n';
}
module.exports = exports['default'];