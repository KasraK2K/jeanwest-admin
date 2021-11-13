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
  pwa: {
    name: "JeansWest Admin",
    themeColor: "#131224",
    msTileColor: "#000000",
    appleMobileWebAppCapable: "yes",
    appleMobileWebAppStatusBarStyle: "white",
    assetsVersion: "1.0.0",
    manifestOptions: {
      name: "JeansWest Admin PWA",
      short_name: "Admin PWA",
    },
    iconPaths: {
      favicon32: "img/icons/favicon-32x32.png",
      favicon16: "img/icons/favicon-16x16.png",
      appleTouchIcon: "img/icons/apple-touch-icon-152x152.png",
      maskIcon: "img/icons/safari-pinned-tab.svg",
      msTileImage: "img/icons/msapplication-icon-144x144.png",
    },
    // configure the workbox plugin
    workboxPluginMode: "GenerateSW",
    // workboxOptions: {
    // swSrc is required in InjectManifest mode.
    // swSrc: "src/service-worker.js",
    // ...other Workbox options...
    // },
  },
};
