<template>
  <v-container fluid>
    <v-breadcrumbs :items="breadcrumbs" class="mb-3"></v-breadcrumbs>

    <!-- ------------------------------------------------------------------------ */
    /*                                START: Filter                               */
    ---------------------------------------------------------------------------- -->
    <v-card class="mb-8">
      <v-card-title class="blue--text">فیلتر {{ title }}</v-card-title>
      <v-row class="mx-4">
        <v-col sm="12" md="4">
          <v-select
            label="تصویر"
            v-model="image"
            :items="[
              { text: 'دارد', value: 1 },
              { text: 'ندارد', value: 0 },
            ]"
            item-text="text"
            item-value="value"
            @change="filterGenerate()"
            outlined
          ></v-select>
        </v-col>

        <v-col sm="12" md="4">
          <v-select
            label="نوع"
            v-model="type"
            :items="[
              { text: 'پیامک', value: 'SMS' },
              { text: 'اعلان', value: 'PUSH' },
            ]"
            item-text="text"
            item-value="value"
            @change="filterGenerate()"
            outlined
          ></v-select>
        </v-col>

        <v-col sm="12" md="4">
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
          ></v-select>
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
        { text: 'آیدی', value: 'id', align: 'start', sortable: false },
        { text: 'عنوان', value: 'title', sortable: false },
        { text: 'تصویر', value: 'image' },
        { text: 'نوع', value: 'type' },
        { text: 'زمان ایجاد', value: 'created_at' },
        { text: 'زمان ارسال', value: 'sent_at' },
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
                  <router-link :to="{ name: 'CreateNotification' }">
                    <v-icon color="blue" large class="mr-4"
                      >mdi-plus-circle</v-icon
                    >
                  </router-link>
                </div>
              </v-toolbar-title>
            </v-toolbar>
          </v-col>

          <v-col sm="12" md="3">
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

      <template v-slot:[`item.image`]="{ item }">
        <span :class="item.image ? 'green--text' : 'red--text'">
          {{ item.image ? "دارد" : "ندارد" }}
        </span>
      </template>

      <template v-slot:[`item.type`]="{ item }">
        <span :class="item.type === 'SMS' ? 'purple--text' : 'indigo--text'">
          {{ item.type === "SMS" ? "پیامک" : "اعلان" }}
        </span>
      </template>

      <template v-slot:[`item.created_at`]="{ item }">
        {{ toPersianString(toPersianTime(item.created_at)) }}
      </template>

      <template v-slot:[`item.sent_at`]="{ item }">
        {{ toPersianString(toPersianTime(item.sent_at)) }}
      </template>

      <template v-slot:[`item.status`]="{ item }">
        <!-- edit -->
        <v-chip v-if="canDelete(item)" class="ml-2" color="blue" label outlined>
          <router-link
            :to="{ name: 'EditNotification', params: { id: item.id } }"
            class="blue--text"
          >
            <v-icon>mdi-square-edit-outline</v-icon>
          </router-link>
        </v-chip>
        <!-- delete -->
        <v-chip v-if="canDelete(item)" color="red" label outlined>
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
      pageCount: 0,
      limit: 10,
      // filter
      image: undefined,
      type: undefined,
      status: undefined,
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
            id: "43b5a165-0bb6-4e10-8aec-7eb06dfed1c1",
            title: "مشکل در ثبت سفارش با کارت  سپه",
            image: true,
            type: "SMS",
            created_at: "2021-04-27T14:20:22.783Z",
            sent_at: "2021-04-28T14:20:22.783Z",
            status: 0,
          },
          {
            no: 2,
            id: "43b5a165-0bb6-4e10-8aec-7eb06dfed1c2",
            title: "مشکل در ثبت سفارش با کارت  سپه",
            image: true,
            type: "SMS",
            created_at: "2020/06/11",
            sent_at: "2020/06/18",
            status: 1,
          },
          {
            no: 3,
            id: "43b5a165-0bb6-4e10-8aec-7eb06dfed1c3",
            title: "مشکل در ثبت سفارش با کارت  سپه",
            image: false,
            type: "PUSH",
            created_at: "2020/06/11",
            sent_at: "2020/06/18",
            status: 1,
          },
          {
            no: 4,
            id: "43b5a165-0bb6-4e10-8aec-7eb06dfed1c4",
            title: "مشکل در ثبت سفارش با کارت  سپه",
            image: false,
            type: "PUSH",
            created_at: "2020/06/11",
            sent_at: "2020/06/18",
            status: 0,
          },
          {
            no: 5,
            id: "43b5a165-0bb6-4e10-8aec-7eb06dfed1c5",
            title: "مشکل در ثبت سفارش با کارت  سپه",
            image: true,
            type: "PUSH",
            created_at: "2020/06/11",
            sent_at: "2020/06/18",
            status: 0,
          },
          {
            no: 6,
            id: "43b5a165-0bb6-4e10-8aec-7eb06dfed1c6",
            title: "مشکل در ثبت سفارش با کارت  سپه",
            image: true,
            type: "PUSH",
            created_at: "2020/06/11",
            sent_at: "2020/06/18",
            status: 1,
          },
          {
            no: 7,
            id: "43b5a165-0bb6-4e10-8aec-7eb06dfed1c7",
            title: "مشکل در ثبت سفارش با کارت  سپه",
            image: false,
            type: "PUSH",
            created_at: "2020/06/11",
            sent_at: "2020/06/18",
            status: 1,
          },
          {
            no: 8,
            id: "43b5a165-0bb6-4e10-8aec-7eb06dfed1c8",
            title: "مشکل در ثبت سفارش با کارت  سپه",
            image: false,
            type: "PUSH",
            created_at: "2020/06/11",
            sent_at: "2020/06/18",
            status: 0,
          },
          {
            no: 9,
            id: "43b5a165-0bb6-4e10-8aec-7eb06dfed1c9",
            title: "مشکل در ثبت سفارش با کارت  سپه",
            image: true,
            type: "SMS",
            created_at: "2020/06/11",
            sent_at: "2020/06/18",
            status: 1,
          },
          {
            no: 10,
            id: "43b5a165-0bb6-4e10-8aec-7eb06dfed110",
            title: "مشکل در ثبت سفارش با کارت  سپه",
            image: true,
            type: "SMS",
            created_at: "2020/06/11",
            sent_at: "2020/06/18",
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
    filterGenerate() {
      this.filter = {
        image: this.image,
        type: this.type,
        status: this.status,
      };
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
