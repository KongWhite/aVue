const path = require("path");
function resolve(dir) {
  return path.join(__dirname, ".", dir);
}
module.exports = {
  chainWebpack: config => {
    config.module
      .rule("svg")
      .exclude.add(resolve("src/icons/svg"))
      .end();

    config.module
      .rule("icons")
      .test(/\.svg$/)
      .include.add(resolve("src/icons/svg"))
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "[name]"
      });
  },
  configureWebpack: () => ({
    // resolve: {
    //  alias: require("./alias.config").webpack
    // }
    // module: {
    //  rules: [{
    //   test: /\.svg$/,
    //   use: [{
    //    loader: "svg-sprite-loader",
    //    options: {
    //     symbolId: "icon-[name]"
    //    }
    //   }]
    //  }]
    // }
  })
};
