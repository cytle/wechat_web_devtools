mdns-js-packet
==============

[![Build Status](https://travis-ci.org/mdns-js/node-dns-js.svg?branch=master)](https://travis-ci.org/mdns-js/node-dns-js)

DNS packet parser specifically built for mdns-js 
[mdns-js](https://github.com/kmpm/node-mdns-js) 
but it should be generic enough to do general dns stuff.

NEW LOCATION

This project was moved into it's own organisation. Please update any git remotes you might have pointing here.

    git remote set-url origin https://github.com/mdns-js/node-dns-js.git



You probably want to have a look at 
[native-dns-packet](https://github.com/tjfontaine/native-dns-packet)
first and if that does do what you need, you might start looking at this.

mdns-js-packet should produce the same output as native-dns-packet,
it even uses it's test fixtures and borrows some parts of it.

This was made before i knew about native-dns-packet but since that
still has some bugs in handling some mDNS packets I cant use it.

example
-------

```javascript
var dns = require('dns-js');

/*some code that will get you a dns message buffer*/

var result = dns.DNSPacket.parse(message);

console.log(result);
```

Look at examples/dnsresolver.js for a more detailed example.

Contribute
----------
I will gladly accept any contributions as pull requests.
Just run __npm run lint__ on the code first so that the coding style
is kept somewhat consistent.
I miss doing this myself from time to time and I won't go ballistic if anyone
else forget but I would really appreciate it.
