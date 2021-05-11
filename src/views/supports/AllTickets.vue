<template>
  <v-container fluid>
    <v-breadcrumbs :items="breadcrumbs" class="mb-2"></v-breadcrumbs>

    <!-- ------------------------------------------------------------------------ */
    /*                                START: Filter                               */
    ---------------------------------------------------------------------------- -->
    <v-card class="mb-8" elevation="1" outlined>
      <v-card-title class="blue--text">فیلتر {{ title }}</v-card-title>
      <v-row class="mx-4">
        <v-col class="col-12 col-md-3">
          <v-text-field
            label="کد"
            placeholder="لطفا کد تیکت را وارد کنید."
            v-model="code"
            @change="filterGenerate()"
            outlined
            hide-details="auto"
          ></v-text-field>
        </v-col>

        <v-col class="col-12 col-md-3">
          <v-text-field
            label="موبایل"
            placeholder="لطفا شماره موبایل را وارد کنید."
            v-model="mobile"
            @change="filterGenerate()"
            outlined
            hide-details="auto"
          ></v-text-field>
        </v-col>

        <v-col class="col-12 col-md-3">
          <v-menu
            v-model="datesMenu"
            :close-on-content-click="false"
            :nudge-top="20"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="dates"
                label="تاریخ"
                placeholder="لطفا روزهای مورد نظر خود را انتخاب کنید."
                readonly
                clearable
                v-bind="attrs"
                v-on="on"
                @click:clear="clearDateFilter()"
                outlined
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="dates"
              range
              @change="filterGenerate()"
            ></v-date-picker>
          </v-menu>
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
        { text: 'آیدی', value: 'id', align: 'start', sortable: false },
        { text: 'عنوان', value: 'title', sortable: false },
        { text: 'کد', value: 'code' },
        { text: 'زمان ایجاد', value: 'date' },
        { text: 'وضعیت', value: 'status', align: 'center' },
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

      <template v-slot:[`item.code`]="{ item }">
        {{ item.code }}
      </template>

      <template v-slot:[`item.date`]="{ item }">
        {{ toPersianString(toPersianTime(item.date)) }}
      </template>

      <template v-slot:[`item.status`]="{ item }">
        <v-chip
          :color="item.status ? 'blue' : 'red'"
          link
          label
          outlined
          :to="{ name: 'ShowTicket', params: { id: item.id } }"
        >
          {{ item.status ? "پاسخ داده شده" : "در انتظار پاسخ" }}
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
    const title = "لیست تیکت‌ها";
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
      code: undefined,
      mobile: undefined,
      dates: undefined,
      datesMenu: false,
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
      setTimeout((): void => {
        this.items = [
          {
            no: 1,
            id: "43b5a165-0bb6-4e10-8aec-7eb06dfed1c2",
            title: "مشکل در ثبت سفارش با کارت  سپه",
            code: "TCK-XA66854",
            date: "2020/06/11",
            status: 0,
          },
          {
            no: 2,
            id: "43b5a236-0bb8-4e11-8aed-7eb06dfed1c3",
            title: "لباس خریدم نمیدید چرا",
            code: "TCK-FC55698",
            date: "2020/06/10",
            status: 1,
          },
          {
            no: 3,
            id: "43b5a236-0bb8-4e11-8aed-7eb06dfed1c4",
            title: "لباس خریدم نمیدید چرا",
            code: "TCK-FC55698",
            date: "2020/06/10",
            status: 1,
          },
          {
            no: 4,
            id: "43b5a236-0bb8-4e11-8aed-7eb06dfed1c5",
            title: "لباس خریدم نمیدید چرا",
            code: "TCK-FC55698",
            date: "2020/06/10",
            status: 1,
          },
          {
            no: 5,
            id: "43b5a236-0bb8-4e11-8aed-7eb06dfed1c6",
            title: "لباس خریدم نمیدید چرا",
            code: "TCK-FC55698",
            date: "2020/06/10",
            status: 1,
          },
          {
            no: 6,
            id: "43b5a236-0bb8-4e11-8aed-7eb06dfed1c7",
            title: "لباس خریدم نمیدید چرا",
            code: "TCK-FC55698",
            date: "2020/06/10",
            status: 1,
          },
          {
            no: 7,
            id: "43b5a236-0bb8-4e11-8aed-7eb06dfed1c8",
            title: "لباس خریدم نمیدید چرا",
            code: "TCK-FC55698",
            date: "2020/06/10",
            status: 1,
          },
          {
            no: 8,
            id: "43b5a236-0bb8-4e11-8aed-7eb06dfed1c9",
            title: "لباس خریدم نمیدید چرا",
            code: "TCK-FC55698",
            date: "2020/06/10",
            status: 1,
          },
          {
            no: 9,
            id: "43b5a236-0bb8-4e11-8aed-7eb06dfed110",
            title: "لباس خریدم نمیدید چرا",
            code: "TCK-FC55698",
            date: "2020/06/10",
            status: 1,
          },
          {
            no: 10,
            id: "43b5a236-0bb8-4e11-8aed-7eb06dfed111",
            title: "لباس خریدم نمیدید چرا",
            code: "TCK-FC55698",
            date: "2020/06/10",
            status: 1,
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
    filterGenerate() {
      this.filter = {
        code: this.code,
        mobile: this.mobile,
        dates: this.dates,
      };
    },
    clearDateFilter() {
      this.dates = undefined;
      this.filterGenerate();
    },
  },
  mounted(): void {
    this.getList(this.page, this.limit);
  },
});
</script>
