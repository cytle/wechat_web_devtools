
/**
 * Module dependencies.
 */

var Log = require('../lib/log')
  , log = new Log('notice');

log.debug('a debug message');
log.info('a info message');
log.notice('a notice message');
log.warning('a warning message');
log.error('a error message');
log.critical('a critical message');
log.alert('a alert message');
log.emergency('a emergency %s', 'message');
log.emergency('a really %s emergency %s', 'bad', 'message');