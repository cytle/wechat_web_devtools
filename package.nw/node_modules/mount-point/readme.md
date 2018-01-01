# mount-point [![Build Status](http://img.shields.io/travis/kevva/mount-point.svg?style=flat)](https://travis-ci.org/kevva/mount-point)

> Get the [mount point](http://en.wikipedia.org/wiki/Mount_%28computing%29) for a file


## Install

```
$ npm install --save mount-point
```


## Usage

```js
const mountPoint = require('mount-point');

mountPoint('foo.tar.gz').then(mount => {
	console.log(mount);
	//=> '/'
});
```


## Related

* [df](https://github.com/sindresorhus/df) - Get free disk space info from `df -kP`


## License

MIT © [Kevin Mårtensson](https://github.com/kevva)
