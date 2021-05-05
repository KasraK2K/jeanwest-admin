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

        <v-col sm="12" md="4">
          <v-select
            :items="['در حال پیگیری', 'بسته', 'باز']"
            label="وضعیت"
            v-model="formStatus"
          >
            <template v-slot:item="{ item, attrs, on }">
              <v-list-item v-bind="attrs" v-on="on">
                <v-list-item-title
                  :id="attrs['aria-labelledby']"
                  v-text="item"
                ></v-list-item-title>
              </v-list-item>
            </template>
            <v-icon slot="prepend" color="blue">mdi-alarm-light-off</v-icon>
          </v-select>
        </v-col>
      </v-row>
      <!-- Message Body -->
      <Editor v-model="formContent" />

      <!-- Submit Button -->
      <v-btn
        type="submit"
        large
        color="primary"
        class="mt-4"
        @click="createTicket()"
        >ارسال</v-btn
      >
    </v-card>

    <div class="d-flex flex-column" id="messages">
      <v-timeline align-top :dense="$vuetify.breakpoint.smAndDown">
        <!-- user question -->
        <v-timeline-item color="purple darken-3" fill-dot right>
          <template v-slot:icon>
            <v-avatar>
              <img src="https://i.pravatar.cc/64" />
            </v-avatar>
          </template>
          <v-card color="purple darken-3" dark elevation="3" outlined rounded>
            <v-card-title>حسن حسنی کاربر</v-card-title>
            <v-card-text class="white text--primary py-4">
              <p class="mb-0">
                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
                استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله
                در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد
                نیاز، و کاربردهای متنوع با هدف بهبود.
              </p>
            </v-card-text>
          </v-card>
        </v-timeline-item>

        <!-- user question -->
        <v-timeline-item color="purple darken-3" fill-dot right>
          <template v-slot:icon>
            <v-avatar>
              <img src="https://i.pravatar.cc/64" />
            </v-avatar>
          </template>
          <v-card color="purple darken-3" dark elevation="3" outlined rounded>
            <v-card-title>حسن حسنی کاربر</v-card-title>
            <v-card-text class="white text--primary py-4">
              <p class="mb-0">
                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
                استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله
                در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد
                نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد،
                کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان
                جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را
                برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در
                زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و
                دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و
                زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات
                پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.
              </p>
            </v-card-text>
          </v-card>
        </v-timeline-item>

        <!-- admin answere -->
        <v-timeline-item color="indigo" fill-dot left>
          <template v-slot:icon>
            <v-avatar>
              <img src="https://i.pravatar.cc/64" />
            </v-avatar>
          </template>
          <v-card color="indigo" dark elevation="3" outlined rounded>
            <div class="d-flex align-center justify-space-between">
              <v-card-title class="pr-4">کسری کرمی ادمین</v-card-title>
              <router-link
                :to="{ name: 'EditTicket', params: { id: 'item.id' } }"
              >
                <v-icon class="float-left pl-4" large>
                  mdi-notebook-edit
                </v-icon>
              </router-link>
            </div>
            <v-card-text class="white text--primary py-4">
              <p class="mb-0">
                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
                استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله
                در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد
                نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد،
                کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان
                جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را
                برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در
                زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و
                دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و
                زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات
                پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.
              </p>
              <v-alert
                v-if="true"
                color="#2A3B4D"
                dark
                icon="mdi-notebook-plus"
                dense
                border="left"
                class="font-italic font-weight-thin mt-2 mb-0"
              >
                خیلی حرف میزنه حال نمی‌کنم باش
              </v-alert>
            </v-card-text>
          </v-card>
        </v-timeline-item>

        <!-- user question -->
        <v-timeline-item color="purple darken-3" fill-dot right>
          <template v-slot:icon>
            <v-avatar>
              <img src="https://i.pravatar.cc/64" />
            </v-avatar>
          </template>
          <v-card color="purple darken-3" dark elevation="3" outlined rounded>
            <v-card-title>حسن حسنی کاربر</v-card-title>
            <v-card-text class="white text--primary py-4">
              <p class="mb-0">
                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
                استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله
                در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد
                نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد،
                کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان
                جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را
                برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در
                زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و
                دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و
                زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات
                پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.
              </p>
            </v-card-text>
          </v-card>
        </v-timeline-item>
      </v-timeline>
    </div>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  data(): Record<string, unknown> {
    const title = "تیتر سوال کاربر";
    return {
      title,
      formHint: "",
      formStatus: "",
      formContent: "",
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
    };
  },
  props: {
    id: { type: String, required: true },
  },
  methods: {
    createTicket(): void {
      const data = {
        formHint: this.formHint,
        formStatus: this.formStatus,
        formContent: this.formContent,
      };
      console.log("create ticket data:", data);
      // use service for send data to server
    },
  },
});
</script>
