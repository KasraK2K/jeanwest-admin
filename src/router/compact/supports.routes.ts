import AllTickets from "@/views/supports/AllTickets.vue";
import ShowTicket from "@/views/supports/ShowTicket.vue";
import EditTicket from "@/views/supports/EditTicket.vue";
import { IRouter } from "@/interfaces/others/route.interface";

export const supports: IRouter[] = [
  {
    path: "/supports/ticket/all",
    name: "AllTickets",
    component: AllTickets,
    meta: {
      title: "لیست تیکت‌ها",
    },
  },
  {
    path: "/supports/ticket/show/:id",
    name: "ShowTicket",
    component: ShowTicket,
    props: true,
    meta: {
      title: "نمایش تیکت",
    },
  },
  {
    path: "/supports/ticket/edit/:id/:contextCode",
    name: "EditTicket",
    component: EditTicket,
    props: true,
    meta: {
      title: "ویرایش تیکت",
    },
  },
];
