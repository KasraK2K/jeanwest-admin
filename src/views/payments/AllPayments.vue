<template>
  <v-container fluid>
    <v-breadcrumbs :items="breadcrumbs" class="mb-3"></v-breadcrumbs>

    <!-- ------------------------------------------------------------------------ */
    /*                                START: Filter                               */
    ---------------------------------------------------------------------------- -->
    <v-card class="mb-8" elevation="1" outlined rounded>
      <v-card-title class="blue--text">فیلتر {{ title }}</v-card-title>
      <v-row class="mx-4">
        <v-col class="col-12 col-md-3">
          <v-text-field
            label="توکن"
            placeholder="لطفا توکن سفارش را وارد کنید."
            v-model="token"
            @change="paginateGenerator()"
            outlined
            hide-details="auto"
          ></v-text-field>
        </v-col>

        <v-col class="col-12 col-md-3">
          <v-autocomplete
            label="درگاه"
            v-model="gate"
            :items="[
              { text: 'زرین‌پال', value: 1 },
              { text: 'سامان', value: 2 },
            ]"
            item-text="text"
            item-value="value"
            @change="paginateGenerator()"
            outlined
            hide-details="auto"
          ></v-autocomplete>
        </v-col>

        <v-col class="col-12 col-md-3">
          <v-autocomplete
            label="وضعیت"
            v-model="status"
            :items="[
              { text: 'پرداخت نشده', value: 0 },
              { text: 'پرداخت شده', value: 1 },
            ]"
            item-text="text"
            item-value="value"
            @change="paginateGenerator()"
            outlined
            hide-details="auto"
          ></v-autocomplete>
        </v-col>

        <v-col class="col-12 col-md-3">
          <v-text-field
            label="موبایل"
            placeholder="لطفا شماره موبایل را وارد کنید."
            v-model="mobile"
            @change="paginateGenerator()"
            outlined
          ></v-text-field>
        </v-col>
      </v-row>
    </v-card>
    <!-- ----------------------------- END: Filter ----------------------------- -->

    <!-- ------------------------------------------------------------------------ */
    /*                                 START: List                                */
    /* ------------------------------------------------------------------------- -->
    <v-data-table
      :headers="[
        { text: 'شماره', value: 'no', align: 'center' },
        { text: 'توکن', value: 'token', sortable: false },
        { text: 'درگاه', value: 'gate' },
        { text: 'وضعیت', value: 'status' },
        { text: 'مبلغ پرداختی', value: 'price' },
        { text: 'شماره تماس', value: 'mobile' },
        { text: 'تاریخ بروز‌رسانی', value: 'updated_at' },
        { text: 'گزینه‌ها', value: 'show' },
      ]"
      :items="items"
      class="elevation-1"
      item-key="id"
      :loading="loading"
      loading-text="در حال دریافت اطلاعات از سرور ..."
      :search="search"
      no-results-text="نتیجه‌ای یافت نشد."
      :page.sync="page"
      :items-per-page="limit"
      hide-default-footer
    >
      <template v-slot:top>
        <v-row>
          <v-col cols="12" md="9">
            <v-toolbar flat>
              <v-toolbar-title>
                <div class="d-flex justify-start align-center">
                  <h1 class="blue--text">{{ title }}</h1>
                </div>
              </v-toolbar-title>
            </v-toolbar>
          </v-col>

          <v-col class="col-12 col-md-3">
            <v-text-field
              v-model="search"
              label="جستجو در این صفحه"
              class="ml-4"
            ></v-text-field>
          </v-col>
        </v-row>
      </template>

      <template v-slot:[`item.no`]="{ item }">
        {{ toPersianString(item.no) }}
      </template>

      <template v-slot:[`item.token`]="{ item }">
        {{ item.token }}
      </template>

      <template v-slot:[`item.gate`]="{ item }">
        <span :class="getGateColor(item.gate)">
          {{ getGateText(item.gate) }}
        </span>
      </template>

      <template v-slot:[`item.status`]="{ item }">
        <span :class="getStatusColor(item.status)">
          {{ getStatusText(item.status) }}
        </span>
      </template>

      <template v-slot:[`item.price`]="{ item }">
        {{ numberToCash(item.price) }}
      </template>

      <template v-slot:[`item.mobile`]="{ item }">
        {{ toPersianString(item.mobile) }}
      </template>

      <template v-slot:[`item.updated_at`]="{ item }">
        {{ toPersianString(toPersianTime(item.updated_at)) }}
      </template>

      <template v-slot:[`item.show`]="{ item }">
        <v-chip
          color="blue"
          link
          label
          outlined
          close
          close-icon="mdi-eye"
          @click:close="
            $router.push({ name: 'ShowPayment', params: { id: item.id } })
          "
          :to="{ name: 'ShowPayment', params: { id: item.id } }"
        >
          نمایش
        </v-chip>
      </template>
    </v-data-table>
    <!-- ------------------------------ END: List ------------------------------ -->

    <!-- ------------------------------------------------------------------------ */
    /*                              START: Pagination                             */
    /* ------------------------------------------------------------------------- -->
    <div class="d-flex align-center justify-space-between">
      <v-pagination
        v-model="page"
        :length="pageCount"
        :total-visible="10"
        @input="getList(page, limit, filter)"
      ></v-pagination>
      <v-text-field
        style="max-width: 250px"
        class="mt-7"
        :value="limit"
        label="آیتم در هر صفحه"
        type="number"
        min="-1"
        max="15"
        @input="limit = parseInt($event, 10)"
        outlined
      ></v-text-field>
    </div>
    <!-- ---------------------------- END: Pagination -------------------------  -->
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  data(): {
    [key: string]: unknown;
    page: number;
    pageCount: number;
    limit: number;
  } {
    const title = "لیست پرداخت‌ها";
    return {
      title,
      loading: false,
      items: [],
      breadcrumbs: [
        {
          text: "صفحه اصلی",
          to: "/",
        },
        {
          text: title,
          to: document.location.pathname,
        },
      ],
      search: "",
      // pagination
      page: 1,
      limit: 10,
      pageCount: 1,
      // filter
      token: undefined,
      gate: undefined,
      status: undefined,
      mobile: undefined,
      filter: {},
    };
  },
  watch: {
    limit() {
      this.page = 1;
      this.getList(this.page, this.limit, this.filter);
    },
    filter() {
      this.page = 1;
      this.getList(this.page, this.limit, this.filter);
    },
  },
  methods: {
    getList(page: number, limit: number, filter?: unknown): void {
      this.loading = true;
      setTimeout(() => {
        this.items = [
          {
            no: 1,
            id: "43b5a165-0bb6-4e10-8aec-7eb06dfed1c1",
            gate: 1, // زرین‌پال
            status: 0, // در حال انجام
            token: "‌B54008831",
            price: 1389000,
            mobile: "09111111111",
            updated_at: "2021-04-28T14:20:22.783Z",
          },
          {
            no: 2,
            id: "43b5a165-0bb6-4e10-7eb06dfed1c2-8ae2",
            gate: 1, // زرین‌پال
            status: 1, // تکمیل شده
            token: "‌B54008832",
            price: 198000,
            mobile: "09111111112",
            updated_at: "2021-04-28T14:20:22.783Z",
          },
          {
            no: 3,
            id: "43b5a165-0bb6-7eb06dfed1c2-8aec-4e13",
            gate: 1, // زرین‌پال
            status: 1, // مرجوعی
            token: "‌B54008833",
            price: 2499000,
            mobile: "09111111113",
            updated_at: "2021-04-28T14:20:22.783Z",
          },
          {
            no: 4,
            id: "43b5a165-0bb6-4e10-8aec-7eb06dfed1c4",
            gate: 2, // سامان
            status: 0, // در حال انجام
            token: "‌B54008834",
            price: 460000,
            mobile: "09111111114",
            updated_at: "2021-04-28T14:20:22.783Z",
          },
          {
            no: 5,
            id: "43b5a165-0bb6-4e10-7eb06dfed1c2-8ae5",
            gate: 2, // سامان
            status: 1, // تکمیل شده
            token: "‌B54008835",
            price: 12000,
            mobile: "09111111115",
            updated_at: "2021-04-28T14:20:22.783Z",
          },
          {
            no: 6,
            id: "43b5a165-0bb6-7eb06dfed1c2-8aec-4e16",
            gate: 2, // سامان
            status: 1, // مرجوعی
            token: "‌B54008836",
            price: 48000,
            mobile: "09111111116",
            updated_at: "2021-04-28T14:20:22.783Z",
          },
        ];
        this.loading = false;
      }, 500);
      console.log(
        `getList: { page: ${page}, limit: ${limit}, filter: ${JSON.stringify(
          filter
        )} }`
      );
    },
    paginateGenerator() {
      this.filter = {
        token: this.token,
        gate: this.gate,
        status: this.status,
        mobile: this.mobile,
      };
    },
    getGateText(status: number): string | undefined {
      const allStatus = new Map([
        [1, "زرین‌پال"],
        [2, "سامان"],
      ]);
      return allStatus.get(status);
    },
    getGateColor(status: number): string | undefined {
      const allStatus = new Map([
        [1, "yellow--text"],
        [2, "blue--text"],
      ]);
      return allStatus.get(status);
    },
    getStatusText(status: number): string | undefined {
      const allStatus = new Map([
        [0, "پرداخت نشده"],
        [1, "پرداخت شده"],
      ]);
      return allStatus.get(status);
    },
    getStatusColor(status: number): string | undefined {
      const allStatus = new Map([
        [0, "red--text"],
        [1, "green--text"],
      ]);
      return allStatus.get(status);
    },
  },
  mounted(): void {
    this.getList(this.page, this.limit);
  },
});
</script>
