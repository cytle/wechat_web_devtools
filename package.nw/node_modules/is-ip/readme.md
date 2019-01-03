# is-ip [![Build Status](https://travis-ci.org/sindresorhus/is-ip.svg?branch=master)](https://travis-ci.org/sindresorhus/is-ip)

> Check if a string is an IP address


## Install

```
$ npm install --save is-ip
```


## Usage

```js
const isIp = require('is-ip');

isIp('192.168.0.1');
//=> true

isIp('1:2:3:4:5:6:7:8');
//=> true

isIp.v4('1:2:3:4:5:6:7:8');
//=> false
```


## API

### isIp(input)

Check if `input` is IPv4 or IPv6.

### isIp.v4(input)

Check if `input` is IPv4.

### isIp.v6(input)

Check if `input` is IPv6.


## Related

- [ip-regex](https://github.com/sindresorhus/ip-regex) - Regular expression for matching IP addresses


## License

MIT © [Sindre Sorhus](https://sindresorhus.com)
