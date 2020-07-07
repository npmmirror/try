# sdk

## 用法

```js
import SDK from "./sdk";
import Taro from "@tarojs/taro";

let sdk = new SDK({
  request: Taro.request,
  api: "https://api.maiduote.com"
});
```

## storage 与 store

```js
let storage = sdk.storage; // 浏览器持久化存储 localStorage
let store = sdk.store; // 全局变量存储

// 例子
storage.setJson("sso", {
  token: "a83859303b934fd250dc95efcd28d0f15b24adaf5d61978d3cf644e3b4fe910c"
});
storage.getJson("sso"); // 返回json对象
storage.setItem("nick", "jeff");
storage.getItem("nick"); //返回 nick

// store 用法与storage相同，但是不持久存储，刷新页面时，所有数据清空
store.setItem("backuri", "/");
```

## ajax 请求

所有请求返回 Promise 对象, 如果 storage 存在 sso, 所有 ajax 请求会在 headers 中附加 Authorization, 用于自动验证。

例如：sso 值为 {token: '123'}, 则 ajax 请求的 headers:{ Authorization: '123', ...}

```js
// 实际请求地址为 http://api.maiduote.com/sso/verify?token=123
sdk.request({
  uri: "/sso/verify?token=123",
  method: "get"
});

// 实际请求地址为 http://api.maiduote.com/passport/login?token=123
sdk.request({
  uri: "/passport/login",
  method: "post",
  data: {
    username: "root",
    password: "123"
  }
});
```

快速用法，支持 get, post, put, delete

上述 request 可以简写为

```js
sdk.get("/sso/verify?token=123");

sdk.post("/passport/login", {
  username: "root",
  password: "123"
});
```

## uri 绑定

```js
sdk.bind("sso").bind("passport");

sdk.sso.get("/verify?token=123");

sdk.passport.post("/login", {
  username: "root",
  password: "123"
});
```

## 事件支持

```js
sdk.on("test", function(event) {
  console.log(event);
}); // 监听事件
sdk.once("test", function(event) {
  console.log(event);
}); // 只监听一次
sdk.emit("test", 1234); // 产生事件
sdk.off("test"); // 停止监听

// uri 绑定后也支持事件
sdk.sso.on("test");
sdk.sso.emit("test");

// store, storage 支持 setItem, getItem, setJson, getJson, removeItem 5 种事件

store.on("setJson", function(k, v) {
  console.log("setJson");
});
store.on("getJson", function(k, v) {
  console.log("getJson");
});
```

## log

```js
config.debug 0 error 1 warn 2 info 3 debug

sdk.logLevel = config.debug

sdk.allowDebug()
sdk.allowInfo()
sdk.allowWarn()

sdk.debug
sdk.info
sdk.warn
sdk.error

```
