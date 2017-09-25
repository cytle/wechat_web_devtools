var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import { REHYDRATE } from './constants';
import getStoredState from './getStoredState';
import createPersistor from './createPersistor';
import setImmediate from './utils/setImmediate';

export default function persistStore(store) {
  var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var onComplete = arguments[2];

  // defaults
  // @TODO remove shouldRestore
  var shouldRestore = !config.skipRestore;
  if (process.env.NODE_ENV !== 'production' && config.skipRestore) console.warn('redux-persist: config.skipRestore has been deprecated. If you want to skip restoration use `createPersistor` instead');

  var purgeKeys = null;

  // create and pause persistor
  var persistor = createPersistor(store, config);
  persistor.pause();

  // restore
  if (shouldRestore) {
    setImmediate(function () {
      getStoredState(config, function (err, restoredState) {
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
  } else setImmediate(complete);

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
    type: REHYDRATE,
    payload: payload,
    error: error
  };
}