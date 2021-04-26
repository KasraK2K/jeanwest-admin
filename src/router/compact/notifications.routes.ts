import AllNotifications from "@/views/notifications/AllNotifications.vue";
import CreateNotification from "@/views/notifications/CreateNotification.vue";

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
];
