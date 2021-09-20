import * as Services from "../services";

const factories = {
  admin: Services.Admin,
  auth: Services.Auth,
  customer: Services.Customer,
  firebase: Services.Firebase,
  media: Services.Media,
  notification: Services.Notification,
  order: Services.Order,
  payment: Services.Payment,
  promotion: Services.Promotion,
  support: Services.Support,
};

export default {
  install(Vue: {
    prototype: {
      $api: typeof factories;
    };
  }): void {
    Vue.prototype.$api = factories;
  },
};
