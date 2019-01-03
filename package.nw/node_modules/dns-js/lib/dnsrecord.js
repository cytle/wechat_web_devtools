var debug = require('debug')('mdns-packet:lib:dns:dnsrecord');

var BufferConsumer = require('./bufferconsumer');
var errors = require('./errors');

/**
 * DNSRecord is a record inside a DNS packet; e.g. a QUESTION, or an ANSWER,
 * AUTHORITY, or ADDITIONAL record. Note that QUESTION records are special,
 * and do not have ttl or data.
 * @class
 * @param {string} name
 * @param {number} type
 * @param {number} cl - class
 * @param {number} [optTTL] - time to live in seconds
 */
var DNSRecord = module.exports = function (name, type, cl, optTTL) {
  var self = this;
  this.name = name;
  this.type = type;
  this.class = cl;

  if (type === 0 || typeof type === 'undefined') {
    throw new errors.MalformedPacket('Record.type is empty');
  }

  if (cl === 0) {
    throw new errors.MalformedPacket('Record.class is empty');
  }

  this.ttl = (typeof optTTL !== 'undefined') ? optTTL : DNSRecord.TTL;
  this.isQD = (arguments.length === 3);
  debug('new DNSRecord', this);


  this.__defineGetter__('typeName', function () {
    return DNSRecord.TypeName[self.type];
  });

  this.__defineGetter__('className', function () {
    return DNSRecord.ClassName[self.class & 0x7fff];
  });

  this.__defineGetter__('flag', function () {
    return (self.class & 0x8000) >> 15;
  });
};

/**
 * Enum for record type values
 * @readonly
 * @enum {number}
 */
DNSRecord.Type = {
  A: 0x01,        // 1
  NS: 0x02,       //2
  CNAME: 0x05,    //5
  SOA: 0x06,     //6
  PTR: 0x0c,      // 12
  MX: 0x0f,       //15
  TXT: 0x10,      // 16
  AAAA: 28,       // 0x16
  SRV: 0x21,       // 33
  OPT: 0x29,      //41 RFC6981 -needed for EDNS
  NSEC: 0x2f,    //47
  TLSA: 0x34,      //52 RFC6698 - associate TLS server certificate.
  ANY: 0xff
};

/**
* Enum for record class values
* @readonly
* @enum {number}
*/
DNSRecord.Class = {
  IN: 0x01,
  ANY: 0xff,
  FLUSH: 0x8000,
  IS_QM: 0x8000
};


DNSRecord.TTL = 3600; // one hour default TTL
DNSRecord.TypeName = {};
DNSRecord.ClassName = {};

var typekey;

for (typekey in DNSRecord.Type) {
  if (DNSRecord.Type.hasOwnProperty(typekey)) {
    DNSRecord.TypeName[DNSRecord.Type[typekey]] = typekey;
  }
}


for (typekey in DNSRecord.Class) {
  if (DNSRecord.Class.hasOwnProperty(typekey)) {
    DNSRecord.ClassName[DNSRecord.Class[typekey]] = typekey;
  }
}


DNSRecord.write = function (out, rec, withLength) {
  withLength = withLength || false;
  debug('#write() type: %s, flag:%d class:%s, withLength:%s',
    rec.typeName, rec.flag,
    rec.className, withLength);
  if (rec.type === 0 || rec.class === 0) {
    throw new Error('Bad record with empty type and/or class');
  }
  //TODO:if outer and any string in data or name
  //     can be found there. Do a ref instead.
  out.name(rec.name).short(rec.type).short(rec.class);
  if (rec.isQD) {
    return out;
  }

  out.long(rec.ttl);

  var startPos = out.tell();
  out.short(0xffff); //reserve some length

  switch (rec.type) {
    case DNSRecord.Type.A:
      writeA(out, rec.address);
      break;
    case DNSRecord.Type.NS:
    case DNSRecord.Type.CNAME:
    case DNSRecord.Type.PTR:
      out.name(rec.data);
      break;
    case DNSRecord.Type.MX:
      //asMx(consumer, rec);
      break;
    case DNSRecord.Type.TXT:
      for (var key in rec.data) {
        if (rec.data.hasOwnProperty(key)) {
          // properly encode this
          out.name(key + '=' + rec.data[key]);
          out.offset--;
        }
      }
      break;
    case DNSRecord.Type.AAAA:
      //asAAAA(consumer, rec);
      break;
    case DNSRecord.Type.SRV:
      out.short(rec.priority & 0xffff).short(rec.weight & 0xffff)
        .short(rec.port & 0xffff).name(rec.target);
      break;
    case DNSRecord.Type.SOA:
      out.name(rec.primary).name(rec.admin).long(rec.serial).long(rec.refresh)
        .long(rec.retry).long(rec.expiration).long(rec.minimum);
      break;
    default:
      debug('non implemented recordtype of ' + rec.type);
      throw new Error('Not implemented recordtype');
      //this.data = new BufferConsumer(consumer.slice(dataSize));
  }
  var endPos = out.tell();
  //update with correct size
  var correctSize = endPos - startPos - 2;
  debug('correct size=%s bytes', correctSize);
  out.seek(startPos).short(correctSize).seek(endPos);

  return out;
};




function writeA(out, ip) {
  var parts = ip.split('.');
  for (var i = 0; i < 4; i++) {
    out.byte(parts[i]);
  }
}

DNSRecord.parse = function (consumer) {
  if (consumer instanceof Buffer) {
    debug('making consumer out of buffer');
    consumer = new BufferConsumer(consumer);
    consumer.seek(0);
  }

  debug('#parse from %d', consumer.tell());
  var rec = new DNSRecord(
    consumer.name(),
    consumer.short(), // type
    consumer.short(), // class
    consumer.long() //ttlgf
  );

  debug('parsing from %d', consumer.tell());

  var dataSize = consumer.short();
  debug('going for type %s. start: %d, size: %d, end: %d, length: %d',
    rec.type,
    consumer.tell(),
    dataSize,
    consumer.tell() + dataSize,
    consumer.length
  );


  switch (rec.type) {
    case DNSRecord.Type.A:
      asA(consumer, rec);
      break;
    case DNSRecord.Type.NS:
    case DNSRecord.Type.CNAME:
    case DNSRecord.Type.PTR:
      rec.data = asName(consumer);
      break;
    case DNSRecord.Type.MX:
      asMx(consumer, rec);
      break;
    case DNSRecord.Type.TXT:
      rec.data = asTxt(consumer, consumer.tell() + dataSize);
      break;
    case DNSRecord.Type.AAAA:
      asAAAA(consumer, rec);
      break;
    case DNSRecord.Type.SRV:
      asSrv(consumer, rec);
      break;
    case DNSRecord.Type.SOA:
      asSoa(consumer, rec);
      break;
    case DNSRecord.Type.OPT:
      asOpt(consumer, rec);
      break;
    case DNSRecord.Type.TLSA:
      asTLSA(consumer, rec, dataSize);
      break;
    default:
      debug('non implemented recordtype of ' + rec.type);
      rec.data = new BufferConsumer(consumer.slice(dataSize));
  }
  debug('record done at %d', consumer.tell(), rec);
  return rec;
};

DNSRecord.parseQuestion = function (consumer) {
  if (consumer instanceof Buffer) {
    debug('making consumer out of buffer');
    consumer = new BufferConsumer(consumer);
  }
  debug('#parseQuestion from %d', consumer.tell());
  var r = new DNSRecord(
          consumer.name(),
          consumer.short(), // type
          consumer.short() // class
          );
  debug('record done at %d', consumer.tell(), r);
  return r;
};


function asName(consumer) {
  return consumer.name(true);
}


function asSrv(consumer, record) {
  debug('priority: %d', record.priority = consumer.short());
  debug('weight: %d', record.weight = consumer.short());
  debug('port: %d', record.port = consumer.short());
  record.target = consumer.name();
  // debug('priority:%d, weight: %d, port:%d, target:%s', record.priority,
  //   record.weight, record.port, record.target);

}

function asMx(consumer, record) {
  record.priority = consumer.short();
  record.exchange = asName(consumer);
}

function asTxt(consumer, endAt) {
  var items = consumer.name(false, endAt);
  debug('txt items', items);
  //note:disable to have same syntax as native-dns-packet
  // if (items.length === 1 && items[0].length > 0) {
  //   return items[0];
  // }
  return items;
}


function asA(consumer, record) {
  var data = '';
  for (var i = 0; i < 3; i++) {
    data += consumer.byte() + '.';
  }
  data += consumer.byte();
  record.address = data;
}


/*
 * Parse data into a IPV6 address string
 * @returns {string}
 */
function asAAAA(consumer, packet) {
  var data = '';
  for (var i = 0; i < 7; i++) {
    data += consumer.short().toString(16) + ':';
  }
  data += consumer.short().toString(16);
  packet.address = data;
}

function asSoa(consumer, packet) {
  packet.primary = consumer.name(true);
  packet.admin = consumer.name(true);
  packet.serial = consumer.long();
  packet.refresh = consumer.long();
  packet.retry = consumer.long();
  packet.expiration = consumer.long();
  packet.minimum = consumer.long();
}

function asOpt(consumer, packet) {
  //if at end of buffer there is no optional data.
  var opt = {
    code: 0,
    data: [],
    rcode: 0,
    version: 0,
    do: 0,
    z: 0
  };

  if (!consumer.isEOF()) {
    opt.code = consumer.short();
    opt.data = consumer.slice(consumer.short());
  }

  opt.rcode = (packet.ttl & 0xff000000) >> 24;
  opt.version = (packet.ttl & 0x00FF0000) >> 16;
  opt.do = (packet.ttl & 0x00008000) >> 15;
  opt.z = (packet.ttl & 0x00001FFF);

  debug('asOpt', opt);
  packet.opt = opt;
}

function asTLSA(consumer, packet, dataSize) {
  packet.usage = consumer.byte();
  packet.selector = consumer.byte();
  packet.matchingtype = consumer.byte();
  packet.buff = consumer.slice(dataSize - 3); //size - 3 because of 3 bytes above
}
