'use strict';

exports.__esModule = true;
exports.default = prefixedDeclarations;

var _vendors = require('vendors');

var _vendors2 = _interopRequireDefault(_vendors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var prefixes = _vendors2.default.map(function (vendor) {
    return '-' + vendor + '-';
});

function prefixedDeclarations(_ref) {
    var nodes = _ref.nodes;

    var prefix = function prefix(node) {
        return prefixes.some(function (p) {
            return node.prop && !node.prop.indexOf(p);
        });
    };
    return nodes.filter(prefix);
}
module.exports = exports['default'];