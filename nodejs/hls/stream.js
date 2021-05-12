const fs = require('fs');
const m3u8stream = require('m3u8stream');

// 下载 m3u8 为 mp4

m3u8stream('http://cyberplayer.bcelive.com/videoworks/mda-kbuhu4wqdi08dwix/cyberplayer/hls/cyberplayer-demo.m3u8').pipe(
  fs.createWriteStream('temp.mp4')
);
