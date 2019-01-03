var util = require('util');


function MalformedPacket(/*message*/) {
  Error.call(this);
  this.message = util.format.apply(null, arguments);
}

util.inherits(MalformedPacket, Error);

module.exports.MalformedPacket = MalformedPacket;
