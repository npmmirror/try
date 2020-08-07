#!/bin/node

const ci = require('miniprogram-ci');
const projectConfig = require('../project.config.json');
const path = require('path');

(async () => {
  const project = new ci.Project({
    appid: projectConfig.appid,
    type: 'miniProgram',
    projectPath: path.resolve(__dirname, '../dist'),
    privateKeyPath: path.resolve(__dirname, './deployKey'),
    ignores: ['node_modules/**/*'],
  });
  const previewResult = await ci.preview({
    project,
    desc: '这个是预览备注', // 此备注将显示在“小程序助手”开发版列表中
    robot: 1,
    setting: {
      es6: false,
    },
    qrcodeFormat: 'terminal',
    qrcodeOutputDest:path.resolve(__dirname, './preview.jpg'),
    onProgressUpdate: console.log,
    // pagePath: 'pages/index/index', // 预览页面
    // searchQuery: 'a=1&b=2',  // 预览参数 [注意!]这里的`&`字符在命令行中应写成转义字符`\&`
  });
  console.log(previewResult);
})();
