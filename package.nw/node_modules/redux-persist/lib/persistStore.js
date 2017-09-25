'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = persistStore;

var _constants = require('./constants');

var _getStoredState = require('./getStoredState');

var _getStoredState2 = _interopRequireDefault(_getStoredState);

var _createPersistor = require('./createPersistor');

var _createPersistor2 = _interopRequireDefault(_createPersistor);

var _setImmediate = require('./utils/setImmediate');

var _setImmediate2 = _interopRequireDefault(_setImmediate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function persistStore(store) {
  var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var onComplete = arguments[2];

  // defaults
  // @TODO remove shouldRestore
  var shouldRestore = !config.skipRestore;
  if (process.env.NODE_ENV !== 'production' && config.skipRestore) console.warn('redux-persist: config.skipRestore has been deprecated. If you want to skip restoration use `createPersistor` instead');

  var purgeKeys = null;

  // create and pause persistor
  var persistor = (0, _createPersistor2.default)(store, config);
  persistor.pause();

  // restore
  if (shouldRestore) {
    (0, _setImmediate2.default)(function () {
      (0, _getStoredState2.default)(config, function (err, restoredState) {
        if (err) {
          complete(err);
          return;
        }
        // do not persist state for purgeKeys
        if (purgeKeys) {
          if (purgeKeys === '*') restoredState = {};else purgeKeys.forEach(function (key) {
            return delete restoredState[key];
          });
        }
        try {
          store.dispatch(rehydrateAction(restoredState, err));
        } finally {
          complete(err, restoredState);
        }
      });
    });
  } else (0, _setImmediate2.default)(complete);

  function complete(err, restoredState) {
    persistor.resume();
    onComplete && onComplete(err, restoredState);
  }

  return _extends({}, persistor, {
    purge: function purge(keys) {
      purgeKeys = keys || '*';
      return persistor.purge(keys);
    }
  });
}

function rehydrateAction(payload) {
  var error = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

  return {
    type: _constants.REHYDRATE,
    payload: payload,
    error: error
  };
}