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
            placeholder="لطفا کد جین‌پوینت را وارد کنید."
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
            placeholder="لطفا نام جین‌پوینت را وارد کنید."
            v-model.trim="name"
            @change="paginateGenerator()"
            outlined
            hide-details="auto"
            clearable
          ></v-text-field>
        </v-col>

        <!-- <v-col cols="12" md="4">
          <v-text-field
            label="نام گروه"
            placeholder="لطفا نام گروه را وارد کنید."
            v-model="groupName"
            @change="paginateGenerator()"
            outlined
            hide-details="auto"
            clearable
            disabled
          ></v-text-field>
        </v-col> -->

        <v-col cols="12" md="4">
          <v-text-field
            label="محدودیت در تعداد "
            placeholder="لطفا محدودیت در تعداد را وارد کنید."
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
            label="حداقل مبلغ خرید"
            placeholder="لطفا حداقل مبلغ خرید را وارد کنید."
            v-model.number="minTotal"
            type="number"
            @change="paginateGenerator()"
            outlined
            hide-details="auto"
            clearable
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="4">
          <v-autocomplete
            label="اعمال همزمان"
            v-model="singularity"
            :items="[
              { text: 'فعال', value: false },
              { text: 'غیرفعال', value: true },
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
          <v-autocomplete
            label="وضعیت"
            v-model="active"
            :items="[
              { text: 'فعال', value: true },
              { text: 'غیرفعال', value: false },
            ]"
            item-text="text"
            item-value="value"
            @change="paginateGenerator()"
            outlined
            clearable
          ></v-autocomplete>
        </v-col>

        <!-- <v-col cols="12" md="4">
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
                outlined
                disabled
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
    <v-data-table
      :headers="[
        { text: 'شماره', value: 'no', align: 'center' },
        { text: 'کد', value: 'code' },
        { text: 'نام', value: 'name' },
        { text: 'نام در ای‌آرپی', value: 'erpName' },
        { text: 'محدودیت در تعداد ', value: 'countLimit' },
        { text: 'حداقل مبلغ خرید', value: 'minTotal' },
        { text: 'اعمال همزمان', value: 'singularity' },
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
                <h1 class="blue--text">{{ title }}</h1>
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
            $router.push({ name: 'EditJeansPoint', params: { id: item.id } })
          "
          :to="{ name: 'EditJeansPoint', params: { id: item.id } }"
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
import { IJeansPoint } from "@/interfaces/entities/jeanspoint.interface";
import { paginationGenerator } from "@/common/utils/pagination.utils";

export default Vue.extend({
  data(): {
    [key: string]: unknown;
    page: number;
    pageCount: number;
    limit: number;
    pagination: IPagination;
    items: IJeansPoint[];
    minTotal: number;
  } {
    const title = "لیست جین‌پوینت‌ها";
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
      groupName: undefined,
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
        .getPointList(this.pagination)
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
        code: { eq: this.code },
        name: { eq: this.name },
        groupName: { eq: this.groupName },
        countLimit: { eq: this.countLimit },
        minTotal: { eq: this.minTotal * 10 },
        singularity: { eq: this.singularity },
        active: { eq: this.active },
      };
      this.pagination = paginationGenerator(options, filters);
    },
    clearDateFilter(): void {
      this.dates = undefined;
      this.paginateGenerator();
    },
    deletePoint(id: string): void {
      console.log("delete id:", id);
      // use service for delete notification with id
    },
  },
  mounted(): void {
    this.getList();
  },
});
</script>
