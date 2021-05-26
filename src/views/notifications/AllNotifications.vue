<template>
  <v-container fluid>
    <v-breadcrumbs :items="breadcrumbs" class="mb-3"></v-breadcrumbs>

    <!-- ------------------------------------------------------------------------ */
    /*                                START: Filter                               */
    ---------------------------------------------------------------------------- -->
    <v-card class="mb-8" elevation="1" outlined rounded>
      <v-card-title class="blue--text">فیلتر {{ title }}</v-card-title>
      <v-row class="mx-4">
        <v-col class="col-12 col-md-3">
          <v-select
            label="نوع"
            v-model="type"
            :items="[
              { text: 'پیامک', value: 'SMS' },
              { text: 'اعلان', value: 'PUSH' },
            ]"
            item-text="text"
            item-value="value"
            @change="filterGenerate({ page: 1 })"
            outlined
            hide-details="auto"
          ></v-select>
        </v-col>

        <v-col class="col-12 col-md-3">
          <v-select
            label="وضعیت"
            v-model="status"
            :items="[
              { text: 'ارسال شده', value: 1 },
              { text: 'ارسال نشده', value: 0 },
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
                label="تاریخ ایجاد یا ارسال"
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
    <!-- { text: 'زمان ارسال', value: 'sent_at' }, -->
    <!-- { text: 'آیدی', value: 'id', align: 'start', sortable: false }, -->
    <v-data-table
      :headers="[
        { text: 'شماره', value: 'no', align: 'center' },
        { text: 'عنوان', value: 'title', sortable: false },
        { text: 'نوع', value: 'type' },
        { text: 'زمان ایجاد', value: 'created_at' },
        { text: 'زمان بروزرسانی', value: 'updated_at' },
        { text: 'گزینه‌ها', value: 'status', align: 'center', sortable: false },
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
      <!-- @page-count="console.log($event)" -->
      <template v-slot:top>
        <v-row>
          <v-col sm="12" md="9">
            <v-toolbar flat>
              <v-toolbar-title>
                <div class="d-flex justify-start align-center">
                  <h1 class="blue--text">{{ title }}</h1>
                  <v-divider vertical class="mx-4"></v-divider>
                  <router-link :to="{ name: 'CreateNotification' }">
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

      <template v-slot:[`item.type`]="{ item }">
        <span :class="item.type === 'SMS' ? 'purple--text' : 'indigo--text'">
          {{ item.type === "SMS" ? "پیامک" : "اعلان" }}
        </span>
      </template>

      <template v-slot:[`item.created_at`]="{ item }">
        {{ toPersianString(toPersianTime(item.datetime.created_at)) }}
      </template>

      <template v-slot:[`item.updated_at`]="{ item }">
        {{ toPersianString(toPersianTime(item.datetime.updated_at)) }}
      </template>

      <!-- <template v-slot:[`item.sent_at`]="{ item }">
        {{ toPersianString(toPersianTime(item.sent_at)) }}
      </template> -->

      <template v-slot:[`item.status`]="{ item }">
        <!-- edit -->
        <v-chip
          v-if="canDelete(item)"
          class="ml-2"
          color="blue"
          link
          label
          outlined
          close
          close-icon="mdi-square-edit-outline"
          @click:close="
            $router.push({ name: 'EditNotification', params: { id: item.id } })
          "
          :to="{ name: 'EditNotification', params: { id: item.id } }"
        >
          ویرایش
        </v-chip>

        <!-- delete -->
        <v-chip
          v-if="canDelete(item)"
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
import NotificationService from "@/services/Notification.service";

export default Vue.extend({
  data(): {
    [key: string]: unknown;
    page: number;
    pageCount: number;
    limit: number;
    filter: Record<string, unknown>;
  } {
    const title = "لیست اعلانات";
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
      type: undefined,
      status: undefined,
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
      NotificationService.getList(this.filter).then((response) => {
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

        // type: this.type,
        // status: this.status,
        // dates: this.dates,
      };
    },
    clearDateFilter() {
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
    this.getList();
  },
});
</script>
