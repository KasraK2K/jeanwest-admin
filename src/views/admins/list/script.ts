import { Vue, Component, Watch } from "vue-property-decorator";
import { IFilters, IOptions } from "@/interfaces/others/pagination.interface";
import { IAdmin } from "@/interfaces/entities/admin.interface";
import { paginationGenerator } from "@/common/utils/pagination.utils";

@Component({ name: "AllAdmins" })
class AllAdmins extends Vue {
  // ──────────────────────────────────────────────────────────
  //   :::::: D A T A : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────
  private title = "لیست ادمین‌ها";
  private loading = false;
  private items: IAdmin[] = [];
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
  private pageCount = 1;
  private limit = 10;
  // filter
  // private type = undefined;
  // private status = undefined;
  // private dates = undefined;
  // private datesMenu = false;
  private pagination = {
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
  private mounted(): void {
    this.getList();
  }

  // ──────────────────────────────────────────────────────────────
  //   :::::: M E T H O D : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────
  private getList(): void {
    this.loading = true;
    Vue.prototype.$api.admin.getList(this.pagination).then((response) => {
      const data = response.data;
      this.pageCount = Vue.prototype.$PageCount(data.total, this.limit);
      this.items = data.result;
    });
  }

  private paginateGenerator(): void {
    this.page = 1;
    const options: IOptions = {
      page: { eq: this.page },
      limit: { eq: this.limit },
    };
    const filters: IFilters = {};
    this.pagination = paginationGenerator(options, filters);
  }

  private clearDateFilter(): void {
    // this.dates = undefined;
    this.paginateGenerator();
  }

  private toggleActivation(id: string, active: boolean): void {
    Vue.prototype.$api.admin
      .edit({ id, active: !active })
      .then(() => this.getList());
  }
}

export default AllAdmins;
