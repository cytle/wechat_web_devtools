
/**
 * Module dependencies.
 */

var Log = require('../lib/log')
  , fs = require('fs')
  , stream = fs.createReadStream(__dirname + '/file.log')
  , log = new Log('debug', stream);

log.on('line', function(line){
  console.log(line);
}).on('end', function(){
  console.log('done');
});;