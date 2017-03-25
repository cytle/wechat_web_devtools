
/**
 * Module dependencies.
 */

var Log = require('../lib/log')
  , fs = require('fs')
  , stream = fs.createWriteStream(__dirname + '/file.log', { flags: 'a' })
  , log = new Log('debug', stream);

log.debug('a debug message');
log.info('a info message');
log.notice('a notice message');
log.warning('a warning message');
log.error('a error message');
log.critical('a critical message');
log.alert('a alert message');
log.emergency('a emergency message');