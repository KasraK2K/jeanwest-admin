// eslint-disable-next-line @typescript-eslint/no-var-requires
const { GenerateSW } = require("workbox-webpack-plugin");

module.exports = {
  publicPath: "",

  transpileDependencies: ["vuetify"],
  lintOnSave: process.env.NODE_ENV !== "production",
  configureWebpack: {
    plugins: [new GenerateSW()],
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
  pwa: {
    name: "JeansWest Admin",
    themeColor: "#32BE93",
    msTileColor: "#000000",
    appleMobileWebAppCapable: "yes",
    appleMobileWebAppStatusBarStyle: "black",
    // configure the workbox plugin
    workboxPluginMode: "InjectManifest",
    workboxOptions: {
      // swSrc is required in InjectManifest mode.
      swSrc: "src/service-worker.js",
      // ...other Workbox options...
    },
  },
};
