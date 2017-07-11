var Entry, Stats,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Stats = require('./stats');

Entry = (function(superClass) {
  extend(Entry, superClass);

  function Entry(name, mode, size, mtime) {
    this.name = name;
    Entry.__super__.constructor.call(this, mode, size, mtime);
  }

  Entry.prototype.toString = function() {
    return this.name;
  };

  return Entry;

})(Stats);

module.exports = Entry;
