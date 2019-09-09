'use strict';

const { Controller } = require('egg');
const Result = require('./Result');

/**
 * Controller 基类
 */
class BaseController extends Controller {

  setSuccess(data) {
    const result = new Result();
    result.setSuccess(data);
    this.ctx.body = result;
  }

  setError(errCode, errMsg) {
    const result = new Result();
    result.setError(errCode, errMsg);
    this.ctx.body = result;
  }

}

module.exports = BaseController;
