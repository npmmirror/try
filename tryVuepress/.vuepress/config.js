const path = require("path");
console.log(require("fs"));
module.exports = {
  /**
   *  页面左上角的标题
   */
  title: "VuePress 测试",

  /**
   * <meta name="description" /> 中的内容
   */
  description: "学习 VuePress",

  /**
   * 配置 webpack 的别名，以便以 ~@/ 的形式引入图片
   */
  configureWebpack: {
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "../")
      }
    }
  },

  /**
   * 配置部署的根路径
   */
  base: "/",

  port: "8888",

  /**
   * Markdown 配置
   */
  markdown: {},

  evergreen: true
};
