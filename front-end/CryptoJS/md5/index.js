const crypto = require('crypto');
const CryptoJS = require('crypto-js');

const text = '4qHK04/a13bcc3a83f522d4fb5fdeac807a5247/80p_17450/output_hd.m3u81619892159';

const buf = crypto.createHash('md5').update(text).digest();

const hash = buf.toString('base64');

console.log(hash);

const h2 = CryptoJS.MD5(text).toString(CryptoJS.enc.Base64);

console.log(h2);
