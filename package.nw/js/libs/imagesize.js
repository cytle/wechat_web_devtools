// {
//   "name": "imagesize",
//   "version": "1.0.0",
//   "description": "Get the size of an image without reading or downloading it entirely",
//   "main": "index.js",
//   "directories": {
//     "test": "tests"
//   },
//   "scripts": {
//     "test": "nodeunit tests"
//   },
//   "repository": {
//     "type": "git",
//     "url": "git://github.com/arnaud-lb/imagesize.js.git"
//   },
//   "keywords": [
//     "image",
//     "size"
//   ],
//   "author": "Arnaud Le Blanc <arnaud.lb@gmail.com>",
//   "license": "BSD",
//   "readmeFilename": "README.md"
// }
// https://github.com/arnaud-lb/imagesize.js

var SIGS = {
  GIF: new Buffer("GIF")
  ,PNG: new Buffer([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])
  ,JPG: new Buffer([0xff, 0xd8, 0xff])
};

function checkSig(buffer, sig) {
  return buffer.slice(0, sig.length) == sig.toString();
}

function Parser(options) {

  options = options || {debug: false};

  var data = new Buffer(16);
  var dataLength = 0;
  var state = sig;
  var result = null;

  var debug;

  if (options.debug) {
    debug = function() {
      console.log.apply(console, arguments);
    };
  } else {
    debug = function(){};
  }

  function switchState(newState) {
    state = newState;
    debug('switch state', state.name);
    return state();
  }

  function sig() {

    if (dataLength < 3) {
      return Parser.EOF;
    }

    if (checkSig(data, SIGS.GIF)) {
      debug('got a gif');
      return switchState(gif);
    }

    if (checkSig(data, SIGS.JPG)) {
      debug('got a jpeg');
      return switchState(jpeg);
    }

    if (dataLength < 8) {
      return Parser.EOF;
    }

    if (checkSig(data, SIGS.PNG)) {
      debug('got a png');
      return switchState(png);
    }

    return Parser.INVALID;
  }

  function gif() {

    if (dataLength < 10) {
      return Parser.EOF;
    }

    result = {
      format: 'gif'
      , width: data.readUInt16LE(6)
      , height: data.readUInt16LE(8)
    };

    return Parser.DONE;
  }

  function png() {

    if (dataLength < 24) {
      return Parser.EOF;
    }

    result = {
      format: 'png'
      , width: data.readUInt32BE(16)
      , height: data.readUInt32BE(20)
    };

    return Parser.DONE;
  }

  /* The following code was largely inspired from php's core getimagesize()
   * function */
  function jpeg() {

    const M_PSEUDO = 0xFFD8;

    /* some defines for the different JPEG block types */
    const M_SOF0 =   0xC0; /* Start Of Frame N */
    const M_SOF1 =   0xC1; /* N indicates which compression process */
    const M_SOF2 =   0xC2; /* Only SOF0-SOF2 are now in common use */
    const M_SOF3 =   0xC3;
    const M_SOF5 =   0xC5; /* NB: codes C4 and CC are NOT SOF markers */
    const M_SOF6 =   0xC6;
    const M_SOF7 =   0xC7;
    const M_SOF9 =   0xC9;
    const M_SOF10 =  0xCA;
    const M_SOF11 =  0xCB;
    const M_SOF13 =  0xCD;
    const M_SOF14 =  0xCE;
    const M_SOF15 =  0xCF;
    const M_SOI =    0xD8;
    const M_EOI =    0xD9; /* End Of Image (end of datastream) */
    const M_SOS =    0xDA; /* Start Of Scan (begins compressed data) */
    const M_APP0 =   0xE0;
    const M_APP1 =   0xE1;
    const M_APP2 =   0xE2;
    const M_APP3 =   0xE3;
    const M_APP4 =   0xE4;
    const M_APP5 =   0xE5;
    const M_APP6 =   0xE6;
    const M_APP7 =   0xE7;
    const M_APP8 =   0xE8;
    const M_APP9 =   0xE9;
    const M_APP10 =  0xEA;
    const M_APP11 =  0xEB;
    const M_APP12 =  0xEC;
    const M_APP13 =  0xED;
    const M_APP14 =  0xEE;
    const M_APP15 =  0xEF;
    const M_COM =    0xFE;/* COMment */

    var i = 2;
    var marker = M_PSEUDO;

    return switchState(nextMarker);

    function nextMarker() {

      var newMarker;
      var prevMarker = marker;
      var commentCorrection;
      var a = 0;

      if (M_COM == prevMarker) {
        commentCorrection = 2;
      } else {
        commentCorrection = 0;
      }

      if (i >= dataLength) {
        return Parser.EOF;
      }

      do {
        if (i+a >= dataLength) {
          return Parser.EOF;
        }

        newMarker = data.readUInt8(i+a);

        debug('newMarker', newMarker.toString(16));

        if (M_COM == prevMarker && 0 < commentCorrection) {
          if (0xFF != newMarker) {
            newMarker = 0xFF;
            commentCorrection--;
          } else {
            prevMarker = M_PSEUDO; /* stop skipping non 0xff for M_COM */
          }
        }

        a++;

      } while (0xFF == newMarker);

      if (2 > a) {
        debug('less than 2 bytes were read');
        return Parser.INVALID; /* at least one 0xff is needed before marker code */
      }
      if (M_COM == prevMarker && commentCorrection) {
        debug('M_COM and less than 2 bytes were read');
        return Parser.INVALID; /* ah illegal: char after COM section not 0xFF */
      }

      debug('marker', newMarker.toString(16));

      i += a;
      marker = newMarker;

      return switchState(blockBody);
    }

    function blockBody() {
      switch (marker) {
      case M_SOF0:
      case M_SOF1:
      case M_SOF2:
      case M_SOF3:
      case M_SOF5:
      case M_SOF6:
      case M_SOF7:
      case M_SOF9:
      case M_SOF10:
      case M_SOF11:
      case M_SOF13:
      case M_SOF14:
      case M_SOF15:
        /* handle SOFn block */
        if (i + 2 + 1 + 2 + 2 >= dataLength) {
          return Parser.EOF;
        }
        result = {
          format: 'jpeg'
          , width: data.readUInt16BE(i+5)
          , height: data.readUInt16BE(i+3)
        };
        return Parser.DONE;
      case M_SOS:
      case M_EOI:
        debug('M_SOS/M_EOI, the end');
        return Parser.INVALID;
      default:
        if (i + 2 >= dataLength) {
          return Parser.EOF;
        }
        var length = data.readUInt16BE(i);
        debug('skipping block; length is', length);
        i += length;
        return switchState(nextMarker);
      }
    }
  }

  function parse(chunk) {

    if (chunk.length + dataLength > data.length) {

      var newLength = data.length;

      do {
        newLength <<= 1;
      } while (chunk.length + dataLength > newLength);

      var newData = new Buffer(newLength);
      data.copy(newData);
      data = newData;
    }

    chunk.copy(data, dataLength)
    dataLength += chunk.length

    return state();
  }

  function getResult() {
    return result;
  }

  return {
    parse: parse
    , getResult: getResult
  };
}

Parser.EOF = 2;     // feed moar
Parser.DONE = 3;    // result is ready
Parser.INVALID = 4; // invalid image

/* Convenience function for getting the size of an image from a stream */
function imagesize(stream, cb) {

  var parser = Parser();

  var done = function (err, result) {
    stream.removeListener('data', handleData);
    stream.removeListener('end', handleEnd);
    cb(err, result);
  };

  var handleEnd = function () {
    done('invalid');
  };

  var handleData = function (data) {
    switch (parser.parse(data)) {
    case Parser.INVALID:
      done('invalid');
      break;
    case Parser.DONE:
      done(null, parser.getResult());
      break;
    }
  };

  stream.on('data', handleData);
  stream.on('end', handleEnd);
}

module.exports = imagesize;
module.exports.Parser = Parser;
