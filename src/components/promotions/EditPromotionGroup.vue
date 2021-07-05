<template>
  <v-row v-if="ready">
    <v-col>
      <v-card
        id="group"
        class="mt-2 pa-4"
      >
        <v-card-title>
          <label class="pointer">ویرایش گروه</label>
        </v-card-title>

        <v-form @submit.prevent="updateGroup">
          <v-row>
            <v-col
              cols="12"
              md="4"
            >
              <v-autocomplete
                label="گروه"
                v-model="target.group.eq"
                :items="firstValue(defaultData.group)"
                chips
                deletable-chips
                multiple
                clearable
                hide-selected
              ></v-autocomplete>
            </v-col>

            <v-col
              cols="12"
              md="4"
            >
              <v-autocomplete
                label="وضعیت"
                v-model="group.active"
                :items="defaultData.active"
                item-text="text"
                item-value="value"
                chips
                clearable
                hide-selected
              ></v-autocomplete>
            </v-col>

            <v-col
              cols="12"
              md="4"
            >
              <v-autocomplete
                label="برند"
                v-model="target.brand.eq"
                :items="firstValue(defaultData.brand)"
                chips
                deletable-chips
                multiple
                clearable
                hide-selected
              ></v-autocomplete>
            </v-col>

            <v-col
              cols="12"
              md="4"
            >
              <v-autocomplete
                label="گروه سنی"
                v-model="target.ageGroup.eq"
                :items="firstValue(defaultData.ageGroup)"
                chips
                deletable-chips
                multiple
                clearable
                hide-selected
              ></v-autocomplete>
            </v-col>

            <v-col
              cols="12"
              md="4"
            >
              <v-autocomplete
                label="جنسیت"
                v-model="target.gender.eq"
                :items="firstValue(defaultData.gender)"
                chips
                deletable-chips
                multiple
                clearable
                hide-selected
              ></v-autocomplete>
            </v-col>

            <v-col
              cols="12"
              md="4"
            >
              <v-autocomplete
                label="گروه رنگی"
                v-model="target.colorFamily.eq"
                :items="firstValue(defaultData.colorFamily)"
                chips
                deletable-chips
                multiple
                clearable
                hide-selected
              ></v-autocomplete>
            </v-col>

            <v-col
              cols="6"
              md="2"
            >
              <v-autocomplete
                label="تعداد"
                v-model="quantityType"
                :items="['gt', 'gte', 'lt', 'lte', 'eq']"
                height="42"
                clearable
              ></v-autocomplete>
            </v-col>

            <v-col
              cols="6"
              md="2"
            >
              <v-text-field
                label="تعداد"
                v-model="quantity"
                type="number"
                height="42"
                clearable
              ></v-text-field>
            </v-col>

            <v-col
              cols="6"
              md="2"
            >
              <v-autocomplete
                label="نوع قیمت پایه"
                v-model="basePriceType"
                :items="['gt', 'gte', 'lt', 'lte', 'eq']"
                height="42"
                clearable
              ></v-autocomplete>
            </v-col>

            <v-col
              cols="6"
              md="2"
            >
              <v-text-field
                label="قیمت پایه"
                v-model="basePrice"
                type="number"
                height="42"
                clearable
              ></v-text-field>
            </v-col>

            <v-col
              cols="6"
              md="2"
            >
              <v-autocomplete
                label="نوع قیمت فروش"
                v-model="salePriceType"
                :items="['gt', 'gte', 'lt', 'lte', 'eq']"
                height="42"
                clearable
              ></v-autocomplete>
            </v-col>

            <v-col
              cols="6"
              md="2"
            >
              <v-text-field
                label="قیمت فروش"
                v-model="salePrice"
                type="number"
                height="42"
                clearable
              ></v-text-field>
            </v-col>

            <v-col cols="12">
              <v-autocomplete
                label="زیر گروه"
                v-model="target.subGroup.eq"
                :items="firstValue(defaultData.subGroup)"
                chips
                deletable-chips
                multiple
                clearable
                hide-selected
              ></v-autocomplete>
            </v-col>

            <v-col cols="12">
              <v-autocomplete
                label="سایز"
                v-model="target.size.ct"
                :items="firstValue(defaultData.size)"
                chips
                deletable-chips
                multiple
                clearable
                hide-selected
              ></v-autocomplete>
            </v-col>
          </v-row>

          <v-btn
            type="submit"
            large
            color="primary"
            class="mt-4"
          >ویرایش</v-btn>
        </v-form>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from "vue";
import PromotionService from "@/services/Promotion.service";
import { ITarget } from "@/interfaces/entities/group.interface";
import * as _ from "lodash";

export default Vue.extend({
  props: {
    defaultData: { type: Object, required: true },
    group: { type: Object, required: true },
  },
  data(): {
    [key: string]: unknown;
    target: ITarget;
  } {
    return {
      ready: false,
      target: {
        group: { eq: [] },
        subGroup: { eq: [] },
        size: { ct: [] },
        gender: { eq: [] },
        brand: { eq: [] },
        ageGroup: { eq: [] },
        colorFamily: { eq: [] },
      },
      quantity: undefined,
      quantityType: "",
      basePrice: undefined,
      basePriceType: "",
      salePrice: undefined,
      salePriceType: "",
    };
  },
  methods: {
    init() {
      _.assign(this.target, this.group.target);

      this.quantity = this.firstValue(this.target.quantity) || undefined;
      this.basePrice = this.firstValue(this.target.basePrice) || undefined;
      this.salePrice = this.firstValue(this.target.salePrice) || undefined;

      this.quantityType = this.firstKey(this.target.quantity);
      this.basePriceType = this.firstKey(this.target.salePrice);
      this.salePriceType = this.firstKey(this.target.salePrice);

      this.ready = true;
    },
    updateGroup() {
      if (this.quantity)
        this.target.quantity = {
          [String(this.quantityType)]: Number(this.quantity),
        };

      if (this.basePrice)
        this.target.basePrice = {
          [String(this.basePriceType)]: Number(this.basePrice),
        };

      if (this.salePrice)
        this.target.salePrice = {
          [String(this.salePriceType)]: Number(this.salePrice),
        };

      _.assign(this.group.target, this.target);

      for (const item of _.entries(this.group.target as ITarget)) {
        const key = item[0];
        const value = item[1];
        if (
          typeof value !== "object" ||
          (value["eq"] && value["eq"].length === 0) ||
          (value["ct"] && value["ct"].length === 0)
        )
          delete (this as any).group.target[key];
      }

      PromotionService.editGroup({ ...this.group })
        .then(() => {
          Vue.prototype.$toast("success", "گروه با موفقیت بروزرسانی شد.");
        })
        .catch(() => {
          Vue.prototype.$toast("error", "مشکلی در بروزرسانی رخ داد.");
        });
    },
    firstValue(data: Record<string, unknown> | undefined): unknown {
      if (typeof data !== "undefined") return data[_.keys(data)[0]];
    },
    firstKey(data: Record<string, unknown> | undefined): unknown {
      if (typeof data !== "undefined") return _.keys(data)[0];
    },
  },
  mounted() {
    this.init();
  },
});
</script>
