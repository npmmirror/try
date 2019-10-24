'use strict';

const Controller = require('egg').Controller;

class WandouController extends Controller {
  async getAllRoom() {
    this.ctx.body = await this.ctx.service.wandou.getAllRoom();
  }
}

module.exports = WandouController;
