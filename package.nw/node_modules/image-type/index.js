'use strict';
const fileType = require('file-type');

const imageExts = new Set([
	'jpg',
	'png',
	'gif',
	'webp',
	'tif',
	'bmp',
	'jxr',
	'psd'
]);

module.exports = input => {
	const ret = fileType(input);
	return imageExts.has(ret && ret.ext) ? ret : null;
};
