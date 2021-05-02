import AllNotifications from "@/views/notifications/AllNotifications.vue";
import CreateNotification from "@/views/notifications/CreateNotification.vue";
import EditNotification from "@/views/notifications/EditNotification.vue";

export const notifications = [
  {
    path: "/notifications/all",
    name: "AllNotifications",
    component: AllNotifications,
    meta: {
      title: "All Notifications",
    },
  },
  {
    path: "/notifications/create",
    name: "CreateNotification",
    component: CreateNotification,
    meta: {
      title: "Create Notification",
    },
  },
  {
    path: "/notifications/edit/:id",
    name: "EditNotification",
    component: EditNotification,
    props: true,
    meta: {
      title: "Edit Notification",
    },
  },
];
