<template>
  <v-card elevation="2">
    <v-card-title>{{ pageTitle }}</v-card-title>

    <v-card-text>
      <v-row>
        <v-col cols="12" md="4">
          <v-text-field
            label="متن پوش‌نوتیفیکیشن"
            placeholder="لطفا متن پوش‌نوتیفیکیشن را وارد کنید."
            v-model.trim="body"
            @change="exportNotification()"
            clearable
            outlined
            hide-details="auto"
          ></v-text-field>
        </v-col>

        <!-- <v-col cols="12" md="4">
          <v-text-field
            label="اکشن کلیک"
            placeholder="لطفا یک آدرس اینترنتی برای اکشن وارد کنید."
            v-model.trim="click_action"
            @change="exportNotification()"
            clearable
            outlined
            hide-details="auto"
          ></v-text-field>
        </v-col> -->

        <v-col cols="12" md="4">
          <v-text-field
            label="زمان ماندگاری"
            placeholder="لطفا زمان ماندگاری پوش‌نوتیفیکیشن را وارد کنید."
            v-model.number="time_to_live"
            @change="exportNotification()"
            type="number"
            clearable
            outlined
            hide-details="auto"
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="4">
          <v-autocomplete
            label="گروه‌های کاربری"
            v-model="erpCustomerType"
            @change="exportNotification()"
            :items="customerTypeArray()"
            item-text="text"
            item-value="value"
            chips
            clearable
            deletable-chips
            multiple
            small-chips
            outlined
            hide-details="auto"
          ></v-autocomplete>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { MapCustomerType } from "@/constant/customer-type";
import { IMapCustomerType } from "@/interfaces/constant/map.interface";
import Vue from "vue";

export default Vue.extend({
  name: "PushNotification",

  data() {
    return {
      pageTitle: "ایجاد پوش‌نوتیفیکیشن",
      body: "",
      // click_action: "",
      time_to_live: 2419200,
      erpCustomerType: [],
    };
  },

  methods: {
    exportNotification() {
      const notification = {
        body: this.body,
        // click_action: this.click_action,
        time_to_live: this.time_to_live,
        erpCustomerType: this.erpCustomerType,
      };
      this.$emit("export-notification", notification);
    },

    customerTypeArray() {
      let types: Record<string, unknown>[] = [];
      for (let i = -11; i <= 12; i++)
        if (i !== 9)
          types.push({ text: this.customerType(String(i)).name, value: i });
      return types;
    },

    customerType(type: string): IMapCustomerType {
      return MapCustomerType.has(type)
        ? (MapCustomerType.get(type) as IMapCustomerType)
        : { erpName: "تعریف نشده", name: "تعریف نشده", color: "" };
    },
  },
});
</script>

<style lang="scss" scoped></style>
