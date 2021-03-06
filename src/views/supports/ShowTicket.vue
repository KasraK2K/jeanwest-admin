<template>
  <v-container fluid v-if="ready">
    <h1 class="blue--text">{{ title }}</h1>
    <v-breadcrumbs :items="breadcrumbs"></v-breadcrumbs>

    <v-card id="form" class="mt-2 mb-5 pa-4">
      <v-row>
        <v-col cols="12" md="8">
          <v-text-field
            label="یادداشت یادآوری"
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
            @change="changeStatus"
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
      <editor :api-key="tinyApiKey()" :init="tinyInit()" v-model="formText" />

      <!-- Submit Button -->
      <v-btn
        type="submit"
        large
        color="primary"
        class="mt-4"
        @click="createReply()"
        >پاسخ</v-btn
      >
    </v-card>

    <div class="d-flex flex-column" id="messages">
      <v-timeline align-top :dense="$vuetify.breakpoint.smAndDown">
        <v-timeline-item
          v-for="(context, i) in result.context"
          :key="i"
          :color="context.owner === 'customer' ? customerColor() : adminColor()"
          fill-dot
          :right="context.owner === 'customer' ? true : false"
          :left="context.owner === 'customer' ? false : true"
        >
          <template v-slot:icon>
            <v-avatar width="30" height="30">
              <img
                :src="
                  require(context.owner === 'customer'
                    ? '@/assets/images/user.png'
                    : '@/assets/images/admin.png')
                "
              />
            </v-avatar>
          </template>
          <v-card
            :color="
              context.owner === 'customer' ? customerColor() : adminColor()
            "
            elevation="3"
            outlined
            rounded
          >
            <div class="d-flex align-center justify-space-between">
              <v-card-title class="pr-4">{{
                context.owner === "customer" ? "کاربر" : "ادمین"
              }}</v-card-title>
              <v-card-title
                v-text="
                  toPersianString(
                    toPersianTime(
                      context.created_at,
                      'ddd D MMM YYYY - HH:mm:ss'
                    )
                  )
                "
                class="pr-4"
              />
              <router-link
                v-if="context.owner === 'support'"
                :to="{
                  name: 'EditTicket',
                  params: { id: result.id, contextCode: context.contextCode },
                }"
              >
                <v-icon class="float-left pl-4" large>
                  mdi-notebook-edit
                </v-icon>
              </router-link>
            </div>
            <v-card-text class="py-4">
              <p v-html="context.text" class="mb-0" />
              <v-alert
                v-if="context.hint"
                color="#2A3B4D"
                icon="mdi-notebook-plus"
                dense
                border="left"
                class="font-italic font-weight-thin mt-2 mb-0"
                dark
              >
                {{ context.hint }}
              </v-alert>
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
import { IPagination } from "@/interfaces/others/pagination.interface";
import { toPersianString } from "@/mixin/string.mixin";
import { ITicket } from "@/interfaces/entities/ticket.interface";

export default Vue.extend({
  props: {
    id: { type: String, required: true },
  },

  data(): {
    [key: string]: unknown;
    formStatus: { text: string | undefined; value: number | undefined };
    pagination: IPagination;
    result: ITicket;
  } {
    const title = "تیتر سوال ";
    return {
      title,
      ready: false,
      formHint: undefined,
      formStatus: { text: undefined, value: undefined },
      formText: "",
      pagination: {
        option: { page: { eq: 1 }, limit: { eq: 1 } },
        filter: { id: { eq: this.id } },
      },
      result: {} as ITicket,
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

  methods: {
    findOne(): void {
      Vue.prototype.$api.support.getList(this.pagination).then((response) => {
        let data: ITicket = response.data.result[0];
        data.context = data.context.reverse();
        this.result = data;
        this.formStatus.value = this.result.status;
        this.title += this.titleGenerator();
        this.ready = true;
      });
    },
    createReply(): void {
      const data = {
        hint: this.formHint,
        status: this.formStatus.value,
        text: this.formText,
        code: this.result.code,
      };
      Vue.prototype.$api.support
        .reply(data)
        .then(() => {
          this.formHint = undefined;
          this.formText = "";
        })
        .then(() => {
          this.findOne();
        });
      // use service for send data to server
    },
    customerColor(): string {
      return this.themeGetter === "dark" ? "indigo" : "indigo lighten-5";
    },
    adminColor(): string {
      return this.themeGetter === "dark" ? "teal" : "teal lighten-4";
    },
    changeStatus(): void {
      Vue.prototype.$api.support
        .changeStatus({
          code: this.result.code,
          status: this.formStatus.value,
        })
        .then(() => {
          Vue.prototype.$toast("success", "وضعیت تیکت با موفقیت تغییر کرد.");
        })
        .catch(() => {
          Vue.prototype.$toast("error", "مشکلی در بروزرسانی وضعیت رخ داد.");
        });
    },
    titleGenerator(): string {
      const title = `${this.result.customer.firstName} ${
        this.result.customer.lastName
      } - ۰${toPersianString(Number(this.result.customer.phoneNumber))}`;
      return title.replaceAll("null", "").trim();
    },
  },

  components: {
    editor: Editor,
  },

  computed: {
    ...mapGetters(["themeGetter"]),
  },

  mounted() {
    this.findOne();
  },
});
</script>
