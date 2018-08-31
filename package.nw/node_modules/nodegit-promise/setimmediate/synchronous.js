'use strict';

var Promise = require('./core.js');

module.exports = Promise;
Promise.enableSynchronous = function () {
  Promise.prototype.isPending = function() {
    return this.getState() == 0;
  };

  Promise.prototype.isFulfilled = function() {
    return this.getState() == 1;
  };

  Promise.prototype.isRejected = function() {
    return this.getState() == 2;
  };

  Promise.prototype.getValue = Promise.prototype.value = function () {
    if (this._55 === 3) {
      return this._87.getValue();
    }

    if (!this.isFulfilled()) {
      throw new Error('Cannot get a value of an unfulfilled promise.');
    }

    return this._87;
  };

  Promise.prototype.getReason = Promise.prototype.reason = function () {
    if (this._55 === 3) {
      return this._87.getReason();
    }

    if (!this.isRejected()) {
      throw new Error('Cannot get a rejection reason of a non-rejected promise.');
    }

    return this._87;
  };

  Promise.prototype.getState = function () {
    if (this._55 === 3) {
      return this._87.getState();
    }

    return this._55;
  };
};

Promise.disableSynchronous = function() {
  Promise.prototype.isPending = undefined;
  Promise.prototype.isFulfilled = undefined;
  Promise.prototype.isRejected = undefined;
  Promise.prototype.value = undefined;
  Promise.prototype.getValue = undefined;
  Promise.prototype.reason = undefined;
  Promise.prototype.getReason = undefined;
  Promise.prototype.getState = undefined;
};

Promise.enableSynchronous();
