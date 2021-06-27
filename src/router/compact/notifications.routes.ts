import { IRouter } from "@/interfaces/others/route.interface";
import AllNotifications from "@/views/notifications/AllNotifications.vue";
import CreateNotification from "@/views/notifications/CreateNotification.vue";
import EditNotification from "@/views/notifications/EditNotification.vue";

export const notifications: IRouter[] = [
  {
    path: "/notifications/all",
    name: "AllNotifications",
    component: AllNotifications,
    meta: {
      title: "لیست اعلانات",
    },
  },
  {
    path: "/notifications/create",
    name: "CreateNotification",
    component: CreateNotification,
    meta: {
      title: "ایجاد اعلان",
    },
  },
  {
    path: "/notifications/edit/:id",
    name: "EditNotification",
    component: EditNotification,
    props: true,
    meta: {
      title: "ویرایش اعلان",
    },
  },
];
