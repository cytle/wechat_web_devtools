var EventEmitter, Parser, Promise, Tracker,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

EventEmitter = require('events').EventEmitter;

Promise = require('bluebird');

Parser = require('./parser');

Tracker = (function(superClass) {
  extend(Tracker, superClass);

  function Tracker(command) {
    this.command = command;
    this.deviceList = [];
    this.deviceMap = {};
    this.reader = this.read()["catch"](Promise.CancellationError, function() {
      return true;
    })["catch"](Parser.PrematureEOFError, function() {
      throw new Error('Connection closed');
    })["catch"]((function(_this) {
      return function(err) {
        _this.emit('error', err);
      };
    })(this))["finally"]((function(_this) {
      return function() {
        return _this.command.parser.end().then(function() {
          return _this.emit('end');
        });
      };
    })(this));
  }

  Tracker.prototype.read = function() {
    return this.command._readDevices().cancellable().then((function(_this) {
      return function(list) {
        _this.update(list);
        return _this.read();
      };
    })(this));
  };

  Tracker.prototype.update = function(newList) {
    var changeSet, device, i, j, len, len1, newMap, oldDevice, ref;
    changeSet = {
      removed: [],
      changed: [],
      added: []
    };
    newMap = {};
    for (i = 0, len = newList.length; i < len; i++) {
      device = newList[i];
      oldDevice = this.deviceMap[device.id];
      if (oldDevice) {
        if (oldDevice.type !== device.type) {
          changeSet.changed.push(device);
          this.emit('change', device, oldDevice);
        }
      } else {
        changeSet.added.push(device);
        this.emit('add', device);
      }
      newMap[device.id] = device;
    }
    ref = this.deviceList;
    for (j = 0, len1 = ref.length; j < len1; j++) {
      device = ref[j];
      if (!newMap[device.id]) {
        changeSet.removed.push(device);
        this.emit('remove', device);
      }
    }
    this.emit('changeSet', changeSet);
    this.deviceList = newList;
    this.deviceMap = newMap;
    return this;
  };

  Tracker.prototype.end = function() {
    this.reader.cancel();
    return this;
  };

  return Tracker;

})(EventEmitter);

module.exports = Tracker;
