var Assert, Command, FrameBufferCommand, Protocol, RgbTransform, debug, spawn,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Assert = require('assert');

spawn = require('child_process').spawn;

debug = require('debug')('adb:command:framebuffer');

Command = require('../../command');

Protocol = require('../../protocol');

RgbTransform = require('../../framebuffer/rgbtransform');

FrameBufferCommand = (function(superClass) {
  extend(FrameBufferCommand, superClass);

  function FrameBufferCommand() {
    return FrameBufferCommand.__super__.constructor.apply(this, arguments);
  }

  FrameBufferCommand.prototype.execute = function(format) {
    this._send('framebuffer:');
    return this.parser.readAscii(4).then((function(_this) {
      return function(reply) {
        switch (reply) {
          case Protocol.OKAY:
            return _this.parser.readBytes(52).then(function(header) {
              var meta, stream;
              meta = _this._parseHeader(header);
              switch (format) {
                case 'raw':
                  stream = _this.parser.raw();
                  stream.meta = meta;
                  return stream;
                default:
                  stream = _this._convert(meta, format);
                  stream.meta = meta;
                  return stream;
              }
            });
          case Protocol.FAIL:
            return _this.parser.readError();
          default:
            return _this.parser.unexpected(reply, 'OKAY or FAIL');
        }
      };
    })(this));
  };

  FrameBufferCommand.prototype._convert = function(meta, format, raw) {
    var proc, transform;
    debug("Converting raw framebuffer stream into " + (format.toUpperCase()));
    switch (meta.format) {
      case 'rgb':
      case 'rgba':
        break;
      default:
        debug("Silently transforming '" + meta.format + "' into 'rgb' for `gm`");
        transform = new RgbTransform(meta);
        meta.format = 'rgb';
        raw = this.parser.raw().pipe(transform);
    }
    proc = spawn('gm', ['convert', '-size', meta.width + "x" + meta.height, meta.format + ":-", format + ":-"]);
    raw.pipe(proc.stdin);
    return proc.stdout;
  };

  FrameBufferCommand.prototype._parseHeader = function(header) {
    var meta, offset;
    meta = {};
    offset = 0;
    meta.version = header.readUInt32LE(offset);
    if (meta.version === 16) {
      throw new Error('Old-style raw images are not supported');
    }
    offset += 4;
    meta.bpp = header.readUInt32LE(offset);
    offset += 4;
    meta.size = header.readUInt32LE(offset);
    offset += 4;
    meta.width = header.readUInt32LE(offset);
    offset += 4;
    meta.height = header.readUInt32LE(offset);
    offset += 4;
    meta.red_offset = header.readUInt32LE(offset);
    offset += 4;
    meta.red_length = header.readUInt32LE(offset);
    offset += 4;
    meta.blue_offset = header.readUInt32LE(offset);
    offset += 4;
    meta.blue_length = header.readUInt32LE(offset);
    offset += 4;
    meta.green_offset = header.readUInt32LE(offset);
    offset += 4;
    meta.green_length = header.readUInt32LE(offset);
    offset += 4;
    meta.alpha_offset = header.readUInt32LE(offset);
    offset += 4;
    meta.alpha_length = header.readUInt32LE(offset);
    meta.format = meta.blue_offset === 0 ? 'bgr' : 'rgb';
    if (meta.bpp === 32 || meta.alpha_length) {
      meta.format += 'a';
    }
    return meta;
  };

  return FrameBufferCommand;

})(Command);

module.exports = FrameBufferCommand;
