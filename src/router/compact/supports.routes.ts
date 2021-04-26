import AllTickets from "@/views/supports/AllTickets.vue";
import ShowTicket from "@/views/supports/ShowTicket.vue";

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
];
