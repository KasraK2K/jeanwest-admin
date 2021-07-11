import { toGregorian } from "@/mixin/date.mixin";
import PromotionService from "@/services/Promotion.service";
import { IDiscount } from "@/interfaces/entities/discount.interface";
import Editor from "@tinymce/tinymce-vue";
import EditGroup from "@/components/promotions/group/EditGroup.vue";
import { DefaultPromotionGroupData as DefaultData } from "@/common/globals/constant/promotion-group";
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
  private expirationDateMenu = false;
  private startDateMenu = false;
  private defaultData: IPromotionGroup = DefaultData;
  private group: IGroup = {} as unknown as IGroup;

  private mounted() {
    this.findOneDiscount();
  }

  private findOneDiscount() {
    PromotionService.findOneDiscount(this.id)
      .then((response) => {
        this.discount = _.assign(this.discount, response.data.data);
        // edit resived date format
        if (this.discount.startDate)
          this.discount.startDate = formatDate(this.discount.startDate);
        if (this.discount.expirationDate)
          this.discount.expirationDate = formatDate(
            this.discount.expirationDate
          );
        this.group = this.discount.promotionGroup;
        this.ready = true;
      })
      .catch((error) => {
        Vue.prototype.$toast("error", error.message);
        this.$router.go(-1);
      });
  }

  private editDiscount() {
    PromotionService.editDiscount(this.discount)
      .then(() => {
        Vue.prototype.$toast("success", "با موفقیت بروزرسانی شد.");
        this.$router.go(-1);
      })
      .catch((error) => {
        Vue.prototype.$toast("error", error.message);
        this.$router.go(-1);
      });
  }
}

export default CreateDiscount;
