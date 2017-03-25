'use strict';

exports.__esModule = true;
exports.default = isSassVariable;
function isSassVariable(_ref) {
    var parent = _ref.parent,
        prop = _ref.prop;

    return parent.type === 'root' && prop[0] === '$';
}
module.exports = exports['default'];