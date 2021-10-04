<template>
  <v-container fluid>
    <v-breadcrumbs :items="breadcrumbs" class="mb-3"></v-breadcrumbs>

    <!-- ------------------------------------------------------------------------ */
    /*                                START: Filter                               */
    ---------------------------------------------------------------------------- -->
    <!-- <v-card class="mb-8" elevation="1" outlined rounded>
      <v-card-title class="blue--text">فیلتر {{ title }}</v-card-title>
      <v-row class="mx-4">
        <v-col class="col-12 col-md-3">
          <v-autocomplete
            label="نوع"
            v-model="type"
            :items="[
              { text: 'پیامک', value: 'SMS' },
              { text: 'اعلان', value: 'PUSH' },
            ]"
            item-text="text"
            item-value="value"
            @change="paginateGenerator({ page: 1 })"
            outlined
            hide-details="auto"
          ></v-autocomplete>
        </v-col>

        <v-col class="col-12 col-md-3">
          <v-autocomplete
            label="وضعیت"
            v-model="pagination.filter.active.eq"
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

        <v-col class="col-12 col-md-3">
          <v-menu
            ref="datesMenu"
            v-model="datesMenu"
            :close-on-content-click="false"
            :nudge-top="20"
            transition="scale-transition"
            offset-y
            min-width="auto"
            :close-on-content-click="false"
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
              multiple
              @change="paginateGenerator()"
            ></v-date-picker>
          </v-menu>
        </v-col>
      </v-row>
    </v-card> -->
    <!-- ----------------------------- END: Filter ----------------------------- -->

    <!-- ------------------------------------------------------------------------ */
    /*                                 START: List                                */
    /* ------------------------------------------------------------------------- -->
    <!-- { text: 'زمان ارسال', value: 'sent_at' }, -->
    <!-- { text: 'آیدی', value: 'id', align: 'start', sortable: false }, -->
    <v-data-table
      :headers="[
        { text: 'شماره', value: 'no', align: 'center' },
        { text: 'کد', value: 'code', sortable: false },
        { text: 'جنسیت', value: 'gender' },
        { text: 'نام', value: 'firstName' },
        { text: 'نام خانوادگی', value: 'lastName' },
        { text: 'موبایل', value: 'phoneNumber' },
        { text: 'سطح عضویت', value: 'erpCustomerType' },
        { text: 'آخرین ورود', value: 'loggedInAt' },
        {
          text: 'پیام',
          value: 'sendMessage',
          align: 'center',
          sortable: false,
        },
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
      <template v-slot:top>
        <v-row>
          <v-col cols="12" md="9">
            <v-toolbar flat>
              <v-toolbar-title>
                <h1 class="blue--text">{{ title }}</h1>
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
        <span :class="[item.active] ? 'green--text' : 'pink--text'">
          {{ item.code }}
        </span>
      </template>

      <template v-slot:[`item.gender`]="{ item }">
        <v-icon :color="item.gender === 0 ? 'pink' : 'blue'" large>
          {{ item.gender === 0 ? "mdi-human-female" : "mdi-human-male" }}
        </v-icon>
      </template>

      <template v-slot:[`item.phoneNumber`]="{ item }">
        <pre class="ltr text-right">{{
          toPersianString(`0${item.phoneNumber}`)
        }}</pre>
      </template>

      <template v-slot:[`item.erpCustomerType`]="{ item }">
        <span
          class="ltr text-right"
          :style="'color: ' + customerType(item.erpCustomerType).color"
        >
          {{ customerType(item.erpCustomerType).name }}
        </span>
      </template>

      <template v-slot:[`item.loggedInAt`]="{ item }">
        <span class="ltr text-right">{{
          item.loggedInAt
            ? toPersianString(toPersianTime(item.loggedInAt))
            : null
        }}</span>
      </template>

      <template v-slot:[`item.sendMessage`]="{ item }">
        <!-- FCM -->
        <v-btn color="primary" elevation="2" icon outlined>
          <v-icon dark small @click="showDialog(item)"
            >mdi-message-reply-text-outline</v-icon
          >
        </v-btn>
      </template>

      <template v-slot:[`item.status`]="{ item }">
        <!-- active/deactivate -->
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
          @click:close="toggleActivation(item)"
          @click="toggleActivation(item)"
        >
          {{ item.active ? "غیر فعال" : "فعال" }}
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

    <!-- ------------------------------------------------------------------------ */
    /*                                START: Dialog                               */
    /* ------------------------------------------------------------------------  -->
    <v-row justify="center">
      <v-dialog v-model="dialog" persistent max-width="600px">
        <v-form
          v-model="valid"
          ref="pushForm"
          @submit.prevent="sendPushNotification"
        >
          <v-card class="pa-3">
            <v-card-title>ارسال پوش‌نوتیفیکیشن به {{ fullName }}</v-card-title>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  label="عنوان پوش‌نوتیفیکیشن"
                  placeholder="لطفا عنوان پوش‌نوتیفیکیشن را وارد کنید."
                  v-model.trim="pushText"
                  outlined
                  hide-details="auto"
                  :rules="pushTextRule"
                  required
                ></v-text-field>
              </v-col>

              <v-col cols="12">
                <v-text-field
                  label="متن پوش‌نوتیفیکیشن"
                  placeholder="لطفا متن پوش‌نوتیفیکیشن را وارد کنید."
                  v-model.trim="pushBody"
                  outlined
                  hide-details="auto"
                  :rules="pushBodyRule"
                  required
                ></v-text-field>
              </v-col>
            </v-row>

            <v-card-actions>
              <v-btn large color="primary" type="submit">ارسال</v-btn>
              <v-btn large color="secondary" @click="clearDialog">انصراف</v-btn>
            </v-card-actions>
          </v-card>
        </v-form>
      </v-dialog>
    </v-row>
    <!-- ----------------------------- END: Dialog ----------------------------  -->
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import {
  IFilters,
  IOptions,
  IPagination,
} from "@/interfaces/others/pagination.interface";
import { ICustomer } from "@/interfaces/entities/customer.interface";
import { paginationGenerator } from "@/common/utils/pagination.utils";
import { MapCustomerType } from "@/constant/customer-type";
import { IMapCustomerType } from "@/interfaces/constant/map.interface";
import { FirebaseCollectionsEnum } from "@/enums/firebase";
import { IPushNotification } from "@/interfaces/entities/notification.interface";
import { FormRefs } from "@/types/global.type";
import * as _ from "lodash";

export default Vue.extend({
  name: "AllCustomers",

  data(): {
    [key: string]: unknown;
    page: number;
    pageCount: number;
    limit: number;
    pagination: IPagination;
    items: ICustomer[];
    currentCustomer: ICustomer;
  } {
    const title = "لیست کاربران";
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
      pagination: {
        option: {
          page: { eq: 1 },
          limit: { eq: 10 },
        },
      },
      dialog: false,
      pushText: "",
      pushBody: "",
      pushTextRule: [
        (v: string) =>
          (!!v && v.length >= 3) || "تیتر باید بیشتر از ۳ حرف باشد.",
      ],
      pushBodyRule: [
        (v: string) =>
          (!!v && v.length >= 3) || "متن باید بیشتر از ۳ حرف باشد.",
      ],
      valid: false,
      currentCustomer: {} as ICustomer,
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
      Vue.prototype.$api.customer.getList(this.pagination).then((response) => {
        const data = response.data;
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
      const filters: IFilters = {};
      this.pagination = paginationGenerator(options, filters);
    },
    clearDateFilter(): void {
      this.dates = undefined;
      this.paginateGenerator();
    },
    toggleActivation(customer: ICustomer): void {
      Vue.prototype.$api.admin
        .toggleCustomer(customer.id, {
          active: !customer.active,
        })
        .then(() => (customer.active = !customer.active));
    },
    showDialog(customer: ICustomer) {
      this.dialog = true;
      this.currentCustomer = _.assign({}, customer);
    },
    async sendPushNotification() {
      (this.$refs.pushForm as FormRefs).validate();
      if (!this.valid) return;
      const notification = {
        title: this.pushText,
        body: this.pushBody,
      } as IPushNotification;
      const firebaseUser = await this.getFirebaseUser(this.currentCustomer.id);
      firebaseUser && firebaseUser.token
        ? await Vue.prototype.$api.firebase
            .sendPushToToken(notification, firebaseUser.token)
            .then((response) => console.log("then response:", response))
            .catch((error) => console.log("catch error:", error))
        : Vue.prototype.$toast("info", "این کاربر توکن فعال ندارد.");
      this.clearDialog();
    },
    clearDialog(): void {
      this.currentCustomer = {} as ICustomer;
      this.pushText = "";
      this.pushBody = "";
      this.dialog = false;
      (this.$refs.pushForm as FormRefs).resetValidation();
    },
    async getFirebaseUser(id: string) {
      return await Vue.prototype.$api.firebase
        .getOne(FirebaseCollectionsEnum.USERS, id)
        .then((response) => response);
    },
  },
  mounted(): void {
    this.getList();
  },
  computed: {
    fullName(): string {
      return this.currentCustomer &&
        this.currentCustomer.firstName &&
        this.currentCustomer.lastName
        ? `${this.currentCustomer.firstName} ${this.currentCustomer.lastName}`
        : "ناشناس";
    },
  },
});
</script>
