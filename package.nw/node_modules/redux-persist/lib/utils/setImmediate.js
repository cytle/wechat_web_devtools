'use strict';

exports.__esModule = true;
var hasNativeSupport = typeof global !== 'undefined' && typeof global.setImmediate !== 'undefined';
var setImmediate = hasNativeSupport ? function (fn, ms) {
  return global.setImmediate(fn, ms);
} : function (fn, ms) {
  return setTimeout(fn, ms);
};

exports.default = setImmediate;