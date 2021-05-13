const qs = require('qs');
const fse = require('fs-extra');
const axios = require('axios');
const path = require('path');
const cheerio = require('cheerio');
const puppeteer = require('puppeteer');
const { default: PQueue } = require('p-queue');
const log4js = require('log4js');
const lowdb = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

log4js.configure({
  appenders: { console: { type: 'console' } },
  categories: { default: { appenders: ['console'], level: 'debug' } },
});
const logger = log4js.getLogger('crawler-baidu');
logger.level = 'debug';

const adapter = new FileSync('temp-db.json');
const db = lowdb(adapter);
db.defaults({ list: [] });

const queue = new PQueue({
  concurrency: 2,
});

// 根据关键词获取百度搜索结果html
async function getSearchResultHtml(keyword) {
  const qStr = qs.stringify({
    pn: 0, // 跳过记录数
    rn: 10, // 每页条数
    wd: keyword, // 搜索关键词
  });

  const url = `https://www.baidu.com/s?${qStr}`;

  const res = await axios.get(url, {
    headers: {
      'user-agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36 OPR/76.0.4017.107',
    },
  });
  const htmlText = res.data;

  logger.debug('getSearchResultHtml', url);

  return htmlText;
}

// 根据关键词获取百度搜索结果html
async function getNewsResultHtml(keyword) {
  const qStr = qs.stringify({
    tn: 'news',
    rtt: 1, // 未知
    bsst: 1, //未知
    cl: 2, // 未知
    pn: 0, // 跳过记录数
    rn: 10, // 每页条数
    wd: keyword, // 搜索关键词
  });

  const url = `https://www.baidu.com/s?${qStr}`;

  const res = await axios.get(url, {
    headers: {
      'user-agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36 OPR/76.0.4017.107',
    },
  });
  const htmlText = res.data;

  logger.debug('getSearchResultHtml', url);

  return htmlText;
}

async function getSearchResultHtmlFromFile() {
  return fse.readFile('./temp-searchResult.html', { encoding: 'utf-8' });
}

// 解析百度搜索结果的 html，但是此时的url还是baidu的跳转地址，需要后续转换
function parseSearchResult(htmlText) {
  const $ = cheerio.load(htmlText, {
    decodeEntities: false,
  });

  const $result = $('div.result');

  const list = $result
    .map((_, el) => {
      const $el = $(el);
      const $link = $el.find('h3 a');
      const $posterImg = $el.find('img.c-img');
      const $abstract = $el.find('.c-abstract');
      const $time = $abstract.children('.newTimeFactor_before_abs');
      $time.remove(); // 移除摘要里关于日期的信息
      return {
        href: $link.attr('href'), // href 是百度地址，需要转换
        title: $link.text(),
        titleHtml: $link.html(),
        posterUrl: $posterImg.attr('src'), // 封面尺寸是 127x75 px，不一定有，且图片地址为百度，需要主动下载
        abstract: $abstract.text(),
        abstractHtml: $abstract.html(),
        time: $time.text(),
      };
    })
    .get();
  return list;
}

// 获取真实地址
async function getActualUrl(url) {
  if (!url) return '';
  try {
    await axios.head(url, {
      maxRedirects: 0,
    });
    return url; // 地址有效
  } catch (error) {
    if (error.response.status === 302) {
      const location = error.response.headers.location;
      return location;
    } else {
      return '';
    }
  }
}

// 截图
async function getScreenShot(url) {
  const browser = await puppeteer.launch({
    // headless: false,
  });
  const page = await browser.newPage();
  page.setViewport({
    height: 1080,
    width: 1920,
  });
  await page.goto(url, {
    waitUntil: 'networkidle2',
  });
  const buf = await page.screenshot({ fullPage: true });
  await browser.close();
  return buf;
}

async function searchCrawler() {
  await queue.add(async () => {
    const keyword = `+"徐闻"+"禁毒"`;
    // const keyword = `+"杭州"+"禁毒"`;
    const htmlText = await getSearchResultHtml(keyword);
    await fse.writeFile('./temp-searchResult.html', htmlText);
    // const htmlText = await getSearchResultHtmlFromFile();
    const list = await parseSearchResult(htmlText);

    await db.set('list', list).write();
  });
}

async function processList() {
  const list = db.get('list');
  logger.debug('processList', list.length);
  await Promise.all(
    list.map(async (item, idx) => {
      await queue.add(async () => {
        logger.debug('process item', idx);

        if (item.href) {
          try {
            const actualUrl = await getActualUrl(item.href);
            item.actualUrl = actualUrl;
            db.set(`list[${idx}].actualUrl`, actualUrl);
            logger.debug('getActualUrl succeed', idx);
          } catch (err) {
            logger.error('getActualUrl fail', idx, err.message);
          }
        }

        if (item.actualUrl) {
          try {
            const buf = await getScreenShot(item.actualUrl);
            const screenshot = `temp_screenshot_${idx}.jpeg`;
            await fse.writeFile(path.resolve(__dirname, 'img', screenshot), buf);
            db.set(`list[${idx}].img`, screenshot);
            logger.debug('getScreenShot succeed', idx);
          } catch (err) {
            logger.error('getScreenShot fail', idx, err.message);
          }
        }

        if (item.posterUrl) {
          try {
            const res = await axios.get(item.posterUrl, {
              responseType: 'arraybuffer',
            });
            const posterBuf = res.data;
            const poster = `temp_poster_${idx}.jpeg`;
            await fse.writeFile(path.resolve(__dirname, 'img', poster), posterBuf);
            db.set(`list[${idx}].poster`, poster);
            logger.debug('getPoster succeed', idx);
          } catch (err) {
            logger.error('getPoster fail', idx, err.message);
          }
        }
        await db.write();
      });
    })
  );
  logger.debug('processList end');
}

// main();

processList();

// setInterval(() => {
//   logger.debug('queue size', queue.size);
// }, 1000);
