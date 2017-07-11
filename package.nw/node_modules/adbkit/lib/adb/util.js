var Auth, Parser;

Parser = require('./parser');

Auth = require('./auth');

module.exports.readAll = function(stream, callback) {
  return new Parser(stream).readAll(stream).nodeify(callback);
};

module.exports.parsePublicKey = function(keyString, callback) {
  return Auth.parsePublicKey(keyString).nodeify(callback);
};
