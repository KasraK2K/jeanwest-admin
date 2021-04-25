<template>
  <v-container fluid>
    <h1>تیتر سوال کاربر</h1>
    <v-divider class="mb-6 mt-3"></v-divider>

    <div class="d-flex flex-column" id="messages">
      <!-- admin answere -->
      <v-alert
        outlined
        text
        dark
        class="red--text align-self-end"
        style="max-width: 90%"
      >
        <div>
          برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود
          ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و
          آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها
          شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ
          پیشرو در زبان فارسی ایجاد کرد.
        </div>
      </v-alert>

      <v-alert
        outlined
        text
        dark
        class="blue--text align-self-start"
        style="max-width: 90%"
      >
        <div>
          <p>
            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
            استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در
            ستون و سطرآنچنان که لازم است.
          </p>
          <p>
            برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود
            ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و
            آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها
            شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و
            فرهنگ پیشرو در زبان فارسی ایجاد کرد.
          </p>
          <p>
            در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه
            راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل
            حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود
            طراحی اساسا مورد استفاده قرار گیرد.
          </p>
        </div>
      </v-alert>

      <!-- user question -->
      <v-alert
        outlined
        text
        dark
        class="red--text align-self-end"
        style="max-width: 90%"
      >
        <div>
          لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
          استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در
          ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و
          کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی
          در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می
          طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی
          الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این
          صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و
          شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای
          اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده
          قرار گیرد.
        </div>
      </v-alert>
    </div>

    <div id="form" class="mt-2">
      <form @submit.prevent="submitForm">
        <!-- Message Body -->
        <editor v-model="content" :api-key="tinyApiKey" :init="tinyInit" />

        <!-- Submit Button -->
        <v-btn type="submit" large color="primary" class="mt-4">ارسال</v-btn>
      </form>
    </div>
  </v-container>
</template>

<script>
import Editor from "@tinymce/tinymce-vue";
import {
  tinyApiKey,
  tinyInit,
} from "@/common/globals/settings/tinymce.setting";

export default {
  components: {
    editor: Editor,
  },
  data() {
    return {
      content: undefined,
      tinyApiKey,
      tinyInit,
    };
  },
  props: {
    id: { type: String, required: true },
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
      };
    },
  },
};
</script>
