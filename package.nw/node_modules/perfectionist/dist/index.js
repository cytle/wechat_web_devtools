'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _postcss = require('postcss');

var _postcss2 = _interopRequireDefault(_postcss);

var _applyCompact = require('./applyCompact');

var _applyCompact2 = _interopRequireDefault(_applyCompact);

var _applyCompressed = require('./applyCompressed');

var _applyCompressed2 = _interopRequireDefault(_applyCompressed);

var _applyExpanded = require('./applyExpanded');

var _applyExpanded2 = _interopRequireDefault(_applyExpanded);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var perfectionist = _postcss2.default.plugin('perfectionist', function (opts) {
    opts = _extends({
        format: 'expanded',
        indentSize: 4,
        indentChar: ' ',
        maxAtRuleLength: 80,
        maxSelectorLength: 80,
        maxValueLength: 80,
        trimLeadingZero: true,
        trimTrailingZeros: true,
        cascade: true,
        colorCase: 'lower',
        colorShorthand: true,
        zeroLengthNoUnit: true
    }, opts);

    return function (css) {
        css.walk(function (node) {
            if (node.raws.before) {
                node.raws.before = node.raws.before.replace(/[;\s]/g, '');
            }
        });
        switch (opts.format) {
            case 'compact':
                (0, _applyCompact2.default)(css, opts);
                break;
            case 'compressed':
                (0, _applyCompressed2.default)(css, opts);
                break;
            case 'expanded':
            default:
                (0, _applyExpanded2.default)(css, opts);
                break;
        }
    };
});

perfectionist.process = function (css) {
    var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    opts.map = opts.map || (opts.sourcemap ? true : null);
    if (opts.syntax === 'scss') {
        opts.syntax = require('postcss-scss');
    }
    var processor = (0, _postcss2.default)([perfectionist(opts)]);
    return processor.process(css, opts);
};

exports.default = perfectionist;
module.exports = exports['default'];