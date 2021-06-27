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
      <v-col sm="12" :md="formCondition() ? '9' : '12'">
        <v-card id="form" class="mt-2 mb-5 pa-4">
          <v-row>
            <v-col sm="12" :md="formCondition() ? '12' : '6'">
              <v-text-field
                label="عنوان"
                v-model="formTitle"
                :rules="rules"
                hide-details="auto"
                name="notes"
              >
                <v-icon slot="prepend">mdi-format-title</v-icon>
              </v-text-field>
            </v-col>

            <v-col sm="12" :md="formCondition() ? '6' : '3'">
              <v-file-input
                v-model="formImage"
                accept="image/png, image/jpeg, image/bmp"
                placeholder="تصویر اعلان را انتخاب کنید"
                prepend-icon="mdi-wallpaper"
                color="blue"
                :show-size="1000"
                truncate-length="30"
                @change="getSrcFromFile('imageUrl', formImage)"
              ></v-file-input>
            </v-col>

            <v-col sm="12" :md="formCondition() ? '6' : '3'">
              <v-file-input
                v-model="formIcon"
                accept="image/png, image/jpeg, image/bmp"
                placeholder="آیکون اعلان را انتخاب کنید"
                prepend-icon="mdi-wallpaper"
                color="blue"
                :show-size="1000"
                truncate-length="30"
                @change="getSrcFromFile('iconUrl', formIcon)"
              ></v-file-input>
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
            >ارسال</v-btn
          >
        </v-card>
      </v-col>

      <v-col v-if="formCondition()" sm="12" md="3">
        <v-card elevation="2" class="mx-auto" max-width="374">
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
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import Editor from "@tinymce/tinymce-vue";
import NotificationService from "@/services/Notification.service";
import MediaService from "@/services/Media.service";
import { INotifications } from "@/interfaces/entities/notification.interface";
import { globals } from "@/common/globals/globals";

export default Vue.extend({
  props: {
    id: { type: String, required: true },
  },
  data(): {
    [key: string]: unknown;
    notification?: INotifications;
  } {
    const title = "ویرایش اعلان ";
    return {
      globals,
      ready: false,
      title,
      notification: undefined,
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
    };
  },
  methods: {
    findOne(id: string): void {
      NotificationService.findOne(id).then((response) => {
        const notification: INotifications = response.data.data;
        this.ready = true;
        this.notification = notification;
        this.title += notification.title;
        this.formTitle = notification.title;
        this.formContent = notification.body;
        this.imageUrl = notification.image;
        this.iconUrl = notification.icon;
      });
    },
    async submitData(): Promise<void> {
      const data = {
        title: this.formTitle,
        body: this.formContent,
      };
      try {
        if (this.formImage)
          await MediaService.upload("banner", this.formImage).then(
            (response) => {
              if (response.data.statusCode === 201)
                Object.assign(data, { image: response.data.data.image });
            }
          );
        if (this.formIcon)
          await MediaService.upload("icon", this.formIcon).then((response) => {
            if (response.data.statusCode === 201)
              Object.assign(data, { icon: response.data.data.image });
          });
        await NotificationService.edit(data, this.id).then(() => {
          console.log(data);
          Vue.prototype.$toast("success", "با موفقیت آپدیت شد.");
          this.$router.go(-1);
        });
      } catch (error) {
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
  },
  components: {
    editor: Editor,
  },
  mounted() {
    this.findOne(this.id);
  },
});
</script>
