var Packet;

Packet = (function() {
  Packet.A_SYNC = 0x434e5953;

  Packet.A_CNXN = 0x4e584e43;

  Packet.A_OPEN = 0x4e45504f;

  Packet.A_OKAY = 0x59414b4f;

  Packet.A_CLSE = 0x45534c43;

  Packet.A_WRTE = 0x45545257;

  Packet.A_AUTH = 0x48545541;

  Packet.checksum = function(data) {
    var char, i, len, sum;
    sum = 0;
    if (data) {
      for (i = 0, len = data.length; i < len; i++) {
        char = data[i];
        sum += char;
      }
    }
    return sum;
  };

  Packet.magic = function(command) {
    return (command ^ 0xffffffff) >>> 0;
  };

  Packet.assemble = function(command, arg0, arg1, data) {
    var chunk;
    if (data) {
      chunk = new Buffer(24 + data.length);
      chunk.writeUInt32LE(command, 0);
      chunk.writeUInt32LE(arg0, 4);
      chunk.writeUInt32LE(arg1, 8);
      chunk.writeUInt32LE(data.length, 12);
      chunk.writeUInt32LE(Packet.checksum(data), 16);
      chunk.writeUInt32LE(Packet.magic(command), 20);
      data.copy(chunk, 24);
      return chunk;
    } else {
      chunk = new Buffer(24);
      chunk.writeUInt32LE(command, 0);
      chunk.writeUInt32LE(arg0, 4);
      chunk.writeUInt32LE(arg1, 8);
      chunk.writeUInt32LE(0, 12);
      chunk.writeUInt32LE(0, 16);
      chunk.writeUInt32LE(Packet.magic(command), 20);
      return chunk;
    }
  };

  Packet.swap32 = function(n) {
    var buffer;
    buffer = new Buffer(4);
    buffer.writeUInt32LE(n, 0);
    return buffer.readUInt32BE(0);
  };

  function Packet(command1, arg01, arg11, length, check, magic, data1) {
    this.command = command1;
    this.arg0 = arg01;
    this.arg1 = arg11;
    this.length = length;
    this.check = check;
    this.magic = magic;
    this.data = data1;
  }

  Packet.prototype.verifyChecksum = function() {
    return this.check === Packet.checksum(this.data);
  };

  Packet.prototype.verifyMagic = function() {
    return this.magic === Packet.magic(this.command);
  };

  Packet.prototype.toString = function() {
    var type;
    type = (function() {
      switch (this.command) {
        case Packet.A_SYNC:
          return "SYNC";
        case Packet.A_CNXN:
          return "CNXN";
        case Packet.A_OPEN:
          return "OPEN";
        case Packet.A_OKAY:
          return "OKAY";
        case Packet.A_CLSE:
          return "CLSE";
        case Packet.A_WRTE:
          return "WRTE";
        case Packet.A_AUTH:
          return "AUTH";
        default:
          throw new Error("Unknown command {@command}");
      }
    }).call(this);
    return type + " arg0=" + this.arg0 + " arg1=" + this.arg1 + " length=" + this.length;
  };

  return Packet;

})();

module.exports = Packet;
