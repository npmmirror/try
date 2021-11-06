const CryptoJS = require('crypto-js');
const resp = require('./18comicresponse.json');
const encryptedText = resp.data;

const unix = 1635868731;
const key = CryptoJS.MD5(`${unix}18comicAPPContent`).toString();
const kkk = CryptoJS.enc.Utf8.parse(key);
const ddd = CryptoJS.AES.decrypt(encryptedText, kkk, {
  mode: CryptoJS.mode.ECB,
});

try {
  decryptedStr = JSON.parse(ddd.toString(CryptoJS.enc.Utf8));
} catch (t) {
  console.error(`responseObj error :${t}`);
}

console.log('decryptedStr', decryptedStr);

process.exit(0);
