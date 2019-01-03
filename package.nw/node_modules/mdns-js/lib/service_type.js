var debug = require('debug')('mdns:lib:ServiceType');
/** @module ServiceType */

/*
  Subtypes can be found in section 7.1 of RFC6763
  https://tools.ietf.org/html/rfc6763#section-7.1

  According to RFC6763, subtypes can be any arbitrary utf-8 or ascii string
  and not required to begin with underscore. So leave alone
*/
var MAX_STRING = 20;
/**
 * ServiceType class
 * @class
 */
var ServiceType = exports.ServiceType = function (/* ... */) {
  this.name = '';
  this.protocol = '';
  this.subtypes = [];
  var args;
  if (arguments.length === 1) {
    args = Array.isArray(arguments[0]) ? arguments[0] : [arguments[0]];
  }
  else if (arguments.length > 1) {
    args = Array.prototype.slice.call(arguments);
  }
  if (args) {
    if (args.length === 1) {

      if (typeof args[0] === 'string') {
        this.fromString(args[0]);
      // } else if (Array.isArray(args[0])) {
      //   this.fromArray(args[0]);
      }
      else if (typeof args[0] === 'object') {
        this.fromJSON(args[0]);
      }
      else {
        throw new Error('argument must be a string, array or object');
      }
    }
    else if (args.length >= 2) {
      this.fromArray(args);
    }
    else { // zero arguments
      // uninitialized ServiceType ... fine with me
    }
  }

  this.description = this.getDescription();
};


ServiceType.wildcard = '_services._dns-sd._udp';

ServiceType.prototype.getDescription = function () {
  var key = this.toString();
  return SERVICE_DESCRIPTIONS[key];
};

ServiceType.prototype.isWildcard = function isWildcard() {
  return this.toString() === ServiceType.wildcard;
};

ServiceType.prototype.toString = function () {
  var typeString = _u(this.name) + '.' + _u(this.protocol);
  if (this.fullyQualified) {
    typeString += '.';
  }
  if (this.subtypes.length > 0) {
    var subtypes = this.subtypes.slice(0); //clone not pointer
    subtypes.unshift(typeString);
    typeString = subtypes.join(',');
  }
  return typeString;
};

ServiceType.prototype.fromString = function fromString(text) {
  debug('fromString', text);
  text = text.replace(/.local$/, '');

  //take care of possible empty subtypes
  if (text.charAt(0) === '_') {
    text = text.replace(/^_sub/, '._sub'); //fix for bad apple
  }

  var isWildcard = text === ServiceType.wildcard;
  var subtypes = text.split(',');

  debug('subtypes', subtypes);
  if (subtypes.length === 1) {
    subtypes = text.split('._sub').reverse();
  }

  var primaryString = subtypes.shift();
  var serviceTokens = primaryString.split('.');
  var serviceType = serviceTokens.shift();
  var protocol;


  debug('primary: %s, servicetype: %s, serviceTokens: %s, subtypes: %j',
    primaryString, serviceType, serviceTokens.join('.'), subtypes.join(','));

  if (isWildcard) {
    serviceType += '.' + serviceTokens.shift();
  }
  if (primaryString[0] !== '_' || primaryString[0] === '_services') {
    serviceType = serviceTokens.shift();
  }

  protocol = serviceTokens.shift();
  //make tcp default if not already defined
  if (typeof protocol === 'undefined') {
    protocol = '_tcp';
  }
  checkProtocolU(protocol);
  if (!isWildcard) {
    checkFormat(serviceType);
  }

  if (serviceTokens.length === 1 && serviceTokens[0] === '') {
    // trailing dot
    this.fullyQualified = true;
  }
  else if (serviceTokens.length > 0) {
    throw new Error('trailing tokens "' + serviceTokens.join('.') + '" in ' +
        'service type string "' + text + '"');
  }

  this.name = serviceType.substr(1);
  this.protocol = protocol.substr(1);
  this.subtypes = subtypes; //subtypes.map(function (t) { return t.substr(1); });

  debug('this', this);
};

ServiceType.prototype.toArray = function toArray() {
  return [this.name, this.protocol].concat(this.subtypes);
};

ServiceType.prototype.fromArray = function fromArray(array) {
  var serviceType = _uu(array.shift());
  var protocol = _uu(array.shift());
  var subtypes = array.map(function (t) { return _uu(t); });

  checkLengthAndCharset(serviceType);
  checkProtocol(protocol);
  subtypes.forEach(function (t) { checkLengthAndCharset(t); });

  this.name = serviceType;
  this.protocol = protocol;
  this.subtypes = subtypes;
};

ServiceType.prototype.fromJSON = function fromJSON(obj) {
  debug('fromJSON');
  if (!('name' in obj)) {
    throw new Error('required property name is missing');
  }
  if (!('protocol' in obj)) {
    throw new Error('required property protocol is missing');
  }

  var serviceType    = _uu(obj.name);
  var protocol       = _uu(obj.protocol);
  var subtypes       = ('subtypes' in obj ?
    obj.subtypes.map(function (t) { return _uu(t); }) : []);

  checkLengthAndCharset(serviceType);
  checkProtocol(protocol);
  subtypes.forEach(function (t) { checkLengthAndCharset(t); });

  this.name = serviceType;
  this.protocol = protocol;
  this.subtypes = subtypes;
  if ('fullyQualified' in obj) {
    this.fullyQualified = obj.fullyQualified;
  }
};

ServiceType.prototype.matches = function matches(other) {
  return this.name === other.name && this.protocol === other.protocol;
  // XXX handle subtypes
};

/**
 * creates a service type
 * @method
 * @returns {ServiceType}
 */
exports.makeServiceType = function makeServiceType() {
  if (arguments.length === 1 && arguments[0] instanceof ServiceType) {
    return arguments[0];
  }
  return new ServiceType(Array.prototype.slice.call(arguments));
};


/**
 * create protocol helpers
 * @param {string} protocol - tcp or udp
 * @returns {ServiceType}
 */
exports.protocolHelper = function protocolHelper(protocol) {
  return function () {
    var args = Array.prototype.slice.call(arguments);
    if (isProtocol(args[1])) {
      throw new Error('duplicate protocol "' + args[1] + '" in arguments');
    }
    args.splice(1, 0, protocol);
    return exports.makeServiceType.apply(this, args);
  };
};


function isProtocol(str) {
  return str === 'tcp' || str === '_tcp' || str === 'udp' || str === '_udp';
}

function _u(str) { return '_' + str; }
function _uu(str) { return str[0] === '_' ? str.substr(1) : str; }

var CHARSET_REGEX = /[^-a-zA-Z0-9]/;
function checkLengthAndCharset(str) {
  if (str.length === 0) {
    throw new Error('type ' + str + ' must not be empty');
  }
  if (str.length > MAX_STRING) {
    throw new Error('type ' + str + ' has more than ' +
      MAX_STRING + ' characters');
  }
  if (str.match(CHARSET_REGEX)) {
    throw new Error('type ' + str + ' may only contain alphanumeric ' +
        'characters and hyphens');
  }
}

var FORMAT_REGEX = /_[-a-zA-Z0-9]+/;
function checkFormat(str) {
  if (str.length === 0) {
    throw new Error('type string must not be empty');
  }
  if (str.length > (MAX_STRING + 1)) { // +1 is correct because we have a leading underscore
    throw new Error('type ' + _uu(str) + ' has more than ' +
      MAX_STRING + ' characters');
  }
  if (!str.match(FORMAT_REGEX)) {
    throw new Error('type ' + str + ' must start with an underscore ' +
        'followed by alphanumeric characters and hyphens only');
  }
}

function checkProtocolU(str) {
  if (!(str === '_tcp' || str === '_udp')) {
    throw new Error('protocol must be either "_tcp" or "_udp" but is "' +
        str + '"');
  }
}

function checkProtocol(str) {
  if (!(str === 'tcp' || str === 'udp')) {
    throw new Error('protocol must be either "tcp" or "udp" but is "' +
        str + '"');
  }
}

// This list is based on /usr/share/avahi/service-types.

var SERVICE_DESCRIPTIONS = {
  '_acrobatSRV._tcp': 'Adobe Acrobat',
  '_adisk._tcp': 'Apple TimeMachine',
  '_adobe-vc._tcp': 'Adobe Version Cue',
  '_afpovertcp._tcp': 'Apple File Sharing',
  '_airport._tcp': 'Apple AirPort',
  '_apt._tcp': 'APT Package Repository',
  '_bzr._tcp': 'Bazaar',
  '_cros_p2p._tcp': 'Chrome OS P2P Update',
  '_daap._tcp': 'iTunes Audio Access',
  '_dacp._tcp': 'iTunes Remote Control',
  '_distcc._tcp': 'Distributed Compiler',
  '_domain._udp': 'DNS Server',
  '_dpap._tcp': 'Digital Photo Sharing',
  '_ftp._tcp': 'FTP File Transfer',
  '_h323._tcp': 'H.323 Telephony',
  '_home-sharing._tcp': 'Apple Home Sharing',
  '_https._tcp': 'Secure Web Site',
  '_http._tcp': 'Web Site',
  '_iax._udp': 'Asterisk Exchange',
  '_imap._tcp': 'IMAP Mail Access',
  '_ipp._tcp': 'Internet Printer',
  '_ksysguard._tcp': 'KDE System Guard',
  '_ldap._tcp': 'LDAP Directory Server',
  '_libvirt._tcp': 'Virtual Machine Manager',
  '_lobby._tcp': 'Gobby Collaborative Editor Session',
  '_MacOSXDupSuppress._tcp': 'MacOS X Duplicate Machine Suppression',
  '_mpd._tcp': 'Music Player Daemon',
  '_mumble._tcp': 'Mumble Server',
  '_net-assistant._udp': 'Apple Net Assistant',
  '_nfs._tcp': 'Network File System',
  '_ntp._udp': 'NTP Time Server',
  '_odisk._tcp': 'DVD or CD Sharing',
  '_omni-bookmark._tcp': 'OmniWeb Bookmark Sharing',
  '_pdl-datastream._tcp': 'PDL Printer',
  '_pgpkey-hkp._tcp': 'GnuPG/PGP HKP Key Server',
  '_pop3._tcp': 'POP3 Mail Access',
  '_postgresql._tcp': 'PostgreSQL Server',
  '_presence_olpc._tcp': 'OLPC Presence',
  '_presence._tcp': 'iChat Presence',
  '_printer._tcp': 'UNIX Printer',
  '_pulse-server._tcp': 'PulseAudio Sound Server',
  '_pulse-sink._tcp': 'PulseAudio Sound Sink',
  '_pulse-source._tcp': 'PulseAudio Sound Source',
  '_raop._tcp': 'AirTunes Remote Audio',
  '_realplayfavs._tcp': 'RealPlayer Shared Favorites',
  '_remote-jukebox._tcp': 'Remote Jukebox',
  '_rfb._tcp': 'VNC Remote Access',
  '_rss._tcp': 'Web Syndication RSS',
  '_rtp._udp': 'RTP Realtime Streaming Server',
  '_rtsp._tcp': 'RTSP Realtime Streaming Server',
  '_see._tcp': 'SubEthaEdit Collaborative Text Editor',
  '_sftp-ssh._tcp': 'SFTP File Transfer',
  '_shifter._tcp': 'Window Shifter',
  '_sip._udp': 'SIP Telephony',
  '_skype._tcp': 'Skype VoIP',
  '_smb._tcp': 'Microsoft Windows Network',
  '_ssh._tcp': 'SSH Remote Terminal',
  '_svn._tcp': 'Subversion Revision Control',
  '_telnet._tcp': 'Telnet Remote Terminal',
  '_tftp._udp': 'TFTP Trivial File Transfer',
  '_timbuktu._tcp': 'Timbuktu Remote Desktop Control',
  '_touch-able._tcp': 'iPod Touch Music Library',
  '_tp-https._tcp': 'Thousand Parsec Server (Secure HTTP Tunnel)',
  '_tp-http._tcp': 'Thousand Parsec Server (HTTP Tunnel)',
  '_tps._tcp': 'Thousand Parsec Server (Secure)',
  '_tp._tcp': 'Thousand Parsec Server',
  '_udisks-ssh._tcp': 'Remote Disk Management',
  '_vlc-http._tcp': 'VLC Streaming',
  '_webdavs._tcp': 'Secure WebDAV File Share',
  '_webdav._tcp': 'WebDAV File Share',
  '_workstation._tcp': 'Workstation',
  '_googlecast._tcp': 'Google Chromecast'
};
