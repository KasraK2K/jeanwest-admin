import { IRouter } from "@/interfaces/others/route.interface";
import AllAdmins from "@/views/admins/list/AllAdmins.vue";

export const admins: IRouter[] = [
  {
    path: "/admins/all",
    name: "AllAdmins",
    component: AllAdmins,
    meta: {
      title: "لیست ادمین‌ها",
    },
  },
];
