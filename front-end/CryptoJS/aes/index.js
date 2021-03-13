const CryptoJS = require("crypto-js");
const fs = require("fs");
fs.watch("./", (event, filename) => {
  if (filename.indexOf("decrypt") !== -1) {
    return;
  }

  const encryptedText = fs.readFileSync("./response.txt", "utf-8");
  const iv = fs.readFileSync("./iv.txt", "utf-8");

  const decryptedStr = decryptByAES(
    encryptedText,
    iv,
    "322b63a3be0567ae7cae7a2f368ee38a"
  );

  // console.log(decryptedStr);

  let res;
  try {
    res = JSON.stringify(JSON.parse(decryptedStr), null, "  ");
  } catch (e) {
    res = decryptedStr;
  }

  fs.writeFileSync("./decryptedStr.json", res, {
    encoding: "utf-8",
  });
});

function decryptByAES(response, iv, key) {
  return (
    (key = CryptoJS.enc.Utf8.parse(key)),
    (iv = CryptoJS.MD5(iv).toString().substr(8, 16)),
    (iv = CryptoJS.enc.Utf8.parse(iv)),
    CryptoJS.AES.decrypt(response, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    }).toString(CryptoJS.enc.Utf8)
  );
}
