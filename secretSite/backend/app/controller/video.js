'use strict';

const Controller = require('egg').Controller;

class VideoController extends Controller {
  async getList() {
    const limit = this.ctx.query.limit || 10;
    this.ctx.body = await this.ctx.service.video.getList({ limit });
  }
}

module.exports = VideoController;
