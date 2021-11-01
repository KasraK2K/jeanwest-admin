import Vue from "vue";
import Vuex from "vuex";
import { GlobalStore } from "./compact/global.store";
import { OrderStore } from "./compact/order.store";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    ...GlobalStore.state,
    ...OrderStore.state,
  },

  mutations: {
    ...GlobalStore.mutations,
    ...OrderStore.mutations,
  },

  actions: {
    ...GlobalStore.actions,
    ...OrderStore.actions,
  },

  modules: {
    ...GlobalStore.modules,
    ...OrderStore.modules,
  },

  getters: {
    ...GlobalStore.getters,
    ...OrderStore.getters,
  },
});
