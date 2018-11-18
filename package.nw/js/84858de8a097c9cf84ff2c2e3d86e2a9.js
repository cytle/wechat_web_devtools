'use strict';

(function () {
  // 这里不再使用 localStorage 而是存储文件，避免 nw 升级后数据丢失
  var fs = require('fs');
  var path = require('path');
  var mkdir = require('mkdir-p');

  var config = require('./d56923640b8ac272d7cb4e171975fdc5.js');
  var dataPath = path.join(nw.App.getDataPath(), '..');
  var WeappLocalData = path.join(dataPath, 'WeappLocalData');
  var localDataPath = path.join(WeappLocalData, './localstorage.json');
  var localDataPathPrefx = path.join(WeappLocalData, './localstorage_');
  var localDataPathPostfix = '.json';
  var getDataFilePath = function getDataFilePath(key) {
    return localDataPathPrefx + key + localDataPathPostfix;
  };

  var _localData = {};
  var localData = void 0;

  function proxify(object) {
    return new Proxy(object, {
      set: function set(target, prop, value) {
        if (typeof value !== 'string') {
          try {
            fs.writeFileSync(getDataFilePath(prop), JSON.stringify(value));
          } catch (e) {}
        } else {
          try {
            fs.writeFileSync(getDataFilePath(prop), value);
          } catch (e) {}
        }
        target[prop] = value;
        return true;
      },
      deleteProperty: function deleteProperty(target, prop) {
        if (prop in target) {
          delete target[prop];
          try {
            fs.unlinkSync(getDataFilePath(prop));
          } catch (e) {}
        }
        return true;
      }
    });
  }

  function updateLocalData() {
    try {
      fs.writeFileSync(localDataPath, JSON.stringify(localData));
    } catch (e) {}
  }

  function initLocalData() {
    mkdir.sync(WeappLocalData);
    _localData = {};

    // 兼容使用 localstorage.json 的版本
    if (fs.existsSync(localDataPath)) {
      try {
        _localData = JSON.parse(fs.readFileSync(localDataPath, 'utf8'));
        fs.unlinkSync(localDataPath);
      } catch (e) {}
    }

    try {
      if (!localStorage.hasUpgradedFromPureLocalStorage || localStorage.hasUpgradedFromPureLocalStorage !== global.appVersion) {
        // 兼容使用 localstorage.json 之前的版本，使用 localStorage 直接存
        for (var key in localStorage) {
          if (!_localData[key] && key.startsWith(config.PROJECT_PREFIX)) {
            // 保留旧项目
            _localData[key] = localStorage[key];
          }
        }
        localStorage.hasUpgradedFromPureLocalStorage = global.appVersion;
      }
    } catch (e) {}

    // 现在的逻辑，每个 key 一个 json
    var files = fs.readdirSync(WeappLocalData);
    var keys = {};
    files.forEach(function (file) {
      var m = file.match(/^localstorage_(.+)\.json$/);
      if (m && m[1]) {
        keys[m[1]] = true;
        _localData[m[1]] = fs.readFileSync(getDataFilePath(m[1]), 'utf8');
      }
    });

    localData = proxify(_localData);

    // 把升级后的数据写回
    for (var _key in _localData) {
      if (!keys[_key]) {
        localData[_key] = _localData[_key];
      }
    }

    /*
    if (!fs.existsSync(localDataPath)) {
      _localData = {}
      for (let key in localStorage) {
        _localData[key] = localStorage[key]
      }
      localData = proxify(_localData)
    } else {
      try {
        localData = proxify(_localData = JSON.parse(fs.readFileSync(localDataPath, 'utf8')))
      } catch(e) {
        localData = proxify(_localData)
      }
    }*/
  }
  initLocalData();

  var getItem = function getItem(key) {
    if (localData[key]) {
      return localData[key];
    }
    return localStorage.getItem(key);
  };

  var setItem = function setItem(key, item) {
    localData[key] = item;
    localStorage.setItem(key, item);
  };

  var removeItem = function removeItem(key) {
    delete localData[key];
    localStorage.removeItem(key);
  };

  var getType = function getType(value) {
    return Object.prototype.toString.call(value).slice(8, -1);
  };

  var getProjectListFromOldVersion = function getProjectListFromOldVersion() {
    var projectList = getItem(config.OLD_PROJECT_LIST);
    if (projectList) {
      // 项目列表是比较重要的数据，是不能丢的
      try {
        projectList = JSON.parse(projectList);
      } catch (e) {
        projectList = {};
      }

      if (getType(projectList) === 'Array') {
        var result = {};
        projectList.forEach(function (item) {
          var projectid = item.projectid ? item.projectid : item.appid + '_' + item.appname;
          result[projectid] = {
            projectid: projectid,
            hash: item.hash,
            appid: item.appid,
            projectname: item.appname,
            projectpath: item.projectpath
          };
        });
        projectList = result;
      }
    } else {
      projectList = {};
    }
    removeItem(config.OLD_PROJECT_LIST);
    return projectList;
  };

  var checkVersion = function checkVersion(current) {
    var version = getItem(config.VERSION);
    if (!version) {
      // 重构前的旧版本 或者 卸载后重装
      var projectList = getProjectListFromOldVersion();

      for (var id in projectList) {
        setItem('' + config.PROJECT_PREFIX + id, JSON.stringify(projectList[id]));
      }
      // localStorage.setItem(config.PROJECT_LIST, JSON.stringify(projectList))
    }
    setItem(config.VERSION, current + '');
  };
  checkVersion(config.CURRENT_VERSION);

  module.exports = {
    get projectList() {
      if (!this._projectList) {
        try {
          var list = {};
          for (var key in localData) {
            try {
              if (key.startsWith(config.PROJECT_PREFIX)) {
                var project = JSON.parse(getItem(key));
                list[project.projectid] = project;
              }
            } catch (e) {
              removeItem(key);
            }
          }
          this._projectList = list;
        } catch (e) {
          this._projectList = {};
        }
      }
      return this._projectList;
    },

    set projectList(value) {
      // 更新单个 project 都用 updateProject，这个 setter 不需要
      return true;
      // if (getType(value) === 'Object') {
      //   setItem(config.PROJECT_LIST, JSON.stringify(value))
      //   this._projectList = value
      // }
    },

    updateProject: function updateProject(id, newData) {
      if (!id || !newData) return;
      this._projectList[id] = newData;
      setItem('' + config.PROJECT_PREFIX + id, JSON.stringify(newData));
    },
    getProjectCover: function getProjectCover(id) {
      if (!id) return null;
      try {
        return fs.readFileSync(path.join(WeappLocalData, '' + config.PROJECT_COVER_PREFIX + id));
      } catch (err) {
        return null;
      }
    },
    setProjectCover: function setProjectCover(id, base64image) {
      if (!id || !base64image) return;
      fs.writeFile(path.join(WeappLocalData, '' + config.PROJECT_COVER_PREFIX + id), base64image, function (err) {
        // fail to write project cover, no need to handle this
      });
    },
    removeProject: function removeProject(id) {
      delete this._projectList[id];
      if (!this._accessTime) {
        this.initAccessTime();
      }
      if (this._accessTime && this._accessTime[id]) {
        delete this._accessTime[id];
        setItem(config.PROJECT_ACCESS_TIME, JSON.stringify(this._accessTime));
      }
      removeItem('' + config.PROJECT_PREFIX + id);
    },
    clearProjectList: function clearProjectList() {
      this._projectList = {};
      for (var key in localData) {
        if (key.startsWith(config.PROJECT_PREFIX)) {
          removeItem(key);
        }
      }
    },
    initAccessTime: function initAccessTime() {
      this._accessTime = {};
      var accessTime = JSON.parse(getItem(config.PROJECT_ACCESS_TIME) || '{}');
      for (var projectid in accessTime) {
        if (this.projectList[projectid] && accessTime[projectid]) {
          this._accessTime[projectid] = accessTime[projectid];
        }
      }

      setItem(config.PROJECT_ACCESS_TIME, JSON.stringify(accessTime));
    },


    get lastSelect() {
      var lastSelect = getItem(config.LAST_SELECT);
      if (lastSelect) {
        if (lastSelect !== config.WEB_DEBUGGER) {
          return lastSelect.substr(config.PROJECT_PREFIX.length);
        } else {
          return config.WEB_DEBUGGER;
        }
      }
    },

    set lastSelect(projectid) {

      if (!projectid) {
        setItem(config.LAST_SELECT, null);
        return;
      }

      if (projectid !== config.WEB_DEBUGGER) {
        setItem(config.LAST_SELECT, '' + config.PROJECT_PREFIX + projectid);

        if (!this._accessTime) {
          this.initAccessTime();
        }

        this._accessTime[projectid] = +new Date();
        setItem(config.PROJECT_ACCESS_TIME, JSON.stringify(this._accessTime));
      } else {
        setItem(config.LAST_SELECT, projectid);
      }
    },

    get recentProjects() {
      var _this = this;

      if (!this._accessTime) {
        this.initAccessTime();
      }
      var recentProjects = Object.keys(this._accessTime).sort(function (pid1, pid2) {
        return _this._accessTime[pid2] - _this._accessTime[pid1];
      }).slice(0, 11);
      return recentProjects;
    },

    set recentProjects(value) {
      return true;
    },

    removeNewVersion: function removeNewVersion() {
      this._newVersion = undefined;
      removeItem(confog.NEW_VERSION);
    },


    get userInfo() {
      if (!this._userInfo) {
        this._userInfo = new Proxy({}, {
          get: function get(target, prop) {
            if (typeof prop !== 'string') return localStorage[prop];
            if (prop === 'signatureExpiredTime' || prop === 'ticketExpiredTime') {
              return parseInt(localStorage[config.USER_INFO + '_' + prop]) || null;
            }
            return localStorage[config.USER_INFO + '_' + prop];
          },
          set: function set(target, prop, value) {
            localStorage[config.USER_INFO + '_' + prop] = value;
            return true;
          },
          ownKeys: function ownKeys(target) {
            var lsui = {};
            try {
              lsui = JSON.parse(localStorage[config.USER_INFO]);
            } catch (err) {}
            return Object.keys(lsui);
          },
          getOwnPropertyDescriptor: function getOwnPropertyDescriptor(target, prop) {
            return {
              configurable: true,
              enumerable: true,
              writable: true
            };
          }
        });
      }
      return this._userInfo;
    },

    set userInfo(value) {
      if (getType(value) === 'Object') {
        setItem(config.USER_INFO, JSON.stringify(value));
        // this._userInfo = value
        if (Object.keys(value).length === 0) {
          for (var key in localStorage) {
            if (key.startsWith(config.USER_INFO + '_')) {
              delete localStorage[key];
            }
          }
        } else {
          for (var _key2 in value) {
            localStorage[config.USER_INFO + '_' + _key2] = value[_key2];
          }
        }
      }
      return true;
    },

    refreshUserInfo: function refreshUserInfo() {
      try {
        // this._userInfo = JSON.parse(getItem(config.USER_INFO)) || {}
      } catch (e) {}
    },


    get syncKey() {
      if (!this._syncKey) {
        try {
          var data = JSON.parse(getItem(config.SYNC_KEY)) || {};
          if (data.hasOwnProperty('sync_id') && data.hasOwnProperty('sync_seq')) {
            this._syncKey = data;
            return this._syncKey;
          }
        } catch (e) {}

        this._syncKey = {
          sync_id: 1,
          sync_seq: 0
        };
      }
      return this._syncKey;
    },

    set syncKey(value) {
      if (getType(value) === 'Object' && value.hasOwnProperty('sync_seq') && value.hasOwnProperty('sync_id')) {
        setItem(config.SYNC_KEY, JSON.stringify(value));
        this._syncKey = value;
      }
    },

    get batchSyncKey() {
      if (!this._batchSyncKey) {
        try {
          var data = JSON.parse(getItem(config.BATCH_SYNC_KEY)) || {};
          if (data.hasOwnProperty('sync_id') && data.hasOwnProperty('sync_seq')) {
            this._batchSyncKey = data;
            return this._batchSyncKey;
          }
        } catch (e) {}

        this._batchSyncKey = {
          sync_id: 2,
          sync_seq: 0
        };
      }
      return this._batchSyncKey;
    },

    set batchSyncKey(value) {
      if (getType(value) === 'Object' && value.hasOwnProperty('sync_seq') && value.hasOwnProperty('sync_id')) {
        setItem(config.BATCH_SYNC_KEY, JSON.stringify(value));
        this._batchSyncKey = value;
      }
    },

    get lastVersion() {
      if (!this._lastVersion) {
        try {
          this._lastVersion = getItem(config.LAST_VERSION);
          return this._lastVersion;
        } catch (e) {}
        this._lastVersion = 0;
      }
      return this._lastVersion;
    },

    set lastVersion(value) {
      setItem(config.LAST_VERSION, value);
      this._lastVersion = value;
    },

    get newVersion() {
      if (!this._newVersion) {
        try {
          this._newVersion = getItem(config.NEW_VERSION);
          return this._newVersion;
        } catch (e) {}
        this._newVersion = 0;
      }
      return this._newVersion;
    },

    set newVersion(value) {
      setItem(config.NEW_VERSION, value);
      this._newVersion = value;
    },

    get settings() {
      var setting = {};
      try {
        setting = JSON.parse(getItem(config.SETTINGS)) || {};
      } catch (e) {
        setting = {};
      }
      return setting;
    },

    set settings(value) {
      try {
        setItem(config.SETTINGS, JSON.stringify(value));
      } catch (e) {}
    },

    get qcloudFileInfo() {
      var fileinfo = {};
      try {
        fileinfo = JSON.parse(getItem(config.QCLOUD_FILEINFO)) || {};
      } catch (e) {
        fileinfo = {};
      }
      return fileinfo;
    },

    set qcloudFileInfo(value) {
      try {
        setItem(config.QCLOUD_FILEINFO, JSON.stringify(value));
      } catch (e) {}
    },

    get forceUpdateVersion() {
      if (!this._forceUpdateVersion) {
        try {
          this._forceUpdateVersion = getItem(config.FORCE_UPDATE_VERSION);
          return this._forceUpdateVersion;
        } catch (e) {}
        this._forceUpdateVersion = 0;
      }
      return this._forceUpdateVersion;
    },

    set forceUpdateVersion(value) {
      value = value + '';
      setItem(config.FORCE_UPDATE_VERSION, value);
      this._forceUpdateVersion = value;
    },

    getTcb: function getTcb(appid) {
      try {
        return JSON.parse(getItem('' + config.TCB_APPID + appid)) || {};
      } catch (e) {
        return {};
      }
    },
    setTcb: function setTcb(appid, tcb) {
      try {
        setItem('' + config.TCB_APPID + appid, JSON.stringify(tcb));
      } catch (e) {}
    },
    removeForceUpdateVersion: function removeForceUpdateVersion() {
      this._forceUpdateVersion = undefined;
      removeItem(config.FORCE_UPDATE_VERSION);
    },
    getToolbarForProject: function getToolbarForProject(id) {
      try {
        return JSON.parse(getItem('' + config.TOOLBAR_PREFIX + id));
      } catch (e) {
        return null;
      }
    },
    setToolbarForProject: function setToolbarForProject(id, state) {
      try {
        setItem('' + config.TOOLBAR_PREFIX + id, JSON.stringify(state));
      } catch (e) {}
    },
    getWindowForProject: function getWindowForProject(id) {
      try {
        return JSON.parse(getItem('' + config.WINDOW_PREFIX + id));
      } catch (e) {
        return null;
      }
    },
    setWindowForProject: function setWindowForProject(id, state) {
      try {
        setItem('' + config.WINDOW_PREFIX + id, JSON.stringify(state));
      } catch (e) {}
    },


    updateProjectId: function updateProjectId(oldProjectid, newProjectId) {
      var commonFileKeys = [config.LAST_SELECT, config.PROJECT_ACCESS_TIME];
      var dataPrefix = 'localstorage_';
      var prefixFileKeys = [dataPrefix + config.PROJECT_PREFIX, dataPrefix + config.TOOLBAR_PREFIX, dataPrefix + config.WINDOW_PREFIX, config.PROJECT_COVER_PREFIX];
      var replaceFileContent = function replaceFileContent(path) {
        var replaceReg = new RegExp(oldProjectid, 'g');
        var content = fs.readFileSync(path, 'utf8');
        var newContent = content.replace(replaceReg, newProjectId);
        fs.writeFileSync(path, newContent, 'utf8');
      };
      try {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = commonFileKeys[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var key = _step.value;

            replaceFileContent(getDataFilePath(key));
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }

        var names = fs.readdirSync(WeappLocalData);
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          var _loop = function _loop() {
            var name = _step2.value;

            var prefix = prefixFileKeys.find(function (prefix) {
              return name.startsWith(prefix + oldProjectid);
            });
            if (prefix) {
              var newName = name.replace(oldProjectid, newProjectId);
              fs.renameSync(path.join(WeappLocalData, name), path.join(WeappLocalData, newName));
            }
            if (prefix === config.PROJECT_PREFIX) {
              replaceFileContent(path.join(WeappLocalData, name));
            }
          };

          for (var _iterator2 = names[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            _loop();
          }
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2.return) {
              _iterator2.return();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }

        this.updateProject(newProjectId, this.projectList[oldProjectid]);
        this.removeProject(oldProjectid);
      } catch (e) {}
    }

  };
})();