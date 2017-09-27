"use strict";

exports.__esModule = true;

exports.default = function (a, b) {
  return a.source.end.line === b.source.start.line;
};

module.exports = exports["default"];