'use strict';
module.exports = x => typeof x === 'string' ? x.replace(/[\\"]/g, '\\$&') : x;
