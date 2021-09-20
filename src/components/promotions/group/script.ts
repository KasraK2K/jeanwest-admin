import { Vue, Component, Prop } from "vue-property-decorator";
import { ITarget } from "@/interfaces/entities/group.interface";
import { IPromotionGroup } from "@/interfaces/constant/group.interface";
import { IGroup } from "@/interfaces/entities/group.interface";
import * as _ from "lodash";

@Component({ name: "EditPromotionGroup" })
class EditPromotionGroup extends Vue {
  @Prop(Object) readonly defaultData!: IPromotionGroup;
  @Prop(Object) readonly group!: IGroup;

  private ready = false;
  private updateGroupData!: IGroup;
  private target: ITarget = {
    group: { eq: [] },
    subGroup: { eq: [] },
    size: { ct: [] },
    gender: { eq: [] },
    brand: { eq: [] },
    ageGroup: { eq: [] },
    colorFamily: { eq: [] },
  };
  private quantity: number | undefined;
  private quantityType!: string;
  private basePrice: number | undefined;
  private basePriceType!: string;
  private salePrice: number | undefined;
  private salePriceType!: string;

  private mounted() {
    this.init();
  }

  private init() {
    _.assign(this.target, this.group.target);

    // set numerical values
    this.quantity = Number(this.firstValue(this.target.quantity)) || undefined;
    this.basePrice =
      Number(this.firstValue(this.target.basePrice)) || undefined;
    this.salePrice =
      Number(this.firstValue(this.target.salePrice)) || undefined;

    this.basePrice = this.basePrice && this.basePrice / 10;
    this.salePrice = this.salePrice && this.salePrice / 10;

    // set numerical types
    this.quantityType = String(this.firstKey(this.target.quantity));
    this.basePriceType = String(this.firstKey(this.target.basePrice));
    this.salePriceType = String(this.firstKey(this.target.salePrice));

    //  remove numerical target keys
    this.target = _.omit(this.target, ["quantity", "basePrice", "salePrice"]);

    this.ready = true;
  }

  private updateGroup() {
    this.sanitize();
    this.update();
  }

  private sanitize() {
    this.group.target = _.assign(this.group.target, this.target);
    this.updateGroupData = _.assign(this.group);
    this.updateGroupData.target = _.omit(this.updateGroupData.target, [
      "quantity",
      "basePrice",
      "salePrice",
    ]);

    if (this.quantity && this.quantityType)
      this.updateGroupData.target.quantity = {
        [String(this.quantityType)]: Number(this.quantity),
      };

    if (this.basePrice && this.basePriceType)
      this.updateGroupData.target.basePrice = {
        [this.basePriceType]: Number(this.basePrice * 10),
      };

    if (this.salePrice && this.salePriceType)
      this.updateGroupData.target.salePrice = {
        [this.salePriceType]: Number(this.salePrice * 10),
      };

    for (const item of _.entries(this.updateGroupData.target as ITarget)) {
      const key = item[0];
      const value = item[1];
      if (
        typeof value !== "object" ||
        (value["eq"] && value["eq"].length === 0) ||
        (value["ct"] && value["ct"].length === 0)
      )
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        delete (this as any).updateGroupData.target[key];
    }
  }

  private update() {
    Vue.prototype.$api.promotion
      .editGroup({ ...this.updateGroupData })
      .then(() => {
        Vue.prototype.$toast("success", "گروه با موفقیت بروزرسانی شد.");
      })
      .catch(() => {
        Vue.prototype.$toast("error", "مشکلی در بروزرسانی رخ داد.");
      });
  }

  private firstValue(data: Record<string, unknown> | undefined): unknown {
    if (typeof data !== "undefined") return data[_.keys(data)[0]];
  }

  private firstKey(
    data: Record<string, unknown> | undefined
  ): string | undefined {
    if (typeof data !== "undefined") return _.keys(data)[0];
    else undefined;
  }
}

export default EditPromotionGroup;
