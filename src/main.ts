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

Vue.config.productionTip = false;
Vue.config.devtools = true;
if (process.env.NODE_ENV === "production") Vue.config.silent = true;

Stock(Highcharts);
Gantt(Highcharts);
Vue.use(HighchartsVue);

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
