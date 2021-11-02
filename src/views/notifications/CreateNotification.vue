<template>
  <v-container fluid>
    <h1 class="blue--text">{{ title }}</h1>
    <v-breadcrumbs :items="breadcrumbs"></v-breadcrumbs>

    <v-row>
      <v-col cols="12" :md="formCondition() ? '9' : '12'">
        <v-card elevation="2" outlined id="form" class="mt-2 pa-4">
          <v-row>
            <v-col cols="12" :md="formCondition() ? '12' : '4'">
              <v-text-field
                label="عنوان"
                v-model="formTitle"
                :rules="rules"
                hide-details="auto"
                name="notes"
              >
                <v-icon slot="prepend" color="blue">mdi-format-title</v-icon>
              </v-text-field>
            </v-col>

            <v-col cols="12" :md="formCondition() ? '6' : '4'">
              <v-file-input
                v-model="formImage"
                accept="image/png, image/jpeg, image/bmp"
                placeholder="تصویر اعلان را انتخاب کنید"
                prepend-icon="mdi-wallpaper"
                color="blue"
                :show-size="1000"
                truncate-length="30"
                @change="getSrcFromFile('imageUrl', formImage)"
                hide-details="auto"
              ></v-file-input>
            </v-col>

            <v-col cols="12" :md="formCondition() ? '6' : '4'">
              <v-file-input
                v-model="formIcon"
                accept="image/png, image/jpeg, image/bmp"
                placeholder="آیکون اعلان را انتخاب کنید"
                prepend-icon="mdi-wallpaper"
                color="blue"
                :show-size="1000"
                truncate-length="30"
                @change="getSrcFromFile('iconUrl', formIcon)"
                hide-details="auto"
              ></v-file-input>
            </v-col>

            <v-col cols="12" :md="formCondition() ? '6' : '4'">
              <v-autocomplete
                label="گروه‌های کاربری"
                v-model="roles"
                :items="customerTypeArray()"
                item-text="text"
                item-value="value"
                chips
                clearable
                deletable-chips
                multiple
                small-chips
                hide-details="auto"
              >
                <v-icon slot="prepend" color="blue">mdi-account</v-icon>
              </v-autocomplete>
            </v-col>

            <v-col cols="12" md="4">
              <v-switch v-model="push" label="پوش‌نوتیفیکیشن" inset></v-switch>
            </v-col>
          </v-row>
          <!-- Message Body -->
          <editor
            :api-key="tinyApiKey()"
            :init="tinyInit()"
            v-model="formContent"
          />

          <!-- Submit Button -->
          <v-btn large color="primary" class="mt-4" @click="submitForm"
            >ایجاد</v-btn
          >
        </v-card>
      </v-col>

      <v-col v-if="formCondition()" cols="12" md="3" class="mb-5">
        <v-card elevation="2" outlined class="mx-auto mt-2" max-width="374">
          <v-card-title>
            <v-img
              v-if="iconUrl"
              max-width="48"
              height="auto"
              :src="iconUrl"
              class="ml-3 rounded-xl"
            ></v-img>
            <span>{{ formTitle }}</span>
          </v-card-title>

          <v-img
            v-if="imageUrl"
            :max-width="374"
            :max-height="242"
            contain
            :src="imageUrl"
          ></v-img>

          <v-card-text>
            <div class="px-4" v-html="formContent"></div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <PushNotification
      v-if="push"
      class="mt-4"
      @export-notification="notificationEvent"
    />
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import Editor from "@tinymce/tinymce-vue";
import PushNotification from "./PushNotification.vue";
import _ from "lodash";
import { globals } from "@/common/globals/globals";
import { IPushNotification } from "@/interfaces/entities/notification.interface";
import { FirebaseCollectionsEnum } from "@/enums/firebase.enum";
import { customerType } from "@/mixin/string.mixin";

export default Vue.extend({
  data(): {
    [key: string]: unknown;
    pushNotification: IPushNotification;
    time_to_live: number;
    formTitle: string;
  } {
    const title = "ایجاد اعلان جدید";
    return {
      title,
      push: false,
      formTitle: "",
      formContent: "",
      formImage: null,
      formIcon: null,
      imageUrl: "",
      iconUrl: "",
      breadcrumbs: [
        {
          text: "صفحه اصلی",
          to: "/",
        },
        {
          text: "لیست اعلانات",
          to: { name: "AllNotifications" },
        },
        {
          text: title,
          to: document.location.pathname,
        },
      ],
      selectItems: [
        { text: "پیامک", value: "SMS" },
        { text: "اعلان", value: "PUSH" },
      ],
      rules: [
        (value: string) => !!value || "پر کردن این فیلد الزامیست",
        (value: string) =>
          (value && value.length >= 3) || "وارد کردن حداقل ۳ کاراکتر الزامیست",
      ],
      pushNotification: {} as IPushNotification,
      time_to_live: 2419200,
      inProgress: false,
      roles: [],
    };
  },

  methods: {
    async submitForm(): Promise<void> {
      if (this.inProgress) {
        Vue.prototype.$toast("error", "لطفا صبر کنید.");
        return;
      }

      if (this.push && (!this.formTitle || !this.formContent)) {
        Vue.prototype.$toast("error", "اطلاعات وارد شده کافی نیست.");
        return;
      }

      this.inProgress = true; // if user try to click more than once get error
      let data: Record<string, unknown> = {
        title: this.formTitle,
        body: this.formContent,
        roles: this.roles,
      };
      this.pushNotification.title = this.formTitle;
      try {
        if (this.formImage)
          await Vue.prototype.$api.media
            .upload("banner", this.formImage)
            .then((response) => {
              if (response.status === 200) {
                data.image = response.data.image;
                this.pushNotification.image =
                  globals.mediaServerStatic + data.image;
              }
            });
        if (this.formIcon)
          await Vue.prototype.$api.media
            .upload("icon", this.formIcon)
            .then((response) => {
              if (response.status === 200) {
                data.icon = response.data.image;
                this.pushNotification.icon =
                  globals.mediaServerStatic + data.icon;
              }
            });
        await Vue.prototype.$api.notification
          .create(data)
          .then(async (response) => {
            this.pushNotification.id = response.data.id;
            this.pushNotification.sent = false;
            Vue.prototype.$toast("success", "با موفقیت ایجاد شد.");
            if (this.push) {
              await this.firebaseInsertNotification();
              await this.sendPushNotification();
            }
            this.$router.push({ name: "AllNotifications" });
          });
        Vue.prototype.$toast("success", "با موفقیت ایجاد شد.");
      } catch {
        Vue.prototype.$toast("error", "مشکلی در ایجاد اعلان رخ داد.");
      }
    },

    getSrcFromFile(type: string, file: FileReader): void {
      this[type] = file ? URL.createObjectURL(file) : undefined;
    },

    formCondition() {
      return !!(
        this.imageUrl ||
        this.iconUrl ||
        this.formTitle ||
        this.formContent
      );
    },

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    notificationEvent(event: any) {
      this.time_to_live = event.time_to_live;
      event = _.omit(event, "time_to_live");
      this.pushNotification = _.assign(this.pushNotification, event);
    },

    async firebaseInsertNotification() {
      await Vue.prototype.$api.firebase
        .upsert(
          FirebaseCollectionsEnum.NOTIFICATIONS,
          this.pushNotification.id,
          this.pushNotification
        )
        .then(() => console.log("New Notification Created"));
    },

    async sendPushNotification() {
      await Vue.prototype.$api.firebase.sendPushToQuery(
        FirebaseCollectionsEnum.USERS,
        {
          fieldPath: "erpCustomerType",
          opStr: "in",
          value: this.pushNotification.erpCustomerType,
        },
        this.pushNotification,
        this.time_to_live
      );

      // update push notification and make sent true
      this.pushNotification.sent = true;
      await Vue.prototype.$api.firebase
        .upsert(
          FirebaseCollectionsEnum.NOTIFICATIONS,
          this.pushNotification.id,
          this.pushNotification
        )
        .then(() => console.log("Notification Sent True"));
    },

    customerTypeArray() {
      let types: Record<string, unknown>[] = [];
      for (let i = -11; i <= 12; i++)
        if (i !== 9)
          types.push({ text: customerType(String(i)).name, value: i });
      return types;
    },
  },

  components: {
    editor: Editor,
    PushNotification,
  },
});
</script>
