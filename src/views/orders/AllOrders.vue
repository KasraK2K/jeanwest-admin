<template>
  <v-container fluid>
    <v-breadcrumbs :items="breadcrumbs"></v-breadcrumbs>

    <v-data-table
      :headers="[
        { text: 'شماره', value: 'no' },
        { text: 'کد', value: 'code', sortable: false },
        { text: 'نوع', value: 'type', sortable: false },
        { text: 'وضعیت', value: 'status' },
        { text: 'مبلغ پرداختی', value: 'price' },
        { text: 'تعداد کالا', value: 'count' },
        { text: 'نمایش', value: 'show' },
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
            </div>
          </v-toolbar-title>
        </v-toolbar>
      </template>

      <template v-slot:[`item.show`]="{ item }">
        <v-chip color="blue" label outlined>
          <router-link
            :to="{ name: 'ShowOrder', params: { id: item.id } }"
            class="blue--text"
          >
            <v-icon>mdi-eye</v-icon>
          </router-link>
        </v-chip>
      </template>

      <template v-slot:[`item.status`]="{ item }">
        <span :class="getStatusColor(item.status)">
          {{ getStatusText(item.status) }}
        </span>
      </template>

      <!-- <template v-slot:[`item.type`]="{ item }">
        <span :class="item.type === 'SMS' ? 'purple--text' : 'indigo--text'">
          {{ item.type === "SMS" ? "پیامک" : "اعلان" }}
        </span>
      </template> -->
    </v-data-table>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  data(): Record<string, unknown> {
    const title = "لیست سفارشات";
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
  methods: {
    getStatusText(status: number): string | undefined {
      const allStatus = new Map([
        [0, "در حال انجام"],
        [1, "تکمیل شده"],
        [2, "مرجوعی"],
      ]);
      return allStatus.get(status);
    },
    getStatusColor(status: number): string | undefined {
      const allStatus = new Map([
        [0, "blue--text"],
        [1, "green--text"],
        [2, "red--text"],
      ]);
      return allStatus.get(status);
    },
  },
  mounted() {
    setTimeout(() => {
      this.result = true;
      this.items = [
        {
          no: 1,
          id: "43b5a165-0bb6-4e10-8aec-7eb06dfed1c2",
          type: "آنلاین",
          status: 0, // در حال انجام
          code: "‌B54008831",
          price: 1389000,
          count: 7,
        },
        {
          no: 2,
          id: "43b5a165-0bb6-4e10-7eb06dfed1c2-8aec",
          type: "آنلاین",
          status: 1, // تکمیل شده
          code: "‌B54008832",
          price: 198000,
          count: 6,
        },
        {
          no: 3,
          id: "43b5a165-0bb6-7eb06dfed1c2-8aec-4e10",
          type: "آنلاین",
          status: 2, // مرجوعی
          code: "‌B54008833",
          price: 2499000,
          count: 5,
        },
        {
          no: 4,
          id: "43b5a165-0bb6-4e10-8aec-7eb06dfed1c2",
          type: "غیر آنلاین",
          status: 0, // در حال انجام
          code: "‌B54008834",
          price: 460000,
          count: 4,
        },
        {
          no: 5,
          id: "43b5a165-0bb6-4e10-7eb06dfed1c2-8aec",
          type: "غیر آنلاین",
          status: 1, // تکمیل شده
          code: "‌B54008835",
          price: 12000,
          count: 3,
        },
        {
          no: 6,
          id: "43b5a165-0bb6-7eb06dfed1c2-8aec-4e10",
          type: "غیر آنلاین",
          status: 2, // مرجوعی
          code: "‌B54008836",
          price: 48000,
          count: 2,
        },
      ];
    }, 2000);
  },
});
</script>
