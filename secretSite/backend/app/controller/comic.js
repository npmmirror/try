'use strict';

const Controller = require('egg').Controller;

class ComicController extends Controller {
  async getList() {
    const limit = this.ctx.query.limit || 10;
    this.ctx.body = await this.ctx.service.comic.getList({
      limit: +limit,
    });
  }
}

module.exports = ComicController;
