module.exports = {
  transpileDependencies: ["vuetify"],
  lintOnSave: process.env.NODE_ENV !== "production",
  configureWebpack: {
    devtool: "source-map",
  },
  devServer: {
    host: process.env.VUE_APP_HOST,
    port: process.env.VUE_APP_PORT,
    https: JSON.parse(process.env.VUE_APP_HTTPS),
    overlay: {
      warnings: false,
      errors: process.env.NODE_ENV !== "production",
    },
    disableHostCheck: true,
  },
};
