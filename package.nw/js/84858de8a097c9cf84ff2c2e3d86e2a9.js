'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

(function () {
  // 这里不再使用 localStorage 而是存储文件，避免 nw 升级后数据丢失
  var fs = require('fs');
  var fsExtra = require('fs-extra');
  var path = require('path');
  var mkdir = require('mkdir-p');
  var crypto = require('crypto');

  var config = require('./d56923640b8ac272d7cb4e171975fdc5.js');
  var dataPath = path.join(nw.App.getDataPath(), '..');
  var WeappLocalData = path.join(dataPath, 'WeappLocalData');
  var localDataPath = path.join(WeappLocalData, './localstorage.json');
  var localDataPathPrefx = path.join(WeappLocalData, './localstorage_');
  var localDataPathPostfix = '.json';
  var getDataFilePath = function getDataFilePath(key) {
    return localDataPathPrefx + key + localDataPathPostfix;
  };

  var LOCAL_DATA_STORAGE_META_FILE_PATH = path.join(WeappLocalData, 'storage_meta.json');
  var LOCAL_DATA_STORAGE_HASH_KEY_MAP_FILE_PATH = path.join(WeappLocalData, 'hash_key_map.json');

  var LOCAL_DATA_STORAGE_VERSIONS = {
    V1: 1, // 'native localStorage', // v1: 最早的直接存浏览器 localStorage
    V2: 2, // 'localstorage.json', // v2: 存 localstorage.json 单文件，过大
    V3: 3, // 'localstorage_[<key_segment_n>].json', // v3. 存 json 文件，但有可能遇到超长文件名问题
    V4: 4 // 'localstorage_<hash_of_key_segments>.json', // v4. 存 json 文件，维护 hash 到原始 key 的映射文件 hash_key_map.json，并在 WeappLocalData 下有 storage_meta.json 存放了当前存储策略的版本


    // 这个字段在以后要更新存储方案的时候需要更新，并更新 initLocalData 方法
  };var LOCAL_DATA_STORAGE_LATEST_VERSION = LOCAL_DATA_STORAGE_VERSIONS.V4;

  var WRITE_FILE_DEBOUNCE_TIME = 0;

  var _localData = {};
  var localData = void 0;
  var hashKeyMap = {};
  var keyHashMap = {};

  function generateMD5(string) {
    var md5sum = crypto.createHash('md5');
    md5sum.update(string);
    return md5sum.digest('hex');
  }

  function proxify(object) {

    var writeHashKeyMapTimer = void 0;

    return new Proxy(object, {
      set: function set(target, prop, value) {
        var hash = keyHashMap[prop];
        if (!hash) {
          // new key, should generate hash
          hash = generateMD5(prop);
          keyHashMap[prop] = hash;
          hashKeyMap[hash] = prop;
          clearTimeout(writeHashKeyMapTimer);
          writeHashKeyMapTimer = setTimeout(function () {
            // no try catch, let it throw and print :)
            fs.writeFileSync(LOCAL_DATA_STORAGE_HASH_KEY_MAP_FILE_PATH, JSON.stringify(hashKeyMap), 'utf8');
          }, WRITE_FILE_DEBOUNCE_TIME);
        }

        if (typeof value !== 'string') {
          try {
            fs.writeFileSync(getDataFilePath(hash), JSON.stringify(value));
          } catch (e) {}
        } else {
          try {
            fs.writeFileSync(getDataFilePath(hash), value);
          } catch (e) {}
        }
        target[prop] = value;
        return true;
      },
      deleteProperty: function deleteProperty(target, prop) {
        if (prop in target) {
          delete target[prop];

          var hash = keyHashMap[prop];
          if (hash) {
            delete keyHashMap[prop];
            delete hashKeyMap[hash];
            try {
              fs.writeFileSync(LOCAL_DATA_STORAGE_HASH_KEY_MAP_FILE_PATH, JSON.stringify(hashKeyMap), 'utf8');
            } catch (e) {}
          }

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

    var currentVersion = 0;
    var storageMeta = void 0;

    try {
      storageMeta = JSON.parse(fs.readFileSync(LOCAL_DATA_STORAGE_META_FILE_PATH));
      currentVersion = storageMeta.version;
    } catch (e) {}

    if (currentVersion < LOCAL_DATA_STORAGE_VERSIONS.V4) {
      // storage_meta.json 不存在或损坏，认为是 v4 以下的版本

      try {
        // v1 upgrage
        if (!localStorage.hasUpgradedFromPureLocalStorage) {
          currentVersion = LOCAL_DATA_STORAGE_VERSIONS.V1;
          // 兼容使用 localstorage.json 之前的版本，使用 localStorage 直接存 (v1)
          for (var key in localStorage) {
            if (!_localData[key] && key.startsWith(config.PROJECT_PREFIX)) {
              // 保留旧项目
              _localData[key] = localStorage[key];
            }
          }
          localStorage.hasUpgradedFromPureLocalStorage = global.appVersion;
        }
      } catch (e) {}

      // 兼容使用 localstorage.json 的版本 (v2)
      // v2 upgrage
      if (fs.existsSync(localDataPath)) {
        try {
          currentVersion = LOCAL_DATA_STORAGE_VERSIONS.V2;
          _localData = JSON.parse(fs.readFileSync(localDataPath, 'utf8'));
          fs.unlinkSync(localDataPath);
        } catch (e) {}
      }

      // v3 upgrage
      // devtools/main#1255
      // json 文件名从 localstorage_<key_path_1>_<key_path_2>_<key_path_xxx>.json 改成 localstorage_<hash>.json
      // 同时维护 hash_key_map.json 文件，因此需兼容旧逻辑，如果不存在 hash_key_map.json 则需创建
      // v3 的逻辑，每个 key 一个 json
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

      // 数据从 v3 升级需要以 hash 重写新 json 文件
      for (var _key in _localData) {
        localData[_key] = _localData[_key];
      }

      // 写 storage_meta.json
      try {
        fs.writeFileSync(LOCAL_DATA_STORAGE_META_FILE_PATH, JSON.stringify({
          version: LOCAL_DATA_STORAGE_LATEST_VERSION
        }), 'utf8');
      } catch (e) {}
    } else if (storageMeta) {
      // 有 storage_meta.json，是 v4 或以上
      // v4: 读取 hash_key_map.json 并换出所有真实 key
      try {
        hashKeyMap = JSON.parse(fs.readFileSync(LOCAL_DATA_STORAGE_HASH_KEY_MAP_FILE_PATH, 'utf8'));
      } catch (e) {
        hashKeyMap = {};
      }

      for (var hash in hashKeyMap) {
        try {
          _localData[hashKeyMap[hash]] = fs.readFileSync(getDataFilePath(hash), 'utf8');
          keyHashMap[hashKeyMap[hash]] = hash;
        } catch (e) {}
      }

      localData = proxify(_localData);

      // 如果 storage meta 记录的不是最新版本号，更新
      if (storageMeta.version !== LOCAL_DATA_STORAGE_LATEST_VERSION) {
        storageMeta.version = LOCAL_DATA_STORAGE_LATEST_VERSION;
        fs.writeFileSync(LOCAL_DATA_STORAGE_META_FILE_PATH, JSON.stringify(storageMeta), 'utf8');
      }
    } else {
      // 没有 storage_meta.json，认为是数据损坏了
      // 按理来说应该走进第一个 if 分支，这里不会进入，只是预留个 backup
      localData = proxify({});
    }
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
    },

    getUpdateHistory: function getUpdateHistory() {
      if (!this._versionUpdateHistory) {
        try {
          this._versionUpdateHistory = JSON.parse(getItem(config.VERSION_UPDATE_HISTORY)) || [];
          return this._versionUpdateHistory;
        } catch (e) {}
        this._versionUpdateHistory = [];
      }
      return this._versionUpdateHistory;
    },
    setUpdateHistory: function setUpdateHistory(history) {
      if (history === undefined) {
        this._versionUpdateHistory = [];
      }

      var type = Object.prototype.toString.call(history);
      if (type === '[object Array]') {
        this._versionUpdateHistory = [].concat(_toConsumableArray(history));
      }

      if (type === '[object String]') {
        if (!this._versionUpdateHistory) {
          this.getUpdateHistory();
        }

        if (this._versionUpdateHistory.indexOf(history) === -1) {
          this._versionUpdateHistory.push(history);
        }
      }

      setItem(config.VERSION_UPDATE_HISTORY, JSON.stringify(this._versionUpdateHistory));
    }
  };
})();