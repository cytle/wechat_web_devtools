'use strict';

exports.__esModule = true;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = function (type, config) {
  var storage = getStorage(type);
  return {
    getAllKeys: function getAllKeys(cb) {
      return new Promise(function (resolve, reject) {
        try {
          var keys = [];
          for (var i = 0; i < storage.length; i++) {
            keys.push(storage.key(i));
          }
          (0, _setImmediate2.default)(function () {
            cb && cb(null, keys);
            resolve(keys);
          });
        } catch (e) {
          cb && cb(e);
          reject(e);
        }
      });
    },
    getItem: function getItem(key, cb) {
      return new Promise(function (resolve, reject) {
        try {
          var s = storage.getItem(key);
          (0, _setImmediate2.default)(function () {
            cb && cb(null, s);
            resolve(s);
          });
        } catch (e) {
          cb && cb(e);
          reject(e);
        }
      });
    },
    setItem: function setItem(key, string, cb) {
      return new Promise(function (resolve, reject) {
        try {
          storage.setItem(key, string);
          (0, _setImmediate2.default)(function () {
            cb && cb(null);
            resolve();
          });
        } catch (e) {
          cb && cb(e);
          reject(e);
        }
      });
    },
    removeItem: function removeItem(key, cb) {
      return new Promise(function (resolve, reject) {
        try {
          storage.removeItem(key);
          (0, _setImmediate2.default)(function () {
            cb && cb(null);
            resolve();
          });
        } catch (e) {
          cb && cb(e);
          reject(e);
        }
      });
    }
  };
};

var _setImmediate = require('../utils/setImmediate');

var _setImmediate2 = _interopRequireDefault(_setImmediate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var noStorage = function noStorage() {
  /* noop */return null;
};
if (process.env.NODE_ENV !== 'production') {
  noStorage = function noStorage() {
    console.error('redux-persist asyncLocalStorage requires a global localStorage object. Either use a different storage backend or if this is a universal redux application you probably should conditionally persist like so: https://gist.github.com/rt2zz/ac9eb396793f95ff3c3b');
    return null;
  };
}

function _hasStorage(storageType) {
  if ((typeof window === 'undefined' ? 'undefined' : _typeof(window)) !== 'object' || !(storageType in window)) {
    return false;
  }

  try {
    var storage = window[storageType];
    var testKey = 'redux-persist ' + storageType + ' test';
    storage.setItem(testKey, 'test');
    storage.getItem(testKey);
    storage.removeItem(testKey);
  } catch (e) {
    if (process.env.NODE_ENV !== 'production') console.warn('redux-persist ' + storageType + ' test failed, persistence will be disabled.');
    return false;
  }
  return true;
}

function hasLocalStorage() {
  return _hasStorage('localStorage');
}

function hasSessionStorage() {
  return _hasStorage('sessionStorage');
}

function getStorage(type) {
  if (type === 'local') {
    return hasLocalStorage() ? window.localStorage : { getItem: noStorage, setItem: noStorage, removeItem: noStorage, getAllKeys: noStorage };
  }
  if (type === 'session') {
    return hasSessionStorage() ? window.sessionStorage : { getItem: noStorage, setItem: noStorage, removeItem: noStorage, getAllKeys: noStorage };
  }
}