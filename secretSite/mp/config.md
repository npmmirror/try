# Taro TS 项目配置

> 这里选择的是 Less + Mobx + **Typescript** 的模板

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

4. 添加 `.prettierrc.js` 文件

[直接复制内容](https://github.com/AlloyTeam/eslint-config-alloy/blob/master/.prettierrc.js)

5. （可选）修改配置文件成你喜欢的规则，并处理 taro 初始化提供的项目文件中的 eslint 错误
