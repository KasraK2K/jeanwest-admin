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
    overlay: {
      warnings: false,
      errors: process.env.NODE_ENV === "production",
    },
  },
};
