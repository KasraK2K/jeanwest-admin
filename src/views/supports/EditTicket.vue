<template>
  <v-container fluid>
    <h1 class="blue--text">{{ title }}</h1>
    <v-breadcrumbs :items="breadcrumbs"></v-breadcrumbs>

    <v-card id="form" class="mt-2 mb-5 pa-4">
      <v-row>
        <v-col sm="12" md="8">
          <v-text-field
            label="یادداشت"
            hide-details="auto"
            class="mb-4"
            v-model="formHint"
          >
            <v-icon slot="prepend" color="blue">mdi-format-title </v-icon>
          </v-text-field>
        </v-col>

        <v-col class="col-12 col-md-4">
          <v-select
            :items="[
              { text: 'بسته', value: 0 },
              { text: 'باز', value: 1 },
              { text: 'در حال پیگیری', value: 2 },
            ]"
            item-text="text"
            item-value="value"
            label="وضعیت"
            v-model="formStatus"
            return-object
          >
            <template v-slot:item="{ item, attrs, on }">
              <v-list-item v-bind="attrs" v-on="on">
                <v-list-item-title
                  :id="attrs['aria-labelledby']"
                  v-text="item.text"
                ></v-list-item-title>
              </v-list-item>
            </template>
            <v-icon slot="prepend" color="blue">mdi-alarm-light-off</v-icon>
          </v-select>
        </v-col>
      </v-row>
      <!-- Message Body -->
      <editor :api-key="tinyApiKey()" :init="tinyInit()" v-model="formContent" />

      <!-- Submit Button -->
      <v-btn
        type="submit"
        large
        color="primary"
        class="mt-4"
        @click="submitData()"
        >ارسال</v-btn
      >
    </v-card>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import Editor from "@tinymce/tinymce-vue";

export default Vue.extend({
  data(): {
    [key: string]: unknown;
    formStatus: { text: string | undefined; value: number | undefined };
    ticket: {
      no: number | undefined;
      id: string | undefined;
      title: string | undefined;
      hint: string | undefined;
      content: string | undefined;
      code: string | undefined;
      date: string | undefined;
      status: number | undefined;
    };
  } {
    const title = "تیتر سوال کاربر";
    return {
      title,
      formHint: undefined,
      formStatus: { text: undefined, value: undefined },
      formContent: undefined,
      breadcrumbs: [
        {
          text: "صفحه اصلی",
          to: "/",
        },
        {
          text: "لیست تیکت‌ها",
          to: { name: "AllTickets" },
        },
        {
          text: title,
          to: document.location.pathname,
        },
      ],
      ticket: {
        no: undefined,
        id: undefined,
        title: undefined,
        hint: undefined,
        content: undefined,
        code: undefined,
        date: undefined,
        status: undefined,
      },
    };
  },
  props: {
    id: { type: String, required: true },
  },
  methods: {
    submitData(): void {
      const data = {
        hint: this.formHint,
        status: this.formStatus.value,
        content: this.formContent,
      };
      console.log("create ticket data:", data);
      // use service for send data to server
    },
    getData() {
      this.ticket = {
        no: 1,
        id: "43b5a165-0bb6-4e10-8aec-7eb06dfed1c2",
        title: "مشکل در ثبت سفارش با کارت  سپه",
        hint: "خیلی حرف میزنه حال نمی‌کنم باش",
        content:
          "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.",
        code: "TCK-XA66854",
        date: "2020/06/11",
        status: 1,
      };
    },
    statusGen(): string {
      if (this.ticket.status === 0) return "بسته";
      else if (this.ticket.status === 1) return "باز";
      else return "در حال پیگیری";
    },
  },
  components: {
    editor: Editor,
  },
  mounted() {
    setTimeout(() => {
      this.getData();
      this.formHint = this.ticket.hint;
      this.formStatus.value = this.ticket.status;
      this.formStatus.text = this.statusGen();
      this.formContent = this.ticket.content;
    }, 2000);
  },
});
</script>
