'use strict';

exports.__esModule = true;
exports.default = space;

require('string.prototype.repeat');

function space(amount) {
    var indent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ' ';

    return indent.repeat(amount);
}
module.exports = exports['default'];