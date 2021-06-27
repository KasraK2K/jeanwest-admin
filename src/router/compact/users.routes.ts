import { IRouter } from "@/interfaces/others/route.interface";
import AllAdmins from "@/views/admins/AllAdmins.vue";

export const users: IRouter[] = [
  {
    path: "/admins",
    name: "AllAdmins",
    component: AllAdmins,
    meta: {
      title: "لیست ادمین‌ها",
    },
  },
];
