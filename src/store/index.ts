import { tokenName } from "@/common/globals/globals";
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // user: { id: "abc123", name: "Kasra Karami" },
    token: "",
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token;
    },
  },
  actions: {
    setToken({ commit }, token) {
      commit("SET_TOKEN", token);
    },
  },
  modules: {},
  getters: {
    tokenGetter: (state) => state.token,
  }, // if we use multiple time some state like this.$store.categories.length whrite here
});
