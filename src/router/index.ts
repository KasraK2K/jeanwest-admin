import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Home.vue";
import Card from "../views/Card.vue";
import AllAdmins from "../views/admins/AllAdmins.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/card",
    name: "Card",
    component: Card,
  },
  {
    path: "/admins",
    name: "AllAdmins",
    component: AllAdmins
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
