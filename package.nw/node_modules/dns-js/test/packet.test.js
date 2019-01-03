var Lab = require('lab');
var lab = exports.lab = Lab.script();

var describe = lab.describe;
var it = lab.it;
//var before = lab.before;
//var after = lab.after;
var Code = require('code');   // assertion library
var expect = Code.expect;

//var debug = require('debug')('mdns-packet:test:dns');
var path = require('path');
//var fs = require('fs');

var helper = require('./helper');
var dns = require('../');
var DNSRecord = dns.DNSRecord;
var DNSPacket = dns.DNSPacket;

var fixtureDir = path.join(__dirname, 'fixtures');
var nativeFixtureDir = path.join(__dirname, '..', 'node_modules',
  'native-dns-packet', 'test', 'fixtures');

var NativePacket = require('native-dns-packet');


describe('DNSPacket', function () {

  it('should be able to create a wildcard query', function (done) {
    var packet = new dns.DNSPacket();
    packet.header.rd = 0;
    var query = new dns.DNSRecord(
      '_services._dns-sd._udp.local',
      dns.DNSRecord.Type.PTR,
      1
    );
    packet.question.push(query);
    var buf = dns.DNSPacket.toBuffer(packet);

    //compare fixture
    expect(buf.toString('hex'), 'Not as from fixture').to.equal(
      helper.readBin(
        path.join(fixtureDir, 'mdns-outbound-wildcard-query.bin')
      ).toString('hex'));

    var np = new NativePacket();
    np.header.rd = 0;
    np.question.push(query);
    var nb = new Buffer(4096);
    var written = NativePacket.write(nb, np);
    nb = nb.slice(0, written);

    expect(buf.toString('hex'), 'Not as from native').to.equal(
      nb.toString('hex'));

    done();
  });

  it('should be able to create PTR answer', function (done) {
    var packet = new dns.DNSPacket();
    packet.header.rd = 0;
    packet.header.qr = 1;
    packet.header.aa = 1;
    //query
    var query = new dns.DNSRecord(
      '_services._dns-sd._udp.local',
      dns.DNSRecord.Type.PTR,
      1
    );
    packet.question.push(query);

    //answer
    packet.answer.push({
      name: '_services._dns-sd._udp.local', //reference to first record name
      type: dns.DNSRecord.Type.PTR,
      class: 1,
      ttl: 10,
      data: '_workstation._tcp.local'
    });

    packet.answer.push({
      name: '_services._dns-sd._udp.local', //reference to first record name
      type: dns.DNSRecord.Type.PTR,
      class: 1,
      ttl: 10,
      data: '_udisks-ssh._tcp.local'
    });

    var buf = dns.DNSPacket.toBuffer(packet);

    var pr = dns.DNSPacket.parse(buf);
    var fixture = helper.readBin(
      path.join(fixtureDir, 'mdns-inbound-linux_workstation.bin')
    );

    helper.equalDeep(pr, dns.DNSPacket.parse(fixture));

    //helper.equalBuffer(fixture, buf, 8);
    // //expect(buf.toString('hex')).to.equal(fixStr);
    // var parsed = dns.DNSPacket.parse(buf);
    done();
  });


  it('new packet with flags as input', function (done) {
    var p = new dns.DNSPacket(0x40);
    expect(p.header.res1).to.equal(1);
    done();
  });


  it('should parse SOA', function (done) {
    var inbound = helper.readBin('test/fixtures/dns-soa.bin');
    var packet = dns.DNSPacket.parse(inbound);
    expect(packet.authority).to.have.length(1);

    var auth = packet.authority[0];

    expect(auth.type).to.equal(6);
    expect(auth.typeName).to.equal('SOA');

    expect(auth.primary).to.equal('ns1.google.com');
    expect(auth.admin).to.equal('dns-admin.google.com');
    expect(auth.serial).to.equal(1576192);
    expect(auth.refresh).to.equal(7200);
    expect(auth.retry).to.equal(1800);
    expect(auth.expiration).to.equal(1209600);
    expect(auth.minimum).to.equal(300);

    done();
  });

  it('throw when question does not exist', function (done) {
    var buf = new Buffer('0000840000010000000000000000000000', 'hex');
    expect(fn).to.throw(dns.errors.MalformedPacket, 'Record.type is empty');

    buf = new Buffer('0000840000010000000000000001000000', 'hex');
    expect(fn).to.throw(dns.errors.MalformedPacket, 'Record.class is empty');

    done();
    function fn() {
      dns.parse(buf);
    }
  });

  it('should create reverse lookup', function (done) {
    var expected = '2aa601000001000000000000013801380138013807696e2d61646472046172706100000c0001';
    var packet = new dns.DNSPacket();
    packet.header.id = 0x2aa6;
    packet.question.push(new dns.DNSRecord(
      '8.8.8.8.in-addr.arpa',
      dns.DNSRecord.Type.PTR,
      dns.DNSRecord.Class.IN));
    var buf = dns.DNSPacket.toBuffer(packet);
    expect(buf.toString('hex')).to.equal(expected);
    packet = dns.DNSPacket.parse(buf);
    done();
  });

  it('should create another reverse lookup', function (done) {
    var expected = '10920100000100000000000002353103313637033231310331343007696e2d61646472046172706100000c0001';
    var packet = new dns.DNSPacket();
    packet.header.id = 4242;
    packet.question.push(new dns.DNSRecord(
      '51.167.211.140.in-addr.arpa.',
      dns.DNSRecord.Type.PTR,
      dns.DNSRecord.Class.IN)
    );
    expect(packet.question[0].type).to.equal(dns.DNSRecord.Type.PTR);

    var buf = dns.DNSPacket.toBuffer(packet);
    expect(buf.toString('hex')).to.equal(expected);
    //roundtrpip
    packet = dns.DNSPacket.parse(buf);
    done();
  });

  it('same regardless of id', function (done) {
    var expected1 = '10920100000100000000000002353103313637033231310331343007696e2d61646472046172706100000c0001';
    var expected2 = '00000100000100000000000002353103313637033231310331343007696e2d61646472046172706100000c0001';
    //               00000100000100000000000002353103313637033231310331343007696e2d6164647204617270610000000c0001;

    var r = new DNSRecord(
      '51.167.211.140.in-addr.arpa.',
      DNSRecord.Type.PTR,
      DNSRecord.Class.IN);

    //packet with id
    var p1 = new DNSPacket();
    p1.header.id = 4242;
    p1.question.push(r);
    // console.log('with');
    var buf1 = DNSPacket.toBuffer(p1);
    expect(buf1.toString('hex'), 'buf1').to.equal(expected1);

    //packet without id
    var p2 = new DNSPacket();
    p2.question.push(r);
    // console.log('without');
    var buf2 = DNSPacket.toBuffer(p2);
    expect(buf2.toString('hex'), 'buf2').to.equal(expected2);

    done();
  });




  describe('parsing fixtures', function () {

    describe('basic tests', function () {
      helper.createParsingTests(lab, fixtureDir);
    });

    // it('should do edns OPT RR', {only: true}, function (done) {
    //   var bin = helper.readBin('test/fixtures/mdns-inbound-apple-mobdev.bin');
    //   var p = dns.parse(bin);
    //   //check for opt
    //   expect(p.additional).to.have.length(1);
    //   var opt = p.additional[0].opt;
    //   expect(opt).to.include(['code', 'z', 'version', 'rcode', 'data', 'do']);
    //   expect(opt.code, 'code').to.equal(4);
    //   expect(opt.z, 'z').to.equal(4500);
    //   done();
    // });

  });

  describe('parsing fixtures with roundtrip', function () {
    helper.createFileParsingTest(lab,
      'test/fixtures/www.nodejs.org.cname.bin', true);

    helper.createFileParsingTest(lab,
      'test/fixtures/dns-soa.bin', true);
  });

  // describe('create fixtures', {skip:true}, function () {
  //   helper.createWritingTests(lab, fixtureDir);
  // });

  describe('parsing exploits', function () {
    it('zlip-1', function (done) {
      var bin = helper.readBin('test/fixtures/exploits/zlip-1.bin');
      expect(fn).to.throw(dns.errors.MalformedPacket,
        'Unexpectedly big section count: 83258. Missing at least 416225 bytes.'
      );
      done();
      function fn() {
        dns.parse(bin);
        done('should fail');
      }
    });

    it('zlip-2', function (done) {
      var bin = helper.readBin('test/fixtures/exploits/zlip-2.bin');
      expect(fn).to.throw(dns.errors.MalformedPacket,
        'Unexpectedly big section count: 83258. Missing at least 416225 bytes.'
      );
      done();
      function fn() {
        dns.parse(bin);
        done('should fail');
      }
    });

    it('zlip-3', function (done) {
      var bin = helper.readBin('test/fixtures/exploits/zlip-3.bin');
      expect(fn).to.throw(dns.errors.MalformedPacket,
        'Unexpectedly big section count: 83258. Missing at least 416155 bytes.'
      );
      done();
      function fn() {
        dns.parse(bin);
        done('should fail');
      }
    });
  });//exploits

  // describe('create fixtures', {skip: true}, function () {
  //   helper.createWritingTests(lab, fixtureDir);
  // });

  describe('fixtures from native-dns-packet', function () {
    describe('parsing', function () {
      helper.createParsingTests(lab, nativeFixtureDir);
    });
  });

});
