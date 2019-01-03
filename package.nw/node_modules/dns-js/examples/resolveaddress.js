/*eslint no-console:0*/
var dns = require('..');
var dgram = require('dgram');

var DNSSERVER = '8.8.8.8';

resolveAddress('www.google.com');

function resolveAddress(name) {
  var packet = new dns.DNSPacket();
  packet.header.rd = 1; //make query recursive
  packet.question.push(new dns.DNSRecord(
    name,
    dns.DNSRecord.Type.A, 1)
  );

  var s = dgram.createSocket('udp4');
  s.bind();

  s.on('listening', function () {
    var buf = dns.DNSPacket.toBuffer(packet);
    s.send(buf, 0, buf.length, 53, DNSSERVER, function (err, bytes) {
      if (err) {
        return console.error('error sending', err);
      }
      console.log('sent request of %d bytes', bytes);
    });
  });

  s.on('message', function (data) {
    console.log('incoming response');
    var response = dns.DNSPacket.parse(data);
    response.answer.forEach(function (a) {
      console.log('answer type:%s, class:%s, name:%s',
        a.typeName, a.className, a.name, a.address);
    });
    s.close();
  });

  s.on('end', function () {
    console.log('connection closed');
  });

  s.on('error', function (err) {
    console.error('error', err);
  });
}
