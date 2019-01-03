/* eslint no-console:off */
const semver = require('semver');

if (semver.lt(process.version, '8.0.0')) {
  console.error('Use node >= 8.0.0 to run tests.');
  process.exit(1);
}
