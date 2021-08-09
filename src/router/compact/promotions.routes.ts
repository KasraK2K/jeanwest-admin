// ─── DISCOUNT ───────────────────────────────────────────────────────────────────
import AllDiscounts from "@/views/promotions/discounts/AllDiscounts.vue";
import CreateDiscount from "@/views/promotions/discounts/create/CreateDiscount.vue";
import EditDiscount from "@/views/promotions/discounts/edit/EditDiscount.vue";

// ─── OFFERS ─────────────────────────────────────────────────────────────────────
import AllOffers from "@/views/promotions/offers/AllOffers.vue";

// ─── JEAPOINTS ──────────────────────────────────────────────────────────────────
import AllJeansPoints from "@/views/promotions/jeanspoints/AllJeansPoints.vue";
import EditJeansPoint from "@/views/promotions/jeanspoints/edit/EditJeansPoint.vue";

// ─── GROUPS ─────────────────────────────────────────────────────────────────────
import AllGroups from "@/views/promotions/groups/AllGroups.vue";
import EditGroup from "@/components/EditGroup.vue";

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
    name: "CreateDiscount",
    component: CreateDiscount,
    meta: {
      title: "ایجاد تخفیف",
    },
  },
  {
    path: "/promotions/discount/edit/:id",
    name: "EditDiscount",
    component: EditDiscount,
    props: true,
    meta: {
      title: "ویرایش تخفیف",
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
    path: "/promotions/jeanspoints/all",
    name: "AllJeansPoints",
    component: AllJeansPoints,
    meta: {
      title: "لیست جین‌پوینت‌ها",
    },
  },
  {
    path: "/promotions/jeanspoints/edit/:id",
    name: "EditJeansPoint",
    component: EditJeansPoint,
    props: true,
    meta: {
      title: "ویرایش جین‌پوینت",
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
  // {
  //   path: "/promotions/groups/edit/:id/:promotion",
  //   name: "EditGroup",
  //   component: EditGroup,
  //   props: true,
  //   meta: {
  //     title: "ویرایش گروه",
  //   },
  // },
];
