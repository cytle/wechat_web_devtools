var Fs, Stats,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Fs = require('fs');

Stats = (function(superClass) {
  extend(Stats, superClass);

  Stats.S_IFMT = 0xf000;

  Stats.S_IFSOCK = 0xc000;

  Stats.S_IFLNK = 0xa000;

  Stats.S_IFREG = 0x8000;

  Stats.S_IFBLK = 0x6000;

  Stats.S_IFDIR = 0x4000;

  Stats.S_IFCHR = 0x2000;

  Stats.S_IFIFO = 0x1000;

  Stats.S_ISUID = 0x800;

  Stats.S_ISGID = 0x400;

  Stats.S_ISVTX = 0x200;

  Stats.S_IRWXU = 0x1c0;

  Stats.S_IRUSR = 0x100;

  Stats.S_IWUSR = 0x80;

  Stats.S_IXUSR = 0x40;

  Stats.S_IRWXG = 0x38;

  Stats.S_IRGRP = 0x20;

  function Stats(mode, size, mtime) {
    this.mode = mode;
    this.size = size;
    this.mtime = new Date(mtime * 1000);
  }

  return Stats;

})(Fs.Stats);

module.exports = Stats;
