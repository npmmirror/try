let BaseErrCode = 10000
const toastErr = {

}
const modalErr = {

}
const Err = {
  FA_INVALID_USER: {
    err: BaseErrCode++,
    msg: '无效用户'
  },
  FA_INVALID_UNIT: {
    err: BaseErrCode++,
    msg: '无效单位'
  }
}

module.exports = {
  Err
}
