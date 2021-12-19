<template>
  <v-container fluid>
    <v-breadcrumbs :items="breadcrumbs" class="mb-3"></v-breadcrumbs>

    <!-- ------------------------------------------------------------------------ */
    /*                                START: Filter                               */
    ---------------------------------------------------------------------------- -->

    <!-- ----------------------------- END: Filter ----------------------------- -->

    <!-- ------------------------------------------------------------------------ */
    /*                                 START: List                                */
    /* ------------------------------------------------------------------------- -->
    <v-data-table
      :headers="[
        { text: 'شماره', value: 'no', align: 'center' },
        { text: 'کد', value: 'code' },
        { text: 'نام', value: 'name' },
        { text: 'محدودیت در تعداد ', value: 'countLimit' },
        { text: 'حداقل مبلغ خرید', value: 'minTotal' },
        { text: 'اعمال همزمان', value: 'singularity' },
        { text: 'اعمال گروه همزمان', value: 'selfSingularity' },
        { text: 'زمان ایجاد', value: 'datetime.created_at' },
        { text: 'زمان بروزرسانی', value: 'datetime.updated_at' },
        {
          text: 'گزینه‌ها',
          value: 'options',
          align: 'center',
          sortable: false,
        },
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
                  <v-divider vertical class="mx-4"></v-divider>
                  <router-link :to="{ name: 'CreateOffer' }">
                    <v-icon color="blue" large>mdi-plus-circle</v-icon>
                  </router-link>
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
        <span :class="item.active ? 'green--text' : 'pink--text'">
          {{ item.code }}
        </span>
      </template>

      <template v-slot:[`item.countLimit`]="{ item }">
        {{
          item.countLimit === -1 ? "ندارد" : toPersianString(item.countLimit)
        }}
      </template>

      <template v-slot:[`item.minTotal`]="{ item }">
        {{ toPersianString(numberToCash(item.minTotal / 10)) }}
      </template>

      <template v-slot:[`item.singularity`]="{ item }">
        <span :class="item.singularity ? 'red--text' : 'green--text'">
          {{ item.singularity ? "خیر" : "بله" }}
        </span>
      </template>

      <template v-slot:[`item.selfSingularity`]="{ item }">
        <span :class="item.selfSingularity ? 'red--text' : 'green--text'">
          {{ item.selfSingularity ? "خیر" : "بله" }}
        </span>
      </template>

      <template v-slot:[`item.datetime.created_at`]="{ item }">
        {{ toPersianString(toPersianTime(item.datetime.created_at)) }}
      </template>

      <template v-slot:[`item.datetime.updated_at`]="{ item }">
        {{ toPersianString(toPersianTime(item.datetime.updated_at)) }}
      </template>

      <template v-slot:[`item.options`]="{ item }">
        <!-- edit -->
        <v-chip
          class="ml-2"
          color="blue"
          link
          label
          outlined
          close
          close-icon="mdi-square-edit-outline"
          @click:close="
            $router.push({ name: 'EditOffer', params: { id: item.id } })
          "
          :to="{ name: 'EditOffer', params: { id: item.id } }"
        >
          ویرایش
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
        :total-visible="limit"
        @input="page = $event"
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
import { IOffer } from "@/interfaces/entities/offer.interface";

export default Vue.extend({
  data(): {
    [key: string]: unknown;
    page: number;
    pageCount: number;
    limit: number;
    pagination: IPagination;
    items: IOffer[];
    minTotal: number;
  } {
    const title = "لیست پیشنهادات";
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
      name: undefined,
      countLimit: undefined,
      minTotal: undefined as unknown as number,
      singularity: undefined,
      active: undefined,
      dates: undefined,
      datesMenu: false,
      pagination: {
        option: {
          page: { eq: 1 },
          limit: { eq: 10 },
        },
      },
      groupDataName: undefined,
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
      Vue.prototype.$api.promotion
        .getOfferList(this.pagination)
        .then((response) => {
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
        //   code: { eq: this.code },
        //   name: { eq: this.name },
        //   countLimit: { eq: this.countLimit },
        //   minTotal: { eq: this.minTotal * 10 },
        //   singularity: { eq: this.singularity },
        //   active: { eq: this.active },
      };
      this.pagination = paginationGenerator(options, filters);
    },
    clearDateFilter(): void {
      this.dates = undefined;
      this.paginateGenerator();
    },
    deleteOffer(id: string): void {
      console.log("delete id:", id);
      // use service for delete offer with id
    },
  },
  mounted(): void {
    this.getList();
  },
});
</script>
