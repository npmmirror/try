const download = require('download');
const qs = require('qs');

// 使用 wordpress 对网页生成预览图

const wpUrl = 'https://s.wordpress.com/mshots/v1/';
let url = 'https://www.google.com';
const w = 1280,
  h = 960;

if (process.argv[2]) {
  url = process.argv[2];
}

(async function () {
  try {
    // const res = await axios.get();
    const u = wpUrl + encodeURIComponent(url) + qs.stringify({ w, h }, { addQueryPrefix: true });
    const res = await download(u, 'temp', {
      filename: Date.now() + '-' + url.replace('https://', '') + '.png',
    });
    // console.log(res);
  } catch (err) {
    console.error(err);
  }
})();
