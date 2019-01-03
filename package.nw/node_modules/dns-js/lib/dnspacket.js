var debug = require('debug')('mdns-packet:lib:dns:dnspacket');
var BufferWriter = require('./bufferwriter');
var DataConsumer = require('./bufferconsumer');
var DNSRecord = require('./dnsrecord');
var errors = require('./errors');

var MIN_RECORD_SIZE = 5;
/**
 * This callback is used for "each" methods
 * @callback DNSPacket~eachCallback
 * @param {DNSRecord} rec - DNSRecord that was found
 */

var SECTION_NAMES = [
  'answer',
  'authority',
  'additional'
];
var ALL_SECTION_NAMES = ['question'].concat(SECTION_NAMES);

function parseFlags(val, packet) {
  packet.header.qr = (val & 0x8000) >> 15;
  packet.header.opcode = (val & 0x7800) >> 11;
  packet.header.aa = (val & 0x400) >> 10;
  packet.header.tc = (val & 0x200) >> 9;
  packet.header.rd = (val & 0x100) >> 8;
  packet.header.ra = (val & 0x80) >> 7;
  packet.header.res1 = (val & 0x40) >> 6;
  packet.header.res2 = (val & 0x20) >> 5;
  packet.header.res3 = (val & 0x10) >> 4;
  packet.header.rcode = (val & 0xF);
}

function parseHeader(consumer, packet) {
  packet.header.id = consumer.short();
  parseFlags(consumer.short(), packet);

  packet.question = new Array(consumer.short());
  packet.answer = new Array(consumer.short());
  packet.authority = new Array(consumer.short());
  packet.additional = new Array(consumer.short());
  debug('packet.header:', packet.header);
  debug('question: %d, answer: %d, authority: %d, additional: %d',
    packet.question.length, packet.answer.length, packet.authority.length,
    packet.additional.length);
  var allcount = packet.question.length + packet.answer.length +
    packet.authority.length + packet.additional.length;
  // allcount * MIN_RECORD_SIZE should be less then consumer.length - consumer.tell()
  if (allcount * MIN_RECORD_SIZE > (consumer.length - consumer.tell())) {
    throw new errors.MalformedPacket(
      'Unexpectedly big section count: %d. Missing at least %d bytes.',
      allcount,
      allcount * MIN_RECORD_SIZE - (consumer.length - consumer.tell()));
  }
}

function writeHeader(writer, packet) {
  var header = packet.header;
  writer.short(header.id);
  var val = 0;
  val += (header.qr << 15) & 0x8000;
  val += (header.opcode << 11) & 0x7800;
  val += (header.aa << 10) & 0x400;
  val += (header.tc << 9) & 0x200;
  val += (header.rd << 8) & 0x100;
  val += (header.ra << 7) & 0x80;
  val += (header.res1 << 6) & 0x40;
  val += (header.res1 << 5) & 0x20;
  val += (header.res1 << 4) & 0x10;
  val += header.rcode & 0xF;
  writer.short(val);
}

/**
 * DNSPacket holds the state of a DNS packet. It can be modified or serialized
 * in-place.
 *
 * @constructor
 */
var DNSPacket = module.exports = function (flags) {

  this.header = {
    id: 0,
    qr: 0,
    opcode: 0,
    aa: 0,
    tc: 0,
    rd: 1,
    ra: 0,
    res1: 0,
    res2: 0,
    res3: 0,
    rcode: 0
  };
  if (flags) {
    parseFlags(flags, this);
  }
  this.question = [];
  this.answer = [];
  this.authority = [];
  this.additional = [];
  this.edns_options = [];
  this.payload = undefined;

};

/**
* Enum identifying DNSPacket flags
* @readonly
* @enum {number}
*/
DNSPacket.Flag = {
  RESPONSE: 0x8000,
  AUTHORATIVE: 0x400,
  TRUNCATED: 0x200,
  RECURSION: 0x100
};


/**
* Enum identifying DNSPacket rcode flag values
* @readonly
* @enum {number}
*/
DNSPacket.RCODE = {
  NoError: 0,
  FormErr: 1,
  ServFail: 2,
  NXDomain: 3
};


/**
 * Parse a DNSPacket from an Buffer
 * @param {Buffer} buffer - A Node.js Buffer instance
 * @returns {DNSPacket} Instance of DNSPacket
 */
DNSPacket.parse = function (buffer) {
  var consumer = new DataConsumer(buffer);
  var packet = new DNSPacket();
  var receivedOpts = 0;
  parseHeader(consumer, packet);

  // Parse the QUESTION section.
  for (var qi = 0; qi < packet.question.length; qi++) {
    debug('doing qd %s', qi);
    try {
      debug('before question', consumer.tell());
      var part = DNSRecord.parseQuestion(consumer);
      packet.question[qi] = part;
    }
    catch (err) {
      debug('consumer', consumer);
      throw err;
    }
  }

  // Parse the ANSWER, AUTHORITY and ADDITIONAL sections.
  SECTION_NAMES.forEach(function (sectionName) {
    var section = packet[sectionName];
    debug('about to parse section %s', sectionName, section.length);
    for (var si = 0; si < section.length; si++) {
      debug('doing record %s/%s', si + 1, section.length, consumer.tell());
      var record = DNSRecord.parse(consumer);
      debug('parsed type `%d` for section %s', record.type, sectionName);
      if (record.type === DNSRecord.Type.OPT) {
        if (receivedOpts++ >= 0) {
          //TODO: does it only ever be in additonal.
          if (sectionName === 'additional') {
            packet.edns_version = record.opt.version;
            packet.do = record.opt.do;
            packet.payload = record.class;
          }
        }
        else {
          debug('more than 1 opts'. receivedOpts);
        }
      }
      section[si] = record;
    }
  });

  if (!consumer.isEOF()) {
    debug('was not EOF on incoming packet. %d bytes in overflow',
      consumer.length - consumer.tell());
    var multiple = [packet];
    multiple.push(DNSPacket.parse(consumer.slice()));

    return multiple;
  }
  debug('packet done', packet);
  return packet;
};


/**
 * Get records from packet
 * @param {DNSPacket.Section} section - record section [qd|an|ns|ar],
 * @param {DNSRecord.Type} [filter] - DNSRecord.Type to filter on
 * @param {DNSPacket~eachCallback} callback - Function callback
 */
DNSPacket.prototype.each = each;


function each(section /*[,filter], callback*/) {
  if (ALL_SECTION_NAMES.indexOf(section) === -1) {
    throw new Error('Unkown section, ' + section);
  }
  var filter = false;
  var cb;
  if (arguments.length === 2) {
    cb = arguments[1];
  }
  else {
    filter = arguments[1];
    cb = arguments[2];
    if (typeof filter === 'undefined') {
      throw new Error('Filter given but is undefined');
    }
  }
  this[section].forEach(function (rec) {
    if (!filter || rec.type === filter) {
      cb(rec);
    }
  });
}


/**
 * Serialize this DNSPacket into an Buffer for sending over UDP.
 * @returns {Buffer} A Node.js Buffer
 */
DNSPacket.toBuffer = function (packet) {
  var writer = new BufferWriter();
  var sections = ['question'].concat(SECTION_NAMES);
  writeHeader(writer, packet);

  sections.forEach(function (sectionName) {
    var section = packet[sectionName];
    debug('%d records in %s', section.length, sectionName);
    writer.short(section.length);
  });

  var e = each.bind(packet);

  sections.forEach(function (sectionName) {
    e(sectionName, function (rec) {
      DNSRecord.write(writer, rec, true);

      if (sectionName !== 'question' && rec.isQD) {
        throw new Error('unexpected QD record in non QD section.');
      }
    });
  });

  return writer.slice(0, writer.tell());
};



