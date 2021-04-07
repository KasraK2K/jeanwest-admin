<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <v-card class="py-4 px-4">
          <form @submit.prevent="submitForm">
            <!-- <Tinymce id="message" /> -->
            <editor
              v-model="content"
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
            <v-btn type="submit" large color="primary" class="mt-4"
              >Submit</v-btn
            >
          </form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// import Tinymce from "@/components/Tinymce";
import Editor from "@tinymce/tinymce-vue";

export default {
  components: {
    editor: Editor,
  },
  // components: {
  //   Tinymce,
  // },
  methods: {
    submitForm(event) {
      const elements = event.target.elements;
      const data = this.formData(elements);
      console.log(data.message);
      // use service for send data to server
    },
    formData(data) {
      return {
        message: this.content,
      };
    },
  },
  data() {
    return {
      content: undefined,
    };
  },
};
</script>
