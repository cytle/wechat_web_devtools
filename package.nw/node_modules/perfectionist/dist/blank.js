'use strict';

exports.__esModule = true;
exports.default = blank;

var _defined = require('defined');

var _defined2 = _interopRequireDefault(_defined);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function blank(value) {
    return (0, _defined2.default)(value, '');
}
module.exports = exports['default'];