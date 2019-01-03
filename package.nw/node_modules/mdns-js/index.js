

var config = require('./package.json');
var st = require('./lib/service_type');
var Networking = require('./lib/networking');

var networking = new Networking();

/** @member {string} */
module.exports.version = config.version;
module.exports.name = config.name;

/* @borrows Browser as Browser */
var Browser = module.exports.Browser = require('./lib/browser'); //just for convenience
/* @borrows Advertisement as Advertisement */
var Advertisement = module.exports.Advertisement = require('./lib/advertisement'); //just for convenience

/**
 * Create a browser instance
 * @method
 * @param {string} [serviceType] - The Service type to browse for. Defaults to ServiceType.wildcard
 * @return {Browser}
 */
module.exports.createBrowser = function browserCreated(serviceType) {
  if (typeof serviceType === 'undefined') {
    serviceType = st.ServiceType.wildcard;
  }
  return new Browser(networking, serviceType);
};


module.exports.excludeInterface = function (iface) {
  if (networking.started) {
    throw new Error('can not exclude interfaces after start');
  }
  if (iface === '0.0.0.0') {
    networking.INADDR_ANY = false;
  }
  else {
    var err = new Error('Not a supported interface');
    err.interface = iface;
  }
};


/**
 * Create a service instance
 * @method
 * @param {string|ServiceType} serviceType - The service type to register
 * @param {number} [port] - The port number for the service
 * @param {object} [options] - ...
 * @return {Advertisement}
 */
module.exports.createAdvertisement =
  function advertisementCreated(serviceType, port, options) {
    return new Advertisement(
      networking, serviceType, port, options);
  };


/** @property {module:ServiceType~ServiceType} */
module.exports.ServiceType = st.ServiceType;

/** @property {module:ServiceType.makeServiceType} */
module.exports.makeServiceType = st.makeServiceType;

/** @function */
module.exports.tcp = st.protocolHelper('tcp');

/** @function */
module.exports.udp = st.protocolHelper('udp');

