const { parseHtml } = require('./util');
const fs = require('fs');

// 拿到所有的分类（镇区）
async function getCategoryList() {
  const $ = await parseHtml('http://b2b.huangye88.com/houjiezhen/jiajuwang/');
  const a = $('.adr_hot2 a');
  const list = [];
  for (let i = 0, len = a.length; i < len; i++) {
    let item = a.eq(i);
    list.push({
      name: item.attr('title'),
      url: item.attr('href')
    });
  }
  return list;
}

// 拿到某个分类下所有的页面
// 返回值是链接数组
async function getPages(url) {
  const $ = await parseHtml(url);
  const a = $('.page_tag a');
  const list = [url];
  for (let i = 0, len = a.length; i < len; i++) {
    let item = a.eq(i);
    let href = item.attr('href');
    let text = item.text();
    if (isNaN(Number(text))) continue;
    list.push(href);
  }
  return list;
}

// 从某个页里拿出所有的条目
// 返回值是对象数组
// name：公司名称，url：公司首页地址
async function getItemsFromPage(url) {
  const $ = await parseHtml(url);
  const dl = $('.mach_list2 dl');
  const list = [];
  for (let i = 0, len = dl.length; i < len; i++) {
    let item = dl.eq(i);
    if (item.attr('style')) continue;
    const a = item.find('a[itemprop]');
    let href = a.attr('href');
    let name = a.text();
    list.push({
      name, url: href
    });
  }
  return list;
}

// 获得单个企业的信息
// 传入url
async function getItemInfo(url) {
  const $ = await parseHtml(url);
  const info = {
    area: '',//区域
    name: '',//公司全称
    major: '',//主营产品
    address: '',//地址
    contact: '',//联系人
    phone: '',//联系方式
    url: ''//原链接地址
  };
  info.url = url;

  const desc = $('meta[name=Description]').attr('content');
  let r = desc.split(/，主营|，公司地址位于|，联系方式|，如果您/);
  info.name = r[0];
  info.major = r[1];
  info.address = r[2];
  info.phone = r[3];

  const leftBox = $('.c-left .l-txt').eq(0);
  const li = leftBox.find('li');
  for (let i = 0, len = li.length; i < len; i++) {
    let item = li.eq(i);
    let label = item.find('label').text();
    if (label !== '联系人：') {
      continue;
    }
    info.contact = item.find('a').text();
    break;
    // if (item.attr('style')) continue;
    // const a = item.find('a[itemprop]');
    // let href = a.attr('href');
    // let name = a.text();
    // list.push({
    //   name, url: href
    // });
  }

  return info;
}

const companyItem = {
  area: '区域',
  name: '公司全称',
  major: '主营产品',
  address: '地址',
  contact: '联系人',
  phone: '联系方式',
  url: '原链接地址'
};

async function main() {
  // return await getCategoryList();
  // return await getPages('http://b2b.huangye88.com/houjiezhen/jiajuwang/');
  // return await getItemsFromPage('http://b2b.huangye88.com/houjiezhen/jiajuwang/');
  // return await getItemInfo('http://b2b.huangye88.com/qiye2849178/');
  // return await getItemInfo('http://b2b.huangye88.com/gongsi/4015218/');
  let result = [];

  const categoryList = await getCategoryList();
  for (let i = 0, len_i = categoryList.length; i < len_i; i++) {
    let item = categoryList[i];
    let categoryName = item.name.replace(/家具企业名录/g, ''); // 当前的分类名
    console.log('正在获取:', categoryName, item.url);
    let pageList = await getPages(item.url);
    // 这个破网站的有点问题，手动加一行省的再改
    if (categoryName === '厚街镇') pageList.push('http://b2b.huangye88.com/houjiezhen/jiajuwang/pn11/');

    // 获得一个分类内的所有公司
    let tasks = pageList.map(item_url => (getItemsFromPage(item_url)));
    let res = await Promise.all(tasks);
    let itemList = res.reduce((a, b) => a.concat(b), []);

    let infos = await Promise.all(itemList.map(item => getItemInfo(item.url)));
    let infoList = infos.reduce((a, b) => a.concat(b), []);
    infoList.forEach(item => {
      item.area = categoryName;
    });
    result.push(infoList);
  }

  result = result.reduce((a, b) => a.concat(b), []);
  return result;
}

// 输出CSV
async function outputCSV(data) {
  const fields = ['area', 'name', 'major', 'address', 'contact', 'phone', 'url'];
  const list = data.map(item => {
    return fields.map(key => item[key]).join('%'); // 用百分号作为CSV的分隔符
  });
  list.unshift(fields.map(key => companyItem[key]).join('%'));
  fs.writeFileSync('result.csv', list.join('\n'));
}

main()
  .then((res) => {
    fs.writeFileSync('result.json', JSON.stringify(res, null, "  "));
    outputCSV(res).then(() => {
      process.exit(0);
    });
  }).catch(err => {
  console.error(err);
  process.exit(1);
});
