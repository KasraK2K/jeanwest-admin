import { toGregorian } from "@/mixin/date.mixin";
import PromotionService from "@/services/Promotion.service";
import { IDiscount } from "@/interfaces/entities/discount.interface";
import Editor from "@tinymce/tinymce-vue";
import { Vue, Component, Prop } from "vue-property-decorator";
import { formatDate } from "@/mixin/date.mixin";
import * as _ from "lodash";

@Component({
  name: "CreateDiscount",
  components: {
    editor: Editor,
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
  private discount: IDiscount = {
    description: { context: "" },
  } as unknown as IDiscount;
  private expirationDateMenu = false;
  private startDateMenu = false;

  private mounted() {
    this.findOneDiscount();
  }

  private findOneDiscount() {
    PromotionService.findOneDiscount(this.id)
      .then((response) => {
        this.discount = _.assign(this.discount, response.data.data);
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
