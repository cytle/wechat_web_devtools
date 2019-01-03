var Code = require('code');   // assertion library
var Lab = require('lab');
var lab = exports.lab = Lab.script();

var describe = lab.describe;
var it = lab.it;
//var before = lab.before;
//var after = lab.after;
var expect = Code.expect;

var path = require('path');
var helper = require('./helper');
var fs = require('fs');

var Packet = require('..').DNSPacket;
//var fixtureDir = path.join(__dirname, 'fixtures');
var packets = require('./packets.json');

// var TestObj = function () {
//   this.subprop = {
//     a: 1,
//     b: 2
//   };
//   this.__defineGetter__('getMe', function () {
//     return 'got it';
//   });
// };


describe('helper', function () {

  it('prepareJs', function (done) {
    //this is a tricky one
    var filename = path.join(__dirname, 'fixtures', 'mdns-inbound-type47.js');
    var text = fs.readFileSync(filename, 'utf8');
    var js = helper.prepareJs(text);
    expect(js).to.be.a.string();
    expect(js).to.match(/new Buffer\(/);
    done();
  });

  it('readJs', function (done) {
    var filename = path.join(__dirname, 'fixtures', 'mdns-inbound-type47.js');
    var js = helper.readJs(filename);
    expect(js).to.exist();
    expect(js).to.include('header');
    done();
  });

  it('readBin', function (done) {
    var filename = path.join(__dirname, 'fixtures', 'mdns-readynas.bin');
    var b = helper.readBin(filename);
    expect(b).to.be.instanceOf(Buffer);
    done();
  });

  describe('from buffer', function () {
    var b = new Buffer(packets.in.sample10, 'hex');
    it('writeJs', function (done) {
      helper.writeBin(path.join('./', 'test.bin.log'), b);
      done();
    });
    it('writeJs', function (done) {
      helper.writeJs(path.join('./', 'test.js.log'), Packet.parse(b));
      done();
    });
  });

});
