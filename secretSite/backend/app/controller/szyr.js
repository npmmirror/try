'use strict';

const Controller = require('egg').Controller;

class SzyrController extends Controller {
  async getAllRoom() {
    this.ctx.body = await this.ctx.service.szyr.getAllRoom();
  }
}

module.exports = SzyrController;
