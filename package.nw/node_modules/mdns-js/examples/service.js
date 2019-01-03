/*eslint no-console:0*/
var mdns = require('../');

console.log('should advertise a http service on port 9876');
var service = mdns.createAdvertisement(mdns.tcp('_http'), 9876, {
  name:'hello',
  txt:{
    txtvers:'1'
  }
});
service.start();

// read from stdin
process.stdin.resume();

// stop on Ctrl-C
process.on('SIGINT', function () {
  service.stop();

  // give deregistration a little time
  setTimeout(function onTimeout() {
    process.exit();
  }, 1000);
});

