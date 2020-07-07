import Taro from '@tarojs/taro'

const {
  hideLoading,
  hideNavigationBarLoading
} = Taro

// query to string
function queryToString(query) {
  const items = []
  const keys = Object.keys(query)
  keys.forEach(key => {
    items.push(`${key}=${query[key]}`)
  })
  return items.join('&')
}

// show error with toast or modal
async function showError(e, opts = {}) {
  hideLoading()
  hideNavigationBarLoading()
  const { type = 'toast', icon = 'none', duration = 2000 } = opts
  let { msg } = e.data || {}
  msg || (msg = e.message || '出错了')
  if (typeof (e) === 'string') msg = e

  if (type === 'modal') {
    return Taro.showModal({
      content: msg,
      showCancel: false
    })
  } else {
    return Taro.showToast({
      title: msg,
      icon,
      duration
    })
  }
}

async function showErrorModal(e, opts) {
  return showError(e, { type: 'modal', ...opts })
}

// 重新启动小程序
function reLaunch(url) {
  if (!url) {
    const { path, query } = Taro.getLaunchOptionsSync()
    // eslint-disable-next-line no-param-reassign
    url = `/${path}?${queryToString(query)}`
  }
  Taro.reLaunch({ url })
}

// 显示错误后，重新启动小程序
// eslint-disable-next-line
async function showErrorAndReLaunch(e, url, opts) {
  await showErrorModal(e)
  reLaunch(url)
}

// location 转换为字符串
function locationToString(value) {
  // eslint-disable-next-line @typescript-eslint/prefer-optional-chain
  if (value && value.latitude && value.longitude) {
    return `${value.latitude},${value.longitude}`
  } else {
    return ''
  }
}

// 字符串转换为位置对象
function stringToLocation(gps) {
  if (gps) {
    const v = gps.split(',')
    if (v.length === 2) {
      return {
        latitude: Number(v[0]),
        longitude: Number(v[1])
      }
    }
  }
  return null
}

// 延时
function delay(ms) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, ms)
  })
}

function throttle(callback, duration) {
  let ready = true;
  return (...args) => {
    if (!ready) {
      return;
    }
    ready = false;
    callback(...args);
    setTimeout(() => {
      ready = true;
    }, duration);
  };
}

// 防抖
function debounce(callback, duration = 1000) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      callback(...args); // 传递给func内部
    }, duration);
  };
}

// 比较版本号大小
function compareVersion(v1, v2) {
  // eslint-disable-next-line no-param-reassign
  v1 = v1.split('.')
  // eslint-disable-next-line no-param-reassign
  v2 = v2.split('.')
  const len = Math.max(v1.length, v2.length)

  while (v1.length < len) {
    v1.push('0')
  }
  while (v2.length < len) {
    v2.push('0')
  }

  for (let i = 0; i < len; i++) {
    const num1 = parseInt(v1[i], 10)
    const num2 = parseInt(v2[i], 10)

    if (num1 > num2) {
      return 1
    } else if (num1 < num2) {
      return -1
    }
  }

  return 0
}

/**
 * 中英文字符
 * @param name
 * @returns {boolean}
 */
function isLegalInput(str = '') {
  if (typeof str !== 'string') return false
  const reg = /^[\u4e00-\u9fa5a-zA-Z0-9]*$/
  return reg.test(str)
}

/**
 * 手机号加密（显示前3后4）
 * @param mobile
 */
function mobileEncrypt(mobile) {
  if (!mobile || mobile.length < 11) return ''
  return `${mobile.substr(0, 3)}****${mobile.substr(7, 4)}`
}

// eslint-disable-next-line import/no-commonjs
module.exports = {
  queryToString,
  showError,
  showErrorModal,
  reLaunch,
  showErrorAndReLaunch,
  locationToString,
  stringToLocation,
  delay,
  throttle,
  debounce,
  compareVersion,
  isLegalInput,
  mobileEncrypt
}
