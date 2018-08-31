# image-type [![Build Status](https://travis-ci.org/sindresorhus/image-type.svg?branch=master)](https://travis-ci.org/sindresorhus/image-type)

> Detect the image type of a Buffer/Uint8Array

See the [`file-type`](https://github.com/sindresorhus/file-type) module for more file types and a CLI.


## Install

```
$ npm install --save image-type
```


## Usage

##### Node.js

```js
const readChunk = require('read-chunk'); // npm install read-chunk
const imageType = require('image-type');
const buffer = readChunk.sync('unicorn.png', 0, 12);

imageType(buffer);
//=> {ext: 'png', mime: 'image/png'}
```

Or from a remote location:

```js
const http = require('http');
const imageType = require('image-type');
const url = 'http://assets-cdn.github.com/images/spinners/octocat-spinner-32.gif';

http.get(url, res => {
	res.once('data', chunk => {
		res.destroy();
		console.log(imageType(chunk));
		//=> {ext: 'gif', mime: 'image/gif'}
	});
});
```

##### Browser

```js
const xhr = new XMLHttpRequest();
xhr.open('GET', 'unicorn.png');
xhr.responseType = 'arraybuffer';

xhr.onload = () => {
	imageType(new Uint8Array(this.response));
	//=> {ext: 'png', mime: 'image/png'}
};

xhr.send();
```


## API

### imageType(input)

Returns an `Object` with:

- `ext` - One of the [supported file types](#supported-file-types)
- `mime` - The [MIME type](http://en.wikipedia.org/wiki/Internet_media_type)

Or `null` when no match.

#### input

Type: `Buffer` `Uint8Array`

It only needs the first 12 bytes.


## Supported file types

- `jpg`
- `png`
- `gif`
- `webp`
- `tif`
- `bmp`
- `jxr`
- `psd`

*SVG isn't included as it requires the whole file to be read, but you can get it [here](https://github.com/sindresorhus/is-svg).*


## License

MIT © [Sindre Sorhus](https://sindresorhus.com)
