import AllTickets from "@/views/supports/AllTickets.vue";
import ShowTicket from "@/views/supports/ShowTicket.vue";
import EditTicket from "@/views/supports/EditTicket.vue";

export const supports = [
  {
    path: "/supports/ticket/all",
    name: "AllTickets",
    component: AllTickets,
  },
  {
    path: "/supports/ticket/show/:id",
    name: "ShowTicket",
    component: ShowTicket,
    props: true,
  },
  {
    path: "/supports/ticket/edit/:id",
    name: "EditTicket",
    component: EditTicket,
    props: true,
  },
];
