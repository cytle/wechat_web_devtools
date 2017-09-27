(function() {
  var Queue;

  Queue = (function() {
    function Queue() {
      this.head = null;
      this.tail = null;
    }

    Queue.prototype.enqueue = function(item) {
      if (this.tail) {
        this.tail.next = item;
      } else {
        this.head = item;
      }
      this.tail = item;
    };

    Queue.prototype.dequeue = function() {
      var item;
      item = this.head;
      if (item) {
        if (item === this.tail) {
          this.tail = null;
        }
        this.head = item.next;
        item.next = null;
      }
      return item;
    };

    return Queue;

  })();

  module.exports = Queue;

}).call(this);
