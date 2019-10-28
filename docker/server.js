const express = require('express');
const app = express();

app.get('/', function (_, res) {
  res.send('hello world');
});

app.listen(3000, function () {
  console.log('server start...');
});
