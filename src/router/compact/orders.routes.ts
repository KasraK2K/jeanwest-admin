import { IRouter } from "@/interfaces/others/route.interface";
import AllOrders from "@/views/orders/AllOrders.vue";
import ShowOrder from "@/views/orders/AllOrders.vue";

export const orders: IRouter[] = [
  {
    path: "/orders/all",
    name: "AllOrders",
    component: AllOrders,
    meta: {
      title: "لیست سفارشات",
    },
  },
  {
    path: "/orders/show/:id",
    name: "ShowOrder",
    component: ShowOrder,
    props: true,
    meta: {
      title: "نمایش سفارش",
    },
  },
];
