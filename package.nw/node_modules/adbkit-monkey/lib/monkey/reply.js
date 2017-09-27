(function() {
  var Reply;

  Reply = (function() {
    Reply.ERROR = 'ERROR';

    Reply.OK = 'OK';

    function Reply(type, value) {
      this.type = type;
      this.value = value;
    }

    Reply.prototype.isError = function() {
      return this.type === Reply.ERROR;
    };

    Reply.prototype.toError = function() {
      if (!this.isError()) {
        throw new Error('toError() cannot be called for non-errors');
      }
      return new Error(this.value);
    };

    return Reply;

  })();

  module.exports = Reply;

}).call(this);
