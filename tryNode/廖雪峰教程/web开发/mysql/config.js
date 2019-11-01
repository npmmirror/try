// var config = {
//     database: 'database', // 使用哪个数据库
//     username: 'username', // 用户名
//     password: 'password', // 口令
//     host: 'host', // 主机名
//     port: 3306 // 端口号，MySQL默认3306
// };

const defaultConfig = './config/config-default';
// 可设定为绝对路径，如 /opt/product/config-override.js
const overrideConfig = './config/config-override';
const testConfig = './config/config-test';
const fs = require('fs');

var config = null;

if (process.env.NODE_ENV === 'test') {
    console.log(`Load ${testConfig}...`);
    config = require(testConfig);
} else {
    console.log(`Load ${defaultConfig}...`);
    config = require(defaultConfig);
    try {
        if (fs.statSync(overrideConfig).isFile()) {
            console.log(`Load ${overrideConfig}...`);
            config = Object.assign(config, require(overrideConfig));
        }
    } catch (err) {
        console.log(`Cannot load ${overrideConfig}.`);
    }
}

module.exports = config;


