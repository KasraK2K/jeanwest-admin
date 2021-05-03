<template>
  <v-container fluid>
    <v-breadcrumbs :items="breadcrumbs"></v-breadcrumbs>

    <v-data-table
      :headers="[
        { text: 'شماره', value: 'no', align: 'center' },
        { text: 'توکن', value: 'token', sortable: false },
        { text: 'درگاه', value: 'gate' },
        { text: 'وضعیت', value: 'status' },
        { text: 'مبلغ پرداختی', value: 'price' },
        { text: 'شماره تماس', value: 'mobile' },
        { text: 'تاریخ بروز‌رسانی', value: 'updated_at' },
        { text: 'نمایش', value: 'show' },
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
            <div class="d-flex justify-start align-center">
              <h1 class="blue--text">{{ title }}</h1>
            </div>
          </v-toolbar-title>
        </v-toolbar>
      </template>

      <template v-slot:[`item.show`]="{ item }">
        <v-chip color="blue" label outlined>
          <router-link
            :to="{ name: 'ShowPayment', params: { id: item.id } }"
            class="blue--text"
          >
            <v-icon>mdi-eye</v-icon>
          </router-link>
        </v-chip>
      </template>

      <template v-slot:[`item.no`]="{ item }">
        {{ toPersianString(item.no) }}
      </template>

      <template v-slot:[`item.token`]="{ item }">
        {{ item.token }}
      </template>

      <template v-slot:[`item.status`]="{ item }">
        <span :class="getStatusColor(item.status)">
          {{ getStatusText(item.status) }}
        </span>
      </template>

      <template v-slot:[`item.price`]="{ item }">
        {{ numberToCash(item.price) }}
      </template>

      <template v-slot:[`item.mobile`]="{ item }">
        {{ toPersianString(item.mobile) }}
      </template>

      <template v-slot:[`item.updated_at`]="{ item }">
        {{ toPersianString(toPersianTime(item.updated_at)) }}
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
    const title = "لیست پرداخت‌ها";
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
      setTimeout(() => {
        this.result = true;
        this.items = [
          {
            no: 1,
            id: "43b5a165-0bb6-4e10-8aec-7eb06dfed1c1",
            gate: "زرین‌پال",
            status: 0, // در حال انجام
            token: "‌B54008831",
            price: 1389000,
            mobile: "09111111111",
            updated_at: "2021-04-28T14:20:22.783Z",
          },
          {
            no: 2,
            id: "43b5a165-0bb6-4e10-7eb06dfed1c2-8ae2",
            gate: "زرین‌پال",
            status: 1, // تکمیل شده
            token: "‌B54008832",
            price: 198000,
            mobile: "09111111112",
            updated_at: "2021-04-28T14:20:22.783Z",
          },
          {
            no: 3,
            id: "43b5a165-0bb6-7eb06dfed1c2-8aec-4e13",
            gate: "زرین‌پال",
            status: 1, // مرجوعی
            token: "‌B54008833",
            price: 2499000,
            mobile: "09111111113",
            updated_at: "2021-04-28T14:20:22.783Z",
          },
          {
            no: 4,
            id: "43b5a165-0bb6-4e10-8aec-7eb06dfed1c4",
            gate: "سامان",
            status: 0, // در حال انجام
            token: "‌B54008834",
            price: 460000,
            mobile: "09111111114",
            updated_at: "2021-04-28T14:20:22.783Z",
          },
          {
            no: 5,
            id: "43b5a165-0bb6-4e10-7eb06dfed1c2-8ae5",
            gate: "سامان",
            status: 1, // تکمیل شده
            token: "‌B54008835",
            price: 12000,
            mobile: "09111111115",
            updated_at: "2021-04-28T14:20:22.783Z",
          },
          {
            no: 6,
            id: "43b5a165-0bb6-7eb06dfed1c2-8aec-4e16",
            gate: "سامان",
            status: 1, // مرجوعی
            token: "‌B54008836",
            price: 48000,
            mobile: "09111111116",
            updated_at: "2021-04-28T14:20:22.783Z",
          },
        ];
      }, 500);
      console.log(`getList: { page: ${page}, limit: ${limit} }`);
    },
    getStatusText(status: number): string | undefined {
      const allStatus = new Map([
        [0, "پرداخت نشده"],
        [1, "پرداخت شده"],
      ]);
      return allStatus.get(status);
    },
    getStatusColor(status: number): string | undefined {
      const allStatus = new Map([
        [0, "red--text"],
        [1, "green--text"],
      ]);
      return allStatus.get(status);
    },
  },
  mounted(): void {
    this.getList(this.page, this.itemsPerPage);
  },
});
</script>
