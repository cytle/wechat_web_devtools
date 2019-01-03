/*eslint no-console: 0*/
var debug = require('debug')('mdns-packet:test:helper');
var Code = require('code');   // assertion library
var expect = Code.expect;

var fs = require('fs');
var vm = require('vm');
var util = require('util');
var path = require('path');

var dns = require('../');



exports.createJs = function (obj) {
  // var j = JSON.stringify(obj);
  // obj = JSON.parse(j);
  return util.inspect(obj, {depth: null});
};

exports.writeBin = function (filename, buf) {
  var ws = fs.createWriteStream(filename);
  ws.write(buf);
  ws.end();
};

var writeJs = exports.writeJs = function (filename, obj) {
  fs.writeFileSync(filename, exports.createJs(obj));
};


var readBin = exports.readBin = function (filename) {
  return fs.readFileSync(filename);
};

exports.prepareJs = function (text) {
  //replace <Buffer aa bb> with new Buffer("aabb", "hex")
  var matches = text.match(/(<Buffer[ a-f0-9\.]*>)/g);
  if (matches) {
    debug('matches', matches);
    matches.forEach(function (m) {
      var bytes = m.match(/ ([a-f0-9]{2})/g);
      var str = '';
      if (bytes !== null) {
        str = bytes.join('');
        str = str.replace(/ /g, '');
        str = str.replace(/\./g, '');
      }
      var r = 'new Buffer("' + str + '", "hex")';
      text = text.replace(m, r);
    });
  }
  //[Getter]
  text = text.replace(/\[Getter\]/g, 'undefined');
  return text;
};

var readJs = exports.readJs = function (filename) {
  if (!fs.existsSync(filename)) {
    return false;
  }
  var js = exports.prepareJs('foo = ' + fs.readFileSync(filename, 'utf8'));
  var sandbox = {
    Buffer: Buffer
  };
  return vm.runInNewContext(js, sandbox, filename);
};

exports.equalJs = function (expected, actual) {
  var e = exports.createJs(expected);
  var a = exports.createJs(actual);
  expect(a, 'Objects are not the same').to.equal(e);
};

exports.equalBuffer = function (expected, actual, start) {
  start = start || 0;
  for (var i = start; i < expected.length; i++) {
    var e = expected.toString('hex', i, i + 1);
    var a = actual.toString('hex', i, i + 1);
    var msg = util.format('offset %s', i.toString(16));
    expect(a, msg).to.equal(e);
  }
};

var equalDeep = exports.equalDeep = function (expected, actual, objpath) {

  var np = objpath || 'root';
  function dp (a, b) {
    return a + '.' + b;
  }

  for (var key in expected) {
    if (expected.hasOwnProperty(key)) {
      debug('looking at key `%s` in `%s`', key, objpath);
      if (key === 'payload') {
        debug('payload is deprecated!!!');
        continue;
      }
      if (actual instanceof Array) {
        expect(actual[key]).to.exist();
      }
      else {
        debug('actual value `%j`. expecting it to include key:`%s`...', actual, key);
        expect(actual, objpath).to.include(key);
        debug('...it did');
      }
      var a = actual[key];
      var e = expected[key];
      var prop;
      try {
        prop = Object.getOwnPropertyDescriptor(actual, key);
      }
      catch (err) {
        console.error('key:`%s`, actual:`%s` of type `%s` got an error', key, actual, typeof actual, err);
        throw err;
      }
      if (e instanceof Buffer) {
        expect(a, 'not matching length of ' + dp(np, key))
        .to.have.length(e.length);

        expect(a.toString('hex'), 'buffer not same in ' + dp(np, key))
        .to.equal(e.toString('hex'));
      }
      else if (typeof e === 'object') {
        debug('expected is an `object` and actual is `%s`', typeof a);
        expect(typeof a).not.to.equal('string');
        equalDeep(e, a, dp(np, key));
      }
      else {
        debug('it is not a Buffer or object that we are expecting');
        if (key !== 'name') {
          var atype = typeof a;
          if (atype === 'undefined') {
            expect(atype, util.format('type of key `%s` as unexpected', key)).to.equal(typeof e);
          }
          else {
            //don't test getters
            if (!prop.get) {
              expect(a, util.format('%s (%s) is not as expected',
                dp(np, key), atype)).to.equal(e);
            }
          }
        }
        else {
          expect(a, util.format('wrong length of %s', dp(np, key)))
          .to.have.length(e.length);
          debug('actual: %s, expected: %s', a, e);
        }
      }
    }
  }
};


exports.createWritingTests = function (lab, testFolder) {
  //var describe = lab.describe;
  var it = lab.it;

  var files = fs.readdirSync(testFolder).filter(function (f) { return /\.js$/.test(f); });
  files.forEach(function (file) {
    it('can write ' + file, function (done) {
      var js = readJs(path.join(testFolder, file));
      expect(js).to.exist();
      var buff = dns.DNSPacket.toBuffer(js);
      var binFile = path.join(testFolder, file.replace(/\.js$/, '.bin'));
      var bin = readBin(binFile);
      var rtrip = dns.DNSPacket.parse(buff);
      expect(buff).to.have.length(bin.length);
      expect(buff).to.be.deep.equal(bin);
      equalDeep(js, rtrip);
      done();
    });
  });
};

exports.createParsingTests = function (lab, testFolder) {
  //var describe = lab.describe;
  var files = fs.readdirSync(testFolder).filter(function (f) { return /\.bin$/.test(f); });
  files.forEach(function (file) {
    exports.createFileParsingTest(lab, path.join(testFolder, file));
  });
};


exports.createFileParsingTest = function (lab, binFile, withRoundtrip) {
  var it = lab.it;

  it('can parse ' + binFile, function (done) {
      var bin = readBin(binFile);
      var jsfile = binFile.replace(/\.bin$/, '.js');
      var js = readJs(jsfile);
      var ret = dns.DNSPacket.parse(bin);
      debug(binFile, ret);
      if (!js) {
        writeJs(jsfile, ret);
      }
      else {
        equalDeep(js, ret);
        //equalJs(js, ret);
      }
      // //roundtrip
      if (withRoundtrip) {
        debug('roundtrip. js to bin');
        var newbin = dns.DNSPacket.toBuffer(ret);
        expect(newbin).to.deep.equal(bin);
      }
      done();
    });
};
