<template>
  <v-container fluid>
    <v-breadcrumbs :items="breadcrumbs"></v-breadcrumbs>

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
      :items-per-page="14"
      class="elevation-1"
      item-key="id"
      :loading="!result"
      loading-text="در حال دریافت اطلاعات از سرور ..."
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>
            <div class="d-flex justify-start align-center">
              <h1 class="blue--text">{{ title }}</h1>
              <router-link :to="{ name: 'CreateNotification' }">
                <v-icon color="blue" large class="mr-4">mdi-plus-circle</v-icon>
              </router-link>
            </div>
          </v-toolbar-title>
        </v-toolbar>
      </template>

      <template v-slot:[`item.no`]="{ item }">
        {{ toPersianString(item.no) }}
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
    </v-data-table>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import { toPersianString } from "@/common/utils/helpers";
import { toPersianTime } from "@/common/utils/moment";

export default Vue.extend({
  data(): Record<string, unknown> {
    const title = "لیست اعلانات";
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
      toPersianString,
      toPersianTime,
    };
  },
  methods: {
    canDelete(item: Record<string, unknown>): boolean {
      return item.type !== "SMS" || item.status === 0;
    },
    deleteNotification(id: string): void {
      console.log("delete id:", id);
      // use service for delete notification with id
    },
  },
  mounted() {
    setTimeout(() => {
      this.result = true;
      this.items = [
        {
          no: 1,
          id: "43b5a165-0bb6-4e10-8aec-7eb06dfed1c2",
          title: "مشکل در ثبت سفارش با کارت  سپه",
          image: true,
          type: "SMS",
          created_at: "2020/06/11",
          sent_at: "2020/06/18",
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
          id: "43b5a165-0bb6-4e10-8aec-7eb06dfed1c2",
          title: "مشکل در ثبت سفارش با کارت  سپه",
          image: false,
          type: "PUSH",
          created_at: "2020/06/11",
          sent_at: "2020/06/18",
          status: 1,
        },
        {
          no: 4,
          id: "43b5a165-0bb6-4e10-8aec-7eb06dfed1c2",
          title: "مشکل در ثبت سفارش با کارت  سپه",
          image: false,
          type: "PUSH",
          created_at: "2020/06/11",
          sent_at: "2020/06/18",
          status: 0,
        },
        {
          no: 5,
          id: "43b5a165-0bb6-4e10-8aec-7eb06dfed1c2",
          title: "مشکل در ثبت سفارش با کارت  سپه",
          image: true,
          type: "PUSH",
          created_at: "2020/06/11",
          sent_at: "2020/06/18",
          status: 0,
        },
        {
          no: 6,
          id: "43b5a165-0bb6-4e10-8aec-7eb06dfed1c2",
          title: "مشکل در ثبت سفارش با کارت  سپه",
          image: true,
          type: "PUSH",
          created_at: "2020/06/11",
          sent_at: "2020/06/18",
          status: 1,
        },
        {
          no: 7,
          id: "43b5a165-0bb6-4e10-8aec-7eb06dfed1c2",
          title: "مشکل در ثبت سفارش با کارت  سپه",
          image: false,
          type: "PUSH",
          created_at: "2020/06/11",
          sent_at: "2020/06/18",
          status: 1,
        },
        {
          no: 8,
          id: "43b5a165-0bb6-4e10-8aec-7eb06dfed1c2",
          title: "مشکل در ثبت سفارش با کارت  سپه",
          image: false,
          type: "PUSH",
          created_at: "2020/06/11",
          sent_at: "2020/06/18",
          status: 0,
        },
        {
          no: 9,
          id: "43b5a165-0bb6-4e10-8aec-7eb06dfed1c2",
          title: "مشکل در ثبت سفارش با کارت  سپه",
          image: true,
          type: "PUSH",
          created_at: "2020/06/11",
          sent_at: "2020/06/18",
          status: 0,
        },
        {
          no: 10,
          id: "43b5a165-0bb6-4e10-8aec-7eb06dfed1c2",
          title: "مشکل در ثبت سفارش با کارت  سپه",
          image: true,
          type: "SMS",
          created_at: "2020/06/11",
          sent_at: "2020/06/18",
          status: 1,
        },
        {
          no: 11,
          id: "43b5a165-0bb6-4e10-8aec-7eb06dfed1c2",
          title: "مشکل در ثبت سفارش با کارت  سپه",
          image: false,
          type: "SMS",
          created_at: "2020/06/11",
          sent_at: "2020/06/18",
          status: 1,
        },
        {
          no: 12,
          id: "43b5a165-0bb6-4e10-8aec-7eb06dfed1c2",
          title: "مشکل در ثبت سفارش با کارت  سپه",
          image: false,
          type: "SMS",
          created_at: "2020/06/11",
          sent_at: "2020/06/18",
          status: 0,
        },
        {
          no: 13,
          id: "43b5a165-0bb6-4e10-8aec-7eb06dfed1c2",
          title: "مشکل در ثبت سفارش با کارت  سپه",
          image: false,
          type: "PUSH",
          created_at: "2020/06/11",
          sent_at: "2020/06/18",
          status: 1,
        },
        {
          no: 14,
          id: "43b5a165-0bb6-4e10-8aec-7eb06dfed1c2",
          title: "مشکل در ثبت سفارش با کارت  سپه",
          image: false,
          type: "PUSH",
          created_at: "2020/06/11",
          sent_at: "2020/06/18",
          status: 0,
        },
      ];
    }, 500);
  },
});
</script>
