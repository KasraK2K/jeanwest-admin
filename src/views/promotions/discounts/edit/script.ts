import { IDiscount } from "@/interfaces/entities/discount.interface";
import EditGroup from "@/components/promotions/group/EditGroup.vue";
import { DefaultPromotionGroupData as DefaultData } from "@/constant/promotion-group";
import { Vue, Component, Prop } from "vue-property-decorator";
import { formatDate } from "@/mixin/date.mixin";
import * as _ from "lodash";
import { IPromotionGroup } from "@/interfaces/constant/group.interface";
import { IGroup } from "@/interfaces/entities/group.interface";

@Component({
  name: "EditDiscount",
  components: {
    EditGroup,
  },
})
class CreateDiscount extends Vue {
  @Prop(String) readonly id!: string;

  private title = "ویرایش تخفیف ";
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
  ready = false;
  private discount: IDiscount = {} as unknown as IDiscount;
  private startDateMenu = false;
  private expirationDateMenu = false;
  private defaultData: IPromotionGroup = DefaultData;
  private group: IGroup = {} as unknown as IGroup;
  private startTime = "";
  private startTimeMenu = false;
  private startTimePickerMenu = false;
  private expirationTime = "";
  private expirationTimeMenu = false;
  private expirationTimePickerMenu = false;

  private mounted() {
    this.findOneDiscount();
  }

  private findOneDiscount() {
    Vue.prototype.$api.promotion
      .findOneDiscount(this.id)
      .then((response) => {
        this.discount = _.assign(this.discount, response.data);
        this.divisionTen();
        // edit resived date and set time from resived date
        if (this.discount.startDate) {
          this.startTime = formatDate(this.discount.startDate, "HH:mm");
          this.discount.startDate = formatDate(this.discount.startDate);
        }
        if (this.discount.expirationDate) {
          this.expirationTime = formatDate(
            this.discount.expirationDate,
            "HH:mm"
          );
          this.discount.expirationDate = formatDate(
            this.discount.expirationDate
          );
        }
        this.group = this.discount.promotionGroup;
        this.ready = true;
      })
      .catch((error) => {
        Vue.prototype.$toast("error", error.message);
        this.$router.go(-1);
      });
  }

  private editDiscount() {
    if (this.discount.startDate)
      this.discount.startDate = `${this.discount.startDate} ${this.startTime}`;
    if (this.discount.expirationDate)
      this.discount.expirationDate = `${this.discount.expirationDate} ${this.expirationTime}`;

    this.multiplyTen();

    Vue.prototype.$api.promotion
      .editDiscount(this.discount)
      .then(() => {
        Vue.prototype.$toast("success", "با موفقیت بروزرسانی شد.");
        this.$router.go(-1);
      })
      .catch((error) => {
        Vue.prototype.$toast("error", error.message);
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

  private divisionTen() {
    _.assign(this.discount, {
      reductionPrice: this.discount.isPercentage
        ? this.discount.reductionPrice
        : this.discount.reductionPrice / 10,
      maxTotal: this.discount.maxTotal && this.discount.maxTotal / 10,
      minTotal: this.discount.minTotal && this.discount.minTotal / 10,
    });
  }
}

export default CreateDiscount;
