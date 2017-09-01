'use strict';

(function () {
  var uuidv4 = require('uuid/v4');
  var config = require('./d56923640b8ac272d7cb4e171975fdc5.js');

  var getType = function getType(value) {
    return Object.prototype.toString.call(value).slice(8, -1);
  };

  var getProjectListFromOldVersion = function getProjectListFromOldVersion() {
    var projectList = localStorage.getItem(config.OLD_PROJECT_LIST);
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
    localStorage.removeItem(config.OLD_PROJECT_LIST);
    return projectList;
  };

  var getItem = function getItem(key) {
    return localStorage.getItem(key);
  };

  var setItem = function setItem(key, item) {
    localStorage.setItem(key, item);
  };

  var removeItem = function removeItem(key) {
    localStorage.removeItem(key);
  };

  var checkVersion = function checkVersion(current) {
    var version = localStorage.getItem(config.VERSION);
    if (!version) {
      // 重构前的旧版本 或者 卸载后重装
      var projectList = getProjectListFromOldVersion();

      for (var id in projectList) {
        localStorage.setItem('' + config.PROJECT_PREFIX + id, JSON.stringify(projectList[id]));
      }
      // localStorage.setItem(config.PROJECT_LIST, JSON.stringify(projectList))
    }
    localStorage.setItem(config.VERSION, current + '');
  };
  checkVersion(config.CURRENT_VERSION);

  module.exports = {
    get projectList() {
      if (!this._projectList) {
        try {
          var list = {};
          for (var key in localStorage) {
            try {
              if (key.startsWith(config.PROJECT_PREFIX)) {
                var project = JSON.parse(localStorage.getItem(key));
                list[project.projectid] = project;
              }
            } catch (e) {
              localStorage.removeItem(key);
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
      localStorage.setItem('' + config.PROJECT_PREFIX + id, JSON.stringify(newData));
    },
    removeProject: function removeProject(id) {
      delete this._projectList[id];
      this._recentProjects = null;
      localStorage.removeItem('' + config.PROJECT_PREFIX + id);
    },
    clearProjectList: function clearProjectList() {
      this._projectList = {};
      for (var key in localStorage) {
        if (key.startsWith(config.PROJECT_PREFIX)) {
          localStorage.removeItem(key);
        }
      }
    },


    get lastSelect() {
      if (localStorage[config.LAST_SELECT]) {
        if (localStorage[config.LAST_SELECT] !== config.WEB_DEBUGGER) {
          return localStorage[config.LAST_SELECT].substr(config.PROJECT_PREFIX.length);
        } else {
          return config.WEB_DEBUGGER;
        }
      }
    },

    set lastSelect(projectid) {

      if (!projectid) {
        localStorage.setItem(config.LAST_SELECT, null);
        return;
      }

      if (projectid !== config.WEB_DEBUGGER) {
        localStorage.setItem(config.LAST_SELECT, '' + config.PROJECT_PREFIX + projectid);

        var ind = this._recentProjects.findIndex(function (id) {
          return projectid === id;
        });

        if (ind < 0) {
          this._recentProjects.unshift(projectid);

          if (this._recentProjects.length > 11) {
            this._recentProjects = this._recentProjects.slice(0, 11);
          }

          localStorage.setItem(config.RECENT_PROJECTS, JSON.stringify(this._recentProjects));
        } else if (ind > 0) {
          for (var i = ind - 1; i >= 0; i--) {
            this._recentProjects[i + 1] = this._recentProjects[i];
          }
          this._recentProjects[0] = projectid;

          localStorage.setItem(config.RECENT_PROJECTS, JSON.stringify(this._recentProjects));
        }
      } else {
        localStorage.setItem(config.LAST_SELECT, projectid);
      }
    },

    get recentProjects() {
      var _this = this;

      if (!this._recentProjects) {
        var recentProjects = JSON.parse(localStorage[config.RECENT_PROJECTS] || '[]');
        var updated = recentProjects.filter(function (id) {
          return _this.projectList[id];
        });

        if (recentProjects.length !== updated.length) {
          localStorage.setItem(config.RECENT_PROJECTS, JSON.stringify(updated));
        }

        this._recentProjects = updated;

        return updated.length > 1 ? updated.slice(1) : [];
      } else {
        return this._recentProjects.length > 1 ? this._recentProjects.slice(1) : [];
      }
    },

    set recentProjects(value) {
      return true;
    },

    removeNewVersion: function removeNewVersion() {
      this._newVersion = undefined;
      localStorage.removeItem(confog.NEW_VERSION);
    },


    get userInfo() {
      if (!this._userInfo) {
        try {
          this._userInfo = JSON.parse(getItem(config.USER_INFO)) || {};
        } catch (e) {
          this._userInfo = {};
        }
      }
      return this._userInfo;
    },

    set userInfo(value) {
      if (getType(value) === 'Object') {
        setItem(config.USER_INFO, JSON.stringify(value));
        this._userInfo = value;
      }
    },

    get syncKey() {
      if (!this._syncKey) {
        try {
          var data = JSON.parse(getItem(config.SYNC_KEY));
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
          var data = JSON.stringify(getItem(config.BATCH_SYNC_KEY));
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
        setting = JSON.parse(getItem(config.SETTINGS));
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
        fileinfo = JSON.parse(getItem(config.QCLOUD_FILEINFO));
      } catch (e) {
        fileinfo = {};
      }
      return fileinfo;
    },

    set qcloudFileInfo(value) {
      try {
        setItem(config.QCLOUD_FILEINFO, JSON.stringify(value));
      } catch (e) {}
    }
  };
})();