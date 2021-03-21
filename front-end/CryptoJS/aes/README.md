index.js: 使用 CryptoJS 进行 AES 解密数据
image.js: 解密图片

命令行使用openssl解密图片

```sh
openssl enc -d -aes-128-cbc -K B2F3842866F9583D1ECE61C4E055C255 -iv E01EDE6331D37AFCC7BE05597D654D22 -in encryptedImage.jpg -out decrypted-openssl.jpg
```