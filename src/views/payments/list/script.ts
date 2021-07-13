import {
  IFilters,
  IOptions,
  IPagination,
} from "@/interfaces/others/pagination.interface";
import PaymentService from "@/services/Payment.service";
import { Component, Vue, Watch } from "vue-property-decorator";
import * as _ from "lodash";
import { ITransaction } from "@/interfaces/entities/transaction.interface";
import { paginationGenerator } from "@/common/utils/pagination.utils";

@Component({ name: "AllPayments" })
class AllPayments extends Vue {
  // ──────────────────────────────────────────────────────────
  //   :::::: D A T A : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────
  private title = "لیست پرداخت‌ها";
  private loading = false;
  private items: ITransaction[] = [];
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
  private token: string | null = null;
  private gateId: number | null = null;
  private payment_status: number | null = null;
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
  private getList(): void {
    this.loading = true;
    PaymentService.getList(this.pagination).then((response) => {
      const data = response.data.data;
      this.pageCount = Vue.prototype.$PageCount(data.total, this.limit);
      this.items = data.result;
    });
  }

  private paginateGenerator() {
    this.page = 1;
    const options: IOptions = {
      page: { eq: this.page },
      limit: { eq: this.limit },
    };
    const filters: IFilters = {
      gateId: { eq: this.gateId },
      payment_status: { eq: this.payment_status },
    };
    if (this.token) filters["doc->>token"] = { eq: this.token };
    this.pagination = paginationGenerator(options, filters);
  }

  private clearDateFilter(): void {
    // this.dates = undefined;
    this.paginateGenerator();
  }

  private getGateText(gateId: number): string | undefined {
    const gateName = new Map([
      [1, "زرین‌پال"],
      [2, "سامان"],
    ]);
    return gateName.get(gateId);
  }

  private getGateColor(gateId: number): string | undefined {
    const gateColor = new Map([
      [1, "yellow--text"],
      [2, "blue--text"],
    ]);
    return gateColor.get(gateId);
  }

  private getStatusText(status: number): string | undefined {
    const allStatus = new Map([
      [0, "پرداخت نشده"],
      [1, "پرداخت شده"],
    ]);
    return allStatus.get(status);
  }

  private getStatusColor(status: number): string | undefined {
    const allStatus = new Map([
      [0, "red--text"],
      [1, "green--text"],
    ]);
    return allStatus.get(status);
  }
}

export default AllPayments;
