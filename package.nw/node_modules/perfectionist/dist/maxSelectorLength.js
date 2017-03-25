'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.maxAtRuleLength = maxAtRuleLength;
exports.maxSelectorLength = maxSelectorLength;
exports.maxValueLength = maxValueLength;

var _postcss = require('postcss');

var _space = require('./space');

var _space2 = _interopRequireDefault(_space);

var _getIndent = require('./getIndent');

var _getIndent2 = _interopRequireDefault(_getIndent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function splitProperty(rule, prop, opts) {
    var _reindent$opts = _extends({
        reindent: false
    }, opts),
        breakEvery = _reindent$opts.breakEvery,
        reindent = _reindent$opts.reindent,
        reduce = _reindent$opts.reduce,
        max = _reindent$opts.max;

    var property = rule[prop];
    if (!max || !property) {
        return;
    }
    var exploded = _postcss.list.comma(property);
    if (property.length > max || reduce) {
        (function () {
            var indent = 0;
            if (typeof reindent === 'function') {
                indent = reindent(rule);
            }
            rule[prop] = exploded.reduce(function (lines, chunk) {
                if (breakEvery) {
                    lines.push(chunk);
                    return lines;
                }
                if (lines[lines.length - 1].length + indent <= max) {
                    var merged = lines[lines.length - 1] + ', ' + chunk;
                    if (indent + merged.length <= max) {
                        lines[lines.length - 1] = merged;
                        return lines;
                    }
                }
                lines.push(chunk);
                return lines;
            }, [exploded.shift()]).join(',\n' + (0, _space2.default)(indent));
        })();
    }
}

function maxAtRuleLength(rule, _ref) {
    var max = _ref.maxAtRuleLength;

    return splitProperty(rule, 'params', {
        max: max,
        breakEvery: true,
        reindent: function reindent(r) {
            return r.name.length + 2;
        }
    });
}

function maxSelectorLength(rule, opts) {
    return splitProperty(rule, 'selector', {
        max: opts.maxSelectorLength,
        reduce: true, // where possible reduce to one line
        reindent: function reindent(r) {
            return (0, _getIndent2.default)(r, opts.indentChar, opts.indentSize).length;
        }
    });
}

function maxValueLength(rule, _ref2) {
    var max = _ref2.maxValueLength;

    if (rule.raws.value && rule.raws.value.raw) {
        rule.value = rule.raws.value.raw;
    }
    return splitProperty(rule, 'value', {
        max: max,
        breakEvery: true,
        reindent: function reindent(r) {
            return (0, _getIndent2.default)(r).length + r.prop.length + 2;
        }
    });
}