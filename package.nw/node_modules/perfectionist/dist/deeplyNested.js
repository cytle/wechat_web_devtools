"use strict";

exports.__esModule = true;
exports.default = deeplyNested;
function deeplyNested(_ref) {
    var nodes = _ref.nodes;

    return nodes && nodes.some(function (_ref2) {
        var children = _ref2.nodes;
        return children;
    });
}
module.exports = exports["default"];