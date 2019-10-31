'use strict';

const Controller = require('egg').Controller;

class WandouController extends Controller {
  async getAllRoom() {
    this.ctx.body = await this.ctx.service.wandou.getAllRoom();
  }

  async getWebsocket() {
    const { stream, uid } = this.ctx.query;
    this.ctx.body = await this.ctx.service.wandou.getWebsocket({ stream, uid });
  }
}

module.exports = WandouController;
