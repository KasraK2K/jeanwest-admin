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
import { Toast } from "@/common/globals/plugins/sweetalert";
import upperFirst from "lodash/upperFirst";
import camelCase from "lodash/camelCase";

/* -------------------------------------------------------------------------- */
/*                      START: Register Global Components                     */
/* -------------------------------------------------------------------------- */
const requireComponent: __WebpackModuleApi.RequireContext = require.context(
  "./components/Base",
  true,
  /[A-Z]\w+\.(vue|js|ts)$/
);
requireComponent.keys().forEach((fileName) => {
  const componentConfig = requireComponent(fileName);
  let componentName = fileName.split("/").pop();
  if (typeof componentName === "string") {
    componentName = upperFirst(camelCase(componentName.replace(/\.\w+$/, "")));
    Vue.component(componentName, componentConfig.default || componentConfig);
  }
});
/* --------------------- END: Register Global Components -------------------- */

/* -------------------------------------------------------------------------- */
/*                          START: Vue Configuration                          */
/* -------------------------------------------------------------------------- */
Vue.config.productionTip = false;
Vue.config.devtools = true;
if (process.env.NODE_ENV === "production") Vue.config.silent = true;
/* ------------------------- END: Vue Configuration ------------------------- */

/* -------------------------------------------------------------------------- */
/*                           START: Register Plugins                          */
/* -------------------------------------------------------------------------- */
Stock(Highcharts);
Gantt(Highcharts);
Vue.use(HighchartsVue);
/* -------------------------- END: Register Plugins ------------------------- */

/* -------------------------------------------------------------------------- */
/*                        START: Error/Warning Handling                       */
/* -------------------------------------------------------------------------- */
Vue.config.errorHandler = function (err, vm, info) {
  Toast("error", `"${err.message}" in "${info}"`);
};

Vue.config.warnHandler = function (msg, vm, trace) {
  console.log("warnHandler msg:", msg);
  console.log("warnHandler vm:", vm);
  console.log("warnHandler trace:", trace);
};
/* ----------------------- END: Error/Warning Handling ---------------------- */

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
