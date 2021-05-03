<template>
  <v-container fluid>
    <v-breadcrumbs :items="breadcrumbs" class="mb-3"></v-breadcrumbs>

    <!-- ------------------------------------------------------------------------ */
    /*                                START: Filter                               */
    ---------------------------------------------------------------------------- -->
    <v-card class="mb-8">
      <v-card-title class="blue--text">فیلتر {{ title }}</v-card-title>
      <v-row class="mx-4">
        <v-col sm="12" md="3">
          <v-text-field
            label="کد"
            v-model="code"
            @change="filterGenerate()"
          ></v-text-field>
        </v-col>

        <v-col sm="12" md="3">
          <v-text-field
            label="نوع"
            v-model="type"
            @change="filterGenerate()"
          ></v-text-field>
        </v-col>

        <v-col sm="12" md="3">
          <v-text-field
            label="وضعیت"
            v-model="status"
            @change="filterGenerate()"
          ></v-text-field>
        </v-col>

        <v-col sm="12" md="3">
          <v-text-field
            label="موبایل"
            v-model="mobile"
            @change="filterGenerate()"
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
        { text: 'کد', value: 'code', sortable: false },
        { text: 'نوع', value: 'type', sortable: false },
        { text: 'وضعیت', value: 'status' },
        { text: 'مبلغ پرداختی', value: 'price' },
        { text: 'شماره تماس', value: 'mobile' },
        { text: 'تعداد کالا', value: 'count' },
        { text: 'نمایش', value: 'show' },
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
      @page-count="pageCount = $event"
    >
      <template v-slot:top>
        <v-row>
          <v-col sm="12" md="9">
            <v-toolbar flat>
              <v-toolbar-title>
                <div class="d-flex justify-start align-center">
                  <h1 class="blue--text">{{ title }}</h1>
                </div>
              </v-toolbar-title>
            </v-toolbar>
          </v-col>

          <v-col sm="12" md="3">
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

      <template v-slot:[`item.code`]="{ item }">
        {{ item.code }}
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

      <template v-slot:[`item.count`]="{ item }">
        {{ toPersianString(item.count) }}
      </template>

      <template v-slot:[`item.show`]="{ item }">
        <v-chip color="blue" label outlined>
          <router-link
            :to="{ name: 'ShowOrder', params: { id: item.id } }"
            class="blue--text"
          >
            <v-icon>mdi-eye</v-icon>
          </router-link>
        </v-chip>
      </template>
    </v-data-table>
    <!-- ------------------------------ END: List ------------------------------ -->

    <!-- ------------------------------------------------------------------------ */
    /*                              START: Pagination                             */
    /* ------------------------------------------------------------------------- -->
    <div class="d-flex align-center justify-space-between pt-3">
      <v-pagination
        v-model="page"
        :length="pageCount + 1"
        :total-visible="10"
      ></v-pagination>
      <v-text-field
        style="max-width: 250px"
        :value="limit"
        label="آیتم در هر صفحه"
        type="number"
        min="-1"
        max="15"
        @input="limit = parseInt($event, 10)"
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
    const title = "لیست سفارشات";
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
      pageCount: 0,
      // filter
      code: "",
      type: "",
      status: "",
      mobile: "",
      filter: {},
    };
  },
  watch: {
    page() {
      this.getList(this.page, this.limit, this.filter);
    },
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
            type: "آنلاین",
            status: 0, // در حال انجام
            code: "‌B54008831",
            price: 1389000,
            mobile: "09111111111",
            count: 7,
          },
          {
            no: 2,
            id: "43b5a165-0bb6-4e10-7eb06dfed1c2-8ae2",
            type: "آنلاین",
            status: 1, // تکمیل شده
            code: "‌B54008832",
            price: 198000,
            mobile: "09111111112",
            count: 6,
          },
          {
            no: 3,
            id: "43b5a165-0bb6-7eb06dfed1c2-8aec-4e13",
            type: "آنلاین",
            status: 2, // مرجوعی
            code: "‌B54008833",
            price: 2499000,
            mobile: "09111111113",
            count: 5,
          },
          {
            no: 4,
            id: "43b5a165-0bb6-4e10-8aec-7eb06dfed1c4",
            type: "آفلاین",
            status: 0, // در حال انجام
            code: "‌B54008834",
            price: 460000,
            mobile: "09111111114",
            count: 4,
          },
          {
            no: 5,
            id: "43b5a165-0bb6-4e10-7eb06dfed1c2-8ae5",
            type: "آفلاین",
            status: 1, // تکمیل شده
            code: "‌B54008835",
            price: 12000,
            mobile: "09111111115",
            count: 3,
          },
          {
            no: 6,
            id: "43b5a165-0bb6-7eb06dfed1c2-8aec-4e16",
            type: "آفلاین",
            status: 2, // مرجوعی
            code: "‌B54008836",
            price: 48000,
            mobile: "09111111116",
            count: 2,
          },
        ];
        this.loading = false;
      }, 500);
      console.log(
        `getList: { page: ${page}, limit: ${limit}, filter: ${filter} }`
      );
    },
    filterGenerate() {
      this.filter = {
        code: this.code,
        type: this.type,
        status: this.status,
        mobile: this.mobile,
      };
    },
    getStatusText(status: number): string | undefined {
      const allStatus = new Map([
        [0, "در حال انجام"],
        [1, "تکمیل شده"],
        [2, "مرجوعی"],
      ]);
      return allStatus.get(status);
    },
    getStatusColor(status: number): string | undefined {
      const allStatus = new Map([
        [0, "blue--text"],
        [1, "green--text"],
        [2, "red--text"],
      ]);
      return allStatus.get(status);
    },
  },
  mounted(): void {
    this.getList(this.page, this.limit);
  },
});
</script>
