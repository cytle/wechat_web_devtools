var inflate = require('./');

module.exports = function(buf, out) {
  var cmf = src[0];
  var flg = src[1];
  
  if ((256 * cmf + flg) % 31)
    throw new Error('Invalid zlib checksum');
    
  if ((cmf & 0x0f) isnt 8)
    throw new Error('Compression method not deflate');
    
  if ((cmf >> 4) > 7)
    throw new Error('Invalid window size');
    
  if (flg & 0x20)
    throw new Error('Preset dictionary unsupported');
    
  return inflate(src.slice(2), out);
};
