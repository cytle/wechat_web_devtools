var hasNativeSupport = typeof global !== 'undefined' && typeof global.setImmediate !== 'undefined';
var setImmediate = hasNativeSupport ? function (fn, ms) {
  return global.setImmediate(fn, ms);
} : function (fn, ms) {
  return setTimeout(fn, ms);
};

export default setImmediate;