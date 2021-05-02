<template>
  <v-container fluid>
    <v-breadcrumbs :items="breadcrumbs"></v-breadcrumbs>

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
      :items-per-page="14"
      class="elevation-1"
      item-key="id"
      :loading="!result"
      loading-text="در حال دریافت اطلاعات از سرور ..."
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
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  data(): Record<string, unknown> {
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
    };
  },
  mounted(): void {
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
          id: "43b5a236-0bb8-4e11-8aed-7eb06dfed1c4",
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
          id: "43b5a236-0bb8-4e11-8aed-7eb06dfed1c4",
          title: "لباس خریدم نمیدید چرا",
          code: "TCK-FC55698",
          date: "2020/06/10",
          status: 1,
        },
        {
          no: 5,
          id: "43b5a236-0bb8-4e11-8aed-7eb06dfed1c4",
          title: "لباس خریدم نمیدید چرا",
          code: "TCK-FC55698",
          date: "2020/06/10",
          status: 1,
        },
        {
          no: 6,
          id: "43b5a236-0bb8-4e11-8aed-7eb06dfed1c4",
          title: "لباس خریدم نمیدید چرا",
          code: "TCK-FC55698",
          date: "2020/06/10",
          status: 1,
        },
        {
          no: 7,
          id: "43b5a236-0bb8-4e11-8aed-7eb06dfed1c4",
          title: "لباس خریدم نمیدید چرا",
          code: "TCK-FC55698",
          date: "2020/06/10",
          status: 1,
        },
        {
          no: 8,
          id: "43b5a236-0bb8-4e11-8aed-7eb06dfed1c4",
          title: "لباس خریدم نمیدید چرا",
          code: "TCK-FC55698",
          date: "2020/06/10",
          status: 1,
        },
        {
          no: 9,
          id: "43b5a236-0bb8-4e11-8aed-7eb06dfed1c4",
          title: "لباس خریدم نمیدید چرا",
          code: "TCK-FC55698",
          date: "2020/06/10",
          status: 1,
        },
        {
          no: 10,
          id: "43b5a236-0bb8-4e11-8aed-7eb06dfed1c4",
          title: "لباس خریدم نمیدید چرا",
          code: "TCK-FC55698",
          date: "2020/06/10",
          status: 1,
        },
        {
          no: 11,
          id: "43b5a165-0bb6-4e10-8aec-7eb06dfed1c2",
          title: "مشکل در ثبت سفارش با کارت  سپه",
          code: "TCK-XA66854",
          date: "2020/06/11",
          status: 0,
        },
        {
          no: 12,
          id: "43b5a236-0bb8-4e11-8aed-7eb06dfed1c4",
          title: "لباس خریدم نمیدید چرا",
          code: "TCK-FC55698",
          date: "2020/06/10",
          status: 1,
        },
        {
          no: 13,
          id: "43b5a236-0bb8-4e11-8aed-7eb06dfed1c4",
          title: "لباس خریدم نمیدید چرا",
          code: "TCK-FC55698",
          date: "2020/06/10",
          status: 1,
        },
        {
          no: 14,
          id: "43b5a236-0bb8-4e11-8aed-7eb06dfed1c4",
          title: "لباس خریدم نمیدید چرا",
          code: "TCK-FC55698",
          date: "2020/06/10",
          status: 1,
        },
        {
          no: 15,
          id: "43b5a236-0bb8-4e11-8aed-7eb06dfed1c4",
          title: "لباس خریدم نمیدید چرا",
          code: "TCK-FC55698",
          date: "2020/06/10",
          status: 1,
        },
        {
          no: 16,
          id: "43b5a236-0bb8-4e11-8aed-7eb06dfed1c4",
          title: "لباس خریدم نمیدید چرا",
          code: "TCK-FC55698",
          date: "2020/06/10",
          status: 1,
        },
        {
          no: 17,
          id: "43b5a236-0bb8-4e11-8aed-7eb06dfed1c4",
          title: "لباس خریدم نمیدید چرا",
          code: "TCK-FC55698",
          date: "2020/06/10",
          status: 1,
        },
        {
          no: 18,
          id: "43b5a236-0bb8-4e11-8aed-7eb06dfed1c4",
          title: "لباس خریدم نمیدید چرا",
          code: "TCK-FC55698",
          date: "2020/06/10",
          status: 1,
        },
        {
          no: 19,
          id: "43b5a236-0bb8-4e11-8aed-7eb06dfed1c4",
          title: "لباس خریدم نمیدید چرا",
          code: "TCK-FC55698",
          date: "2020/06/10",
          status: 1,
        },
        {
          no: 20,
          id: "43b5a236-0bb8-4e11-8aed-7eb06dfed1c4",
          title: "لباس خریدم نمیدید چرا",
          code: "TCK-FC55698",
          date: "2020/06/10",
          status: 1,
        },
      ];
    }, 500);
  },
});
</script>
