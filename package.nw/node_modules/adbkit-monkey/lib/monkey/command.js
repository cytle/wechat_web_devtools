(function() {
  var Command;

  Command = (function() {
    function Command(command, callback) {
      this.command = command;
      this.callback = callback;
      this.next = null;
    }

    return Command;

  })();

  module.exports = Command;

}).call(this);
