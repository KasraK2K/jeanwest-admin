import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import { ITarget } from "@/interfaces/entities/group.interface";
import { IPromotionGroup } from "@/interfaces/constant/group.interface";
import { IGroup } from "@/interfaces/entities/group.interface";
import * as _ from "lodash";

@Component({ name: "EditPromotionGroup" })
class EditPromotionGroup extends Vue {
  @Prop(Object) readonly defaultData!: IPromotionGroup;
  @Prop(Object) readonly group!: IGroup;
  @Prop(String) readonly name!: string;
  @Prop(String) readonly exportEventName!: string;
  @Prop({ type: Boolean, default: true }) readonly showButton!: boolean;

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

  public updateGroup(): void {
    this.sanitize();
    this.checkForUpdateOrExport();
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
        [this.quantityType]: Number(this.quantity),
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
      const key: string = item[0];
      const value: Record<string, unknown> = item[1];
      const objectValue = _.entries(value)[0][1] as Array<any>;

      if (typeof value !== "object" || !objectValue.length)
        delete this.updateGroupData.target[key];
    }
  }

  private checkForUpdateOrExport() {
    this.exportEventName
      ? this.$emit(this.exportEventName, {
          group: this.exportEventName,
          data: this.updateGroupData,
        })
      : this.update;
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
