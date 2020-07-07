# 为 Taro 的小程序 TS 模板加点料

Taro 初始化后提供的项目骨架比较简单，需要进行一些二次加工~

[项目地址：https://github.com/WozHuang/try/tree/master/taro/template2](https://github.com/WozHuang/try/tree/master/taro/template2)

- [为 Taro 的小程序 TS 模板加点料](#为-taro-的小程序-ts-模板加点料)
  - [运行环境](#运行环境)
  - [添加 alias](#添加-alias)
  - [配置 eslint 校验](#配置-eslint-校验)
  - [mobx 数据持久化](#mobx-数据持久化)
  - [封装缓存、网络请求功能](#封装缓存网络请求功能)
  - [TODO](#todo)

## 运行环境

> 这里选择的是 Sass + Mobx + **Typescript** 的模板

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

## 配置 eslint 校验

1. 添加 `.eslintignore` 文件忽略部分无关的内容

```
config/*
dist/*
```

2. 配置 eslint 规则

这里直接选用 alloyTeam 推荐的规则，安装 `eslint-config-alloy` ：

```
npm install --save-dev eslint-config-alloy
```

> PS：如果提示找不到规则就需要升级所有 eslint 的相关依赖，[相关 issue](https://github.com/AlloyTeam/eslint-config-alloy/issues/128)

```
npm install --save-dev eslint@latest typescript@latest @typescript-eslint/parser@latest @typescript-eslint/eslint-plugin@latest eslint-plugin-react@latest eslint-config-alloy@latest
```

3. 修改 `eslintrc` 文件

添加 `extends`

```
  extends: [
      'alloy',
      'alloy/react',
      'alloy/typescript',
  ],
```

4. 添加 `.prettierrc.js` 文件，[直接复制 `eslint-config-alloy` 的内容](https://github.com/AlloyTeam/eslint-config-alloy/blob/master/.prettierrc.js)

5. （可选）修改配置文件成你喜欢的规则，并处理 taro 初始化提供的项目文件中的 eslint 错误

6. 安装 `prettier` 并在 `package.json` 中添加脚本方便处理 eslint

```shell
npm install -D prettier
```

```
    "fix": "eslint --fix src/ --ext .tsx --ext .ts",
    "prettier": "prettier --write src/**/*.{ts,tsx}"
```

## mobx 数据持久化

1. taro 提供的 mobx 模板是没有使用装饰器的，需要修改成装饰器的形式方便使用

2. 安装 `mobx-persist`

```
npm install mobx-persist
```

3. 添加符合 `mobx-persist` 要求的 storage

```js
const storage = {
  getItem(key) {
    return Taro.getStorage({ key }).then((res) => res.data);
  },
  setItem(key, data) {
    return Taro.setStorage({ key, data });
  },
};
```

4. 在 store 初始化完成后使用 `mobx-persist` 提供的 hydrate 持久化

```js
import { create } from 'mobx-persist';
const hydrate = create({
  storage,
  debounce: 20,
  jsonify: false,
});
hydrate('persistKey', store);
```

5. 在需要持久化的成员变量上加上 @persist 装饰器但是不知道为什么 string 和 number 类型会有问题，另外三种类型（`object`, `list`, `map`）都可以正常使用，估计是 `@tarojs/mobx` 这个库的某些实现和 `mobx-react` 不一样导致的问题

```js
export default class Store {
  @observable
  @persist('object')
  data = {
    counter: 0,
  };
}
```

## 封装缓存、网络请求功能

见 `src/utils` 目录

**sessionStorage**

- 支持设置过期时间

**request**

- 支持前端缓存和设置缓存过期时间
- 可控制是否自动对错误响应做提示，默认自动提示

## TODO

- husky + lint-stage + prettier 做提交前预处理
- 优化 API 和 Store 的加载方式，使用 `require.ensure` 做自动加载，并额外生成 types 目录
