<template>
  <v-container fluid>
    <v-breadcrumbs :items="breadcrumbs" class="mb-3"></v-breadcrumbs>

    <!-- ------------------------------------------------------------------------ */
    /*                                START: Filter                               */
    ---------------------------------------------------------------------------- -->
    <v-card class="mb-8" elevation="1" outlined>
      <v-card-title class="blue--text">فیلتر {{ title }}</v-card-title>
      <v-row class="mx-4">
        <v-col class="col-12 col-md-3">
          <v-text-field
            label="کد"
            placeholder="لطفا کد امتیاز را وارد کنید."
            v-model="code"
            @change="filterGenerate()"
            outlined
            hide-details="auto"
          ></v-text-field>
        </v-col>

        <v-col class="col-12 col-md-3">
          <v-text-field
            label="نام"
            placeholder="لطفا نام امتیاز را وارد کنید."
            v-model="name"
            @change="filterGenerate()"
            outlined
            hide-details="auto"
          ></v-text-field>
        </v-col>

        <v-col class="col-12 col-md-3">
          <v-text-field
            label="نام گروه"
            placeholder="لطفا نام گروه را وارد کنید."
            v-model="groupName"
            @change="filterGenerate()"
            outlined
            hide-details="auto"
            disabled
          ></v-text-field>
        </v-col>

        <v-col class="col-12 col-md-3">
          <v-text-field
            label="محدودیت در تعداد "
            placeholder="لطفا محدودیت در تعداد را وارد کنید."
            v-model="filterLimit"
            type="number"
            @change="filterGenerate()"
            outlined
            hide-details="auto"
          ></v-text-field>
        </v-col>

        <v-col class="col-12 col-md-3">
          <v-text-field
            label="حداقل مبلغ خرید"
            placeholder="لطفا حداقل مبلغ خرید را وارد کنید."
            v-model="minTotal"
            type="number"
            @change="filterGenerate()"
            outlined
            hide-details="auto"
          ></v-text-field>
        </v-col>

        <v-col class="col-12 col-md-3">
          <v-select
            label="اعمال همزمان"
            v-model="singularity"
            :items="[
              { text: 'فعال', value: true },
              { text: 'غیرفعال', value: false },
            ]"
            item-text="text"
            item-value="value"
            @change="filterGenerate()"
            outlined
            hide-details="auto"
          ></v-select>
        </v-col>

        <v-col class="col-12 col-md-3">
          <v-select
            label="وضعیت"
            v-model="active"
            :items="[
              { text: 'فعال', value: true },
              { text: 'غیرفعال', value: false },
            ]"
            item-text="text"
            item-value="value"
            @change="filterGenerate()"
            outlined
            hide-details="auto"
          ></v-select>
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
                label="بازه زمان شروع یا پایان"
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
        { text: 'کد', value: 'code' },
        { text: 'نام', value: 'name' },
        { text: 'نام گروه', value: 'groupName' },
        { text: 'محدودیت در تعداد ', value: 'countLimit' },
        { text: 'حداقل مبلغ خرید', value: 'minTotal' },
        { text: 'اعمال همزمان', value: 'singularity' },
        { text: 'زمان شروع', value: 'start_at' },
        { text: 'زمان پایان', value: 'end_at' },
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
        {{ toPersianString(numberToCash(item.minTotal)) }}
      </template>

      <template v-slot:[`item.singularity`]="{ item }">
        <span :class="item.singularity ? 'green--text' : 'red--text'">
          {{ item.singularity ? "بله" : "خیر" }}
        </span>
      </template>

      <template v-slot:[`item.start_at`]="{ item }">
        {{ toPersianString(toPersianTime(item.start_at)) }}
      </template>

      <template v-slot:[`item.end_at`]="{ item }">
        {{ toPersianString(toPersianTime(item.end_at)) }}
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
          @click:close="$router.push({ path: 'editJeanPoints' })"
          :to="{ path: 'editJeanPoints' }"
        >
          ویرایش
        </v-chip>

        <!-- delete -->
        <v-chip
          color="red"
          link
          label
          outlined
          close
          close-icon="mdi-delete"
          @click:close="deleteNotification(item.id)"
          @click="deleteNotification(item.id)"
        >
          حذف
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
        @input="changePage"
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

export default Vue.extend({
  data(): {
    [key: string]: unknown;
    page: number;
    pageCount: number;
    limit: number;
    filter: {
      option: {
        page: { eq: number };
        limit: { eq: number };
      };
      filter?: Record<string, unknown>;
    };
  } {
    const title = "لیست امتیازات";
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
      groupName: undefined,
      filterLimit: undefined,
      minTotal: undefined,
      singularity: undefined,
      active: undefined,
      dates: undefined,
      datesMenu: false,
      filter: {
        option: {
          page: { eq: 1 },
          limit: { eq: 10 },
        },
      },
    };
  },
  watch: {
    limit() {
      this.page = 1;
      this.getList();
    },
    filter() {
      this.getList();
    },
  },
  methods: {
    changePage(page: number) {
      this.page = page;
      this.filterGenerate();
    },
    getList(): void {
      this.loading = true;
      PromotionService.getPointList((this as any).filter).then((response) => {
        const data = response.data.data;
        this.pageCount = Vue.prototype.$PageCount(data.total, this.limit);
        this.items = data.result;
      });
      setTimeout(() => (this.loading = false), 500);
    },
    filterGenerate() {
      this.filter = {
        option: {
          page: { eq: this.page },
          limit: { eq: this.limit },
        },
        filter: {
          code: { eq: this.code },
          name: { eq: this.name },
          groupName: { eq: this.groupName },
          countLimit: { eq: this.countLimit },
          minTotal: { eq: this.minTotal },
          singularity: { eq: this.singularity },
          active: { eq: this.active },
        },
        // dates: this.dates,
      };
      const filterKeys =
        this.filter && this.filter.filter && Object.keys(this.filter.filter);
      // delete empty keys
      if (filterKeys && filterKeys.length) {
        for (const key of filterKeys)
          if (this.filter.filter && this.filter.filter[key] && !this[key])
            delete this.filter.filter[key];
      }
      // delete empty filter
      if (!this.filter.filter || !Object.keys(this.filter.filter).length)
        delete this.filter.filter;
    },
    clearDateFilter(): void {
      this.dates = undefined;
      this.filterGenerate();
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
