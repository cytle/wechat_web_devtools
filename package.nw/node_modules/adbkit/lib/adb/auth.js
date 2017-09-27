var Auth, BigInteger, Promise, forge;

Promise = require('bluebird');

forge = require('node-forge');

BigInteger = forge.jsbn.BigInteger;


/*
The stucture of an ADB RSAPublicKey is as follows:

    #define RSANUMBYTES 256           // 2048 bit key length
    #define RSANUMWORDS (RSANUMBYTES / sizeof(uint32_t))

    typedef struct RSAPublicKey {
        int len;                  // Length of n[] in number of uint32_t
        uint32_t n0inv;           // -1 / n[0] mod 2^32
        uint32_t n[RSANUMWORDS];  // modulus as little endian array
        uint32_t rr[RSANUMWORDS]; // R^2 as little endian array
        int exponent;             // 3 or 65537
    } RSAPublicKey;
 */

Auth = (function() {
  var RE, readPublicKeyFromStruct;

  function Auth() {}

  RE = /^((?:[A-Za-z0-9+\/]{4})*(?:[A-Za-z0-9+\/]{2}==|[A-Za-z0-9+\/]{3}=)?)\0? (.*)\s*$/;

  readPublicKeyFromStruct = function(struct, comment) {
    var e, key, len, md, n, offset;
    if (!struct.length) {
      throw new Error("Invalid public key");
    }
    offset = 0;
    len = struct.readUInt32LE(offset) * 4;
    offset += 4;
    if (struct.length !== 4 + 4 + len + len + 4) {
      throw new Error("Invalid public key");
    }
    offset += 4;
    n = new Buffer(len);
    struct.copy(n, 0, offset, offset + len);
    [].reverse.call(n);
    offset += len;
    offset += len;
    e = struct.readUInt32LE(offset);
    if (!(e === 3 || e === 65537)) {
      throw new Error("Invalid exponent " + e + ", only 3 and 65537 are supported");
    }
    key = forge.pki.setRsaPublicKey(new BigInteger(n.toString('hex'), 16), new BigInteger(e.toString(), 10));
    md = forge.md.md5.create();
    md.update(struct.toString('binary'));
    key.fingerprint = md.digest().toHex().match(/../g).join(':');
    key.comment = comment;
    return key;
  };

  Auth.parsePublicKey = function(buffer) {
    return new Promise(function(resolve, reject) {
      var comment, match, struct;
      if (match = RE.exec(buffer)) {
        struct = new Buffer(match[1], 'base64');
        comment = match[2];
        return resolve(readPublicKeyFromStruct(struct, comment));
      } else {
        return reject(new Error("Unrecognizable public key format"));
      }
    });
  };

  return Auth;

})();

module.exports = Auth;
