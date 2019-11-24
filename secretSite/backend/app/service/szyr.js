'use strict';

const Service = require('egg').Service;

class SzyrService extends Service {

  /**
   * 获取所有房间列表
   */
  async getAllRoom() {
    const { ctx } = this;
    const res = await ctx.curl(`${ctx.app.config.szyrHost}/video_rest/index/all_anchor`);
    const r = /cb_anchor\(([\s\S]*)\)\s*/.exec(String(res.data));
    if (!r) {
      throw new Error('szyr getAll parse faile');
    }
    const jsonStr = r[1];
    const roomList = JSON.parse(jsonStr)
      .anchors.filter(item => item.status === 1)
      .filter(item => item.mode === 0);
    return roomList;
  }
}

module.exports = SzyrService;
