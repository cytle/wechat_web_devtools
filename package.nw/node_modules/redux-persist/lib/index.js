'use strict';

exports.__esModule = true;
exports.storages = exports.purgeStoredState = exports.persistStore = exports.getStoredState = exports.createTransform = exports.createPersistor = exports.autoRehydrate = undefined;

var _autoRehydrate = require('./autoRehydrate');

var _autoRehydrate2 = _interopRequireDefault(_autoRehydrate);

var _createPersistor = require('./createPersistor');

var _createPersistor2 = _interopRequireDefault(_createPersistor);

var _createTransform = require('./createTransform');

var _createTransform2 = _interopRequireDefault(_createTransform);

var _getStoredState = require('./getStoredState');

var _getStoredState2 = _interopRequireDefault(_getStoredState);

var _persistStore = require('./persistStore');

var _persistStore2 = _interopRequireDefault(_persistStore);

var _purgeStoredState = require('./purgeStoredState');

var _purgeStoredState2 = _interopRequireDefault(_purgeStoredState);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// @TODO remove in v5
var deprecated = function deprecated(cb, cb2, cb3) {
  console.error('redux-persist: this method of importing storages has been removed. instead use `import { asyncLocalStorage } from "redux-persist/storages"`');
  if (typeof cb === 'function') cb();
  if (typeof cb2 === 'function') cb2();
  if (typeof cb3 === 'function') cb3();
};
var deprecatedStorage = { getAllKeys: deprecated, getItem: deprecated, setItem: deprecated, removeItem: deprecated };
var storages = {
  asyncLocalStorage: deprecatedStorage,
  asyncSessionStorage: deprecatedStorage
};

exports.autoRehydrate = _autoRehydrate2.default;
exports.createPersistor = _createPersistor2.default;
exports.createTransform = _createTransform2.default;
exports.getStoredState = _getStoredState2.default;
exports.persistStore = _persistStore2.default;
exports.purgeStoredState = _purgeStoredState2.default;
exports.storages = storages;