<template>
  <v-container fluid>
    <v-breadcrumbs :items="breadcrumbs" class="mb-3"></v-breadcrumbs>

    <div>
      <v-data-table
        :headers="[
          { text: 'شماره', value: 'no', align: 'center' },
          { text: 'آیدی', value: 'id', align: 'start', sortable: false },
          { text: 'عنوان', value: 'title', sortable: false },
          { text: 'کد', value: 'code' },
          { text: 'زمان ایجاد', value: 'date' },
          { text: 'وضعیت', value: 'status', align: 'center' },
        ]"
        :items="items"
        class="elevation-1"
        item-key="id"
        :loading="!result"
        loading-text="در حال دریافت اطلاعات از سرور ..."
        :page.sync="page"
        :items-per-page="itemsPerPage"
        hide-default-footer
        @page-count="pageCount = $event"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>
              <h1 class="blue--text">{{ title }}</h1>
            </v-toolbar-title>
          </v-toolbar>
        </template>

        <template v-slot:[`item.no`]="{ item }">
          {{ toPersianString(item.no) }}
        </template>

        <template v-slot:[`item.status`]="{ item }">
          <v-chip :color="item.status ? 'blue' : 'red'" label outlined>
            <router-link
              :to="{ name: 'ShowTicket', params: { id: item.id } }"
              :class="item.status ? 'blue--text' : 'red--text'"
            >
              {{ item.status ? "پاسخ داده شده" : "در انتظار پاسخ" }}
            </router-link>
          </v-chip>
        </template>

        <template v-slot:[`item.code`]="{ item }">
          {{ toPersianString(item.code) }}
        </template>

        <template v-slot:[`item.date`]="{ item }">
          {{ toPersianString(toPersianTime(item.date)) }}
        </template>
      </v-data-table>
      <div class="d-flex align-center justify-space-between pt-3">
        <v-pagination
          v-model="page"
          :length="pageCount"
          :total-visible="10"
          @input="getList($event)"
        ></v-pagination>
        <v-text-field
          style="max-width: 250px"
          :value="itemsPerPage"
          label="آیتم در هر صفحه"
          type="number"
          min="-1"
          max="15"
          @input="itemsPerPage = parseInt($event, 10)"
        ></v-text-field>
      </div>
    </div>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  data(): {
    [key: string]: unknown;
    page: number;
    pageCount: number;
    itemsPerPage: number;
  } {
    const title = "لیست تیکت‌ها";
    return {
      title,
      result: false,
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
      // pagination
      page: 1,
      pageCount: 0,
      itemsPerPage: 10,
    };
  },
  methods: {
    getList(page: number, limit: number): void {
      setTimeout((): void => {
        this.result = true;
        this.items = [
          {
            no: 1,
            id: "43b5a165-0bb6-4e10-8aec-7eb06dfed1c2",
            title: "مشکل در ثبت سفارش با کارت  سپه",
            code: "TCK-XA66854",
            date: "2020/06/11",
            status: 0,
          },
          {
            no: 2,
            id: "43b5a236-0bb8-4e11-8aed-7eb06dfed1c3",
            title: "لباس خریدم نمیدید چرا",
            code: "TCK-FC55698",
            date: "2020/06/10",
            status: 1,
          },
          {
            no: 3,
            id: "43b5a236-0bb8-4e11-8aed-7eb06dfed1c4",
            title: "لباس خریدم نمیدید چرا",
            code: "TCK-FC55698",
            date: "2020/06/10",
            status: 1,
          },
          {
            no: 4,
            id: "43b5a236-0bb8-4e11-8aed-7eb06dfed1c5",
            title: "لباس خریدم نمیدید چرا",
            code: "TCK-FC55698",
            date: "2020/06/10",
            status: 1,
          },
          {
            no: 5,
            id: "43b5a236-0bb8-4e11-8aed-7eb06dfed1c6",
            title: "لباس خریدم نمیدید چرا",
            code: "TCK-FC55698",
            date: "2020/06/10",
            status: 1,
          },
          {
            no: 6,
            id: "43b5a236-0bb8-4e11-8aed-7eb06dfed1c7",
            title: "لباس خریدم نمیدید چرا",
            code: "TCK-FC55698",
            date: "2020/06/10",
            status: 1,
          },
          {
            no: 7,
            id: "43b5a236-0bb8-4e11-8aed-7eb06dfed1c8",
            title: "لباس خریدم نمیدید چرا",
            code: "TCK-FC55698",
            date: "2020/06/10",
            status: 1,
          },
          {
            no: 8,
            id: "43b5a236-0bb8-4e11-8aed-7eb06dfed1c9",
            title: "لباس خریدم نمیدید چرا",
            code: "TCK-FC55698",
            date: "2020/06/10",
            status: 1,
          },
          {
            no: 9,
            id: "43b5a236-0bb8-4e11-8aed-7eb06dfed110",
            title: "لباس خریدم نمیدید چرا",
            code: "TCK-FC55698",
            date: "2020/06/10",
            status: 1,
          },
          {
            no: 10,
            id: "43b5a236-0bb8-4e11-8aed-7eb06dfed111",
            title: "لباس خریدم نمیدید چرا",
            code: "TCK-FC55698",
            date: "2020/06/10",
            status: 1,
          },
        ];
      }, 500);
      console.log(`getList: { page: ${page}, limit: ${limit} }`);
    },
  },
  mounted(): void {
    this.getList(this.page, this.itemsPerPage);
  },
});
</script>
