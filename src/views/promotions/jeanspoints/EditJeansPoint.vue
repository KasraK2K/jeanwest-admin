<template>
  <v-container fluid>
    <h1 class="blue--text">{{ title }}</h1>
    <v-breadcrumbs :items="breadcrumbs"></v-breadcrumbs>

    <!-- ──────────────────────────────────────────────────────────────────────────────────
    //   :::::: U P D A T E   J E A N S P O I N T : :  :   :    :     :        :          :
    ─────────────────────────────────────────────────────────────────────────────────── -->
    <v-row>
      <v-col>
        <v-card
          id="jeanspoint"
          class="mt-2 pa-4"
        >
          <v-card-title>
            <label
              for="name"
              class="pointer"
            >ویرایش امتیاز</label>
          </v-card-title>

          <v-form @submit.prevent="updateJeansPoint">
            <v-row>
              <v-col
                cols="12"
                md="4"
              >
                <v-text-field
                  label="نام"
                  v-model="jeanspoint.name"
                  hide-details="auto"
                  id="name"
                />
              </v-col>

              <v-col
                cols="12"
                md="2"
              >
                <v-autocomplete
                  label="وضعیت"
                  v-model="jeanspoint.active"
                  :items="[
                    { text: 'فعال', value: true },
                    { text: 'غیرفعال', value: false },
                  ]"
                  item-text="text"
                  item-value="value"
                  hide-details="auto"
                  clearable
                ></v-autocomplete>
              </v-col>

              <v-col
                cols="12"
                md="2"
              >
                <v-autocomplete
                  label="اعمال همزمان"
                  v-model="jeanspoint.singularity"
                  :items="[
                    { text: 'فعال', value: true },
                    { text: 'غیرفعال', value: false },
                  ]"
                  item-text="text"
                  item-value="value"
                  hide-details="auto"
                  clearable
                ></v-autocomplete>
              </v-col>

              <v-col
                cols="12"
                md="2"
              >
                <v-text-field
                  label="محدودیت در تعداد"
                  v-model="jeanspoint.countLimit"
                  hide-details="auto"
                  type="number"
                />
              </v-col>

              <v-col
                cols="12"
                md="2"
              >
                <v-text-field
                  label="حداقل مبلغ خرید"
                  v-model="jeanspoint.minTotal"
                  hide-details="auto"
                  type="number"
                />
              </v-col>

              <v-col cols="12">
                <editor
                  v-if="ready"
                  :api-key="tinyApiKey()"
                  :init="tinyInit()"
                  v-model="jeanspoint.description"
                />
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

    <!-- ────────────────────────────────────────────────────────────────────────
    //   :::::: U P D A T E   G R O U P : :  :   :    :     :        :          :
    ───────────────────────────────────────────────────────────────────────── -->
    <v-row>
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
                  :items="firstKey(GC.group)"
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
                  :items="GC.active"
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
                  :items="firstKey(GC.brand)"
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
                  :items="firstKey(GC.ageGroup)"
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
                  :items="firstKey(GC.gender)"
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
                  :items="firstKey(GC.colorFamily)"
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
                  label="نوع تعداد"
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
                  v-model="target.quantity"
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
                  v-model="target.basePrice"
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
                  v-model="target.salePrice"
                  type="number"
                  height="42"
                  clearable
                ></v-text-field>
              </v-col>

              <v-col cols="12">
                <v-autocomplete
                  label="زیر گروه"
                  v-model="target.subGroup.eq"
                  :items="firstKey(GC.subGroup)"
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
                  :items="firstKey(GC.size)"
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
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import Editor from "@tinymce/tinymce-vue";
import PromotionService from "@/services/Promotion.service";
import { IJeansPoint } from "@/interfaces/entities/jeanspoint.interface";
import { IGroup, ITarget } from "@/interfaces/entities/group.interface";
import { CPromotionGroup } from "@/common/globals/constant/promotion-group";
import { IPromotionGroup } from "@/interfaces/constant/group.interface";
import * as _ from "lodash";

export default Vue.extend({
  props: {
    id: { type: String, required: true },
  },
  data(): {
    [key: string]: unknown;
    jeanspoint: IJeansPoint;
    group: IGroup;
    GC: IPromotionGroup;
    target: ITarget;
  } {
    const title = "ویرایش امتیاز ";
    return {
      title,
      breadcrumbs: [
        {
          text: "صفحه اصلی",
          to: "/",
        },
        {
          text: "لیست امتیازات",
          to: { name: "AllJeansPoints" },
        },
        {
          text: title,
          to: document.location.pathname,
        },
      ],
      ready: false,
      jeanspoint: {} as unknown as IJeansPoint,
      group: {} as unknown as IGroup,
      target: {
        group: { eq: [] },
        subGroup: { eq: [] },
        size: { ct: [] },
        gender: { eq: [] },
        brand: { eq: [] },
        ageGroup: { eq: [] },
        colorFamily: { eq: [] },
        quantity: { eq: 0 },
        basePrice: { eq: 0 },
        salePrice: { eq: 0 },
      },
      GC: CPromotionGroup,
      quantityType: "",
      basePriceType: "",
      salePriceType: "",
    };
  },
  methods: {
    findOne() {
      PromotionService.findOnePoint(this.id).then((response) => {
        this.jeanspoint = response.data.data;
        this.group = this.jeanspoint.promotionGroup;
        _.assign(this.target, this.jeanspoint.promotionGroup.target);
        // this.target = this.jeanspoint.promotionGroup.target;
        this.ready = true;
      });
    },
    updateJeansPoint() {
      PromotionService.editPoint({ ...this.jeanspoint })
        .then(() => {
          Vue.prototype.$toast("success", "امتیاز با موفقیت بروزرسانی شد.");
        })
        .catch(() => {
          Vue.prototype.$toast("error", "مشکلی در بروزرسانی رخ داد.");
        });
    },
    updateGroup() {
      _.assign(this.group.target, this.target);
      for (const item of _.entries(this.group.target)) {
        const key = item[0];
        const value = item[1];
        if (
          typeof value !== "object" ||
          (value["eq"] && value["eq"].length === 0) ||
          (value["ct"] && value["ct"].length === 0)
        )
          delete (this as any).group.target[key];
      }
      // PromotionService.editGroup({ ...this.group })
      //   .then(() => {
      //     Vue.prototype.$toast("success", "گروه با موفقیت بروزرسانی شد.");
      //   })
      //   .catch(() => {
      //     Vue.prototype.$toast("error", "مشکلی در بروزرسانی رخ داد.");
      //   });
    },
    firstKey(data: Record<string, unknown>): unknown {
      return data[_.keys(data)[0]];
    },
  },
  components: {
    editor: Editor,
  },
  mounted() {
    this.findOne();
  },
});
</script>