const Promise = require("nodegit-promise");
const args = require("./utils/args");

// Unfortunately this list is not exhaustive, so if you find that a method does
// not use a "standard"-ish name, you'll have to extend this list.
var callbacks = ["cb", "callback", "callback_", "done"];

/**
 * Recursively operate over an object locating "asynchronous" functions by
 * inspecting the last argument in the parameter signature for a callback.
 *
 * @param {*} exports - Should be a function or an object, identity other.
 * @param {Function} test - Optional function to identify async methods.
 * @param {String} parentKeyName - Tracks the keyName in a digestable format.
 * @returns {*} exports - Identity.
 */
function processExports(exports, test, cached, parentKeyName) {
  // Return early if this object has already been processed.
  if (cached.indexOf(exports) > -1) {
    return exports;
  }

  // Record this object in the cache.
  cached.push(exports);

  // Pass through if not an object or function.
  if (typeof exports != "object" && typeof exports != "function") {
    return exports;
  }

  var name = exports.name + "#";

  // If a function, simply return it wrapped.
  if (typeof exports === "function") {
    // Find properties added to functions.
    for (var keyName in exports) {
      exports[keyName] = processExports(exports[keyName], test, cached, name);
    }

    // Assign the new function in place.
    var wrapped = Promise.denodeify(exports);

    // Find methods on the prototype, if there are any.
    if (Object.keys(exports.prototype).length) {
      processExports(exports.prototype, test, cached, name);
    }

    // Attach the augmented prototype.
    wrapped.prototype = exports.prototype;

    // Ensure attached properties to the previous function are accessible.
    wrapped.__proto__ = exports;

    return wrapped;
  }

  Object.keys(exports).map(function(keyName) {
    // Convert to values.
    return [keyName, exports[keyName]];
  }).filter(function(keyVal) {
    var keyName = keyVal[0];
    var value = keyVal[1];

    // If an object is encountered, recursively traverse.
    if (typeof value === "object") {
      processExports(exports, test, cached, keyName + ".");
    }
    // Filter to functions with callbacks only.
    else if (typeof value === "function") {
      // If a filter function exists, use this to determine if the function
      // is asynchronous.
      if (test) {
        // Pass the function itself, its keyName, and the parent keyName.
        return test(value, keyName, parentKeyName);
      }

      // If the callback name exists as the last argument, consider it an
      // asynchronous function.  Brittle? Fragile? Effective.
      if (callbacks.indexOf(args(value).slice(-1)[0]) > -1) {
        return true;
      }
    }
  }).forEach(function(keyVal) {
    var keyName = keyVal[0];
    var func = keyVal[1];

    // Wrap this function and reassign.
    exports[keyName] = processExports(func, test, cached, parentKeyName);
  });

  return exports;
}

/**
 * Public API for Promisify.  Will resolve modules names using `require`.
 *
 * @param {*} name - Can be a module name, object, or function.
 * @param {Function} test - Optional function to identify async methods.
 * @returns {*} exports - The resolved value from require or passed in value.
 */
module.exports = function(name, test) {
  var exports = name;

  // If the name argument is a String, will need to resovle using the built in
  // Node require function.
  if (typeof name === "string") {
    exports = require(name);
  }

  // Iterate over all properties and find asynchronous functions to convert to
  // promises.
  return processExports(exports, test, []);
};

// Export callbacks to the module.
module.exports.callbacks = callbacks;
