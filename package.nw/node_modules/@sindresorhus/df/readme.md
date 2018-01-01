# df [![Build Status](https://travis-ci.org/sindresorhus/df.svg?branch=master)](https://travis-ci.org/sindresorhus/df)

> Get free disk space info from [`df -kP`](http://en.wikipedia.org/wiki/Df_\(Unix\))

Works on any Unix based system like macOS and Linux.

*Created because all the other `df` wrappers are terrible. This one uses simple and explicit parsing. Uses `execFile` rather than `exec`. Ensures better platform portability by using the `-P` flag. Returns sizes in bytes instead of kilobytes and the capacity as a float.*


## Install

```
$ npm install --save @sindresorhus/df
```


## Usage

```js
const df = require('@sindresorhus/df');

df().then(list => {
	console.log(list);
	/*
	[{
		filesystem: '/dev/disk1',
		size: 499046809600,
		used: 443222245376,
		available: 55562420224,
		capacity: 0.89,
		mountpoint: '/'
	}, ...]
	*/
});

df.fs('/dev/disk1').then(data => {
	console.log(data);
	/*
	{
		filesystem: '/dev/disk1',
		...
	}
	*/
});

df.file(__dirname).then(data => {
	console.log(data);
	/*
	{
		filesystem: '/dev/disk1',
		...
	}
	*/
});
```


## API

### df()

Returns a promise for an array of filesystems with space info.

### df.fs(filesystem)

Returns a promise for an object with the space info for the specified filesystem.

- `filesystem` - The name of the filesystem.
- `size` - Total size in bytes.
- `used` - Used size in bytes.
- `available` - Available size in bytes.
- `capacity` - Capacity as a float from `0` to `1`.
- `mountpoint` - Disk mount location.

#### filesystem

Type: `string`

### df.file(file)

Returns a promise for an object with the space info for the filesystem the supplied file is part of.

#### file

Type: `string`


## License

MIT © [Sindre Sorhus](https://sindresorhus.com)
