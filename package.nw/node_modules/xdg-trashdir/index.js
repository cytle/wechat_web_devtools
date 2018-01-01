'use strict';
const fs = require('fs');
const path = require('path');
const df = require('@sindresorhus/df');
const mountPoint = require('mount-point');
const userHome = require('user-home');
const xdgBasedir = require('xdg-basedir');
const pify = require('pify');

const check = file => {
	const topuid = `${file}-${process.getuid()}`;
	const stickyBitMode = 17407;

	return pify(fs.lstat)(file)
		.then(stats => {
			if (stats.isSymbolicLink() || stats.mode !== stickyBitMode) {
				return topuid;
			}

			return path.join(file, String(process.getuid()));
		})
		.catch(err => {
			if (err.code === 'ENOENT') {
				return topuid;
			}

			return path.join(xdgBasedir.data, 'Trash');
		});
};

module.exports = file => {
	if (process.platform !== 'linux') {
		return Promise.reject(new Error('Only Linux systems are supported'));
	}

	if (!file) {
		return Promise.resolve(path.join(xdgBasedir.data, 'Trash'));
	}

	return Promise.all([
		mountPoint(userHome),
		// Ignore errors in case `file` is a dangling symlink
		mountPoint(file).catch(() => {})
	]).then(mountPoints => {
		const homeMountPoint = mountPoints[0];
		const fileMountPoint = mountPoints[1];
		if (!fileMountPoint || fileMountPoint === homeMountPoint) {
			return path.join(xdgBasedir.data, 'Trash');
		}

		return check(path.join(fileMountPoint, '.Trash'));
	});
};

module.exports.all = () => {
	if (process.platform !== 'linux') {
		return Promise.reject(new Error('Only Linux systems are supported'));
	}

	return df().then(list => Promise.all(list.map(file => {
		if (file.mountpoint === '/') {
			return path.join(xdgBasedir.data, 'Trash');
		}

		return check(path.join(file.mountpoint, '.Trash'));
	})));
};
