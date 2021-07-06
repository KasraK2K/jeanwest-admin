<template>
  <v-container fluid v-if="ready">
    <h1 class="blue--text">{{ title }}</h1>
    <v-breadcrumbs :items="breadcrumbs"></v-breadcrumbs>

    <!-- ──────────────────────────────────────────────────────────────────────────────────
    //   :::::: U P D A T E   J E A N S P O I N T : :  :   :    :     :        :          :
    ─────────────────────────────────────────────────────────────────────────────────── -->
    <v-row>
      <v-col>
        <v-card id="jeanspoint" class="mt-2 pa-4">
          <v-card-title>
            <label for="name" class="pointer">ویرایش امتیاز</label>
          </v-card-title>

          <v-form @submit.prevent="updateJeansPoint">
            <v-row>
              <v-col cols="12" md="4">
                <v-text-field
                  label="نام"
                  v-model="jeanspoint.name"
                  hide-details="auto"
                  id="name"
                />
              </v-col>

              <v-col cols="12" md="2">
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

              <v-col cols="12" md="2">
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

              <v-col cols="12" md="2">
                <v-text-field
                  label="محدودیت در تعداد"
                  v-model="jeanspoint.countLimit"
                  hide-details="auto"
                  type="number"
                />
              </v-col>

              <v-col cols="12" md="2">
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
                  v-model="context"
                />
              </v-col>
            </v-row>

            <v-btn type="submit" large color="primary" class="mt-4"
              >ویرایش</v-btn
            >
          </v-form>
        </v-card>
      </v-col>
    </v-row>

    <!-- ────────────────────────────────────────────────────────────────────────
    //   :::::: U P D A T E   G R O U P : :  :   :    :     :        :          :
    ───────────────────────────────────────────────────────────────────────── -->
    <EditGroup :default-data="defaultData" :group="group" />
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import Editor from "@tinymce/tinymce-vue";
import EditGroup from "@/components/promotions/group/EditGroup.vue";
import PromotionService from "@/services/Promotion.service";
import { DefaultPromotionGroupData as DefaultData } from "@/common/globals/constant/promotion-group";
import { IJeansPoint } from "@/interfaces/entities/jeanspoint.interface";
import { IGroup } from "@/interfaces/entities/group.interface";
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
    defaultData: IPromotionGroup;
    context: string;
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
      context: "",
      defaultData: DefaultData,
    };
  },
  methods: {
    findOne() {
      PromotionService.findOnePoint(this.id).then((response) => {
        this.jeanspoint = response.data.data;
        this.group = this.jeanspoint.promotionGroup;
        this.context =
          this.jeanspoint.description && this.jeanspoint.description.context;
        this.ready = true;
      });
    },
    updateJeansPoint() {
      this.jeanspoint.description = { context: this.context };
      PromotionService.editPoint({ ...this.jeanspoint })
        .then(() => {
          Vue.prototype.$toast("success", "امتیاز با موفقیت بروزرسانی شد.");
        })
        .catch(() => {
          Vue.prototype.$toast("error", "مشکلی در بروزرسانی رخ داد.");
        });
    },
  },
  components: {
    editor: Editor,
    EditGroup,
  },
  mounted() {
    this.findOne();
  },
});
</script>
