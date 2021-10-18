<template>
  <v-container fluid>
    <h1 class="blue--text">{{ title }}</h1>
    <v-breadcrumbs :items="breadcrumbs"></v-breadcrumbs>

    <v-row>
      <v-col cols="12">
        <v-card elevation="2" outlined id="jeanspoint" class="mt-2 pa-4">
          <v-form @submit.prevent="updateAdmin">
            <v-btn type="submit" large color="primary" class="mt-4"
              >ویرایش</v-btn
            >
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  data() {
    const title = "ویرایش ادمین ";
    return {
      title,
      breadcrumbs: [
        {
          text: "صفحه اصلی",
          to: "/",
        },
        {
          text: "لیست ادمین‌ها",
          to: { name: "AllAdmins" },
        },
        {
          text: title,
          to: document.location.pathname,
        },
      ],
    };
  },

  methods: {
    updateAdmin() {
      alert("oops");
    },
  },
});
</script>
