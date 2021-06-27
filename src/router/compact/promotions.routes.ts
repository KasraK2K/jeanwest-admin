// ─── DISCOUNT ───────────────────────────────────────────────────────────────────
import AllDiscounts from "@/views/promotions/discounts/AllDiscounts.vue";
import CreateDiscounts from "@/views/promotions/discounts/CreateDiscounts.vue";

// ─── OFFERS ─────────────────────────────────────────────────────────────────────
import AllOffers from "@/views/promotions/offers/AllOffers.vue";

// ─── JEAPOINTS ──────────────────────────────────────────────────────────────────
import AllJeanPoints from "@/views/promotions/jeanspoints/AllJeanPoints.vue";

// ─── GROUPS ─────────────────────────────────────────────────────────────────────
import AllGroups from "@/views/promotions/groups/AllGroups.vue";
import { IRouter } from "@/interfaces/others/route.interface";

export const promotions: IRouter[] = [
  // ──────────────────────────────────────────────────────────────────
  //   :::::: D I S C O U N T : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────
  {
    path: "/promotions/discount/all",
    name: "AllDiscounts",
    component: AllDiscounts,
    meta: {
      title: "لیست تخفیف‌ها",
    },
  },
  {
    path: "/promotions/discount/create",
    name: "CreateDiscounts",
    component: CreateDiscounts,
    meta: {
      title: "ایجاد تخفیف",
    },
  },

  // ──────────────────────────────────────────────────────────────
  //   :::::: O F F E R S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────
  {
    path: "/promotions/offers/all",
    name: "AllOffers",
    component: AllOffers,
    meta: {
      title: "لیست پیشنهادات",
    },
  },

  // ────────────────────────────────────────────────────────────────────
  //   :::::: J E A P O I N T S : :  :   :    :     :        :          :
  // ────────────────────────────────────────────────────────────────────
  {
    path: "/promotions/jeanpoints/all",
    name: "AllJeanPoints",
    component: AllJeanPoints,
    meta: {
      title: "لیست امتیازات",
    },
  },

  // ──────────────────────────────────────────────────────────────
  //   :::::: G R O U P S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────
  {
    path: "/promotions/groups/all",
    name: "AllGroups",
    component: AllGroups,
    meta: {
      title: "لیست گروه‌ها",
    },
  },
];
