// Inside of webpack.config.js:
import { InjectManifest } from "workbox-webpack-plugin";

export const plugins = [
  // Other plugins...
  new InjectManifest({
    swSrc: "./src/service-worker.js",
  }),
];
