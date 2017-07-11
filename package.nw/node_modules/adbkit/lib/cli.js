var Adb, Auth, PacketReader, Promise, forge, fs, pkg, program;

fs = require('fs');

program = require('commander');

Promise = require('bluebird');

forge = require('node-forge');

pkg = require('../package');

Adb = require('./adb');

Auth = require('./adb/auth');

PacketReader = require('./adb/tcpusb/packetreader');

Promise.longStackTraces();

program.version(pkg.version);

program.command('pubkey-convert <file>').option('-f, --format <format>', 'format (pem or openssh)', String, 'pem').description('Converts an ADB-generated public key into PEM format.').action(function(file, options) {
  return Auth.parsePublicKey(fs.readFileSync(file)).then(function(key) {
    switch (options.format.toLowerCase()) {
      case 'pem':
        return console.log(forge.pki.publicKeyToPem(key).trim());
      case 'openssh':
        return console.log(forge.ssh.publicKeyToOpenSSH(key, 'adbkey').trim());
      default:
        console.error("Unsupported format '" + options.format + "'");
        return process.exit(1);
    }
  });
});

program.command('pubkey-fingerprint <file>').description('Outputs the fingerprint of an ADB-generated public key.').action(function(file) {
  return Auth.parsePublicKey(fs.readFileSync(file)).then(function(key) {
    return console.log('%s %s', key.fingerprint, key.comment);
  });
});

program.command('usb-device-to-tcp <serial>').option('-p, --port <port>', 'port number', String, 6174).description('Provides an USB device over TCP using a translating proxy.').action(function(serial, options) {
  var adb, server;
  adb = Adb.createClient();
  server = adb.createTcpUsbBridge(serial, {
    auth: function() {
      return Promise.resolve();
    }
  }).on('listening', function() {
    return console.info('Connect with `adb connect localhost:%d`', options.port);
  }).on('error', function(err) {
    return console.error("An error occured: " + err.message);
  });
  return server.listen(options.port);
});

program.command('parse-tcp-packets <file>').description('Parses ADB TCP packets from the given file.').action(function(file, options) {
  var reader;
  reader = new PacketReader(fs.createReadStream(file));
  return reader.on('packet', function(packet) {
    return console.log(packet.toString());
  });
});

program.parse(process.argv);
