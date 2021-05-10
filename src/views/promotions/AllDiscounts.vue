<template>
  <v-container fluid>
    <v-breadcrumbs :items="breadcrumbs" class="mb-3"></v-breadcrumbs>

    <!-- ------------------------------------------------------------------------ */
    /*                                START: Filter                               */
    ---------------------------------------------------------------------------- -->
    <v-card class="mb-8" elevation="1" outlined>
      <v-card-title class="blue--text">فیلتر {{ title }}</v-card-title>
      <v-row class="mx-4">
        <v-col class="col-12 col-md-4">
          <v-text-field
            label="کد"
            placeholder="لطفا کد تخفیف را وارد کنید."
            v-model="code"
            @change="filterGenerate()"
            outlined
          ></v-text-field>
        </v-col>

        <v-col class="col-12 col-md-4">
          <v-text-field
            label="تعداد"
            placeholder="لطفا تعداد را وارد کنید."
            v-model="count"
            type="number"
            @change="filterGenerate()"
            outlined
          ></v-text-field>
        </v-col>

        <v-col class="col-12 col-md-4">
          <v-text-field
            label="محدودیت"
            placeholder="لطفا محدودیت را وارد کنید."
            v-model="filterLimit"
            type="number"
            @change="filterGenerate()"
            outlined
          ></v-text-field>
        </v-col>

        <v-col class="col-12 col-md-4">
          <v-text-field
            label="حداکثر تخفیف"
            placeholder="لطفا حداکثر تخفیف را وارد کنید."
            v-model="max_discount"
            type="number"
            @change="filterGenerate()"
            outlined
          ></v-text-field>
        </v-col>

        <v-col class="col-12 col-md-4">
          <v-select
            label="اعمال همزمان"
            v-model="singularity"
            :items="[
              { text: 'بله', value: 1 },
              { text: 'خیر', value: 0 },
            ]"
            item-text="text"
            item-value="value"
            @change="filterGenerate()"
            outlined
          ></v-select>
        </v-col>

        <v-col class="col-12 col-md-4">
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
        { text: 'کد', value: 'code', align: 'start', sortable: false },
        { text: 'تعداد', value: 'count' },
        { text: 'محدودیت', value: 'limit' },
        { text: 'حداکثر تخفیف', value: 'max_discount' },
        { text: 'اعمال همزمان', value: 'singularity' },
        { text: 'گروه', value: 'group' },
        { text: 'زمان شروع', value: 'start_at' },
        { text: 'زمان پایان', value: 'end_at' },
        { text: 'وضعیت', value: 'active' },
        { text: 'گزینه‌ها', value: 'status', align: 'center' },
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
                  <v-divider vertical class="mx-4"></v-divider>
                  <router-link to="/createDiscount">
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

      <template v-slot:[`item.count`]="{ item }">
        {{ item.count === -1 ? "نامحدود" : toPersianString(item.count) }}
      </template>

      <template v-slot:[`item.limit`]="{ item }">
        {{ item.limit === -1 ? "نامحدود" : toPersianString(item.limit) }}
      </template>

      <template v-slot:[`item.max_discount`]="{ item }">
        {{ toPersianString(numberToCash(item.max_discount)) }}
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

      <template v-slot:[`item.active`]="{ item }">
        <span :class="item.active ? 'green--text' : 'red--text'">
          {{ item.active ? "فعال" : "غیرفعال" }}
        </span>
      </template>

      <template v-slot:[`item.status`]="{ item }">
        <!-- edit -->
        <v-chip
          v-if="canDelete(item)"
          class="ml-2"
          color="blue"
          link
          label
          outlined
        >
          <router-link to="/editDiscount" class="blue--text">
            <v-icon>mdi-square-edit-outline</v-icon>
          </router-link>
        </v-chip>
        <!-- delete -->
        <v-chip v-if="canDelete(item)" color="red" link label outlined>
          <a class="red--text" @click="deleteNotification(item.id)">
            <v-icon>mdi-delete</v-icon>
          </a>
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
        :length="pageCount + 1"
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
      pageCount: 0,
      limit: 10,
      // filter
      code: undefined,
      count: undefined,
      filterLimit: undefined,
      max_discount: undefined,
      singularity: undefined,
      status: undefined,
      dates: undefined,
      datesMenu: false,
      filter: {},
    };
  },
  watch: {
    limit(): void {
      this.page = 1;
      this.getList(this.page, this.limit, this.filter);
    },
    filter(): void {
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
            code: "Code01",
            active: true,
            image: true,
            count: 1,
            limit: 3,
            max_discount: 400000,
            singularity: true,
            group: "یک بعلاوه یک",
            start_at: "2021-04-27T14:20:22.783Z",
            end_at: "2021-04-28T14:20:22.783Z",
            status: 0,
          },
          {
            no: 2,
            code: "Code02",
            active: true,
            image: true,
            count: 5,
            limit: 7,
            max_discount: 200000,
            singularity: false,
            group: "یک بعلاوه یک",
            start_at: "2020/06/11",
            end_at: "2020/06/18",
            status: 1,
          },
          {
            no: 3,
            code: "Code03",
            active: false,
            image: false,
            count: 4,
            limit: 12,
            max_discount: 1400000,
            singularity: true,
            group: "یک بعلاوه یک",
            start_at: "2020/06/11",
            end_at: "2020/06/18",
            status: 1,
          },
          {
            no: 4,
            code: "Code04",
            active: true,
            image: false,
            count: 0,
            limit: 3,
            max_discount: 600000,
            singularity: true,
            group: "یک بعلاوه یک",
            start_at: "2020/06/11",
            end_at: "2020/06/18",
            status: 0,
          },
          {
            no: 5,
            code: "Code05",
            active: false,
            image: true,
            count: 0,
            limit: 0,
            max_discount: 400000,
            singularity: false,
            group: "یک بعلاوه یک",
            start_at: "2020/06/11",
            end_at: "2020/06/18",
            status: 0,
          },
          {
            no: 6,
            code: "Code06",
            active: false,
            image: true,
            count: 100,
            limit: 0,
            max_discount: 840000,
            singularity: true,
            group: "یک بعلاوه یک",
            start_at: "2020/06/11",
            end_at: "2020/06/18",
            status: 1,
          },
          {
            no: 7,
            code: "Code07",
            active: true,
            image: false,
            count: -1,
            limit: -1,
            max_discount: 720000,
            singularity: false,
            group: "یک بعلاوه یک",
            start_at: "2020/06/11",
            end_at: "2020/06/18",
            status: 1,
          },
          {
            no: 8,
            code: "Code08",
            active: false,
            image: false,
            count: 1,
            limit: 3,
            max_discount: 300000,
            singularity: false,
            group: "یک بعلاوه یک",
            start_at: "2020/06/11",
            end_at: "2020/06/18",
            status: 0,
          },
          {
            no: 9,
            code: "Code09",
            active: false,
            image: true,
            count: 1,
            limit: 3,
            max_discount: 900000,
            singularity: true,
            group: "یک بعلاوه یک",
            start_at: "2020/06/11",
            end_at: "2020/06/18",
            status: 1,
          },
          {
            no: 10,
            code: "Code10",
            active: true,
            image: true,
            count: 1,
            limit: 3,
            max_discount: 100000,
            singularity: false,
            group: "یک بعلاوه یک",
            start_at: "2020/06/11",
            end_at: "2020/06/18",
            status: 0,
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
    filterGenerate(): void {
      this.filter = {
        code: this.code,
        count: this.count,
        limit: this.filterLimit,
        max_discount: this.max_discount,
        singularity: this.singularity,
        dates: this.dates,
      };
    },
    clearDateFilter(): void {
      this.dates = undefined;
      this.filterGenerate();
    },
    canDelete(item: Record<string, unknown>): boolean {
      return item.type !== "SMS" || item.status === 0;
    },
    deleteNotification(id: string): void {
      console.log("delete id:", id);
      // use service for delete notification with id
    },
  },
  mounted(): void {
    this.getList(this.page, this.limit);
  },
});
</script>
