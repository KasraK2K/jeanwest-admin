<template>
  <v-container fluid>
    <h1 class="blue--text">{{ title }}</h1>
    <v-breadcrumbs :items="breadcrumbs"></v-breadcrumbs>

    <!-- ────────────────────────────────────────────────────────────────────────
    //   :::::: C R E A T E   O F F E R : :  :   :    :     :        :          :
    // ────────────────────────────────────────────────────────────────────── -->
    <v-row>
      <v-col>
        <v-card elevation="2" outlined id="offer" class="mt-2 pa-4">
          <v-card-title>
            <label for="name" class="pointer">ایجاد پیشنهاد</label>
          </v-card-title>

          <v-form @submit.prevent="createOffer(true)">
            <v-row>
              <!-- offer.name -->
              <v-col cols="12" md="4">
                <v-text-field
                  label="نام"
                  v-model.trim="offer.name"
                  hide-details="auto"
                  id="name"
                />
              </v-col>

              <!-- offer.singularity -->
              <v-col cols="12" md="2">
                <v-autocomplete
                  label="اعمال همزمان"
                  v-model="offer.singularity"
                  :items="[
                    { text: 'بله', value: false },
                    { text: 'خیر', value: true },
                  ]"
                  item-text="text"
                  item-value="value"
                  hide-details="auto"
                  clearable
                ></v-autocomplete>
              </v-col>

              <!-- offer.minTotal -->
              <v-col cols="12" md="2">
                <v-text-field
                  label="حداقل مبلغ خرید"
                  v-model.number="offer.minTotal"
                  type="number"
                  hide-details="auto"
                />
              </v-col>

              <!-- offer.maxDiscount -->
              <v-col cols="12" md="2">
                <v-text-field
                  label="حداکثر مبلغ تخفیف"
                  v-model.number="offer.maxDiscount"
                  type="number"
                  hide-details="auto"
                />
              </v-col>

              <!-- offer.countLimit -->
              <v-col cols="12" md="2">
                <v-text-field
                  label="محدودیت در تعداد"
                  v-model.number="offer.countLimit"
                  type="number"
                  hide-details="auto"
                />
              </v-col>

              <!-- offer.trigger.type -->
              <v-col cols="12" md="2">
                <v-autocomplete
                  label="نوع trigger"
                  v-model="offer.trigger.type"
                  :items="[{ text: 'تعداد', value: 'count' }]"
                  item-text="text"
                  item-value="value"
                  hide-details="auto"
                  clearable
                ></v-autocomplete>
              </v-col>

              <!-- offer.trigger.value -->
              <v-col cols="12" md="2">
                <v-text-field
                  label="مقدار trigger"
                  v-model.number="offer.trigger.value"
                  type="number"
                  hide-details="auto"
                />
              </v-col>

              <!-- offer.target.type -->
              <v-col cols="12" md="2">
                <v-autocomplete
                  label="نوع target"
                  v-model="offer.target.type"
                  :items="[{ text: 'تعداد', value: 'count' }]"
                  item-text="text"
                  item-value="value"
                  hide-details="auto"
                  clearable
                ></v-autocomplete>
              </v-col>

              <!-- offer.target.value -->
              <v-col cols="12" md="2">
                <v-text-field
                  label="مقدار target"
                  v-model.number="offer.target.value"
                  type="number"
                  hide-details="auto"
                />
              </v-col>

              <!-- offer.target.reduction -->
              <v-col cols="12" md="2">
                <v-text-field
                  label="مقدار تخفیف target"
                  v-model.number="offer.target.reduction"
                  type="number"
                  hide-details="auto"
                />
              </v-col>

              <!-- offer.startDate -->
              <v-col cols="12" md="2">
                <v-menu
                  v-model="startDateMenu"
                  :nudge-top="20"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                  :close-on-content-click="false"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="time.startDate"
                      label="تاریخ شروع"
                      placeholder="لطفا روز مورد نظر خود را انتخاب کنید."
                      readonly
                      clearable
                      v-bind="attrs"
                      v-on="on"
                      @click:clear="clearStartTime"
                      hide-details="auto"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="time.startDate"></v-date-picker>
                </v-menu>
              </v-col>

              <!-- startTime -->
              <v-col cols="12" md="2">
                <v-menu
                  ref="startTimeMenu"
                  v-model="startTimePickerMenu"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  :return-value.sync="time.startTime"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="time.startTime"
                      label="زمان شروع"
                      v-bind="attrs"
                      v-on="on"
                      @click:clear="clearStartTime"
                      hide-details="auto"
                      clearable
                    ></v-text-field>
                  </template>
                  <v-time-picker
                    v-if="startTimePickerMenu"
                    v-model="time.startTime"
                    ampm-in-title
                    format="24hr"
                    @click:minute="$refs.startTimeMenu.save(time.startTime)"
                    landscape
                    scrollable
                  ></v-time-picker>
                </v-menu>
              </v-col>

              <!-- offer.expirationDate -->
              <v-col cols="12" md="2">
                <v-menu
                  v-model="expirationDateMenu"
                  :nudge-top="20"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                  :close-on-content-click="false"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="time.expirationDate"
                      label="تاریخ انقضا"
                      placeholder="لطفا روز مورد نظر خود را انتخاب کنید."
                      readonly
                      clearable
                      v-bind="attrs"
                      v-on="on"
                      @click:clear="clearexpirationTime"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="time.expirationDate"></v-date-picker>
                </v-menu>
              </v-col>

              <!-- expirationTime -->
              <v-col cols="12" md="2">
                <v-menu
                  ref="expirationTimeMenu"
                  v-model="expirationTimePickerMenu"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  :return-value.sync="time.expirationTime"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="time.expirationTime"
                      label="زمان انقضا"
                      v-bind="attrs"
                      v-on="on"
                      @click:clear="clearexpirationTime"
                      hide-details="auto"
                      clearable
                    ></v-text-field>
                  </template>
                  <v-time-picker
                    v-if="expirationTimePickerMenu"
                    v-model="time.expirationTime"
                    format="24hr"
                    @click:minute="
                      $refs.expirationTimeMenu.save(time.expirationTime)
                    "
                    landscape
                    scrollable
                  >
                  </v-time-picker>
                </v-menu>
              </v-col>
            </v-row>

            <v-btn type="submit" large color="primary" class="mt-4"
              >ایجاد</v-btn
            >
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import { DefaultPromotionGroupData as DefaultData } from "@/constant/promotion-group";
import { IOffer } from "@/interfaces/entities/offer.interface";
import { IPromotionGroup } from "@/interfaces/constant/group.interface";
import _ from "lodash";
import { OperatorEnum } from "@/enums/general.enum";

const noNumber: number = undefined as unknown as number;

export default Vue.extend({
  data(): {
    [key: string]: unknown;
    offer: IOffer;
    defaultData: IPromotionGroup;
    context: string;
    startDateMenu: boolean;
    expirationDateMenu: boolean;
    time: Record<string, string>;
  } {
    const title = "ایجاد پیشنهاد ";
    return {
      title,
      breadcrumbs: [
        {
          text: "صفحه اصلی",
          to: "/",
        },
        {
          text: "لیست پیشنهادات",
          to: { name: "AllOffers" },
        },
        {
          text: title,
          to: document.location.pathname,
        },
      ],
      offer: {
        name: "",
        code: "",
        singularity: false,
        trigger: { type: "", value: noNumber },
        target: {
          type: "",
          value: noNumber,
          reduction: noNumber,
        },
        maxDiscount: noNumber,
        minTotal: noNumber,
        countLimit: noNumber,
        expirationDate: null,
        startDate: null,
        triggerGroup: {},
        targetGroup: {},
      } as IOffer,
      context: "",
      defaultData: DefaultData,
      startDateMenu: false,
      startTimeMenu: false,
      startTimePickerMenu: false,
      time: {
        startTime: "",
        startDate: "",
        expirationTime: "",
        expirationDate: "",
      },
      expirationDateMenu: false,
      expirationTimeMenu: false,
      expirationTimePickerMenu: false,
      expirationTime: "",
    };
  },

  methods: {
    // getExportedData(event): void {
    //   this.offer[event.group] = event.data.target;
    // },

    createOffer(back?: boolean): void {
      // Promise.resolve(() => {
      //   (this as any).$refs.triggerGroupComponent.updateGroup();
      // }).then(() => {
      //   (this as any).$refs.targetGroupComponent.updateGroup();
      // });

      this.offer.startDate = this.timeGenerator(
        this.time.startDate,
        this.time.startTime
      );
      this.offer.expirationDate = this.timeGenerator(
        this.time.expirationDate,
        this.time.expirationTime
      );
      this.multiplyTen();
      Vue.prototype.$api.promotion
        .createOffer(this.offer, this.id)
        .then(() => {
          Vue.prototype.$toast("success", "پیشنهاد با موفقیت ایجاد شد.");
          back && this.$router.push({ name: "AllOffers" });
        })
        .catch(() => {
          Vue.prototype.$toast("error", "مشکلی در ایجاد پیشنهاد رخ داد.");
        });
    },

    multiplyTen(): void {
      _.assign(this.offer, {
        reduction:
          this.offer.target.reduction > 1
            ? this.offer.target.reduction * 10
            : this.offer.target.reduction,
        minTotal: this.changeNumber(this.offer.minTotal, OperatorEnum.MULTIPLE),
        maxDiscount: this.changeNumber(
          this.offer.maxDiscount,
          OperatorEnum.MULTIPLE
        ),
      });
    },

    changeNumber(
      number: number | undefined,
      operator: OperatorEnum
    ): number | undefined {
      if (!number || number === -1) return number;
      else number = +number;

      if (operator === OperatorEnum.DIVIDER) return number / 10;
      else if (operator === OperatorEnum.MULTIPLE) return number * 10;
    },

    timeGenerator(date: string, time: string): string | null {
      if (date && time) return new Date(`${date} ${time}`).toISOString();
      return null;
    },

    clearStartTime(): void {
      this.time.startTime = "";
      this.time.startDate = "";
    },

    clearexpirationTime(): void {
      this.time.expirationTime = "";
      this.time.expirationDate = "";
    },
  },
});
</script>
