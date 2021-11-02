// eslint-disable-next-line @typescript-eslint/no-var-requires
const { GenerateSW } = require("workbox-webpack-plugin");

module.exports = {
  // Other webpack config...
  plugins: [
    // Other plugins...
    new GenerateSW({
      option: "value",
    }),
  ],
};
