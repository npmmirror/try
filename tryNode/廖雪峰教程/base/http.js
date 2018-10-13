'use strict';

const http = require('base/http');

// 创建http server，并传入回调函数:
const server = http.createServer(function (request, response) {
    // 回调函数接收request和response对象,
    // 获得HTTP请求的method和url:
    console.log(request.method + ': ' + request.url);
    // 将HTTP响应200写入response, 同时设置Content-Type: text/html:
    response.writeHead(404, {'Content-Type': 'text/html'});
    // 将HTTP响应的HTML内容写入response:
    response.end('<h1>Hello world!</h1>');
});

// 让服务器监听8080端口:
// server.listen(80);

// console.log('Server is running at http://127.0.0.1:80/');


const url = require('url');

console.log(url.parse('http://user:pass@host.com:8080/path/to/file?query=string#hash'));


const path = require('path');

// 解析当前目录:
const workDir = path.resolve('.'); // '/Users/michael'
console.log('workDir', workDir);

// 组合完整的文件路径:当前目录+'pub'+'index.html':
const filePath = path.join(workDir, 'pub', 'index.html');
// '/Users/michael/pub/index.html'
console.log('filePath', filePath);
