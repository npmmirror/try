# Taro TS 项目配置

> 这里选择的是 Less + Mobx + Typescript 的模板

## 添加 alias

[参考 Taro 编译详情配置](https://nervjs.github.io/taro/docs/config-detail.html#alias)

1. 在 `config/index.js` 中添加 alias 的配置

```
  alias: {
    '@': path.resolve(__dirname, '..', 'src'),
  }
```

2. `tsconfig.json` 添加 `paths` 规则

```
  "paths": {
    "@/*": ["src/*"]
  }
```
