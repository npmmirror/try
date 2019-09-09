'use strict';

/**
 * 返回结果对象
 */
class Result {

  constructor(success = false, data = null, errCode = -1, errMsg = null) {
    this.success = success;
    this.data = data;
    this.errCode = errCode;
    this.errMsg = errMsg;
  }

  setSuccess(data = null) {
    this.success = true;
    this.data = data;
    this.errCode = 0;
  }

  setError(errCode = -1, errMsg = null) {
    this.errCode = errCode;
    this.errMsg = errMsg;
  }
}

module.exports = Result;
