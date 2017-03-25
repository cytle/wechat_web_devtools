"use strict";

exports.__esModule = true;
exports.default = walk;
function walk(parent, callback) {
    parent.nodes.forEach(function (node, index) {
        var bubble = callback(node, index, parent);
        if (node.nodes && bubble !== false) {
            walk(node, callback);
        }
    });
}
module.exports = exports["default"];