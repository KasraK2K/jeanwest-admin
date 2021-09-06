import PromotionService from "@/services/Promotion.service";
import { IDiscount } from "@/interfaces/entities/discount.interface";
import Editor from "@tinymce/tinymce-vue";
import { Vue, Component } from "vue-property-decorator";
import * as _ from "lodash";
@Component({
  name: "CreateDiscount",
  components: {
    editor: Editor,
  },
})
class CreateDiscount extends Vue {
  private title = "ایجاد تخفیف";
  private breadcrumbs: Record<string, unknown>[] = [
    {
      text: "صفحه اصلی",
      to: "/",
    },
    {
      text: "لیست تخفیف‌ها",
      to: { name: "AllDiscounts" },
    },
    {
      text: this.title,
      to: document.location.pathname,
    },
  ];
  private discount: IDiscount = {} as unknown as IDiscount;
  private expirationDateMenu = false;
  private startDateMenu = false;

  private createDiscount() {
    this.multiplyTen();
    PromotionService.createDiscount(this.discount).then(() => {
      Vue.prototype.$toast("success", "با موفقیت ایجاد شد.");
      this.$router.go(-1);
    });
  }

  private multiplyTen() {
    _.assign(this.discount, {
      reductionPrice: this.discount.isPercentage
        ? this.discount.reductionPrice / 100
        : this.discount.reductionPrice * 10,
      maxTotal: this.discount.maxTotal && this.discount.maxTotal * 10,
      minTotal: this.discount.minTotal && this.discount.minTotal * 10,
    });
  }
}

export default CreateDiscount;
