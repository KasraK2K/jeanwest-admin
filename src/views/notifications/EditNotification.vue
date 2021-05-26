<template>
  <v-container fluid>
    <h1 class="blue--text">{{ title }}</h1>
    <v-breadcrumbs :items="breadcrumbs"></v-breadcrumbs>

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
                <v-icon slot="prepend" color="blue">mdi-format-title</v-icon>
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
                @change="getSrcFromFile(formImage)"
              ></v-file-input>
            </v-col>

            <v-col sm="12" :md="formCondition() ? '6' : '3'">
              <v-select
                label="نوع"
                v-model="formType"
                :items="selectItems"
                item-text="text"
                item-value="value"
                disabled
                return-object
              >
                <v-icon slot="prepend" color="blue">mdi-alarm-light-off</v-icon>
              </v-select>
            </v-col>
          </v-row>
          <!-- Message Body -->
          <editor
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
          <v-card-title>{{ formTitle }}</v-card-title>

          <v-img height="auto" :src="imageUrl"></v-img>

          <v-card-text>
            <span>{{ formType.text }}</span>

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
import { INotifications } from "@/interfaces/notification.interface";

export default Vue.extend({
  props: {
    id: { type: String, required: true },
  },
  data(): {
    formType: { text: string; value: string };
    [key: string]: unknown;
    notification?: INotifications;
  } {
    const title = "ویرایش اعلان ";
    return {
      title,
      notification: undefined,
      formTitle: "",
      formContent: "",
      formType: { text: "", value: "" },
      formImage: null,
      imageUrl: "",
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
    };
  },
  methods: {
    findOne(id: string): void {
      // FIXME
      NotificationService.findOne(id).then((response) => {
        const notification: INotifications = response.data.data;
        this.notification = notification;
        this.title += notification.title;
        this.formTitle = notification.title;
        this.formContent = notification.body;
        this.imageUrl = notification.image;
      });
    },
    submitData(): void {
      const data = {
        title: this.formTitle,
        body: this.formContent,
        // type: this.formType && this.formType.value,
        image: this.imageUrl,
      };
      // use service to upload image 'this.formImage'
      NotificationService.edit(data, this.id).then((response) => {
        Vue.prototype.$toast("success", "با موفقیت آپدیت شد.");
        this.$router.go(-1);
      });
    },
    getSrcFromFile(file: FileReader): void {
      this.imageUrl = URL.createObjectURL(file);
    },
    formCondition(): boolean {
      return !!(
        this.imageUrl ||
        this.formTitle ||
        this.formContent ||
        this.formType.text
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
