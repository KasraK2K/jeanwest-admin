import { IRouter } from "@/interfaces/others/route.interface";
import AllAdmins from "@/views/admins/list/AllAdmins.vue";
import EditAdmin from "@/views/admins/edit/EditAdmin.vue";
import CreateAdmin from "@/views/admins/create/CreateAdmin.vue";

export const admins: IRouter[] = [
  {
    path: "/admins/all",
    name: "AllAdmins",
    component: AllAdmins,
    meta: {
      title: "لیست ادمین‌ها",
    },
  },
  {
    path: "/admins/create",
    name: "CreateAdmin",
    component: CreateAdmin,
    meta: {
      title: "ایجاد ادمین",
    },
  },
  {
    path: "/admins/edit/:id",
    name: "EditAdmin",
    component: EditAdmin,
    props: true,
    meta: {
      title: "ویرایش ادمین‌ها",
    },
  },
];
