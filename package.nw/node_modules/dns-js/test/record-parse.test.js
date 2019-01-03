var Code = require('code');   // assertion library
var Lab = require('lab');
var lab = exports.lab = Lab.script();

var describe = lab.describe;
var it = lab.it;
//var before = lab.before;
//var after = lab.after;
var expect = Code.expect;

var DNSRecord = require('../lib/dnsrecord');
//var BufferConsumer = require('../lib/bufferconsumer');
//var helper = require('./helper');


describe('DNSRecord (Parse)', function () {
  describe('OPT', function () {
    it('parse OPT', function (done) {
      var buf = new Buffer('00002905a000001194000c00040008000008002700d4b4',
        'hex');
      var r = DNSRecord.parse(buf);
      expect(r).to.include('opt');
      expect(r.opt).to.include(['rcode', 'z', 'version', 'code', 'data', 'do']);
      expect(r.opt.z, 'z').to.equal(0x1194);
      done();
    });

    it('parse OPT rcode', function (done) {
      var buf = new Buffer('00002905a00F001194000c00040008000008002700d4b4',
        'hex');
      var r = DNSRecord.parse(buf);
      expect(r.opt.rcode, 'rcode').to.equal(0x0f);
      done();
    });

    it('parse OPT version', function (done) {
      var buf = new Buffer('00002905a0001f1194000c00040008000008002700d4b4',
        'hex');
      var r = DNSRecord.parse(buf);
      expect(r.opt.version, 'version').to.equal(0x1f);
      done();
    });

    it('parse OPT do', function (done) {
      var buf = new Buffer('00002905a000009194000c00040008000008002700d4b4',
        'hex');
      var r = DNSRecord.parse(buf);
      expect(r.opt.do, 'do').to.equal(1);
      done();
    });
  });//OPT


  describe('A - TTL', function () {
    it('parse A TTL=0', function (done) {
      var buf = new Buffer('00000180010000000000040a500a22',
        'hex');
      var r = DNSRecord.parse(buf);
      expect(r.type).to.equal(DNSRecord.Type.A);
      expect(r.ttl).to.equal(0);
      done();
    });

    it('parse A TTL=20', function (done) {
      var buf = new Buffer('00000180010000001400040a500a22',
        'hex');
      var r = DNSRecord.parse(buf);
      expect(r.type).to.equal(DNSRecord.Type.A);
      expect(r.ttl).to.equal(20);
      done();
    });
  });//A-TTL
});
