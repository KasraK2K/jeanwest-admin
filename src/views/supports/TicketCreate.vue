<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <v-card class="pa-4">
          <form @submit.prevent="submitForm">
            <!-- Subject -->
            <v-row>
              <v-col sm="12" md="8">
                <v-text-field
                  label="موضوع"
                  :rules="rules"
                  hide-details="auto"
                  class="mb-4"
                  name="subject"
                >
                  <v-icon slot="prepend" color="blue">
                    mdi-format-title
                  </v-icon>
                </v-text-field>
              </v-col>
              <v-col sm="12" md="4">
                <v-select
                  :items="['جین‌وست', 'بانی‌مد', 'بالکافه']"
                  label="دپارتمان"
                  name="department"
                >
                  <template v-slot:item="{ item, attrs, on }">
                    <v-list-item v-bind="attrs" v-on="on">
                      <v-list-item-title
                        :id="attrs['aria-labelledby']"
                        v-text="item"
                      ></v-list-item-title>
                    </v-list-item>
                  </template>
                  <v-icon slot="prepend" color="blue">
                    mdi-account-hard-hat
                  </v-icon>
                </v-select>
              </v-col>
            </v-row>
            <!-- Message Body -->
            <editor v-model="content" :api-key="tinyApiKey" :init="tinyInit" />
            <!-- Submit Button -->
            <v-btn type="submit" large color="primary" class="mt-4"
              >ارسال</v-btn
            >
          </form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Editor from "@tinymce/tinymce-vue";
import { tinyApiKey, tinyInit } from "@/globals/settings/tinymce.setting";

export default {
  components: {
    editor: Editor,
  },
  methods: {
    submitForm(event) {
      const elements = event.target.elements;
      const data = this.formData(elements);
      console.log("submited", data);
      // use service for send data to server
    },
    formData(data) {
      return {
        message: this.content,
        department: data.department.value,
        subject: data.subject.value,
      };
    },
  },
  data() {
    return {
      rules: [
        (value) => !!value || "پر کردن این فیلد الزامیست",
        (value) =>
          (value && value.length >= 3) || "وارد کردن حداقل ۳ کاراکتر الزامیست",
      ],
      content: undefined,
      tinyApiKey,
      tinyInit,
    };
  },
  mounted() {
    console.log(process.env.VUE_APP_ROOT_API);
  },
};
</script>
