'use strict';

const Service = require('egg').Service;

class VideoService extends Service {
  async getList({ limit }) {
    const { ctx } = this;
    const { app } = ctx;
    return await app.mysql.query(`SELECT * FROM video_list ORDER BY RAND() LIMIT ${limit};`);
  }
}

module.exports = VideoService;
