import AllPayments from "@/views/payments/AllPayments.vue";
import ShowPayment from "@/views/payments/AllPayments.vue";

export const payments = [
  {
    path: "/payments/all",
    name: "AllPayments",
    component: AllPayments,
  },
  {
    path: "/payments/show/:id",
    name: "ShowPayment",
    component: ShowPayment,
    props: true,
  },
];
