<template>
  <editor
    :id="id"
    api-key="pgxbkqy8xfl67jrbzbpzlfv76ove7nzl6nmkxm5kdg1wwyn5"
    :init="{
      height: 500,
      menubar: false,
      plugins: [
        'advlist autolink lists link image charmap print preview anchor',
        'searchreplace visualblocks code fullscreen',
        'insertdatetime media table paste code help wordcount',
      ],
      toolbar:
        'undo redo | formatselect | bold italic backcolor | \
        alignleft aligncenter alignright alignjustify | \
        bullist numlist outdent indent | removeformat | help',
    }"
  />
</template>

<script>
import Editor from "@tinymce/tinymce-vue";

export default {
  components: {
    editor: Editor,
  },
  props: {
    id: { type: String, require: true },
  },
};
</script>
