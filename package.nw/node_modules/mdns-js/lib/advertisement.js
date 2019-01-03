var debug = require('debug')('mdns:advertisement');

var dns = require('dns-js');
var DNSRecord = dns.DNSRecord;
var ServiceType = require('./service_type').ServiceType;
var pf = require('./packetfactory');

var internal = {};

// Array of published services.
internal.services = [];
// Array of pending probes.
internal.probes = [];
// Array of open sockets
internal.connections = [];



internal.handleQuery = function (rec) {
  if (rec.type !== DNSRecord.Type.PTR &&
    rec.type !== DNSRecord.Type.SRV &&
    rec.type !== DNSRecord.Type.ANY) {
    debug('skipping query: type not PTR/SRV/ANY');
    return;
  }
  // check if we should reply via multi or unicast
  // TODO: handle the is_qu === true case and reply directly to remote
  // var is_qu = (rec.cl & DNSRecord.Class.IS_QM) === DNSRecord.Class.IS_QM;
  rec.class &= ~DNSRecord.Class.IS_OM;
  if (rec.class !== DNSRecord.Class.IN && rec.type !== DNSRecord.Class.ANY) {
    debug('skipping query: class not IN/ANY: %d', rec.class);
    return;
  }
  try {
    var type = new ServiceType(rec.name);
    internal.services.forEach(function (service) {
      if (type.isWildcard() || type.matches(service.serviceType)) {
        debug('answering query');
        // TODO: should we only send PTR records if the query was for PTR
        // records?
        internal.sendDNSPacket(
          pf.buildANPacket.apply(service, [DNSRecord.TTL]));
      }
      else {
        debug('skipping query; type %s not * or %s', type,
          service.serviceType);
      }
    });
  }
  catch (err) {
    // invalid service type
  }
};

internal.handleAnswer = function (rec) {
  try {
    internal.probes.forEach(function (service) {
      if (service.status < 3) {
        var conflict = false;
        // parse answers and check if they match a probe
        debug('check names: %s and %s', rec.name, service.alias);
        switch (rec.type) {
          case DNSRecord.Type.PTR:
            if (rec.asName() === service.alias) {
              conflict = true;
              debug('name conflict in PTR');
            }
            break;
          case DNSRecord.Type.SRV:
          case DNSRecord.Type.TXT:
            if (rec.name === service.alias) {
              conflict = true;
              debug('name conflict in SRV/TXT');
            }
            break;
        }
        if (conflict) {
          // no more probes
          service.status = 4;
        }
      }
    });
  }
  catch (err) {
    // invalid service type
  }
};


internal.probeAndAdvertise = function () {
  debug('probeAndAdvertise(%s)', this.status);
  switch (this.status) {
    case 0:
    case 1:
    case 2:
      debug('probing service %d', this.status + 1);
      this.networking.send(pf.buildQDPacket.apply(this, []));
      break;
    case 3:
      debug('publishing service, suffix=%s', this.nameSuffix);
      var packet = pf.buildANPacket.apply(this, [DNSRecord.TTL]);
      internal.sendDNSPacket = this.networking.send.bind(this.networking);
      this.networking.send(packet);
      // Repost announcement after 1sec (see rfc6762: 8.3)
      setTimeout(function onTimeout() {
        this.networking.send(packet);
      }.bind(this), 1000);
      // Service has been registered, respond to matching queries
      internal.services.push(this);
      internal.probes =
        internal.probes.filter(function (service) { return service === this; });
      break;
    case 4:
      // we had a conflict
      if (this.nameSuffix === '') {
        this.nameSuffix = '1';
      }
      else {
        this.nameSuffix = (parseInt(this.nameSuffix) + 1) + '';
      }
      this.status = -1;
      break;
  }
  if (this.status < 3) {
    this.status++;
    setTimeout(internal.probeAndAdvertise.bind(this), 250);
  }
};

/**
 * mDNS Advertisement class
 * @class
 * @param {string|ServiceType} serviceType - The service type to register
 * @param {number} [port] - The port number for the service
 * @param {object} [options] - ...
 */
var Advertisement = module.exports = function (
  networking, serviceType, port, options) {
  if (!(this instanceof Advertisement)) {
    return new Advertisement(serviceType, port, options);
  }


  // TODO: check more parameters
  if (!('name' in options)) {
    throw new Error('options must contain the name field.');
  }
  var self = this;
  this.serviceType = serviceType;
  this.port = port;
  this.options = options;
  this.nameSuffix = '';
  this.alias = '';
  this.status = 0; // inactive
  this.networking = networking;
  if (typeof this.options.INADDR_ANY !== 'undefined') {
    this.networking.INADDR_ANY = this.options.INADDR_ANY;
  }

  networking.on('packets', function (packets /*, remote, connection*/) {
    packets.forEach(function (packet) {
      packet.question.forEach(internal.handleQuery.bind(self));
      packet.answer.forEach(internal.handleAnswer.bind(self));
    });
  });

  this.start = function () {
    networking.addUsage(self, function () {
      internal.probes.push(self);
      internal.probeAndAdvertise.apply(self, []);
    });
  };

  this.stop = function (next) {
    debug('unpublishing service');
    internal.services =
      internal.services.filter(function (service) { return service === self; });

    networking.send(pf.buildANPacket.apply(self, [0]), function () {
      networking.stop();
      if (next) {
        next();
      }
    });
    this.nameSuffix = '';
    this.alias = '';
    this.status = 0; // inactive
  };

  debug('created new service');
}; //--Advertisement constructor

