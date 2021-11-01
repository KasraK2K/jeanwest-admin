import { IRouter } from "@/interfaces/others/route.interface";
import AllCustomers from "@/views/customers/AllCustomers.vue";
import ShowCustomer from "@/views/customers/ShowCustomer.vue";
// import CreateNotification from "@/views/notifications/CreateNotification.vue";
// import EditNotification from "@/views/notifications/EditNotification.vue";

export const customers: IRouter[] = [
  {
    path: "/customers/all",
    name: "AllCustomers",
    component: AllCustomers,
    meta: {
      title: "لیست کاربران",
    },
  },
  {
    path: "/customers/show/:id",
    name: "ShowCustomer",
    component: ShowCustomer,
    props: true,
    meta: {
      title: "نمایش کاربر",
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
