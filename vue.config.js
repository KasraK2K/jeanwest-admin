module.exports = {
  transpileDependencies: ["vuetify"],
  lintOnSave: process.env.NODE_ENV !== "production",
  configureWebpack: {
    devtool: "source-map",
  },
  devServer: {
    host: process.env.HOST || "localhost",
    port: process.env.PORT || "8080",
    https: JSON.parse(process.env.HTTPS) || false,
    overlay: {
      warnings: false,
      errors: process.env.NODE_ENV !== "production",
    },
  },
};
