'use strict';

exports.__esModule = true;
var setImmediate = typeof global !== 'undefined' && typeof global.setImmediate !== 'undefined' ? global.setImmediate : setTimeout;

exports.default = setImmediate;