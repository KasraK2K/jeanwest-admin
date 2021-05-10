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
            placeholder="لطفا کد امتیاز را وارد کنید."
            v-model="code"
            @change="filterGenerate()"
            outlined
          ></v-text-field>
        </v-col>

        <v-col class="col-12 col-md-4">
          <v-text-field
            label="نام"
            placeholder="لطفا نام امتیاز را وارد کنید."
            v-model="name"
            @change="filterGenerate()"
            outlined
          ></v-text-field>
        </v-col>

        <v-col class="col-12 col-md-4">
          <v-text-field
            label="نام در ای‌آر‌پی"
            placeholder="لطفا نام امتیاز در ای‌آر‌پی را وارد کنید."
            v-model="erp_name"
            @change="filterGenerate()"
            outlined
          ></v-text-field>
        </v-col>

        <v-col class="col-12 col-md-4">
          <v-text-field
            label="نام گروه"
            placeholder="لطفا نام گروه را وارد کنید."
            v-model="group_name"
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
            label="حداقل خرید"
            placeholder="لطفا حداقل خرید را وارد کنید."
            v-model="min_total"
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
              { text: 'فعال', value: true },
              { text: 'غیرفعال', value: false },
            ]"
            item-text="text"
            item-value="value"
            @change="filterGenerate()"
            outlined
          ></v-select>
        </v-col>

        <v-col class="col-12 col-md-4">
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
        { text: 'کد', value: 'code' },
        { text: 'نام', value: 'name' },
        { text: 'نام در ای‌آر‌پی', value: 'erp_name' },
        { text: 'نام گروه', value: 'group_name' },
        { text: 'محدودیت', value: 'limit' },
        { text: 'حداقل خرید', value: 'min_total' },
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
                  <router-link to="/createJeanPoints">
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
        <span :class="item.active ? 'teal--text' : 'pink--text'">
          {{ item.code }}
        </span>
      </template>

      <template v-slot:[`item.limit`]="{ item }">
        {{ toPersianString(item.limit) }}
      </template>

      <template v-slot:[`item.min_total`]="{ item }">
        {{ toPersianString(numberToCash(item.min_total)) }}
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
      pageCount: 0,
      limit: 10,
      // filter
      code: undefined,
      name: undefined,
      erp_name: undefined,
      group_name: undefined,
      filterLimit: undefined,
      min_total: undefined,
      singularity: undefined,
      active: undefined,
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
      setTimeout(() => {
        this.items = [
          {
            no: 1,
            code: "Code01",
            name: "نام امتیاز ۱",
            erp_name: "نام در ای‌آر‌پی ۱",
            group_name: "نام گروه ۱",
            limit: 3,
            min_total: "300000",
            singularity: true,
            active: true,
            start_at: "2021-04-27T14:20:22.783Z",
            end_at: "2021-04-28T14:20:23.783Z",
          },
          {
            no: 2,
            code: "Code02",
            name: "نام امتیاز ۲",
            erp_name: "نام در ای‌آر‌پی ۲",
            group_name: "نام گروه ۲",
            limit: 4,
            min_total: "450000",
            singularity: false,
            active: true,
            start_at: "2021-04-27T14:20:22.783Z",
            end_at: "2021-04-28T14:20:23.783Z",
          },
          {
            no: 3,
            code: "Code03",
            name: "نام امتیاز ۳",
            erp_name: "نام در ای‌آر‌پی ۳",
            group_name: "نام گروه ۳",
            limit: 8,
            min_total: "3640000",
            singularity: true,
            active: false,
            start_at: "2021-04-27T14:20:22.783Z",
            end_at: "2021-04-28T14:20:23.783Z",
          },
          {
            no: 4,
            code: "Code04",
            name: "نام امتیاز ۴",
            erp_name: "نام در ای‌آر‌پی ۴",
            group_name: "نام گروه ۴",
            limit: 2,
            min_total: "130000",
            singularity: false,
            active: false,
            start_at: "2021-04-27T14:20:22.783Z",
            end_at: "2021-04-28T14:20:23.783Z",
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
        name: this.name,
        erp_name: this.erp_name,
        group_name: this.group_name,
        limit: this.filterLimit,
        min_total: this.min_total,
        singularity: this.singularity,
        active: this.active,
        dates: this.dates,
      };
    },
    clearDateFilter(): void {
      this.dates = undefined;
      this.filterGenerate();
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
