'use strict';

const Service = require('egg').Service;

class WandouService extends Service {

  /**
   * 获取豌豆直播所有房间列表
   */
  async getAllRoom() {
    const { ctx } = this;
    const res = await ctx.curl('https://web.sesuzhi.org/api/public/?service=Home.getHot&p=1');
    const data = JSON.parse(String(res.data));
    const list = data.data.info[0].list;
    // 排序后把 type === '2'，也就是在秀的排在前面，避免客户端再排序了
    const sortedList = list.filter(item => item.type === '2').concat(list.filter(item => item.type !== '2'));
    return sortedList;
  }
}

module.exports = WandouService;
