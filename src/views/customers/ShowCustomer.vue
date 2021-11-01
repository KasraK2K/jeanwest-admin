<template>
  <v-container fluid v-if="ready">
    <h1 class="blue--text">{{ title }}</h1>
    <v-breadcrumbs :items="breadcrumbs" class="mb-3"></v-breadcrumbs>

    <v-card id="customer" elevation="2" outlined rounded class="mb-3">
      <v-card-title class="blue--text">
        <span>اطلاعات شخصی کاربر</span>
        <v-spacer />
        <!-- v-if="customer.orderCount" -->
        <v-btn
          :to="{
            name: 'AllOrders',
            params: {
              forceFilter: {
                customer: {
                  eq: { id: customer.id },
                },
              },
            },
          }"
          color="teal"
          large
          outlined
        >
          نمایش سفارشات
        </v-btn>
      </v-card-title>
      <v-row>
        <!-- col 1 -->
        <v-col cols="12" md="6" lg="4" class="justify-center">
          <v-card-text>
            <p>
              <span>شماره:</span>
              <span class="font-weight-bold mr-2">{{
                toPersianString(customer.no)
              }}</span>
            </p>
            <p>
              <span>سطح عضویت:</span>
              <span
                class="font-weight-bold mr-2"
                :style="
                  'color: ' + customerType(customer.erpCustomerType).color
                "
                >{{ customerType(customer.erpCustomerType).name }}</span
              >
            </p>
            <p>
              <span>شناسه بانی‌مد:</span>
              <span class="font-weight-bold mr-2 teal--text">{{
                customer.banimodeUserId
              }}</span>
            </p>
            <p>
              <span>شناسه:</span>
              <span class="font-weight-bold mr-2 blue--text">{{
                customer.code
              }}</span>
            </p>
            <p>
              <span>شناسه در ای‌آرپی:</span>
              <span class="font-weight-bold mr-2 purple--text">{{
                customer.erpId
              }}</span>
            </p>
          </v-card-text>
        </v-col>

        <!-- col 2 -->
        <v-col cols="12" md="6" lg="4" class="justify-center">
          <v-card-text>
            <p>
              <span>تاریخ تولد:</span>
              <span class="font-weight-bold mr-2">{{
                toPersianString(
                  toPersianTime(customer.birthDate, "HH:mm | YYYY/MM/DD") ||
                    "ندارد"
                )
              }}</span>
            </p>
            <p>
              <span>ایمیل:</span>
              <span class="font-weight-bold mr-2">{{
                customer.email || "ندارد"
              }}</span>
            </p>
            <p>
              <span>موبایل:</span>
              <span class="font-weight-bold mr-2 red--text">{{
                `۰${toPersianString(customer.phoneNumber)}`
              }}</span>
            </p>
            <!-- <p>
              <span>تعداد سفارش:</span>
              <span class="font-weight-bold mr-2 teal--text">{{
                toPersianString(customer.orderCount)
              }}</span>
            </p> -->
            <p>
              <span>کل تخفیفات دریافتی:</span>
              <span class="font-weight-bold mr-2 pink--text">{{
                toPersianString(numberToCash(customer.totalGift))
              }}</span>
            </p>
          </v-card-text>
        </v-col>

        <!-- col 3 -->
        <v-col cols="12" md="6" lg="4" class="justify-center">
          <v-card-text>
            <p>
              <span>وضعیت:</span>
              <span
                class="font-weight-bold mr-2"
                :class="customer.active ? 'teal--text' : 'pink--text'"
                >{{ customer.active ? "فعال" : "غیرفعال" }}</span
              >
            </p>
            <p>
              <span>جنسیت:</span>
              <span
                class="font-weight-bold mr-2"
                :class="customer.gender === 0 ? 'pink--text' : 'blue--text'"
              >
                {{ customer.gender === 0 ? "خانم" : "آقا" }}
              </span>
            </p>
            <p>
              <span>ثبت‌نام با:</span>
              <span class="font-weight-bold mr-2">{{
                numberToDeviceName(customer.registerPlatform)
              }}</span>
            </p>
            <p>
              <span>آخرین لاگین با:</span>
              <span class="font-weight-bold mr-2">{{
                numberToDeviceName(customer.registerPlatform)
              }}</span>
            </p>
            <p>
              <span>زمان آخرین لاگین:</span>
              <span class="font-weight-bold mr-2">{{
                toPersianString(
                  toPersianTime(customer.loggedInAt, "HH:mm | YYYY/MM/DD") ||
                    "ندارد"
                )
              }}</span>
            </p>
          </v-card-text>
        </v-col>
      </v-row>
    </v-card>

    <!-- <v-card
      v-if="isOrderDataReady"
      id="order"
      elevation="2"
      outlined
      rounded
      class="mb-3"
    >
      <v-card-title class="blue--text">اطلاعات سفارشات کاربر</v-card-title>
      <v-row>
        <v-col cols="12" class="justify-center">
          <v-card-text> </v-card-text>
        </v-col>
      </v-row>
    </v-card> -->
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import { ICustomer } from "@/interfaces/entities/customer.interface";
// import { IOrder } from "@/interfaces/entities/order.interface";
// import { IPagination } from "@/interfaces/others/pagination.interface";

export default Vue.extend({
  /* -------------------------------------------------------------------------- */
  /*                                    props                                   */
  /* -------------------------------------------------------------------------- */
  props: {
    id: { type: String, required: true },
  },

  /* -------------------------------------------------------------------------- */
  /*                                    data                                    */
  /* -------------------------------------------------------------------------- */
  data() {
    const title = "نمایش حساب کاربری ";
    return {
      ready: false,
      // isOrderDataReady: false,
      title,
      breadcrumbs: [
        {
          text: "صفحه اصلی",
          to: "/",
        },
        {
          text: "لیست کاربران",
          to: { name: "AllCustomers" },
        },
        {
          text: title,
          to: document.location.pathname,
        },
      ],
      customer: {} as ICustomer,
      // order: {} as IOrder,
      // pagination: {
      //   option: {
      //     page: { eq: 1 },
      //     limit: { eq: 10 },
      //   },
      //   filter: {
      //     id: { eq: this.id },
      //   },
      // } as IPagination,
    };
  },

  /* -------------------------------------------------------------------------- */
  /*                                 lifecycles                                 */
  /* -------------------------------------------------------------------------- */
  mounted() {
    this.findOne();
    // this.getList();
  },

  /* -------------------------------------------------------------------------- */
  /*                                   methods                                  */
  /* -------------------------------------------------------------------------- */
  methods: {
    findOne() {
      Vue.prototype.$api.customer
        .findOne(this.id)
        .then((response: { data: ICustomer }) => {
          this.customer = response.data;
          this.title += `${this.customer.firstName} ${this.customer.lastName}`;
          this.ready = true;
        })
        .catch(() =>
          Vue.prototype.$toast("error", "خطا در دریافت اطلاعات کاربر")
        );
    },

    // getList() {
    //   Vue.prototype.$api.order
    //     .getList(this.pagination)
    //     .then((response: { data: IOrder }) => {
    //       this.order = response.data;
    //       this.isOrderDataReady = true;
    //     })
    //     .catch(() =>
    //       Vue.prototype.$toast("error", "خطا در دریافت اطلاعات سفارشات کاربر")
    //     );
    // },

    numberToDeviceName(deviceNumber: string | number) {
      deviceNumber = String(deviceNumber);
      const devices = new Map([
        ["0", "PWA"],
        ["1", "Android"],
        ["2", "Kiosk"],
      ]);
      return devices.has(deviceNumber) ? devices.get(deviceNumber) : "ناشناس";
    },
  },
});
</script>
