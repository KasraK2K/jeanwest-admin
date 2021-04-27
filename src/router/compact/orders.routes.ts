import AllOrders from "@/views/orders/AllOrders.vue";
import ShowOrder from "@/views/orders/AllOrders.vue";

export const orders = [
  {
    path: "/orders/all",
    name: "AllOrders",
    component: AllOrders,
  },
  {
    path: "/orders/show/:id",
    name: "ShowOrder",
    component: ShowOrder,
    props: true,
  },
];
