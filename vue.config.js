module.exports = {
  transpileDependencies: ["vuetify"],
  lintOnSave: process.env.NODE_ENV !== "production",
  configureWebpack: {
    devtool: "source-map",
  },
  devServer: {
    host: process.env.HOST,
    port: process.env.PORT,
    https: JSON.parse(process.env.HTTPS),
    // hotOnly: false,
    overlay: {
      warnings: true,
      errors: true,
    },
  },
};
