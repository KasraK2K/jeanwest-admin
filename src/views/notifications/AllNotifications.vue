<template>
  <v-container fluid>
    <v-breadcrumbs :items="breadcrumbs" class="mb-3"></v-breadcrumbs>

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
            type: "آنلاین",
            status: 0, // در حال انجام
            code: "‌B54008831",
            price: 1389000,
            mobile: "09111111111",
            count: 7,
          },
          {
            no: 2,
            id: "43b5a165-0bb6-4e10-7eb06dfed1c2-8ae2",
            type: "آنلاین",
            status: 1, // تکمیل شده
            code: "‌B54008832",
            price: 198000,
            mobile: "09111111112",
            count: 6,
          },
          {
            no: 3,
            id: "43b5a165-0bb6-7eb06dfed1c2-8aec-4e13",
            type: "آنلاین",
            status: 2, // مرجوعی
            code: "‌B54008833",
            price: 2499000,
            mobile: "09111111113",
            count: 5,
          },
          {
            no: 4,
            id: "43b5a165-0bb6-4e10-8aec-7eb06dfed1c4",
            type: "غیر آنلاین",
            status: 0, // در حال انجام
            code: "‌B54008834",
            price: 460000,
            mobile: "09111111114",
            count: 4,
          },
          {
            no: 5,
            id: "43b5a165-0bb6-4e10-7eb06dfed1c2-8ae5",
            type: "غیر آنلاین",
            status: 1, // تکمیل شده
            code: "‌B54008835",
            price: 12000,
            mobile: "09111111115",
            count: 3,
          },
          {
            no: 6,
            id: "43b5a165-0bb6-7eb06dfed1c2-8aec-4e16",
            type: "غیر آنلاین",
            status: 2, // مرجوعی
            code: "‌B54008836",
            price: 48000,
            mobile: "09111111116",
            count: 2,
          },
        ];
      }, 500);
      console.log(`getList: { page: ${page}, limit: ${limit} }`);
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
    this.getList(this.page, this.itemsPerPage);
  },
});
</script>
