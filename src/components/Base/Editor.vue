<template>
  <editor :api-key="tinyApiKey" :init="tinyInit" />
</template>

<script lang="ts">
import Vue from "vue";
import Editor from "@tinymce/tinymce-vue";
import { tinyApiKey, tinyInit } from "@/common/globals/plugins/tinymce.setting";

export default Vue.extend({
  components: {
    editor: Editor,
  },
  data() {
    return {
      tinyApiKey,
      tinyInit,
    };
  },
});
</script>
