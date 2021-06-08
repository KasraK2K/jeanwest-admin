import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Home.vue";

// routes
import { auths } from "@/router/compact/auths.routes";
import { users } from "@/router/compact/users.routes";
import { supports } from "@/router/compact/supports.routes";
import { notifications } from "@/router/compact/notifications.routes";
import { orders } from "@/router/compact/orders.routes";
import { payments } from "@/router/compact/payments.routes";
import { promotions } from "@/router/compact/promotions.routes";
import { customers } from "@/router/compact/customers.routes";
import { others } from "@/router/compact/others.routes";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      title: "Dashboard",
    },
  },
  ...auths,
  ...users,
  ...supports,
  ...notifications,
  ...orders,
  ...payments,
  ...promotions,
  ...customers,
  ...others,
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title || to.name || "jeanwest admin";
  next();
});

export default router;
