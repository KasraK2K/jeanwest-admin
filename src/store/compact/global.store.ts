/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

interface IGlobalState {
  token: string;
  themeName: string;
}

const state = {
  token: "",
  themeName: "",
};

const mutations = {
  SET_TOKEN(state: IGlobalState, token: string): void {
    state.token = token;
  },
  SET_THEME(state: IGlobalState, themeName: string): void {
    state.themeName = themeName;
  },
};

const actions = {
  setToken({ commit }, token: string): void {
    commit("SET_TOKEN", token);
  },
  setTheme({ commit }, themName: string): void {
    commit("SET_THEME", themName);
  },
};

const modules = {};

const getters = {
  tokenGetter: (state: IGlobalState): string => state.token,
  themeGetter: (state: IGlobalState): string => state.themeName,
};

export const GlobalStore = {
  state,
  mutations,
  actions,
  modules,
  getters,
};
