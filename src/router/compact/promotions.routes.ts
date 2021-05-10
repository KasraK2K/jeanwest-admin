/* -------------------------------- discount -------------------------------- */
import AllDiscounts from "@/views/promotions/AllDiscounts.vue";

/* --------------------------------- offers --------------------------------- */
import AllOffers from "@/views/promotions/AllOffers.vue";

/* -------------------------------- jeapoints ------------------------------- */
import AllJeanPoints from "@/views/promotions/AllJeanPoints.vue";

export const promotions = [
  /* -------------------------------------------------------------------------- */
  /*                                  discount                                  */
  /* -------------------------------------------------------------------------- */
  {
    path: "/promotions/discount/all",
    name: "AllDiscounts",
    component: AllDiscounts,
    meta: {
      title: "All Discounts",
    },
  },

  /* -------------------------------------------------------------------------- */
  /*                                   offers                                   */
  /* -------------------------------------------------------------------------- */
  {
    path: "/promotions/offers/all",
    name: "AllOffers",
    component: AllOffers,
    meta: {
      title: "All Offers",
    },
  },

  /* -------------------------------------------------------------------------- */
  /*                                  jeapoints                                 */
  /* -------------------------------------------------------------------------- */
  {
    path: "/promotions/jeanpoints/all",
    name: "AllJeanPoints",
    component: AllJeanPoints,
    meta: {
      title: "All JeanPoints",
    },
  },
];
