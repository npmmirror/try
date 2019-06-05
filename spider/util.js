const axios = require('axios');
const cheerio = require('cheerio');
exports.parseHtml = async function (url) {
  const res = await request(url);
  const html = res.data;
  const $ = cheerio.load(html);
  return $;
};

async function request(url, time = 0) {
  if (time > 5) {
    throw new Error('超过重试次数：' + url);
  }
  return new Promise(resolve => {
    let fail = true;
    axios.get(url)
      .then(res => {
        fail = false;
        resolve(res);
      })
      .catch(err => {
        console.error(err);
      });
    setTimeout(() => {
      if (fail) {
        console.log('重试', time + 1, url);
        resolve(request(url, time + 1));
      }
    }, 10000);
  });
  // return await axios.get(url);
}
