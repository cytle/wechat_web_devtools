var inflate = require('./');

module.exports = function(buf) {
  if (src[0] !== 0x1f || src[1] !== 0x8b)
    throw new Error('Invalid gzip header');
  
  if (src[2] !== 8)
    throw new Error('Unsupported compression method');
  
  var flg = src[3];
  if (flg & 0xe0)
    throw new Error('Reserved bits are not zero');
    
  var start = 10;
  
  // skip extra data if present
  if (flg & 4)
    start += src.readUInt16LE(start) + 2;
  
  // skip filename if present
  if (flg & 8) {
    while (src[start]) start++;
    start++;
  }
  
  // skip file comment if present
  if (flg & 16) {
    while (src[start]) start++;
    start++;
  }
  
  // skip header csc
  if (flg & 2)
    start += 2;
  
  // get decompressed length and allocate a buffer
  var dlen = src.readUInt32LE(src.length - 4);
  var data = new Buffer(dlen);
  
  // decompress data
  return inflate(src.slice(start, -8), data);
};
