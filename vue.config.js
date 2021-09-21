const production = process.env.NODE_ENV === "production";

module.exports = {
  transpileDependencies: ["vuetify"],
  lintOnSave: !production,
  configureWebpack: {
    devtool: "source-map",
  },
  devServer: {
    host: production ? process.env.HOST || "0.0.0.0" : "localhost",
    port: production ? process.env.PORT || 8080 : 8080,
    https: JSON.parse(process.env.HTTPS),
    overlay: {
      warnings: false,
      errors: !production,
    },
    public: "https://admin.avktn.com",
    // disableHostCheck: true,
  },
};
