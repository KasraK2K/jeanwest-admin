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
          <v-autocomplete
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
          </v-autocomplete>
        </v-col>
      </v-row>
      <!-- Message Body -->
      <editor
        :api-key="tinyApiKey()"
        :init="tinyInit()"
        v-model="formContent"
      />

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
        <v-timeline-item :color="customerColor()" fill-dot right>
          <template v-slot:icon>
            <v-avatar>
              <img
                src="https://cdn2.iconfinder.com/data/icons/people-flat-design/64/Man-Person-People-Avatar-User-Happy-512.png"
              />
            </v-avatar>
          </template>
          <v-card :color="customerColor()" elevation="3" outlined rounded>
            <v-card-title>حسن حسنی کاربر</v-card-title>
            <v-card-text class="py-4">
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
        <v-timeline-item :color="customerColor()" fill-dot right>
          <template v-slot:icon>
            <v-avatar>
              <img
                src="https://cdn2.iconfinder.com/data/icons/people-flat-design/64/Man-Person-People-Avatar-User-Happy-512.png"
              />
            </v-avatar>
          </template>
          <v-card :color="customerColor()" elevation="3" outlined rounded>
            <v-card-title>حسن حسنی کاربر</v-card-title>
            <v-card-text class="py-4">
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
        <v-timeline-item :color="adminColor()" fill-dot left>
          <template v-slot:icon>
            <v-avatar>
              <img
                src="https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png"
              />
            </v-avatar>
          </template>
          <v-card :color="adminColor()" elevation="3" outlined rounded>
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
            <v-card-text class="py-4">
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
                icon="mdi-notebook-plus"
                dense
                border="left"
                class="font-italic font-weight-thin mt-2 mb-0"
                dark
              >
                خیلی حرف میزنه حال نمی‌کنم باش
              </v-alert>
            </v-card-text>
          </v-card>
        </v-timeline-item>

        <!-- user question -->
        <v-timeline-item :color="customerColor()" fill-dot right>
          <template v-slot:icon>
            <v-avatar>
              <img
                src="https://cdn2.iconfinder.com/data/icons/people-flat-design/64/Man-Person-People-Avatar-User-Happy-512.png"
              />
            </v-avatar>
          </template>
          <v-card :color="customerColor()" elevation="3" outlined rounded>
            <v-card-title>حسن حسنی کاربر</v-card-title>
            <v-card-text class="py-4">
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
import Editor from "@tinymce/tinymce-vue";
import { mapGetters } from "vuex";

export default Vue.extend({
  data(): {
    [key: string]: unknown;
    formStatus: { text: string | undefined; value: number | undefined };
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
    };
  },
  props: {
    id: { type: String, required: true },
  },
  methods: {
    createTicket(): void {
      const data = {
        hint: this.formHint,
        status: this.formStatus.value,
        content: this.formContent,
      };
      console.log("create ticket data:", data);
      // use service for send data to server
    },
    customerColor(): string {
      return this.themeGetter === "dark" ? "indigo" : "indigo lighten-5";
    },
    adminColor(): string {
      return this.themeGetter === "dark" ? "teal" : "teal lighten-4";
    },
  },
  components: {
    editor: Editor,
  },
  computed: {
    ...mapGetters(["themeGetter"]),
  },
});
</script>
