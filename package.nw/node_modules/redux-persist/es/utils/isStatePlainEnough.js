var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

import isPlainObject from 'lodash-es/isPlainObject';

export default function isStatePlainEnough(a) {
  // isPlainObject + duck type not immutable
  if (!a) return false;
  if ((typeof a === 'undefined' ? 'undefined' : _typeof(a)) !== 'object') return false;
  if (typeof a.asMutable === 'function') return false;
  if (!isPlainObject(a)) return false;
  return true;
}