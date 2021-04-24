import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Home.vue";

// routes
import { auths } from "@/router/compact/auths.routes";
import { users } from "@/router/compact/users.routes";
import { supports } from "@/router/compact/supports.routes";
import { others } from "@/router/compact/others.routes";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  { path: "/", name: "Home", component: Home },
  ...auths,
  ...users,
  ...supports,
  ...others,
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
