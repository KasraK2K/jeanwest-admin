<template>
  <v-container fluid>
    <h1 class="blue--text">{{ title }}</h1>
    <v-breadcrumbs :items="breadcrumbs"></v-breadcrumbs>

    <!-- ──────────────────────────────────────────────────────────────────────────────────
    //   :::::: U P D A T E   J E A N S P O I N T : :  :   :    :     :        :          :
    ─────────────────────────────────────────────────────────────────────────────────── -->
    <v-row>
      <v-col>
        <v-card
          id="jeanspoint"
          class="mt-2 pa-4"
        >
          <v-card-title>
            <label
              for="JPName"
              class="pointer"
            >ویرایش امتیاز</label>
          </v-card-title>

          <v-form @submit.prevent="updateJeansPoint">
            <v-row>
              <v-col
                sm="12"
                md="8"
              >
                <v-text-field
                  label="نام"
                  v-model="JPName"
                  hide-details="auto"
                  name="name"
                  id="JPName"
                />
              </v-col>

              <v-col
                sm="12"
                md="4"
              >
                <v-autocomplete
                  label="وضعیت"
                  v-model="JPActive"
                  :items="[
                  { text: 'فعال', value: true },
                  { text: 'غیرفعال', value: false },
                ]"
                  item-text="text"
                  item-value="value"
                  hide-details="auto"
                  clearable
                ></v-autocomplete>
              </v-col>
            </v-row>

            <v-btn
              type="submit"
              large
              color="primary"
              class="mt-4"
            >ویرایش</v-btn>
          </v-form>
        </v-card>
      </v-col>
    </v-row>

    <!-- ────────────────────────────────────────────────────────────────────────
    //   :::::: U P D A T E   G R O U P : :  :   :    :     :        :          :
    ───────────────────────────────────────────────────────────────────────── -->
    <v-row>
      <v-col>
        <v-card
          id="group"
          class="mt-2 pa-4"
        >
          <v-card-title>
            <label
              for="GName"
              class="pointer"
            >ویرایش گروه</label>
          </v-card-title>

          <v-form @submit.prevent="updateGroup">
            <v-row>
              <v-col
                sm="12"
                md="8"
              >
                <v-text-field
                  label="نام"
                  v-model="GName"
                  hide-details="auto"
                  name="name"
                  id="GName"
                />
              </v-col>

              <v-col
                sm="12"
                md="4"
              >
                <v-autocomplete
                  label="وضعیت"
                  v-model="GActive"
                  :items="[
                  { text: 'فعال', value: true },
                  { text: 'غیرفعال', value: false },
                ]"
                  item-text="text"
                  item-value="value"
                  hide-details="auto"
                  clearable
                ></v-autocomplete>
              </v-col>
            </v-row>

            <v-btn
              type="submit"
              large
              color="primary"
              class="mt-4"
            >ویرایش</v-btn>
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
    const title = "ویرایش امتیاز ";
    return {
      title,
      breadcrumbs: [
        {
          text: "صفحه اصلی",
          to: "/",
        },
        {
          text: "لیست امتیازات",
          to: { name: "AllJeansPoints" },
        },
        {
          text: title,
          to: document.location.pathname,
        },
      ],
    };
  },
  methods: {
    updateJeansPoint() {
      console.log("updateJeansPoint");
    },
    updateGroup() {
      console.log("updateJeansPoint");
    },
  },
});
</script>