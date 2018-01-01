'use strict';
var df = require('@sindresorhus/df');
var pify = require('pify');
var Promise = require('pinkie-promise');

module.exports = function (file) {
	return pify(df.file, Promise)(file).then(function (data) {
		return data.mountpoint;
	});
};
