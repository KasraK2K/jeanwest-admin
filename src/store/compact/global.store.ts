import Vuex, { Store } from "vuex";

export const GlobalStore: Store<{
  token: string;
  themeName: string;
}> = new Vuex.Store({
  state: {
    token: "",
    themeName: "",
  },
  mutations: {
    SET_TOKEN(state, token): void {
      state.token = token;
    },
    SET_THEME(state, themeName): void {
      state.themeName = themeName;
    },
  },
  actions: {
    setToken({ commit }, token): void {
      commit("SET_TOKEN", token);
    },
    setTheme({ commit }, themName): void {
      commit("SET_THEME", themName);
    },
  },
  modules: {},
  getters: {
    tokenGetter: (state): string => state.token,
    themeGetter: (state): string => state.themeName,
  }, // if we use multiple time some state like this.$store.categories.length whrite here
});
