import { IDiscount } from "@/interfaces/entities/discount.interface";
import Editor from "@tinymce/tinymce-vue";
import { Vue, Component } from "vue-property-decorator";
import _ from "lodash";
import { OperatorEnum } from "@/enums/general.enum";
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
    Vue.prototype.$api.promotion.createDiscount(this.discount).then(() => {
      Vue.prototype.$toast("success", "با موفقیت ایجاد شد.");
      this.$router.go(-1);
    });
  }

  private multiplyTen() {
    _.assign(this.discount, {
      reductionPrice: this.discount.isPercentage
        ? this.discount.reductionPrice / 100
        : this.discount.reductionPrice * 10,
      maxTotal: this.changeNumber(
        this.discount.maxTotal,
        OperatorEnum.MULTIPLE
      ),
      minTotal: this.changeNumber(
        this.discount.minTotal,
        OperatorEnum.MULTIPLE
      ),
    });
  }

  private changeNumber(number: number | undefined, operator: OperatorEnum) {
    if (!number || number === -1) return number;
    else number = +number;

    if (operator === OperatorEnum.DIVIDER) return number / 10;
    else if (operator === OperatorEnum.MULTIPLE) return number * 10;
  }
}

export default CreateDiscount;
