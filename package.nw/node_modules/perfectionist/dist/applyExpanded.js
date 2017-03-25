'use strict';

exports.__esModule = true;
exports.default = applyExpanded;

var _postcss = require('postcss');

var _postcss2 = _interopRequireDefault(_postcss);

var _postcssValueParser = require('postcss-value-parser');

var _postcssValueParser2 = _interopRequireDefault(_postcssValueParser);

var _commentRegex = require('comment-regex');

var _applyTransformFeatures = require('./applyTransformFeatures');

var _applyTransformFeatures2 = _interopRequireDefault(_applyTransformFeatures);

var _blank = require('./blank');

var _blank2 = _interopRequireDefault(_blank);

var _getIndent = require('./getIndent');

var _getIndent2 = _interopRequireDefault(_getIndent);

var _isSassVariable = require('./isSassVariable');

var _isSassVariable2 = _interopRequireDefault(_isSassVariable);

var _longest = require('./longest');

var _longest2 = _interopRequireDefault(_longest);

var _maxSelectorLength = require('./maxSelectorLength');

var _prefixedDecls = require('./prefixedDecls');

var _prefixedDecls2 = _interopRequireDefault(_prefixedDecls);

var _space = require('./space');

var _space2 = _interopRequireDefault(_space);

var _sameLine = require('./sameLine');

var _sameLine2 = _interopRequireDefault(_sameLine);

var _walk = require('./walk');

var _walk2 = _interopRequireDefault(_walk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var unprefixed = _postcss2.default.vendor.unprefixed;
function applyExpanded(css, opts) {
    css.walk(function (rule) {
        var raws = rule.raws,
            type = rule.type;

        if (type === 'decl') {
            if (raws.value) {
                rule.value = raws.value.raw.trim();
            }
            // Format sass variable `$size: 30em;`
            if ((0, _isSassVariable2.default)(rule)) {
                if (rule !== css.first) {
                    rule.raws.before = '\n';
                }
                rule.raws.between = ': ';
            }

            var ast = (0, _postcssValueParser2.default)(rule.value);

            (0, _walk2.default)(ast, function (node, index, parent) {
                var next = parent.nodes[index + 1];
                if (node.type === 'function') {
                    node.before = node.after = '';
                }
                if (node.type === 'div' && node.value === ',') {
                    node.before = '';
                    node.after = ' ';
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

            if (raws.value) {
                rule.raws.value.raw = rule.value;
            }
        }
        var indent = (0, _getIndent2.default)(rule, opts.indentChar, opts.indentSize);
        if (type === 'comment') {
            var prev = rule.prev();
            if (prev && prev.type === 'decl') {
                if ((0, _sameLine2.default)(prev, rule)) {
                    rule.raws.before = ' ' + (0, _blank2.default)(rule.raws.before);
                } else {
                    rule.raws.before = '\n' + indent + (0, _blank2.default)(rule.raws.before);
                }
            }
            if (!prev && rule !== css.first) {
                rule.raws.before = '\n' + indent + (0, _blank2.default)(rule.raws.before);
            }
            if (rule.parent && rule.parent.type === 'root') {
                var next = rule.next();
                if (next) {
                    next.raws.before = '\n\n';
                }
                if (rule !== css.first) {
                    rule.raws.before = '\n\n';
                }
            }
            return;
        }
        rule.raws.before = indent + (0, _blank2.default)(rule.raws.before);
        if (type === 'rule' || type === 'atrule') {
            if (!rule.nodes) {
                rule.raws.between = '';
            } else {
                rule.raws.between = ' ';
            }
            rule.raws.semicolon = true;
            if (rule.nodes) {
                rule.raws.after = '\n';
            }
        }
        // visual cascade of vendor prefixed properties
        if (opts.cascade && type === 'rule' && rule.nodes.length > 1) {
            (function () {
                var props = [];
                var prefixed = (0, _prefixedDecls2.default)(rule).sort(_longest2.default).filter(function (_ref) {
                    var prop = _ref.prop;

                    var base = unprefixed(prop);
                    if (!~props.indexOf(base)) {
                        return props.push(base);
                    }
                    return false;
                });
                prefixed.forEach(function (prefix) {
                    var base = unprefixed(prefix.prop);
                    var vendor = prefix.prop.replace(base, '').length;
                    rule.nodes.filter(function (_ref2) {
                        var prop = _ref2.prop;
                        return prop && ~prop.indexOf(base);
                    }).forEach(function (decl) {
                        var thisVendor = decl.prop.replace(base, '').length;
                        var extraSpace = vendor - thisVendor;
                        if (extraSpace > 0) {
                            decl.raws.before = (0, _space2.default)(extraSpace) + (0, _blank2.default)(decl.raws.before);
                        }
                    });
                });
            })();
        }
        if (raws.selector && raws.selector.raw) {
            rule.selector = rule.raws.selector.raw;
        }
        (0, _maxSelectorLength.maxSelectorLength)(rule, opts);
        if (type === 'atrule') {
            if (rule.params) {
                rule.raws.afterName = ' ';
            }
            (0, _maxSelectorLength.maxAtRuleLength)(rule, opts);
        }
        if (type === 'decl') {
            if (!(0, _commentRegex.block)().test(rule.raws.between)) {
                rule.raws.between = ': ';
            }
            (0, _maxSelectorLength.maxValueLength)(rule, opts);
        }
        if (rule.parent && rule.parent.type !== 'root') {
            rule.raws.before = '\n' + (0, _blank2.default)(rule.raws.before);
            rule.raws.after = '\n' + indent;
        }
        if (rule.parent && rule !== rule.parent.first && (type === 'rule' || type === 'atrule')) {
            if (type === 'atrule' && !rule.nodes) {
                rule.raws.before = '\n' + indent;
                return;
            }
            rule.raws.before = '\n\n' + indent;
        }
    });
    css.raws.after = '\n';
}
module.exports = exports['default'];