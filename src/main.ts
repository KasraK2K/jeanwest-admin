import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import Highcharts from "highcharts";
import Stock from "highcharts/modules/stock";
import Gantt from "highcharts/modules/gantt";
import HighchartsVue from "highcharts-vue";
// import upperFirst from "lodash/upperFirst";
// import camelCase from "lodash/camelCase";
import toast from "@/plugins/toast";
import math from "@/plugins/math";
import { methods } from "@/mixins/mixin";
// import * as Sentry from "@sentry/vue";
// import { Integrations } from "@sentry/tracing";

// ────────────────────────────────────────────────────────────────────────────────
//   :::::: R E G I S T E R   S E N T R Y : :  :   :    :     :        :          :
// ────────────────────────────────────────────────────────────────────────────────
// Sentry.init({
//   Vue,
//   dsn: "https://de4858be9d054b10885ffc7d8c1c7d38@o496319.ingest.sentry.io/5570496",
//   integrations: [new Integrations.BrowserTracing()],
//   tracesSampleRate: 1.0,
// });

// ────────────────────────────────────────────────────────────────────────────────────
//   :::::: G L O B A L   C O M P O N E N T S : :  :   :    :     :        :          :
// ────────────────────────────────────────────────────────────────────────────────────
// const requireComponent: __WebpackModuleApi.RequireContext = require.context(
//   "./components/Base",
//   true,
//   /[A-Z]\w+\.(vue|js|ts)$/
// );
// requireComponent.keys().forEach((fileName) => {
//   const componentConfig = requireComponent(fileName);
//   let componentName = fileName.split("/").pop();
//   if (typeof componentName === "string") {
//     componentName = upperFirst(camelCase(componentName.replace(/\.\w+$/, "")));
//     Vue.component(componentName, componentConfig.default || componentConfig);
//   }
// });

// ──────────────────────────────────────────────────────────────────────────────────────────────
//   :::::: R E G I S T E R   G L O B A L   M I X I N S : :  :   :    :     :        :          :
// ──────────────────────────────────────────────────────────────────────────────────────────────
Vue.mixin(methods);

// ────────────────────────────────────────────────────────────────────────────────────
//   :::::: V U E   C O N F I G U R A T I O N : :  :   :    :     :        :          :
// ────────────────────────────────────────────────────────────────────────────────────
Vue.config.productionTip = false;
Vue.config.devtools = true;
if (process.env.NODE_ENV === "production") Vue.config.silent = true;

// ──────────────────────────────────────────────────────────────────────────────────
//   :::::: R E G I S T E R   P L U G I N S : :  :   :    :     :        :          :
// ──────────────────────────────────────────────────────────────────────────────────
Stock(Highcharts);
Gantt(Highcharts);
[HighchartsVue, toast, math].forEach((x) => Vue.use(x));

// ──────────────────────────────────────────────────────────────────────────────────
//   :::::: W A R N I N G   H A N D L I N G : :  :   :    :     :        :          :
// ──────────────────────────────────────────────────────────────────────────────────
Vue.config.errorHandler = function (err, vm, info) {
  Vue.prototype.$toast("error", `"${err.message}" in "${info}"`);
  console.log("err:", err);
  console.log("vm:", vm);
  console.log("info:", info);
};

// ──────────────────────────────────────────────────────────────────────────────
//   :::::: E R R O R   H A N D L I N G : :  :   :    :     :        :          :
// ──────────────────────────────────────────────────────────────────────────────
Vue.config.warnHandler = function (msg, vm, trace) {
  console.log("Warning Handler:", msg);
  console.log("msg:", msg);
  console.log("vm:", vm);
  console.log("trace:", trace);
};

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
