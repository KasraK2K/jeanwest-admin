import AllDiscounts from "@/views/promotions/AllDiscounts.vue";
import AllOffers from "@/views/promotions/AllOffers.vue";

export const promotions = [
  {
    path: "/promotions/discount/all",
    name: "AllDiscounts",
    component: AllDiscounts,
    meta: {
      title: "All Discounts",
    },
  },
  {
    path: "/promotions/offers/all",
    name: "AllOffers",
    component: AllOffers,
    meta: {
      title: "All Offers",
    },
  },
];
