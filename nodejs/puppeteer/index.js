const puppeteer = require('puppeteer');
const path = require('path');
const logger = require('log4js').getLogger('puppeteer');
logger.level = 'debug';

async function delay(time) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
}

const main = async () => {
  const browser = await puppeteer.launch({
    // headless: false,
  });
  const page = await browser.newPage();
  page.setViewport({
    height: 1080,
    width: 1920,
  });
  // await page.emulate(puppeteer.devices['iPhone 11 Pro']);
  await page.goto('https://mp.weixin.qq.com/s/v6R2w26qZkEilXY0mPUBCw');
  // await delay(10000);
  await page.screenshot({ path: path.resolve(__dirname, 'temp.jpeg'), fullPage: true });
  await browser.close();
};

main()
  .then(() => {
    logger.debug('finished');
  })
  .catch((err) => {
    logger.debug('error happened', err);
  });
