<template>
  <v-container fluid>
    <h1 class="blue--text">{{ title }}</h1>
    <v-breadcrumbs :items="breadcrumbs"></v-breadcrumbs>

    <v-row>
      <v-col cols="12">
        <v-card elevation="2" outlined id="jeanspoint" class="mt-2 pa-4">
          <v-form @submit.prevent="createAdmin">
            <v-row>
              <v-col cols="12" md="3">
                <v-text-field
                  label="نام"
                  v-model.trim="admin.firstName"
                  :rules="rules.text"
                  hide-details="auto"
                >
                  <v-icon slot="prepend" color="blue">mdi-format-title</v-icon>
                </v-text-field>
              </v-col>

              <v-col cols="12" md="3">
                <v-text-field
                  label="نام خانوادگی"
                  v-model.trim="admin.lastName"
                  :rules="rules.text"
                  hide-details="auto"
                >
                  <v-icon slot="prepend" color="blue">mdi-format-title</v-icon>
                </v-text-field>
              </v-col>

              <v-col cols="12" md="3">
                <v-text-field
                  label="موبایل"
                  v-model.trim="admin.phoneNumber"
                  :rules="rules.mobile"
                  hide-details="auto"
                >
                  <v-icon slot="prepend" color="blue">mdi-format-title</v-icon>
                </v-text-field>
              </v-col>

              <v-col cols="12" md="3">
                <v-autocomplete
                  label="سطوح دسترسی کلی"
                  v-model="admin.permissions"
                  :items="AdminCrudPermissions"
                  item-text="text"
                  item-value="value"
                  chips
                  clearable
                  deletable-chips
                  multiple
                  small-chips
                  hide-selected
                  hide-details="auto"
                >
                  <v-icon slot="prepend" color="blue">mdi-account</v-icon>
                </v-autocomplete>
              </v-col>

              <v-col cols="12">
                <v-autocomplete
                  label="سطوح دسترسی به ماژول‌ها"
                  v-model="admin.permissions"
                  :items="AdminModulePermissions"
                  item-text="text"
                  item-value="value"
                  chips
                  clearable
                  deletable-chips
                  multiple
                  small-chips
                  hide-selected
                  hide-details="auto"
                >
                  <v-icon slot="prepend" color="blue">mdi-account</v-icon>
                </v-autocomplete>
              </v-col>

              <v-col
                cols="12"
                class="d-flex flex-column justify-center align-center"
              >
                <p class="mb-3">سطوح دسترسی پیشفرض</p>
                <div>
                  <v-btn
                    large
                    @click="giveAccess(ViewerAccess)"
                    color="teal"
                    class="ml-3"
                    >Viewer</v-btn
                  >
                  <v-btn
                    large
                    @click="giveAccess(EditorAccess)"
                    color="purple"
                    class="ml-3"
                    >Editor</v-btn
                  >
                  <v-btn
                    large
                    @click="giveAccess(OwnerAccess)"
                    color="pink"
                    class="ml-3"
                    >Owner</v-btn
                  >
                </div>
              </v-col>
            </v-row>

            <v-btn type="submit" large color="primary" class="mt-4"
              >ویرایش</v-btn
            >
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { IAdmin } from "@/interfaces/entities/admin.interface";
import Vue from "vue";
import * as _ from "lodash";
import {
  AdminCrudPermissions,
  AdminModulePermissions,
  AllCrudAccess,
  AllModuleAccess,
  ViewerAccess,
  EditorAccess,
  OwnerAccess,
} from "@/constant/admin-permissions";

export default Vue.extend({
  data(): {
    [key: string]: unknown;
    admin: IAdmin;
  } {
    const title = "ایجاد ادمین جدید";
    return {
      title,
      breadcrumbs: [
        {
          text: "صفحه اصلی",
          to: "/",
        },
        {
          text: "لیست ادمین‌ها",
          to: { name: "AllAdmins" },
        },
        {
          text: title,
          to: document.location.pathname,
        },
      ],
      admin: {
        firstName: undefined,
        lastName: undefined,
        phoneNumber: undefined,
        permissions: [],
      } as unknown as IAdmin,
      AdminCrudPermissions,
      AdminModulePermissions,
      AllModuleAccess,
      AllCrudAccess,
      ViewerAccess,
      EditorAccess,
      OwnerAccess,
      rules: {
        text: [
          (value: string) => !!value || "پر کردن این فیلد الزامیست",
          (value: string) =>
            (value && value.length >= 3) ||
            "وارد کردن حداقل ۳ کاراکتر الزامیست",
        ],
        mobile: [
          (value: string) => !!value || "پر کردن این فیلد الزامیست",
          (value: string) =>
            (value && value.length >= 3) ||
            "وارد کردن حداقل ۳ کاراکتر الزامیست",
          (value: number) =>
            (value && isNaN(value) === false) ||
            "لطفا شماره موبایل را صحیح وارد کنید.",
          (value: string) =>
            (value && value[0] === "0") ||
            "لطفا شماره موبایل را صحیح وارد کنید.",
        ],
      },
    };
  },

  methods: {
    createAdmin() {
      this.admin.phoneNumber = this.admin.phoneNumber.slice(1);
      Vue.prototype.$api.admin
        .create(this.admin)
        .then(() => {
          Vue.prototype.$toast("success", "با موفقیت ایجاد شد.");
          this.$router.go(-1);
        })
        .catch(() => {
          this.inProgress = true;
          Vue.prototype.$toast("error", "مشکلی در ایجاد ادمین رخ داد.");
        });
    },

    giveAccess(access: number[]): void {
      this.admin.permissions = [];
      _.assign(this.admin.permissions, access);
    },
  },
});
</script>
