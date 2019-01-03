var Code = require('code');   // assertion library
var Lab = require('lab');
var lab = exports.lab = Lab.script();

var describe = lab.describe;
var it = lab.it;
//var before = lab.before;
//var after = lab.after;
var expect = Code.expect;

var DNSRecord = require('../lib/dnsrecord');
var BufferWriter = require('../lib/bufferwriter');
//var helper = require('./helper');


describe('DNSRecord (Create)', function () {

  it('create query', function (done) {
    var bw = new BufferWriter();
    var r = new DNSRecord('_services._dns-sd._udp.local',
      DNSRecord.Type.PTR, 1);
    expect(r).to.include(['name', 'type', 'class', 'ttl']);
    expect(r.ttl).to.equal(DNSRecord.TTL);
    var b = DNSRecord.write(bw, r).dump();
    expect(b.toString('hex')).to.equal(
      '095f7365727669636573075f646e732d7364045f756470056c6f63616c00000c0001');

    //roundtrip
    var pr = DNSRecord.parseQuestion(b);
    expect(pr).to.deep.include(r);

    done();
  });

  it('SRV', function (done) {
    var bw = new BufferWriter();
    var alias = 'regin [30:46:9a:b2:b8:b2]._workstation._tcp.local';

    var r = {
      name: alias,
      type: DNSRecord.Type.SRV,
      class: DNSRecord.Class.IN,
      ttl: 10,
      priority: 1,
      weight: 2,
      port: 9,
      target: 'regin.local'
    };

    var b = DNSRecord.write(bw, r, true).dump();
    var recStr = b.toString('hex');

    expect(recStr, 'type, class, ttl').to.include('002100010000000a');
    expect(recStr, 'srv data').to.include('00010002000905726567696e');
                             //002100010000000a0013000000010002000905726567696e056c6f63616c00
    //roundtrip
    var pr = DNSRecord.parse(b);
    expect(pr).to.include(['port', 'target', 'weight', 'priority']);

    //expect(pr.priority, 'priority').to.equal(priority);
    expect(pr.port, 'port').to.equal(r.port);
    expect(pr.weight, 'weight').to.equal(r.weight);
    expect(pr.target, 'target').to.equal(r.target);
    //expect(pr).to.deep.equal(r);

    done();
  });

  it('PTR', function (done) {
    var writer = new BufferWriter();
    var r = new DNSRecord(
      '_services._dns-sd._udp.local',
      DNSRecord.Type.PTR,
      1,
      10);
    r.data = '_workstation._tcp.local';
    DNSRecord.write(writer, r, true);
    done();
  });

  it('reverse lookup', function (done) {

    var rec = '013801380138013807696e2d61646472046172706100000c0001';
    var r = new DNSRecord(
      '8.8.8.8.in-addr.arpa',
      DNSRecord.Type.PTR,
      DNSRecord.Class.IN);
    var bw = new BufferWriter();
    var b = DNSRecord.write(bw, r, true).dump();
    var recStr = b.toString('hex');
    expect(recStr).to.equal(rec);
    done();
  });

  it('reverse lookup 2', function (done) {
    var expected = '02353103313637033231310331343007696e2d61646472046172706100000c0001';
    //             '02353103313637033231310331343007696e2d616464720461727061 00000c0001'
    //                 5 1   1 6 7   2 1 1   1 3 0   i n - a d d r   a r p a
    var r = new DNSRecord(
      '51.167.211.140.in-addr.arpa.',
      DNSRecord.Type.PTR,
      DNSRecord.Class.IN);

    var bw = new BufferWriter();
    var buf = DNSRecord.write(bw, r, true).dump();
    expect(buf.toString('hex')).to.equal(expected);
    var r2 = DNSRecord.parseQuestion(buf);
    expect(r2.type).to.equal(DNSRecord.Type.PTR);
    done();
  });

});
