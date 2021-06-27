import { IRouter } from "@/interfaces/others/route.interface";
import AllPayments from "@/views/payments/AllPayments.vue";
import ShowPayment from "@/views/payments/AllPayments.vue";

export const payments: IRouter[] = [
  {
    path: "/payments/all",
    name: "AllPayments",
    component: AllPayments,
    meta: {
      title: "لیست پرداخت‌ها",
    },
  },
  {
    path: "/payments/show/:id",
    name: "ShowPayment",
    component: ShowPayment,
    props: true,
    meta: {
      title: "نمایش پرداخت",
    },
  },
];
