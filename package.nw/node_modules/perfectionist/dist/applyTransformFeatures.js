'use strict';

exports.__esModule = true;
exports.default = applyTransformFeatures;

var _postcssValueParser = require('postcss-value-parser');

function isHex(node) {
    if (node.value[0] !== '#') {
        return false;
    }
    var range = node.value.slice(1);
    return ~[3, 4, 6, 8].indexOf(range.length) && !isNaN(parseInt(range, 16));
}

function toShorthand(hex) {
    if (hex.length === 7 && hex[1] === hex[2] && hex[3] === hex[4] && hex[5] === hex[6]) {
        return '#' + hex[2] + hex[4] + hex[6];
    }
    return hex;
}

function toLonghand(hex) {
    if (hex.length !== 4) {
        return hex;
    }

    var r = hex[1];
    var g = hex[2];
    var b = hex[3];
    return '#' + r + r + g + g + b + b;
};

var lengths = ['px', 'em', 'rem', 'ex', 'ch', 'vh', 'vw', 'cm', 'mm', 'in', 'pt', 'pc', 'vmin', 'vmax'];

function applyTransformFeatures(node, opts) {
    if (isHex(node)) {
        if (opts.colorCase === 'upper') {
            node.value = node.value.toUpperCase();
        }
        if (opts.colorCase === 'lower') {
            node.value = node.value.toLowerCase();
        }
        if (opts.colorShorthand === true) {
            node.value = toShorthand(node.value);
        }
        if (opts.colorShorthand === false) {
            node.value = toLonghand(node.value);
        }
    }
    var pair = (0, _postcssValueParser.unit)(node.value);
    if (pair) {
        if (opts.zeroLengthNoUnit === true && ~lengths.indexOf(pair.unit.toLowerCase()) && Number(pair.number) === 0) {
            node.value = '0';
            return;
        }

        var parts = pair.number.split('.');
        var pre = parts[0];
        var post = parts.slice(1).join('.');

        if (opts.trimLeadingZero === true && parts[1]) {
            pre = pre.replace(/^0+/, '');
        } else if (opts.trimLeadingZero === false && !pre.length) {
            pre = 0;
        }

        if (opts.trimTrailingZeros === true && parts[1]) {
            var rounded = String(Number(pre + '.' + post)).split('.')[1];
            post = rounded ? '.' + rounded : '';
        } else if (opts.trimTrailingZeros === false && parts[1]) {
            post = '.' + parts[1];
        }

        node.value = pre + post + pair.unit;
    }
}
module.exports = exports['default'];