<template>
  <v-container fluid>
    <h1 class="blue--text">{{ title }}</h1>
    <v-breadcrumbs :items="breadcrumbs" class="mb-3"></v-breadcrumbs>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  data() {
    const title = "ایجاد تخفیف";
    return {
      title,
      breadcrumbs: [
        {
          text: "صفحه اصلی",
          to: "/",
        },
        {
          text: "لیست تخفیف‌ها",
          to: { name: "AllDiscounts" },
        },
        {
          text: title,
          to: document.location.pathname,
        },
      ],
    };
  },
});
</script>
