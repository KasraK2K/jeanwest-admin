/* -------------------------------- discount -------------------------------- */
import AllDiscounts from "@/views/promotions/discounts/AllDiscounts.vue";
import CreateDiscounts from "@/views/promotions/discounts/CreateDiscounts.vue";

/* --------------------------------- offers --------------------------------- */
import AllOffers from "@/views/promotions/offers/AllOffers.vue";

/* -------------------------------- jeapoints ------------------------------- */
import AllJeanPoints from "@/views/promotions/jeanspoints/AllJeanPoints.vue";

/* --------------------------------- groups --------------------------------- */
import AllGroups from "@/views/promotions/groups/AllGroups.vue";

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
  {
    path: "/promotions/discount/create",
    name: "CreateDiscounts",
    component: CreateDiscounts,
    meta: {
      title: "Create Discount",
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

  /* -------------------------------------------------------------------------- */
  /*                                   groups                                   */
  /* -------------------------------------------------------------------------- */
  {
    path: "/promotions/groups/all",
    name: "AllGroups",
    component: AllGroups,
    meta: {
      title: "All Groups",
    },
  },
];
