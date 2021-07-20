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
            placeholder="لطفا کد پیشنهاد را وارد کنید."
            v-model="code"
            @change="paginateGenerator()"
            outlined
            hide-details="auto"
            clearable
          ></v-text-field>
        </v-col>

        <v-col class="col-12 col-md-3">
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
            clearable
          ></v-autocomplete>
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
                disabled
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
                  <router-link :to="{ name: 'CreateGroup' }">
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
          <span>{{ item.target }}</span>
        </v-tooltip>
      </template>

      <template v-slot:[`item.datetime.created_at`]="{ item }">
        {{ toPersianString(toPersianTime(item.datetime.created_at)) }}
      </template>

      <template v-slot:[`item.datetime.updated_at`]="{ item }">
        {{ toPersianString(toPersianTime(item.datetime.updated_at)) }}
      </template>

      <template v-slot:[`item.options`]="{ item }">
        <!-- active/deactive -->
        <v-chip
          class="ml-2"
          :color="item.active ? 'yellow' : 'green'"
          link
          label
          outlined
          close
          :close-icon="
            item.active ? 'mdi-toggle-switch-off' : 'mdi-toggle-switch'
          "
          @click:close="toggleActivation(item.id, item.active)"
          @click="toggleActivation(item.id, item.active)"
        >
          {{ item.active ? "غیر فعال" : "فعال" }}
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
          @click:close="$router.push({ path: 'editGroup' })"
          :to="{ path: 'editGroup' }"
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
          @click:close="deleteNotification(item.id)"
          @click="deleteNotification(item.id)"
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
          @click:close="restoreNotification(item.id)"
          @click="restoreNotification(item.id)"
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
    const title = "لیست گروه‌ها";
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
      active: undefined,
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
      PromotionService.getGroupList(this.pagination).then((response) => {
        const data = response.data.data;
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
        active: { eq: this.active },
      };
      this.pagination = paginationGenerator(options, filters);
    },
    clearDateFilter(): void {
      this.dates = undefined;
      this.paginateGenerator();
    },
    toggleActivation(id: string, active: boolean): void {
      PromotionService.editGroup({ id, active: !active }).then(() =>
        this.getList()
      );
    },
    deleteNotification(id: string): void {
      PromotionService.groupSoftDelete(id).then(() => this.getList());
    },
    restoreNotification(id: string): void {
      // PromotionService.restore(id).then(() => this.getList());
      console.log(`restore: ${id}`);
    },
  },
  mounted(): void {
    this.getList();
  },
});
</script>
