<template>
  <v-container fluid>
    <v-breadcrumbs :items="breadcrumbs" class="mb-3"></v-breadcrumbs>

    <!-- ------------------------------------------------------------------------ */
    /*                                START: Filter                               */
    ---------------------------------------------------------------------------- -->
    <v-card class="mb-8" elevation="1" outlined>
      <v-card-title class="blue--text">فیلتر {{ title }}</v-card-title>
      <v-row class="mx-4">
        <v-col cols="12" md="4">
          <v-text-field
            label="کد"
            placeholder="لطفا کد تخفیف را وارد کنید."
            v-model.trim="code"
            @change="paginateGenerator()"
            outlined
            hide-details="auto"
            clearable
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="4">
          <v-text-field
            label="نام"
            placeholder="لطفا نام تخفیف را وارد کنید."
            v-model.trim="name"
            @change="paginateGenerator()"
            outlined
            hide-details="auto"
            clearable
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="4">
          <v-text-field
            label="مقدار"
            placeholder="لطفا مقدار تخفیف را وارد کنید."
            v-model.number="reductionPrice"
            type="number"
            @change="paginateGenerator()"
            outlined
            hide-details="auto"
            clearable
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="4">
          <v-autocomplete
            label="نوع"
            v-model="isPercentage"
            :items="[
              { text: 'درصدی', value: true },
              { text: 'مبلغی', value: false },
            ]"
            item-text="text"
            item-value="value"
            @change="paginateGenerator()"
            outlined
            hide-details="auto"
            clearable
          ></v-autocomplete>
        </v-col>

        <v-col cols="12" md="4">
          <v-text-field
            label="محدودیت تعداد"
            placeholder="لطفا محدودیت تعداد تخفیف را وارد کنید."
            v-model.number="countLimit"
            type="number"
            @change="paginateGenerator()"
            outlined
            hide-details="auto"
            clearable
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="4">
          <v-text-field
            label="دفعات استفاده"
            placeholder="لطفا دفعات استفاده تخفیف را وارد کنید."
            v-model.number="usageCount"
            type="number"
            @change="paginateGenerator()"
            outlined
            hide-details="auto"
            clearable
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="3">
          <v-text-field
            label="حداکثر"
            placeholder="لطفا حداکثر تخفیف را وارد کنید."
            v-model.number="maxTotal"
            type="number"
            @change="paginateGenerator()"
            outlined
            hide-details="auto"
            clearable
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="3">
          <v-text-field
            label="حداقل"
            placeholder="لطفا حداقل تخفیف را وارد کنید."
            v-model.number="minTotal"
            type="number"
            @change="paginateGenerator()"
            outlined
            hide-details="auto"
            clearable
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="3">
          <v-autocomplete
            label="اعمال همزمان"
            v-model="singularity"
            :items="[
              { text: 'بله', value: true },
              { text: 'خیر', value: false },
            ]"
            item-text="text"
            item-value="value"
            @change="paginateGenerator()"
            outlined
            hide-details="auto"
            clearable
          ></v-autocomplete>
        </v-col>

        <v-col cols="12" md="3">
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
                label="بازه زمان شروع یا پایان"
                placeholder="لطفا روزهای مورد نظر خود را انتخاب کنید."
                readonly
                clearable
                v-bind="attrs"
                v-on="on"
                @click:clear="clearDateFilter()"
                disabled
                outlined
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="dates"
              multiple
              @change="paginateGenerator()"
            ></v-date-picker>
          </v-menu>
        </v-col>
      </v-row>
    </v-card>
    <!-- ----------------------------- END: Filter ----------------------------- -->

    <!-- ------------------------------------------------------------------------ */
    /*                                 START: List                                */
    /* ------------------------------------------------------------------------- -->
    <!-- { text: 'محدودیت تعداد', value: 'countLimit' }, -->
    <v-data-table
      :headers="[
        { text: 'شماره', value: 'no', align: 'center' },
        { text: 'کد', value: 'code', align: 'start', sortable: false },
        { text: 'نام', value: 'name' },
        { text: 'مقدار تخفیف', value: 'reductionPrice' },
        { text: 'نوع تخفیف', value: 'isPercentage' },
        { text: 'دفعات استفاده', value: 'usageCount' },
        { text: 'حداکثر تخفیف', value: 'maxTotal' },
        { text: 'حداقل تخفیف', value: 'minTotal' },
        { text: 'اعمال همزمان', value: 'singularity' },
        { text: 'زمان شروع', value: 'startDate' },
        { text: 'زمان پایان', value: 'expirationDate' },
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
                  <router-link :to="{ name: 'CreateDiscount' }">
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

      <template v-slot:[`item.reductionPrice`]="{ item }">
        {{ toPersianString(item.reductionPrice) }}
      </template>

      <template v-slot:[`item.isPercentage`]="{ item }">
        <span :class="item.isPercentage ? 'yellow--text' : 'accent--text'">
          {{ item.isPercentage ? "درصدی" : "مبلغی" }}
        </span>
      </template>

      <!-- <template v-slot:[`item.countLimit`]="{ item }">
        {{
          item.countLimit === -1 ? "نامحدود" : toPersianString(item.countLimit)
        }}
      </template> -->

      <template v-slot:[`item.usageCount`]="{ item }">
        {{
          item.usageCount === -1 ? "نامحدود" : toPersianString(item.usageCount)
        }}
      </template>

      <template v-slot:[`item.maxTotal`]="{ item }">
        {{
          item.maxTotal === -1
            ? "تعیین نشده"
            : cashOrPercent(item.maxTotal, item.isPercentage)
        }}
      </template>

      <template v-slot:[`item.minTotal`]="{ item }">
        {{
          item.minTotal === -1
            ? "تعیین نشده"
            : cashOrPercent(item.minTotal, item.isPercentage)
        }}
      </template>

      <template v-slot:[`item.singularity`]="{ item }">
        <span :class="item.singularity ? 'green--text' : 'red--text'">
          {{ item.singularity ? "بله" : "خیر" }}
        </span>
      </template>

      <template v-slot:[`item.startDate`]="{ item }">
        {{ item.startDate && toPersianString(toPersianTime(item.startDate)) }}
      </template>

      <template v-slot:[`item.expirationDate`]="{ item }">
        {{
          item.expirationDate &&
          toPersianString(toPersianTime(item.expirationDate))
        }}
      </template>

      <template v-slot:[`item.active`]="{ item }">
        <span :class="item.active ? 'green--text' : 'red--text'">
          {{ item.active ? "فعال" : "غیرفعال" }}
        </span>
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
            $router.push({ name: 'EditDiscount', params: { id: item.id } })
          "
          :to="{ name: 'EditDiscount', params: { id: item.id } }"
        >
          ویرایش
        </v-chip>

        <!-- delete -->
        <v-chip
          v-if="!item.datetime.deleted_at"
          color="red"
          link
          label
          outlined
          close
          close-icon="mdi-delete"
          @click:close="deleteDiscount(item.id)"
          @click="deleteDiscount(item.id)"
        >
          حذف
        </v-chip>

        <!-- restore -->
        <v-chip
          v-else
          color="green"
          link
          label
          outlined
          close
          close-icon="mdi-delete-restore"
          @click:close="restoreDiscount(item.id)"
          @click="restoreDiscount(item.id)"
        >
          بازیابی
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
import PromotionService from "@/services/Promotion.service";
import {
  IFilters,
  IOptions,
  IPagination,
} from "@/interfaces/others/pagination.interface";
import * as _ from "lodash";
import { IDiscount } from "@/interfaces/entities/discount.interface";
import { paginationGenerator } from "@/common/utils/pagination.utils";
import { numberToCash, toPersianString } from "@/mixin/string.mixin";

export default Vue.extend({
  data(): {
    [key: string]: unknown;
    page: number;
    pageCount: number;
    limit: number;
    pagination: IPagination;
    items: IDiscount[];
  } {
    const title = "لیست تخفیف‌ها";
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
      pageCount: 1,
      limit: 10,
      // filter
      code: undefined,
      name: undefined,
      reductionPrice: undefined,
      isPercentage: undefined,
      countLimit: undefined,
      usageCount: undefined,
      maxTotal: undefined,
      minTotal: undefined,
      singularity: undefined,
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
      PromotionService.getDiscountList(this.pagination).then((response) => {
        const data = response.data.data;
        this.pageCount = Vue.prototype.$PageCount(data.total, this.limit);
        this.items = data.result;
      });
    },
    paginateGenerator(): void {
      this.page = 1;
      const options: IOptions = {
        page: { eq: this.page },
        limit: { eq: this.limit },
      };
      const filters: IFilters = {
        code: { eq: this.code },
        name: { eq: this.name },
        reductionPrice: { eq: this.reductionPrice },
        isPercentage: { eq: this.isPercentage },
        countLimit: { eq: this.countLimit },
        usageCount: { eq: this.usageCount },
        maxTotal: { eq: this.maxTotal },
        minTotal: { eq: this.minTotal },
        singularity: { eq: this.singularity },
      };
      this.pagination = paginationGenerator(options, filters);
    },
    clearDateFilter(): void {
      this.dates = undefined;
      this.paginateGenerator();
    },
    deleteDiscount(id: string): void {
      PromotionService.discountSoftDelete(id).then(() => this.getList());
    },
    restoreDiscount(id: string): void {
      // PromotionService.discountRestore(id).then(() => this.getList());
      console.log(`restore discount with id: ${id}`);
    },
    cashOrPercent(amount: number, isPercentage: boolean) {
      if (isPercentage) return toPersianString(amount + "%");
      else return toPersianString(numberToCash(amount / 10));
    },
  },
  mounted(): void {
    this.getList();
  },
});
</script>
