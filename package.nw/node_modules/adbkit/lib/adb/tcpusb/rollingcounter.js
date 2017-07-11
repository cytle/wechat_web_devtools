var RollingCounter;

RollingCounter = (function() {
  function RollingCounter(max, min) {
    this.max = max;
    this.min = min != null ? min : 1;
    this.now = this.min;
  }

  RollingCounter.prototype.next = function() {
    if (!(this.now < this.max)) {
      this.now = this.min;
    }
    return ++this.now;
  };

  return RollingCounter;

})();

module.exports = RollingCounter;
