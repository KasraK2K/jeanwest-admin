<template>
  <v-container fluid v-if="ready">
    <h1 class="blue--text">{{ title }}</h1>
    <v-breadcrumbs :items="breadcrumbs"></v-breadcrumbs>

    <v-row>
      <v-col cols="12">
        <v-card elevation="2" outlined id="jeanspoint" class="mt-2 pa-4">
          <v-form @submit.prevent="updateAdmin">
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

              <!-- admin.lastName -->
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

              <!-- admin.phoneNumber -->
              <v-col cols="12" md="3">
                <v-text-field
                  label="موبایل"
                  v-model.trim="phoneNumber"
                  :rules="rules.mobile"
                  hide-details="auto"
                >
                  <v-icon slot="prepend" color="blue">mdi-format-title</v-icon>
                </v-text-field>
              </v-col>

              <!-- admin.permissions -->
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

              <!-- admin.permissions -->
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

              <!-- default admin.permissions -->
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
import _ from "lodash";
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
  props: {
    id: { type: String, required: true },
  },
  data(): {
    [key: string]: unknown;
    admin: IAdmin;
    phoneNumber: string;
    ready: boolean;
  } {
    const title = "ویرایش ادمین ";
    return {
      title,
      ready: false,
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
      phoneNumber: "",
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

  mounted() {
    this.findOne();
  },

  methods: {
    findOne() {
      Vue.prototype.$api.admin.findOne(this.id).then((response) => {
        const admin: IAdmin = response.data;
        this.admin = admin;
        this.phoneNumber = `0${admin.phoneNumber}`;
        this.title += `${admin.firstName} ${admin.lastName}`;
        this.ready = true;
      });
    },

    updateAdmin() {
      this.admin.phoneNumber = this.phoneNumber.slice(1);
      Vue.prototype.$api.admin
        .edit(this.admin, this.id)
        .then(() => {
          Vue.prototype.$toast("success", "با موفقیت ویرایش شد.");
          this.$router.go(-1);
        })
        .catch((error) => {
          const data = error.response.data;
          data.statusCode === 409
            ? Vue.prototype.$toast("error", "ادمین با این موبایل موجود است.")
            : Vue.prototype.$toast("error", "مشکلی در ویرایش ادمین رخ داد.");
        });
    },

    giveAccess(access: number[]): void {
      this.admin.permissions = [];
      _.assign(this.admin.permissions, access);
    },
  },
});
</script>
