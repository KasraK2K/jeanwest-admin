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
            v-model.trim="code"
            @change="paginateGenerator()"
            outlined
            hide-details="auto"
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="3">
          <v-autocomplete
            label="وضعیت"
            v-model="status"
            :items="[
              { text: 'بسته', value: 0 },
              { text: 'باز', value: 1 },
            ]"
            item-text="text"
            item-value="value"
            @change="paginateGenerator()"
            outlined
            clearable
          ></v-autocomplete>
        </v-col>

        <!-- <v-col class="col-12 col-md-3">
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
              multiple
              @change="paginateGenerator()"
            ></v-date-picker>
          </v-menu>
        </v-col> -->
      </v-row>
    </v-card>
    <!-- ----------------------------- END: Filter ----------------------------- -->

    <!-- ------------------------------------------------------------------------ */
    /*                                 START: List                                */
    /* ------------------------------------------------------------------------- -->
    <!-- { text: 'آیدی', value: 'id', align: 'start', sortable: false }, -->
    <v-data-table
      :headers="[
        { text: 'شماره', value: 'no', align: 'center' },
        { text: 'عنوان', value: 'title', sortable: false },
        { text: 'کد', value: 'code' },
        { text: 'زمان ایجاد', value: 'datetime.created_at' },
        { text: 'زمان بروزرسانی', value: 'datetime.updated_at' },
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
              clearable
            ></v-text-field>
          </v-col>
        </v-row>
      </template>

      <template v-slot:[`item.no`]="{ item }">
        {{ toPersianString(item.no) }}
      </template>

      <template v-slot:[`item.datetime.created_at`]="{ item }">
        {{ toPersianString(toPersianTime(item.datetime.created_at)) }}
      </template>

      <template v-slot:[`item.datetime.updated_at`]="{ item }">
        {{ toPersianString(toPersianTime(item.datetime.updated_at)) }}
      </template>

      <template v-slot:[`item.status`]="{ item }">
        <v-chip
          :color="statusColor(item.status)"
          link
          label
          outlined
          :to="{ name: 'ShowTicket', params: { id: item.id } }"
        >
          {{ statusText(item.status) }}
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
import {
  IFilters,
  IOptions,
  IPagination,
} from "@/interfaces/others/pagination.interface";
import { paginationGenerator } from "@/common/utils/pagination.utils";

export default Vue.extend({
  data(): {
    [key: string]: unknown;
    items: Record<string, unknown>[];
    page: number;
    pageCount: number;
    limit: number;
    pagination: IPagination;
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
      status: undefined,
      dates: undefined,
      datesMenu: false,
      pagination: {
        option: {
          page: { eq: 1 },
          limit: { eq: 10 },
        },
      },
    };
  },
  watch: {
    limit(): void {
      this.page = 1;
      this.pagination.option.limit = { eq: this.limit };
      this.getList();
    },
    page(): void {
      this.pagination.option.page = { eq: this.page };
      this.getList();
    },
    pagination(): void {
      this.getList();
    },
    items(): void {
      this.loading = false;
    },
  },
  methods: {
    getList(): void {
      this.loading = true;
      Vue.prototype.$api.support.getList(this.pagination).then((response) => {
        const data = response.data;
        this.pageCount = Vue.prototype.$PageCount(data.total, this.limit);
        this.items = data.result;
      });
    },
    paginateGenerator() {
      this.page = 1;
      const options: IOptions = {
        page: { eq: this.page },
        limit: { eq: this.limit },
      };
      const filters: IFilters = {
        code: { eq: this.code },
        status: { eq: this.status },
        active: { eq: this.active },
      };
      this.pagination = paginationGenerator(options, filters);
    },
    clearDateFilter() {
      this.dates = undefined;
      this.paginateGenerator();
    },
    statusColor(status: number): string {
      if (status === 0) return "blue";
      else if (status === 1) return "red";
      else if (status === 2) return "yellow";
      else return "purple";
    },
    statusText(status: number): string {
      if (status === 0) return "بسته";
      else if (status === 1) return "باز";
      else if (status === 2) return "پیگیری";
      else return "تعریف نشده";
    },
  },
  mounted(): void {
    this.getList();
  },
});
</script>
