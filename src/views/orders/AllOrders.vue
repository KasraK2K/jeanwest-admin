<template>
  <v-container fluid>
    <v-breadcrumbs :items="breadcrumbs" class="mb-3"></v-breadcrumbs>

    <!-- ------------------------------------------------------------------------ */
    /*                                START: Filter                               */
    ---------------------------------------------------------------------------- -->
    <!-- <v-card class="mb-8" elevation="1" outlined>
      <v-card-title class="blue--text">فیلتر {{ title }}</v-card-title>
      <v-row class="mx-4">
        <v-col class="col-12 col-md-3">
          <v-text-field
            label="کد"
            placeholder="لطفا کد سفارش را وارد کنید."
            v-model="code"
            @change="paginateGenerator()"
            outlined
            hide-details="auto"
          ></v-text-field>
        </v-col>

        <v-col class="col-12 col-md-3">
          <v-autocomplete
            label="نوع"
            v-model="type"
            :items="[
              { text: 'آنلاین', value: 0 },
              { text: 'آفلاین', value: 1 },
            ]"
            item-text="text"
            item-value="value"
            @change="paginateGenerator()"
            outlined
            hide-details="auto"
          ></v-autocomplete>
        </v-col>

        <v-col class="col-12 col-md-3">
          <v-autocomplete
            label="وضعیت"
            v-model="status"
            :items="[
              { text: 'در حال انجام', value: 0 },
              { text: 'تکمیل شده', value: 1 },
              { text: 'مرجوعی', value: 2 },
            ]"
            item-text="text"
            item-value="value"
            @change="paginateGenerator()"
            outlined
            hide-details="auto"
          ></v-autocomplete>
        </v-col>

        <v-col class="col-12 col-md-3">
          <v-text-field
            label="موبایل"
            placeholder="لطفا شماره موبایل را وارد کنید."
            v-model="mobile"
            @change="paginateGenerator()"
            outlined
          ></v-text-field>
        </v-col>
      </v-row>
    </v-card> -->
    <!-- ----------------------------- END: Filter ----------------------------- -->

    <!-- ------------------------------------------------------------------------ */
    /*                                 START: List                                */
    /* ------------------------------------------------------------------------- -->
    <v-data-table
      :headers="[
        { text: 'شماره', value: 'no', align: 'center' },
        { text: 'کد', value: 'code', sortable: false },
        { text: 'وضعیت', value: 'status' },
        { text: 'مبلغ پرداختی', value: 'cost' },
        { text: 'مبلغ کل', value: 'total' },
        { text: 'لجستیکی', value: 'logistic' },
        { text: 'تخفیف', value: 'reduction' },
        { text: 'تعداد اقلام', value: 'item' },
        { text: 'تاریخ ایجاد', value: 'created_at' },
        { text: 'تاریخ بروز‌رسانی', value: 'updated_at' },
        { text: 'گزینه‌ها', value: 'options', sortable: false },
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
        <span :class="[item.active] ? 'green--text' : 'pink--text'">
          {{ item.code }}
        </span>
      </template>

      <template v-slot:[`item.status`]="{ item }">
        {{ toPersianString(item.status) }}
      </template>

      <template v-slot:[`item.cost`]="{ item }">
        {{ toPersianString(numberToCash(item.cost)) }}
      </template>

      <template v-slot:[`item.total`]="{ item }">
        {{ toPersianString(numberToCash(item.total)) }}
      </template>

      <template v-slot:[`item.logistic`]="{ item }">
        {{ toPersianString(numberToCash(item.logistic)) }}
      </template>

      <template v-slot:[`item.reduction`]="{ item }">
        {{ toPersianString(numberToCash(item.reduction)) }}
      </template>

      <template v-slot:[`item.item`]="{ item }">
        {{ toPersianString(item.item.length) }}
      </template>

      <template v-slot:[`item.created_at`]="{ item }">
        {{ toPersianString(toPersianTime(item.datetime.created_at)) }}
      </template>

      <template v-slot:[`item.updated_at`]="{ item }">
        {{ toPersianString(toPersianTime(item.datetime.updated_at)) }}
      </template>

      <template v-slot:[`item.options`]="{ item }">
        <v-chip
          color="blue"
          link
          label
          outlined
          close
          close-icon="mdi-eye"
          @click:close="
            $router.push({ name: 'ShowOrder', params: { id: item.id } })
          "
          :to="{ name: 'ShowOrder', params: { id: item.id } }"
        >
          نمایش
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
import { Vue, Component, Watch } from "vue-property-decorator";
import OrderService from "@/services/Order.service";
import {
  IFilters,
  IOptions,
  IPagination,
} from "@/interfaces/others/pagination.interface";
import { IOrder } from "@/interfaces/entities/order.interface";
import { paginationGenerator } from "@/common/utils/pagination.utils";

@Component({ name: "AllOrders" })
export class AllOrders extends Vue {
  // ──────────────────────────────────────────────────────────
  //   :::::: D A T A : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────
  private title = "لیست سفارشات";
  private loading = false;
  private items: IOrder[] = [];
  private breadcrumbs = [
    {
      text: "صفحه اصلی",
      to: "/",
    },
    {
      text: this.title,
      to: document.location.pathname,
    },
  ];
  private search = "";
  // pagination
  private page = 1;
  private limit = 10;
  private pageCount = 1;
  // filter
  private code = "";
  private type: number = null as unknown as number;
  private status: number = null as unknown as number;
  private mobile: number = null as unknown as number;
  private pagination: IPagination = {
    option: {
      page: { eq: 1 },
      limit: { eq: 10 },
    },
  };

  // ────────────────────────────────────────────────────────────
  //   :::::: W A T C H : :  :   :    :     :        :          :
  // ────────────────────────────────────────────────────────────
  @Watch("limit")
  onLimitChanged(val: string, oldVal: string): void {
    this.page = 1;
    this.pagination.option.limit = { eq: this.limit };
    this.getList();
  }

  @Watch("page")
  onPageChanged(val: string, oldVal: string): void {
    this.pagination.option.page = { eq: this.page };
    this.getList();
  }

  @Watch("pagination")
  onPaginationChanged(val: string, oldVal: string): void {
    this.getList();
  }

  @Watch("items")
  onItemsChanged(val: string, oldVal: string): void {
    this.loading = false;
  }

  // ────────────────────────────────────────────────────────────────────
  //   :::::: L I F E S Y C L E : :  :   :    :     :        :          :
  // ────────────────────────────────────────────────────────────────────
  private mounted(): void {
    this.getList();
  }

  // ──────────────────────────────────────────────────────────────
  //   :::::: M E T H O D : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────
  getList(): void {
    this.loading = true;
    OrderService.getList(this.pagination).then((response) => {
      const data = response.data.data;
      this.pageCount = Vue.prototype.$PageCount(data.total, this.limit);
      this.items = data.result;
    });
  }

  paginateGenerator() {
    this.page = 1;
    const options: IOptions = {
      page: { eq: this.page },
      limit: { eq: this.limit },
    };
    const filters: IFilters = {
      code: { eq: this.code },
      type: { eq: this.type },
      status: { eq: this.status },
      mobile: { eq: this.mobile },
    };
    this.pagination = paginationGenerator(options, filters);
  }

  getTypeText(status: number): string | undefined {
    const allStatus = new Map([
      [0, "آفلاین"],
      [1, "آنلاین"],
    ]);
    return allStatus.get(status);
  }

  getStatusText(status: number): string | undefined {
    const allStatus = new Map([
      [0, "در حال انجام"],
      [1, "تکمیل شده"],
      [2, "مرجوعی"],
    ]);
    return allStatus.get(status);
  }

  getStatusColor(status: number): string | undefined {
    const allStatus = new Map([
      [0, "blue--text"],
      [1, "green--text"],
      [2, "red--text"],
    ]);
    return allStatus.get(status);
  }
}

export default AllOrders;
</script>
