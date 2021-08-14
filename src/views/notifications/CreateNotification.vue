<template>
  <v-container fluid>
    <h1 class="blue--text">{{ title }}</h1>
    <v-breadcrumbs :items="breadcrumbs"></v-breadcrumbs>

    <v-row>
      <v-col cols="12" :md="formCondition() ? '9' : '12'">
        <v-card id="form" class="mt-2 pa-4">
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

            <v-col cols="12" :md="formCondition() ? '6' : '3'">
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

            <v-col cols="12" :md="formCondition() ? '6' : '3'">
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

            <v-col cols="12" md="1">
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
        <v-card elevation="2" class="mx-auto mt-2" max-width="374">
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
import NotificationService from "@/services/Notification.service";
import MediaService from "@/services/Media.service";
import PushNotification from "./PushNotification.vue";
import * as _ from "lodash";
import { globals } from "@/common/globals/globals";
import { IPushNotification } from "@/interfaces/entities/notification.interface";
import FirebaseService from "@/services/Firebase.service";
import { FirebaseCollectionsEnum } from "@/enums/firebase";

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
    };
  },

  methods: {
    async submitForm(): Promise<void> {
      if (this.push && (!this.formTitle || !this.formContent)) {
        Vue.prototype.$toast("error", "اطلاعات وارد شده کافی نیست.");
        return;
      }
      let data: Record<string, unknown> = {
        title: this.formTitle,
        body: this.formContent,
      };
      this.pushNotification.title = this.formTitle;
      try {
        if (this.formImage)
          await MediaService.upload("banner", this.formImage).then(
            (response) => {
              if (response.data.statusCode === 201) {
                data.image = response.data.data.image;
                this.pushNotification.image =
                  globals.mediaServerStatic + data.image;
              }
            }
          );
        if (this.formIcon)
          await MediaService.upload("icon", this.formIcon).then((response) => {
            if (response.data.statusCode === 201) {
              data.icon = response.data.data.image;
              this.pushNotification.icon =
                globals.mediaServerStatic + data.icon;
            }
          });
        await NotificationService.create(data).then(async (response) => {
          this.pushNotification.id = response.data.data.id;
          this.pushNotification.sent = false;
          Vue.prototype.$toast("success", "با موفقیت ایجاد شد.");
          if (this.push) {
            await this.firebaseInsertNotification();
            await this.sendPushNotification();
          }
          this.$router.go(-1);
        });

        Vue.prototype.$toast("success", "با موفقیت ایجاد شد.");
      } catch (error) {
        Vue.prototype.$toast("error", error.message);
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

    notificationEvent(event: any) {
      this.time_to_live = event.time_to_live;
      event = _.omit(event, "time_to_live");
      this.pushNotification = _.assign(this.pushNotification, event);
      console.log(this.pushNotification);
    },

    async firebaseInsertNotification() {
      await FirebaseService.upsert(
        FirebaseCollectionsEnum.NOTIFICATIONS,
        this.pushNotification.id,
        this.pushNotification
      ).then(() => console.log("New Notification Created"));
    },

    async sendPushNotification() {
      await FirebaseService.sendPushToQuery(
        FirebaseCollectionsEnum.USERS,
        {
          fieldPath: "erpCustomerType",
          opStr: "in",
          value: this.pushNotification.erpCustomerType,
        },
        this.pushNotification,
        this.time_to_live
        // new Date()
      );

      // update push notification and make sent true
      this.pushNotification.sent = true;
      await FirebaseService.upsert(
        FirebaseCollectionsEnum.NOTIFICATIONS,
        this.pushNotification.id,
        this.pushNotification
      ).then(() => console.log("Notification Sent True"));
    },
  },

  components: {
    editor: Editor,
    PushNotification,
  },
});
</script>
