// 加载解析 m3u8文件

const axios = require('axios');
const m3u8Parser = require('m3u8-parser');
const fs = require('fs');
const logger = require('log4js').getLogger('hls');
logger.level = 'debug';

const url = 'http://cyberplayer.bcelive.com/videoworks/mda-kbuhu4wqdi08dwix/cyberplayer/hls/cyberplayer-demo.m3u8';

async function main() {
  const res = await axios.get(url);
  const data = res.data;
  const parser = new m3u8Parser.Parser();
  parser.push(data);
  parser.end();
  const parsedManifest = parser.manifest;

  fs.writeFileSync('./temp.m3u8', data);
  fs.writeFileSync('./temp.json', JSON.stringify(parser.manifest));

  console.log(parsedManifest);
}

main()
  .then(() => {
    logger.debug('finished');
  })
  .catch((err) => {
    logger.debug('error:' + err.message);
  });
