import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: "",
  },
  mutations: {
    SET_TOKEN(state, token): void {
      state.token = token;
    },
  },
  actions: {
    setToken({ commit }, token): void {
      commit("SET_TOKEN", token);
    },
  },
  modules: {},
  getters: {
    tokenGetter: (state): string => state.token,
  }, // if we use multiple time some state like this.$store.categories.length whrite here
});
