/*eslint no-console:0*/
var mdns = require('../');

var TIMEOUT = 5000; //5 seconds

//if you have avahi or bonjour or other mdns service running on the same system
//you REALLY would like to exlude 0.0.0.0 from the interfaces bound to
//mdns.excludeInterface('0.0.0.0')

var browser = mdns.createBrowser(); //defaults to mdns.ServiceType.wildcard
//var browser = mdns.createBrowser(mdns.tcp('googlecast'));
//var browser = mdns.createBrowser(mdns.tcp("workstation"));

browser.on('ready', function onReady() {
  console.log('browser is ready');
  browser.discover();
});


browser.on('update', function onUpdate(data) {
  console.log('data:', data);
});

//stop after timeout
setTimeout(function onTimeout() {
  browser.stop();
}, TIMEOUT);
