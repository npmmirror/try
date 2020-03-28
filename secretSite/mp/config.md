# Taro TS 项目配置

> 这里选择的是 Less + Mobx + Typescript 的模板

## 添加 alias

1. 在 `config/index.js` 中添加 alias 的配置

```
  alias: {
    '@': path.resolve(__dirname, '..', 'src'),
  }
```

2. 新建 `webpack.config.js`

```javascript
/**
 * 此文件无实际作用，只是为了让 WebStorm 能感受识别 alias 引入
 */
const path = require("path");
module.exports = {
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "..", "src")
    }
  }
};
```
