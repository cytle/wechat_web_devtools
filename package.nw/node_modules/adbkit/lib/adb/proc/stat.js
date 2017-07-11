var EventEmitter, Parser, ProcStat, split,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

EventEmitter = require('events').EventEmitter;

split = require('split');

Parser = require('../parser');

ProcStat = (function(superClass) {
  var RE_COLSEP, RE_CPULINE;

  extend(ProcStat, superClass);

  RE_CPULINE = /^cpu[0-9]+ .*$/mg;

  RE_COLSEP = /\ +/g;

  function ProcStat(sync) {
    this.sync = sync;
    this.interval = 1000;
    this.stats = this._emptyStats();
    this._ignore = {};
    this._timer = setInterval((function(_this) {
      return function() {
        return _this.update();
      };
    })(this), this.interval);
    this.update();
  }

  ProcStat.prototype.end = function() {
    clearInterval(this._timer);
    this.sync.end();
    return this.sync = null;
  };

  ProcStat.prototype.update = function() {
    return new Parser(this.sync.pull('/proc/stat')).readAll().then((function(_this) {
      return function(out) {
        return _this._parse(out);
      };
    })(this))["catch"]((function(_this) {
      return function(err) {
        _this._error(err);
      };
    })(this));
  };

  ProcStat.prototype._parse = function(out) {
    var cols, i, len, line, match, stats, total, type, val;
    stats = this._emptyStats();
    while (match = RE_CPULINE.exec(out)) {
      line = match[0];
      cols = line.split(RE_COLSEP);
      type = cols.shift();
      if (this._ignore[type] === line) {
        continue;
      }
      total = 0;
      for (i = 0, len = cols.length; i < len; i++) {
        val = cols[i];
        total += +val;
      }
      stats.cpus[type] = {
        line: line,
        user: +cols[0] || 0,
        nice: +cols[1] || 0,
        system: +cols[2] || 0,
        idle: +cols[3] || 0,
        iowait: +cols[4] || 0,
        irq: +cols[5] || 0,
        softirq: +cols[6] || 0,
        steal: +cols[7] || 0,
        guest: +cols[8] || 0,
        guestnice: +cols[9] || 0,
        total: total
      };
    }
    return this._set(stats);
  };

  ProcStat.prototype._set = function(stats) {
    var cur, found, id, loads, m, old, ref, ticks;
    loads = {};
    found = false;
    ref = stats.cpus;
    for (id in ref) {
      cur = ref[id];
      old = this.stats.cpus[id];
      if (!old) {
        continue;
      }
      ticks = cur.total - old.total;
      if (ticks > 0) {
        found = true;
        m = 100 / ticks;
        loads[id] = {
          user: Math.floor(m * (cur.user - old.user)),
          nice: Math.floor(m * (cur.nice - old.nice)),
          system: Math.floor(m * (cur.system - old.system)),
          idle: Math.floor(m * (cur.idle - old.idle)),
          iowait: Math.floor(m * (cur.iowait - old.iowait)),
          irq: Math.floor(m * (cur.irq - old.irq)),
          softirq: Math.floor(m * (cur.softirq - old.softirq)),
          steal: Math.floor(m * (cur.steal - old.steal)),
          guest: Math.floor(m * (cur.guest - old.guest)),
          guestnice: Math.floor(m * (cur.guestnice - old.guestnice)),
          total: 100
        };
      } else {
        this._ignore[id] = cur.line;
        delete stats.cpus[id];
      }
    }
    if (found) {
      this.emit('load', loads);
    }
    return this.stats = stats;
  };

  ProcStat.prototype._error = function(err) {
    return this.emit('error', err);
  };

  ProcStat.prototype._emptyStats = function() {
    return {
      cpus: {}
    };
  };

  return ProcStat;

})(EventEmitter);

module.exports = ProcStat;
