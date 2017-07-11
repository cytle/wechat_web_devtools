(function() {
  var Entry;

  Entry = (function() {
    function Entry() {
      this.date = null;
      this.pid = -1;
      this.tid = -1;
      this.priority = null;
      this.tag = null;
      this.message = null;
    }

    Entry.prototype.setDate = function(date) {
      this.date = date;
    };

    Entry.prototype.setPid = function(pid) {
      this.pid = pid;
    };

    Entry.prototype.setTid = function(tid) {
      this.tid = tid;
    };

    Entry.prototype.setPriority = function(priority) {
      this.priority = priority;
    };

    Entry.prototype.setTag = function(tag) {
      this.tag = tag;
    };

    Entry.prototype.setMessage = function(message) {
      this.message = message;
    };

    Entry.prototype.toBinary = function() {
      var buffer, cursor, length;
      length = 20;
      length += 1;
      length += this.tag.length;
      length += 1;
      length += this.message.length;
      length += 1;
      buffer = new Buffer(length);
      cursor = 0;
      buffer.writeUInt16LE(length - 20, cursor);
      cursor += 4;
      buffer.writeInt32LE(this.pid, cursor);
      cursor += 4;
      buffer.writeInt32LE(this.tid, cursor);
      cursor += 4;
      buffer.writeInt32LE(Math.floor(this.date.getTime() / 1000), cursor);
      cursor += 4;
      buffer.writeInt32LE((this.date.getTime() % 1000) * 1000000, cursor);
      cursor += 4;
      buffer[cursor] = this.priority;
      cursor += 1;
      buffer.write(this.tag, cursor, this.tag.length);
      cursor += this.tag.length;
      buffer[cursor] = 0x00;
      cursor += 1;
      buffer.write(this.message, cursor, this.message.length);
      cursor += this.message.length;
      buffer[cursor] = 0x00;
      return buffer;
    };

    return Entry;

  })();

  module.exports = Entry;

}).call(this);
