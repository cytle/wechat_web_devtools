;!function(require, directRequire){;"use strict";Object.defineProperty(exports,"__esModule",{value:!0});const fs=require("fs"),crypto=require("crypto"),publicKey=`-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCZm2cFP/uF81V5KH/B9dn/g7WA
CM3yu0P7n9sm/O6c58HTYI0+xugCfwMuoX7hyU4jkWbZ/BYK7IgWhmVfiRtgomJe
wuZlxfGUpmrr1PA2KbYVpPW0V6e/2uZu1Ev3xU7PkHKYf4AKgPO8w98hvKlUJRbk
H4AYMxX6eL9j9qCBGQIDAQAB
-----END PUBLIC KEY-----`;function checkSignature(a,b){if(!b)return!1;const c=Buffer.from(b,"base64"),d=crypto.createVerify("RSA-SHA1");return d.update(a),!!d.verify(publicKey,c)}exports.checkSignature=checkSignature;function checkFileMd5Signature(a,b){const c=fs.readFileSync(a),d=crypto.createHash("md5");d.update(c);const e=d.digest("hex");return checkSignature(e,b)}exports.checkFileMd5Signature=checkFileMd5Signature;
;}(require("lazyload"), require);
