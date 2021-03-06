import { Vue, Component, Watch } from "vue-property-decorator";
import {
  IFilters,
  IOptions,
  IPagination,
} from "@/interfaces/others/pagination.interface";
import { IOrder } from "@/interfaces/entities/order.interface";
import { paginationGenerator } from "@/common/utils/pagination.utils";
import { mapState } from "vuex";
import { convertSearchString } from "@/mixin/string.mixin";

@Component({ name: "AllOrders", computed: mapState(["orderFilter"]) })
export class AllOrders extends Vue {
  // ──────────────────────────────────────────────────────────────────
  //   :::::: C O M P U T E D : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────
  public orderFilter!: IFilters;

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
  private banimodeCode = "";
  private status: number = null as unknown as number;
  private banimodeStatus: number = null as unknown as number;
  private cost: number = null as unknown as number;
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
  onLimitChanged(/*val: string, oldVal: string*/): void {
    this.page = 1;
    this.pagination.option.limit = { eq: this.limit };
    this.getList();
  }

  @Watch("page")
  onPageChanged(/*val: string, oldVal: string*/): void {
    this.pagination.option.page = { eq: this.page };
    this.getList();
  }

  @Watch("pagination")
  onPaginationChanged(/*val: string, oldVal: string*/): void {
    this.getList();
  }

  @Watch("items")
  onItemsChanged(/*val: string, oldVal: string*/): void {
    this.loading = false;
  }

  // ────────────────────────────────────────────────────────────────────
  //   :::::: L I F E S Y C L E : :  :   :    :     :        :          :
  // ────────────────────────────────────────────────────────────────────
  public mounted(): void {
    this.paginateGenerator();
    this.getList();
  }

  // ──────────────────────────────────────────────────────────────
  //   :::::: M E T H O D : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────
  public getList(): void {
    this.loading = true;
    Vue.prototype.$api.order
      .getList(this.pagination)
      .then((response) => {
        const data = response.data;
        this.pageCount = Vue.prototype.$PageCount(data.total, this.limit);
        this.items = data.result;
      })
      .catch(() => {
        Vue.prototype.$toast("error", "خطا در دریافت لیست سفارشات.");
      });
  }

  public paginateGenerator(): void {
    this.page = 1;
    const options: IOptions = {
      page: { eq: this.page },
      limit: { eq: this.limit },
    };
    const filters: IFilters = {
      banimodeCode: { eq: this.banimodeCode },
      status: { eq: this.status },
      banimodeStatus: { eq: this.banimodeStatus },
      cost: { eq: this.cost && this.cost * 10 },
    };

    this.pagination = this.orderFilter
      ? paginationGenerator(options, this.orderFilter)
      : paginationGenerator(options, filters);
  }

  public jeanswestStatusGen(status: number): { text: string; class: string } {
    switch (status) {
      case 0:
        return { text: "در انتظار", class: "yellow--text" };
      case 1:
        return { text: "کنسل بدون پرداخت", class: "orange--text" };
      case 2:
        return { text: "پرداخت شده", class: "green--text" };
      case 3:
        return { text: "کنسل توسط ادمین", class: "gray--text" };

      default:
        return { text: "سایر", class: "red--text" };
    }
  }

  public banimodeStatusGen(status: number): { text: string; class: string } {
    switch (status) {
      case 0:
        return { text: "ارسال نشده", class: "yellow--text" };
      case 1:
        return { text: "در انتظار", class: "orange--text" };
      case 2:
        return { text: "تحویل به مشتری", class: "green--text" };
      case 3:
        return { text: "کنسل شده", class: "gray--text" };

      default:
        return { text: "سایر", class: "red--text" };
    }
  }

  private fullName(address: Record<string, string>) {
    return `${address.firstName} ${address.lastName}`;
  }

  private removeForceFilter(): void {
    this.$store.dispatch("setOrderFilter", undefined);
    this.paginateGenerator();
  }

  private searchWithLike(event: string) {
    this.loading = true;

    const data = {
      value: convertSearchString(event),
      page: this.page,
      limit: this.limit,
    };

    if (event)
      Vue.prototype.$api.order
        .searchWithLike(data)
        .then((response) => {
          const data = response.data;
          this.pageCount = Vue.prototype.$PageCount(data.total, this.limit);
          this.items = data.result;
        })
        .catch(() => {
          Vue.prototype.$toast(
            "error",
            "خطا در دریافت لیست سفارشات جستجو شده."
          );
        });
    else this.getList();
  }
}

export default AllOrders;
