mDNS-js
==========

[![Build Status](https://travis-ci.org/mdns-js/node-mdns-js.svg?branch=master)](https://travis-ci.org/mdns-js/node-mdns-js)

Pure JavaScript/NodeJS mDNS discovery implementation.
It's definitely not a full implementation at the current
state and it will NOT work in the browser. 

The starting inspiration came from
https://github.com/GoogleChrome/chrome-app-samples/tree/master/mdns-browser
but adapted for node. It's not much left of that now though.

__NEW LOCATION__

This project was moved into it's own organisation. Please update any git remotes you might have pointing here.

    git remote set-url origin https://github.com/mdns-js/node-mdns-js.git

Install by

    npm install mdns-js

* If you are running node version < 4.1 you will have to use a version of this 
  library that is below version 0.5.0
* If node is < 6.11 you will have to use a version of this library that is below 1.0.0

Future
------
It would be great to have a full implementation of mDSN + DNS-SD in pure JS but
progress will be slow unless someone is willing to pitch in with
pull requests, specifications for wanted functions etc.
Also, as you should avoid to have multiple mDNS stacks on a system this
might clash with stuff like avahi and bonjour.


example
-------

```javascript
var mdns = require('mdns-js');
//if you have another mdns daemon running, like avahi or bonjour, uncomment following line
//mdns.excludeInterface('0.0.0.0');

var browser = mdns.createBrowser();

browser.on('ready', function () {
    browser.discover(); 
});

browser.on('update', function (data) {
    console.log('data:', data);
});
```

Reporting issues
----------------
Please report any issues at https://github.com/mdns-js/node-mdns-js/issues

But please check if there is a similar issue already reported and
__make a note of which OS__ and OS version you are running.
There is some issues that turn up only on Windows 8.1 but not in 
Windows 7 for example. And there are differences between Mac and 
Windows so... __please__...

Another important thing to know if there is another mdns service
running on the same machine. This would be for example Bonjour and Avahi.


Debugging
---------
This library is using the [debug](https://github.com/visionmedia/debug) 
module from TJ Holowaychuk and can be used like this.

```bash
DEBUG=mdns:* node examples/simple.js
```

This will spit out LOTS of information that might be useful.
If you have some issues with something where you might want
to communicate the contents of a packet (ie create an issue on github)
you could limit the debug information to just that.

```bash
DEBUG=mdns:browser:packet node examples/simple.js
```

Contributing
------------
Pull-request will be gladly accepted.

If possible any api should be as close match to the api of node-mdns but
be pragmatic. Look at issue #5.

Please run any existing tests with

    npm test

and preferably add more tests.


Before creating a pull-request please run 

    npm run lint 

This will run jshint as well as jscs that will do some basic syntax
and code style checks.
Fix any issues befor committing and creating a pull-request.

Look at the .eslintrc file for the details.


License
=======
Apache 2.0. See LICENSE file.



References
==========

* https://github.com/GoogleChrome/chrome-app-samples/tree/master/samples/mdns-browser
* http://en.wikipedia.org/wiki/Multicast_DNS
* http://en.wikipedia.org/wiki/Zero_configuration_networking#Service_discovery
* RFC 6762 - mDNS - http://tools.ietf.org/html/rfc6762
* RFC 6763 - DNS Based Service Discovery (DNS-SD) - http://tools.ietf.org/html/rfc6763
* http://www.tcpipguide.com/free/t_DNSMessageHeaderandQuestionSectionFormat.htm


Contributors
============

* James Sigurðarson, @jamiees2
* Stefan Sauer, @ensonic
