"use strict";

var NodeGit = require("../");
var Status = NodeGit.Status;

var StatusFile = function StatusFile(args) {
  var path = args.path;
  var status = args.status;
  var entry = args.entry;

  if (entry) {
    status = entry.status();
    if (entry.indexToWorkdir()) {
      path = entry.indexToWorkdir().newFile().path();
    } else {
      path = entry.headToIndex().newFile().path();
    }
  }

  var codes = Status.STATUS;

  var getStatus = function getStatus() {
    var fileStatuses = [];

    for (var key in Status.STATUS) {
      if (status & Status.STATUS[key]) {
        fileStatuses.push(key);
      }
    }

    return fileStatuses;
  };

  var data = {
    path: path,
    entry: entry,
    statusBit: status,
    statuses: getStatus()
  };

  return {
    headToIndex: function headToIndex() {
      if (data.entry) {
        return entry.headToIndex();
      } else {
        return undefined;
      }
    },
    indexToWorkdir: function indexToWorkdir() {
      if (data.entry) {
        return entry.indexToWorkdir();
      } else {
        return undefined;
      }
    },
    inIndex: function inIndex() {
      return status & codes.INDEX_NEW || status & codes.INDEX_MODIFIED || status & codes.INDEX_DELETED || status & codes.INDEX_TYPECHANGE || status & codes.INDEX_RENAMED;
    },
    inWorkingTree: function inWorkingTree() {
      return status & codes.WT_NEW || status & codes.WT_MODIFIED || status & codes.WT_DELETED || status & codes.WT_TYPECHANGE || status & codes.WT_RENAMED;
    },
    isConflicted: function isConflicted() {
      return status & codes.CONFLICTED;
    },
    isDeleted: function isDeleted() {
      return status & codes.WT_DELETED || status & codes.INDEX_DELETED;
    },
    isIgnored: function isIgnored() {
      return status & codes.IGNORED;
    },
    isModified: function isModified() {
      return status & codes.WT_MODIFIED || status & codes.INDEX_MODIFIED;
    },
    isNew: function isNew() {
      return status & codes.WT_NEW || status & codes.INDEX_NEW;
    },
    isRenamed: function isRenamed() {
      return status & codes.WT_RENAMED || status & codes.INDEX_RENAMED;
    },
    isTypechange: function isTypechange() {
      return status & codes.WT_TYPECHANGE || status & codes.INDEX_TYPECHANGE;
    },
    path: function path() {
      return data.path;
    },
    status: function status() {
      return data.statuses;
    },
    statusBit: function statusBit() {
      return data.statusBit;
    }
  };
};

NodeGit.StatusFile = StatusFile;