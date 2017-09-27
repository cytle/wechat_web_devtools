'use strict';

exports.__esModule = true;
exports.default = getIndent;

var _space = require('./space');

var _space2 = _interopRequireDefault(_space);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getIndent(node) {
    var indent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ' ';
    var base = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 4;

    var level = 0;
    var parent = node.parent;

    while (parent && parent.type !== 'root') {
        level++;
        parent = parent.parent;
    }
    return (0, _space2.default)(level * base, indent);
}
module.exports = exports['default'];