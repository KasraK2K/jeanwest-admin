import AllTickets from "@/views/supports/AllTickets.vue";
import ShowTicket from "@/views/supports/ShowTicket.vue";
import EditTicket from "@/views/supports/EditTicket.vue";

export const supports = [
  {
    path: "/supports/ticket/all",
    name: "AllTickets",
    component: AllTickets,
    meta: {
      title: "All Tickets",
    },
  },
  {
    path: "/supports/ticket/show/:id",
    name: "ShowTicket",
    component: ShowTicket,
    props: true,
    meta: {
      title: "Show Ticket",
    },
  },
  {
    path: "/supports/ticket/edit/:contextCode",
    name: "EditTicket",
    component: EditTicket,
    props: true,
    meta: {
      title: "Edit Ticket",
    },
  },
];
