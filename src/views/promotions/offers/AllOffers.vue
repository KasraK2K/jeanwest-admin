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
            placeholder="لطفا کد پیشنهاد را وارد کنید."
            v-model="code"
            @change="paginateGenerator()"
            outlined
            hide-details="auto"
          ></v-text-field>
        </v-col>

        <v-col class="col-12 col-md-4">
          <v-text-field
            label="نام"
            placeholder="لطفا نام پیشنهاد را وارد کنید."
            v-model="name"
            @change="paginateGenerator()"
            outlined
            hide-details="auto"
          ></v-text-field>
        </v-col>

        <v-col class="col-12 col-md-4">
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
            hide-details="auto"
          ></v-autocomplete>
        </v-col>

        <v-col class="col-12 col-md-4">
          <v-text-field
            label="گروه هدف"
            placeholder="لطفا گروه هدف را وارد کنید."
            v-model="target_group"
            @change="paginateGenerator()"
            outlined
            hide-details="auto"
          ></v-text-field>
        </v-col>

        <v-col class="col-12 col-md-4">
          <v-text-field
            label="گروه پیشنهاد"
            placeholder="لطفا گروه پیشنهاد را وارد کنید."
            v-model="trigger_group"
            @change="paginateGenerator()"
            outlined
            hide-details="auto"
          ></v-text-field>
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
    <v-data-table
      :headers="[
        { text: 'شماره', value: 'no', align: 'center' },
        { text: 'کد', value: 'code' },
        { text: 'نام', value: 'name' },
        { text: 'گروه هدف', value: 'target_group' },
        { text: 'گروه پیشنهاد', value: 'trigger_group' },
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
          <v-col cols="12" md="9">
            <v-toolbar flat>
              <v-toolbar-title>
                <div class="d-flex justify-start align-center">
                  <h1 class="blue--text">{{ title }}</h1>
                  <v-divider vertical class="mx-4"></v-divider>
                  <router-link to="/createOffer">
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
        <v-tooltip
          top
          :color="item.active ? 'green' : 'pink'"
          :open-on-hover="false"
          :open-on-click="true"
        >
          <template v-slot:activator="{ on, attrs }">
            <span
              :class="item.active ? 'green--text' : 'pink--text'"
              v-bind="attrs"
              v-on="on"
            >
              {{ item.code }}
            </span>
          </template>
          <span>{{ item.filter }}</span>
        </v-tooltip>
      </template>

      <template v-slot:[`item.start_at`]="{ item }">
        {{ toPersianString(toPersianTime(item.start_at)) }}
      </template>

      <template v-slot:[`item.end_at`]="{ item }">
        {{ toPersianString(toPersianTime(item.end_at)) }}
      </template>

      <template v-slot:[`item.options`]="{ item }">
        <!-- group -->
        <v-chip
          class="ml-2"
          color="yellow"
          link
          label
          outlined
          close
          close-icon="mdi-square-edit-outline"
          @click:close="$router.push({ path: 'editOffer' })"
          :to="{ path: 'editOffer' }"
        >
          گروه
        </v-chip>

        <!-- edit -->
        <v-chip
          class="ml-2"
          color="blue"
          link
          label
          outlined
          close
          close-icon="mdi-square-edit-outline"
          @click:close="$router.push({ path: 'editOffer' })"
          :to="{ path: 'editOffer' }"
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
      pageCount: 1,
      limit: 10,
      // filter
      code: undefined,
      name: undefined,
      active: undefined,
      target_group: undefined,
      trigger_group: undefined,
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
            name: "نام پیشنهاد ۱",
            active: true,
            target_group: "TargetG-01",
            trigger_group: "TriggerG-01",
            start_at: "2021-04-27T14:20:22.783Z",
            end_at: "2021-04-28T14:20:23.783Z",
            filter: { target: "some target", trigger: "some trigger" },
          },
          {
            no: 2,
            code: "Code02",
            name: "نام پیشنهاد ۲",
            active: false,
            target_group: "TargetG-02",
            trigger_group: "TriggerG-02",
            start_at: "2021-04-27T14:20:23.783Z",
            end_at: "2021-04-28T14:20:24.783Z",
            filter: { target: "some target", trigger: "some trigger" },
          },
          {
            no: 3,
            code: "Code03",
            name: "نام پیشنهاد ۳",
            active: false,
            target_group: "TargetG-03",
            trigger_group: "TriggerG-03",
            start_at: "2021-04-27T14:20:24.783Z",
            end_at: "2021-04-28T14:20:25.783Z",
            filter: { target: "some target", trigger: "some trigger" },
          },
          {
            no: 4,
            code: "Code04",
            name: "نام پیشنهاد ۴",
            active: true,
            target_group: "TargetG-04",
            trigger_group: "TriggerG-04",
            start_at: "2021-04-27T14:20:25.783Z",
            end_at: "2021-04-28T14:20:26.783Z",
            filter: { target: "some target", trigger: "some trigger" },
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
    paginateGenerator(): void {
      this.filter = {
        code: this.code,
        name: this.name,
        active: this.active,
        target_group: this.target_group,
        trigger_group: this.trigger_group,
        dates: this.dates,
      };
    },
    clearDateFilter(): void {
      this.dates = undefined;
      this.paginateGenerator();
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
