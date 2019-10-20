/**
 * 此文件无实际作用，只是为了让 WebStorm 能感受识别 alias 引入
 */

const path = require('path');

module.exports = {
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '..', 'src')
    }
  }
};
