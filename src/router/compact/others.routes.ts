import { IRouter } from "@/interfaces/others/route.interface";
import Card from "@/views/Card.vue";

export const others: IRouter[] = [
  {
    path: "/card",
    name: "Card",
    component: Card,
    meta: {
      title: "کارت‌ها",
    },
  },
];
