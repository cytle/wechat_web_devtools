var Protocol;

Protocol = (function() {
  function Protocol() {}

  Protocol.OKAY = 'OKAY';

  Protocol.FAIL = 'FAIL';

  Protocol.STAT = 'STAT';

  Protocol.LIST = 'LIST';

  Protocol.DENT = 'DENT';

  Protocol.RECV = 'RECV';

  Protocol.DATA = 'DATA';

  Protocol.DONE = 'DONE';

  Protocol.SEND = 'SEND';

  Protocol.QUIT = 'QUIT';

  Protocol.decodeLength = function(length) {
    return parseInt(length, 16);
  };

  Protocol.encodeLength = function(length) {
    return ('0000' + length.toString(16)).slice(-4).toUpperCase();
  };

  Protocol.encodeData = function(data) {
    if (!Buffer.isBuffer(data)) {
      data = new Buffer(data);
    }
    return Buffer.concat([new Buffer(Protocol.encodeLength(data.length)), data]);
  };

  return Protocol;

})();

module.exports = Protocol;
