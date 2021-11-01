/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { IFilters } from "@/interfaces/others/pagination.interface";

interface IOrderState {
  orderFilter: IFilters | undefined;
}

const state = {
  orderFilter: undefined,
};

const mutations = {
  SET_ORDER_FILTER(state: IOrderState, orderFilter: IFilters): void {
    state.orderFilter = orderFilter;
  },
};

const actions = {
  setOrderFilter({ commit }, orderFilter: IFilters): void {
    commit("SET_ORDER_FILTER", orderFilter);
  },
};

const modules = {};

const getters = {
  orderFilterGetter: (state: IOrderState): IFilters | undefined =>
    state.orderFilter,
};

export const OrderStore = {
  state,
  mutations,
  actions,
  modules,
  getters,
};
