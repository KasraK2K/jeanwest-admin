import AllCustomers from "@/views/customers/AllCustomers.vue";
// import CreateNotification from "@/views/notifications/CreateNotification.vue";
// import EditNotification from "@/views/notifications/EditNotification.vue";

export const customers = [
  {
    path: "/customers/all",
    name: "AllCustomers",
    component: AllCustomers,
    meta: {
      title: "All Customers",
    },
  },
  // {
  //   path: "/notifications/create",
  //   name: "CreateNotification",
  //   component: CreateNotification,
  //   meta: {
  //     title: "Create Notification",
  //   },
  // },
  // {
  //   path: "/notifications/edit/:id",
  //   name: "EditNotification",
  //   component: EditNotification,
  //   props: true,
  //   meta: {
  //     title: "Edit Notification",
  //   },
  // },
];
