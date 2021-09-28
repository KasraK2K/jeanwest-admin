<template>
  <v-container fluid>
    <h1 class="blue--text">{{ title }}</h1>
    <v-breadcrumbs :items="breadcrumbs"></v-breadcrumbs>

    <!-- <v-card class="mb-3">
      <v-card-title>تغییر وضعیت تیکت</v-card-title>
      <v-row>
        
      </v-row>
    </v-card> -->

    <v-row>
      <v-col cols="12" :md="formCondition() ? '9' : '12'">
        <v-card id="form" class="mt-2 pa-4">
          <v-row>
            <v-col cols="12" :md="formCondition() ? '12' : '6'">
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
            v-if="ready"
            :api-key="tinyApiKey()"
            :init="tinyInit()"
            v-model="formContent"
          />

          <!-- Submit Button -->
          <v-btn large color="primary" class="mt-4" @click="submitData"
            >ویرایش</v-btn
          >
        </v-card>
      </v-col>

      <v-col v-if="formCondition()" cols="12" md="3" class="mb-5">
        <v-card elevation="2" class="mx-auto mt-2" max-width="374">
          <v-card-title>
            <v-img
              v-if="iconUrl"
              max-width="48"
              height="48"
              :src="mediaPath(iconUrl)"
              class="ml-3 rounded-xl"
            ></v-img>
            <span>{{ formTitle }}</span>
          </v-card-title>

          <v-img
            v-if="imageUrl"
            :max-width="374"
            :max-height="242"
            contain
            :src="mediaPath(imageUrl)"
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
import { INotification } from "@/interfaces/entities/notification.interface";
import { globals } from "@/common/globals/globals";
import { IPushNotification } from "@/interfaces/entities/notification.interface";
import { FirebaseCollectionsEnum } from "@/enums/firebase";
import * as _ from "lodash";

export default Vue.extend({
  props: {
    id: { type: String, required: true },
  },
  data(): {
    [key: string]: unknown;
    notification: INotification;
    pushNotification: IPushNotification;
    time_to_live: number;
    formTitle: string;
  } {
    const title = "ویرایش اعلان ";
    return {
      globals,
      title,
      push: false,
      ready: false,
      notification: {} as unknown as INotification,
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
        { text: "بسته شده", value: "0" },
        { text: "باز", value: "1" },
        { text: "در حال پیگیری", value: "2" },
      ],
      rules: [
        (value: string) => !!value || "پر کردن این فیلد الزامیست",
        (value: string) =>
          (value && value.length >= 3) || "وارد کردن حداقل ۳ کاراکتر الزامیست",
      ],
      pushNotification: {} as IPushNotification,
      time_to_live: 2419200,
      inProgress: false,
    };
  },

  methods: {
    findOne(id: string): void {
      Vue.prototype.$api.notification.findOne(id).then((response) => {
        const notification: INotification = response.data;
        this.ready = true;
        this.notification = notification;

        this.pushNotification.icon =
          globals.mediaServerStatic + this.notification.icon;
        this.pushNotification.image =
          globals.mediaServerStatic + this.notification.image;

        this.title += notification.title;
        this.formTitle = notification.title;
        this.formContent = notification.body;
        this.imageUrl = notification.image;
        this.iconUrl = notification.icon;
      });
    },

    async submitData(): Promise<void> {
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
          .edit(data, this.id)
          .then(async () => {
            this.pushNotification.id = this.notification.id;
            this.pushNotification.sent = false;
            Vue.prototype.$toast("success", "اعلان با موفقیت بروزرسانی شد.");
            if (this.push) {
              await this.firebaseInsertNotification();
              await this.sendPushNotification();
            }
            this.$router.push({ name: "AllNotifications" });
          })
          .catch(() => {
            this.inProgress = true;
            Vue.prototype.$toast("error", "مشکلی در بروزرسانی رخ داد.");
          });
      } catch (error) {
        this.inProgress = false;
        Vue.prototype.$toast("error", error.message);
      }
    },

    getSrcFromFile(type: string, file: FileReader): void {
      this[type] = file ? URL.createObjectURL(file) : undefined;
    },

    formCondition(): boolean {
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

      // update notification and make sent true
      this.pushNotification.sent = true;
      await Vue.prototype.$api.firebase
        .upsert(
          FirebaseCollectionsEnum.NOTIFICATIONS,
          this.pushNotification.id,
          this.pushNotification
        )
        .then(() => console.log("Notification Sent True"));
    },
  },

  components: {
    editor: Editor,
    PushNotification,
  },

  mounted() {
    this.findOne(this.id);
  },
});
</script>
