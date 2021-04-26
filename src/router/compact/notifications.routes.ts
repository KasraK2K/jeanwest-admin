import AllNotifications from "@/views/notifications/AllNotifications.vue";
import CreateNotification from "@/views/notifications/CreateNotification.vue";
import EditNotification from "@/views/notifications/EditNotification.vue";

export const notifications = [
  {
    path: "/notifications/all",
    name: "AllNotifications",
    component: AllNotifications,
  },
  {
    path: "/notifications/create",
    name: "CreateNotification",
    component: CreateNotification,
  },
  {
    path: "/notifications/edit/:id",
    name: "EditNotification",
    component: EditNotification,
    props: true,
  },
];
