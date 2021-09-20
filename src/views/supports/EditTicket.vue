<template>
  <v-container fluid>
    <h1 class="blue--text">{{ title }}</h1>
    <v-breadcrumbs :items="breadcrumbs"></v-breadcrumbs>

    <v-card id="form" class="mt-2 mb-5 pa-4">
      <v-row>
        <v-col>
          <v-text-field
            label="یادداشت"
            hide-details="auto"
            class="mb-4"
            v-model="formHint"
          >
            <v-icon slot="prepend" color="blue">mdi-format-title </v-icon>
          </v-text-field>
        </v-col>

        <!-- <v-col class="col-12 col-md-4">
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
              <v-list-item
                v-bind="attrs"
                v-on="on"
              >
                <v-list-item-title
                  :id="attrs['aria-labelledby']"
                  v-text="item.text"
                ></v-list-item-title>
              </v-list-item>
            </template>
            <v-icon
              slot="prepend"
              color="blue"
            >mdi-alarm-light-off</v-icon>
          </v-autocomplete>
        </v-col> -->
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
        @click="updateReply()"
        >ویرایش</v-btn
      >
    </v-card>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import * as _ from "lodash";
import Editor from "@tinymce/tinymce-vue";
import { IContext, ITicket } from "@/interfaces/entities/ticket.interface";
import { IPagination } from "@/interfaces/others/pagination.interface";

export default Vue.extend({
  props: {
    id: { type: String, required: true },
    contextCode: { type: String, required: true },
  },
  data(): {
    [key: string]: unknown;
    formStatus: { text: string | undefined; value: number | undefined };
    ticket: ITicket;
    context: IContext;
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
      ticket: {} as unknown as ITicket,
      context: {} as unknown as IContext,
    };
  },
  methods: {
    updateReply(): void {
      const data = {
        text: this.formContent,
        code: this.ticket.code,
        contextCode: this.context.contextCode,
      };
      Vue.prototype.$api.support
        .editReply(data)
        .then(() => {
          Vue.prototype.$toast("success", "پاسخ با موفقیت بروزرسانی شد.");
          this.$router.go(-1);
        })
        .catch(() => {
          Vue.prototype.$toast("error", "مشکلی در بروزرسانی رخ داد.");
        });
    },
    findOne() {
      const pagination: IPagination = {
        option: {
          page: { eq: 1 },
          limit: { eq: 1 },
        },
        filter: {
          id: { eq: this.id },
        },
      };
      Vue.prototype.$api.support.getList(pagination).then((response) => {
        this.ticket = response.data.result[0];
        this.context = _.filter(this.ticket.context, [
          "contextCode",
          this.contextCode,
        ])[0];
        // TODO: this.formHint = this.context.hint
        this.formContent = this.context.text;
      });
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
  created() {
    this.findOne();
  },
});
</script>
