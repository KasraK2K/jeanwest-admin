<template>
  <editor :id="id" :api-key="tinyApiKey" :init="tinyInit" />
</template>

<script>
import Editor from "@tinymce/tinymce-vue";
import { tinyApiKey, tinyInit } from "@/common/globals/plugins/tinymce.setting";

export default {
  components: {
    editor: Editor,
  },
  props: {
    id: { type: String, require: true },
  },
  data() {
    return {
      tinyApiKey,
      tinyInit,
    };
  },
};
</script>
