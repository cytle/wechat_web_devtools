'use strict';

exports.__esModule = true;
exports.default = createPersistor;

var _constants = require('./constants');

var _asyncLocalStorage = require('./defaults/asyncLocalStorage');

var _asyncLocalStorage2 = _interopRequireDefault(_asyncLocalStorage);

var _purgeStoredState = require('./purgeStoredState');

var _purgeStoredState2 = _interopRequireDefault(_purgeStoredState);

var _jsonStringifySafe = require('json-stringify-safe');

var _jsonStringifySafe2 = _interopRequireDefault(_jsonStringifySafe);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createPersistor(store, config) {
  // defaults
  var serializer = config.serialize === false ? function (data) {
    return data;
  } : defaultSerializer;
  var deserializer = config.serialize === false ? function (data) {
    return data;
  } : defaultDeserializer;
  var blacklist = config.blacklist || [];
  var whitelist = config.whitelist || false;
  var transforms = config.transforms || [];
  var debounce = config.debounce || false;
  var keyPrefix = config.keyPrefix !== undefined ? config.keyPrefix : _constants.KEY_PREFIX;

  // pluggable state shape (e.g. immutablejs)
  var stateInit = config._stateInit || {};
  var stateIterator = config._stateIterator || defaultStateIterator;
  var stateGetter = config._stateGetter || defaultStateGetter;
  var stateSetter = config._stateSetter || defaultStateSetter;

  // storage with keys -> getAllKeys for localForage support
  var storage = config.storage || (0, _asyncLocalStorage2.default)('local');
  if (storage.keys && !storage.getAllKeys) {
    storage.getAllKeys = storage.keys;
  }

  // initialize stateful values
  var lastState = stateInit;
  var paused = false;
  var storesToProcess = [];
  var timeIterator = null;

  store.subscribe(function () {
    if (paused) return;

    var state = store.getState();

    stateIterator(state, function (subState, key) {
      if (!passWhitelistBlacklist(key)) return;
      if (stateGetter(lastState, key) === stateGetter(state, key)) return;
      if (storesToProcess.indexOf(key) !== -1) return;
      storesToProcess.push(key);
    });

    var len = storesToProcess.length;

    // time iterator (read: debounce)
    if (timeIterator === null) {
      timeIterator = setInterval(function () {
        if (paused && len === storesToProcess.length || storesToProcess.length === 0) {
          clearInterval(timeIterator);
          timeIterator = null;
          return;
        }

        var key = storesToProcess.shift();
        var storageKey = createStorageKey(key);
        var endState = transforms.reduce(function (subState, transformer) {
          return transformer.in(subState, key);
        }, stateGetter(store.getState(), key));
        if (typeof endState !== 'undefined') storage.setItem(storageKey, serializer(endState), warnIfSetError(key));
      }, debounce);
    }

    lastState = state;
  });

  function passWhitelistBlacklist(key) {
    if (whitelist && whitelist.indexOf(key) === -1) return false;
    if (blacklist.indexOf(key) !== -1) return false;
    return true;
  }

  function adhocRehydrate(incoming) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var state = {};
    if (options.serial) {
      stateIterator(incoming, function (subState, key) {
        try {
          var data = deserializer(subState);
          var value = transforms.reduceRight(function (interState, transformer) {
            return transformer.out(interState, key);
          }, data);
          state = stateSetter(state, key, value);
        } catch (err) {
          if (process.env.NODE_ENV !== 'production') console.warn('Error rehydrating data for key "' + key + '"', subState, err);
        }
      });
    } else state = incoming;

    store.dispatch(rehydrateAction(state));
    return state;
  }

  function createStorageKey(key) {
    return '' + keyPrefix + key;
  }

  // return `persistor`
  return {
    rehydrate: adhocRehydrate,
    pause: function pause() {
      paused = true;
    },
    resume: function resume() {
      paused = false;
    },
    purge: function purge(keys) {
      return (0, _purgeStoredState2.default)({ storage: storage, keyPrefix: keyPrefix }, keys);
    }
  };
}

function warnIfSetError(key) {
  return function setError(err) {
    if (err && process.env.NODE_ENV !== 'production') {
      console.warn('Error storing data for key:', key, err);
    }
  };
}

function defaultSerializer(data) {
  return (0, _jsonStringifySafe2.default)(data, null, null, function (k, v) {
    if (process.env.NODE_ENV !== 'production') return null;
    throw new Error('\n      redux-persist: cannot process cyclical state.\n      Consider changing your state structure to have no cycles.\n      Alternatively blacklist the corresponding reducer key.\n      Cycle encounted at key "' + k + '" with value "' + v + '".\n    ');
  });
}

function defaultDeserializer(serial) {
  return JSON.parse(serial);
}

function rehydrateAction(data) {
  return {
    type: _constants.REHYDRATE,
    payload: data
  };
}

function defaultStateIterator(collection, callback) {
  return Object.keys(collection).forEach(function (key) {
    return callback(collection[key], key);
  });
}

function defaultStateGetter(state, key) {
  return state[key];
}

function defaultStateSetter(state, key, value) {
  state[key] = value;
  return state;
}