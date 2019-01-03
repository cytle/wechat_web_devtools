const debug = require('debug')('mdns:browser');

const util = require('util');
const { EventEmitter } = require('events');

const { DNSPacket, DNSRecord } = require('dns-js');
const { ServiceType } = require('./service_type');
const decoder = require('./decoder');

/**
 * mDNS Browser class
 * @class
 * @param {string|ServiceType} serviceType - The service type to browse for.
 * @fires Browser#update
 */
class Browser extends EventEmitter {
  constructor(networking, serviceType) {
    super();
    const notString = typeof serviceType !== 'string';
    const notType = !(serviceType instanceof ServiceType);
    if (notString && notType) {
      debug('serviceType type:', typeof serviceType);
      debug('serviceType is ServiceType:', serviceType instanceof ServiceType);
      debug('serviceType=', serviceType);
      throw new Error('argument must be instance of ServiceType or valid string');
    }
    this.serviceType = serviceType;
    this.networking = networking;

    this.connections = {};

    networking.addUsage(this, () => {
      this.emit('ready');
    });

    this.onMessageListener = this.onMessage.bind(this);
    networking.on('packets', this.onMessageListener);
  }

  /**
 * Handles incoming UDP traffic.
 * @private
 */
  onMessage(packets, remote, connection) {
    debug('got packets from remote', remote);

    const data = decoder.decodePackets(packets);
    if (!data) {
      return;
    }
    let isNew = false;

    const iface = connection.networkInterface;
    this.connections[iface] = this.connections[iface] || {
      services: {},
      addresses: {}
    };
    const { services, addresses } = this.connections[iface];

    function setNew(...args) {
      isNew = true;
      debug('new on %s, because %s', iface, util.format(...args));
    }

    function updateValue(src, dst, name) {
      if (JSON.stringify(dst[name]) !== JSON.stringify(src)) {
        setNew('updated host.%s', name);
        dst[name] = src;
      }
    }

    function addValue(src, dst, name) {
      if (typeof dst[name] === 'undefined') {
        setNew('added host.%s', name);
        dst[name] = src;
      }
    }

    if (data) {
      data.interfaceIndex = connection.interfaceIndex;
      data.networkInterface = connection.networkInterface;
      data.addresses.push(remote.address);

      if (typeof data.type !== 'undefined') {
        data.type.forEach(function (type) {

          let serviceKey = type.toString();
          if (!services.hasOwnProperty(serviceKey)) {
            setNew('new service - %s', serviceKey);
            services[serviceKey] = {
              type,
              addresses: []
            };
          }

          const service = services[serviceKey];
          data.addresses.forEach(function (adr) {
            if (service.addresses.indexOf(adr) === -1) {
              service.addresses.push(adr);
              setNew('new address');
            }

            let host;
            if (addresses.hasOwnProperty(adr)) {
              host = addresses[adr];
            }
            else {
              host = addresses[adr] = {address: adr};
              setNew('new host');
            }
            addValue({}, host, serviceKey);
            updateValue(data.port, host[serviceKey], 'port');
            updateValue(data.host, host[serviceKey], 'host');
            updateValue(data.txt, host[serviceKey], 'txt');
          });
        });
      }

      /**
       * Update event
       * @event Browser#update
       * @type {object}
       * @property {string} networkInterface - name of network interface
       * @property {number} interfaceIndex
       */
      debug('isNew', isNew);
      if (isNew && data) {
        this.emit('update', data);
      }
    }
  }

  stop() {
    this.networking.removeUsage(this);
    this.networking.removeListener('packets', this.onMessageListener);
    this.connections = {};
  }

  discover() {
    const packet = new DNSPacket();
    packet.question.push(new DNSRecord(
      this.serviceType.toString() + '.local',
      DNSRecord.Type.PTR, 1)
    );
    this.networking.send(packet);
  }
}

module.exports = Browser;
