(function() {
  var Api, EventEmitter, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  EventEmitter = require('events').EventEmitter;

  Api = (function(_super) {
    __extends(Api, _super);

    function Api() {
      _ref = Api.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    Api.prototype.send = function() {
      throw new Error("send is not implemented");
    };

    Api.prototype.keyDown = function(keyCode, callback) {
      this.send("key down " + keyCode, callback);
      return this;
    };

    Api.prototype.keyUp = function(keyCode, callback) {
      this.send("key up " + keyCode, callback);
      return this;
    };

    Api.prototype.touchDown = function(x, y, callback) {
      this.send("touch down " + x + " " + y, callback);
      return this;
    };

    Api.prototype.touchUp = function(x, y, callback) {
      this.send("touch up " + x + " " + y, callback);
      return this;
    };

    Api.prototype.touchMove = function(x, y, callback) {
      this.send("touch move " + x + " " + y, callback);
      return this;
    };

    Api.prototype.trackball = function(dx, dy, callback) {
      this.send("trackball " + dx + " " + dy, callback);
      return this;
    };

    Api.prototype.flipOpen = function(callback) {
      this.send("flip open", callback);
      return this;
    };

    Api.prototype.flipClose = function(callback) {
      this.send("flip close", callback);
      return this;
    };

    Api.prototype.wake = function(callback) {
      this.send("wake", callback);
      return this;
    };

    Api.prototype.tap = function(x, y, callback) {
      this.send("tap " + x + " " + y, callback);
      return this;
    };

    Api.prototype.press = function(keyCode, callback) {
      this.send("press " + keyCode, callback);
      return this;
    };

    Api.prototype.type = function(str, callback) {
      str = str.replace(/"/g, '\\"');
      if (str.indexOf(' ') === -1) {
        this.send("type " + str, callback);
      } else {
        this.send("type \"" + str + "\"", callback);
      }
      return this;
    };

    Api.prototype.list = function(callback) {
      var _this = this;
      this.send("listvar", function(err, vars) {
        if (err) {
          return _this(callback(err));
        }
        if (err) {
          return callback(err);
        } else {
          return callback(null, vars.split(/\s+/g));
        }
      });
      return this;
    };

    Api.prototype.get = function(name, callback) {
      this.send("getvar " + name, callback);
      return this;
    };

    Api.prototype.quit = function(callback) {
      this.send("quit", callback);
      return this;
    };

    Api.prototype.done = function(callback) {
      this.send("done", callback);
      return this;
    };

    Api.prototype.sleep = function(ms, callback) {
      this.send("sleep " + ms, callback);
      return this;
    };

    Api.prototype.getAmCurrentAction = function(callback) {
      this.get('am.current.action', callback);
      return this;
    };

    Api.prototype.getAmCurrentCategories = function(callback) {
      this.get('am.current.categories', callback);
      return this;
    };

    Api.prototype.getAmCurrentCompClass = function(callback) {
      this.get('am.current.comp.class', callback);
      return this;
    };

    Api.prototype.getAmCurrentCompPackage = function(callback) {
      this.get('am.current.comp.package', callback);
      return this;
    };

    Api.prototype.getAmCurrentData = function(callback) {
      this.get('am.current.data', callback);
      return this;
    };

    Api.prototype.getAmCurrentPackage = function(callback) {
      this.get('am.current.package', callback);
      return this;
    };

    Api.prototype.getBuildBoard = function(callback) {
      this.get('build.board', callback);
      return this;
    };

    Api.prototype.getBuildBrand = function(callback) {
      this.get('build.brand', callback);
      return this;
    };

    Api.prototype.getBuildCpuAbi = function(callback) {
      this.get('build.cpu_abi', callback);
      return this;
    };

    Api.prototype.getBuildDevice = function(callback) {
      this.get('build.device', callback);
      return this;
    };

    Api.prototype.getBuildDisplay = function(callback) {
      this.get('build.display', callback);
      return this;
    };

    Api.prototype.getBuildFingerprint = function(callback) {
      this.get('build.fingerprint', callback);
      return this;
    };

    Api.prototype.getBuildHost = function(callback) {
      this.get('build.host', callback);
      return this;
    };

    Api.prototype.getBuildId = function(callback) {
      this.get('build.id', callback);
      return this;
    };

    Api.prototype.getBuildManufacturer = function(callback) {
      this.get('build.manufacturer', callback);
      return this;
    };

    Api.prototype.getBuildModel = function(callback) {
      this.get('build.model', callback);
      return this;
    };

    Api.prototype.getBuildProduct = function(callback) {
      this.get('build.product', callback);
      return this;
    };

    Api.prototype.getBuildTags = function(callback) {
      this.get('build.tags', callback);
      return this;
    };

    Api.prototype.getBuildType = function(callback) {
      this.get('build.type', callback);
      return this;
    };

    Api.prototype.getBuildUser = function(callback) {
      this.get('build.user', callback);
      return this;
    };

    Api.prototype.getBuildVersionCodename = function(callback) {
      this.get('build.version.codename', callback);
      return this;
    };

    Api.prototype.getBuildVersionIncremental = function(callback) {
      this.get('build.version.incremental', callback);
      return this;
    };

    Api.prototype.getBuildVersionRelease = function(callback) {
      this.get('build.version.release', callback);
      return this;
    };

    Api.prototype.getBuildVersionSdk = function(callback) {
      this.get('build.version.sdk', callback);
      return this;
    };

    Api.prototype.getClockMillis = function(callback) {
      this.get('clock.millis', callback);
      return this;
    };

    Api.prototype.getClockRealtime = function(callback) {
      this.get('clock.realtime', callback);
      return this;
    };

    Api.prototype.getClockUptime = function(callback) {
      this.get('clock.uptime', callback);
      return this;
    };

    Api.prototype.getDisplayDensity = function(callback) {
      this.get('display.density', callback);
      return this;
    };

    Api.prototype.getDisplayHeight = function(callback) {
      this.get('display.height', callback);
      return this;
    };

    Api.prototype.getDisplayWidth = function(callback) {
      this.get('display.width', callback);
      return this;
    };

    return Api;

  })(EventEmitter);

  module.exports = Api;

}).call(this);
