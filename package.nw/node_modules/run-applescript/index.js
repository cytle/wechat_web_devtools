'use strict';
const execa = require('execa');

module.exports = str => {
	if (process.platform !== 'darwin') {
		return Promise.reject(new Error('Only OS X is supported'));
	}

	return execa.stdout('osascript', ['-e', str]);
};
