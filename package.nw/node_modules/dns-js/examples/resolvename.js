/*eslint no-console:0*/
var dns = require('..');
var dgram = require('dgram');

var DNSSERVER = '8.8.8.8';

resolveName('140.211.167.51');

function resolveName(address) {
  var packet = new dns.DNSPacket();
  packet.header.rd = 1; //make query recursive
  packet.header.id = 4242;
  var qname = address.split('.').reverse().join('.') + '.in-addr.arpa.';
  console.log('qname', qname);
  packet.question.push(new dns.DNSRecord(
    qname,
    dns.DNSRecord.Type.PTR, 1)
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
    if (response.header.rcode === 0) {
      response.answer.forEach(function (a) {
        console.log('answer type:%s, class:%s, name:%s, data: %s',
          a.typeName, a.className, a.name, a.data);
        console.log('IP %s have resolved to name %s', address, a.data);
      });
    }
    else {
      console.log('Server responded with error');
      if (response.header.rcode === dns.DNSPacket.RCODE.NXDomain) {
        console.log('No such name');
      }
      else {
        console.log('rcode', response.header.rcode);
      }
    }

    s.close();
  });

  s.on('end', function () {
    console.log('connection closed');
  });

  s.on('error', function (err) {
    console.error('error', err);
  });
}
