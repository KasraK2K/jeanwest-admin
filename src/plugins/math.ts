export default {
  install(Vue: {
    prototype: {
      $PageCount: (total: number, limit: number) => number;
    };
  }): void {
    Vue.prototype.$PageCount = (total: number, limit: number): number => {
      const remainer = total % limit;
      const page = Math.floor(total / limit);
      return remainer > 0 ? page + 1 : page;
    };
  },
};
