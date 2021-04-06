<template>
  <v-list shaped>
    <v-list-item-group v-model="selectedItem" color="primary">
      <!-- dashboard -->
      <router-link :to="{ name: 'Home' }">
        <v-list-item>
          <v-list-item-icon>
            <v-icon>mdi-home</v-icon>
          </v-list-item-icon>
          <v-list-item-title>داشبورد</v-list-item-title>
        </v-list-item>
      </router-link>
      <!-- dashboard -->

      <!-- dashboard -->
      <router-link :to="{ name: 'Card' }">
        <v-list-item>
          <v-list-item-icon>
            <v-icon>mdi-widgets</v-icon>
          </v-list-item-icon>
          <v-list-item-title>کارت‌ها</v-list-item-title>
        </v-list-item>
      </router-link>
      <!-- dashboard -->

      <!-- users -->
      <v-list-group :value="false" prepend-icon="mdi-account-circle">
        <!-- #1 -->
        <template v-slot:activator>
          <v-list-item-title>کاربران</v-list-item-title>
        </template>

        <!-- #2 -->
        <v-list-group :value="false" no-action sub-group>
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>ادمین‌ها</v-list-item-title>
            </v-list-item-content>
          </template>

          <!-- #3 -->
          <router-link
            v-for="([title, icon, link], i) in admins"
            :key="i"
            :to="{ name: link }"
          >
            <v-list-item link>
              <v-list-item-icon>
                <v-icon v-text="icon"></v-icon>
              </v-list-item-icon>
              <v-list-item-title v-text="title"></v-list-item-title>
            </v-list-item>
          </router-link>
        </v-list-group>
      </v-list-group>
      <!-- users -->
    </v-list-item-group>
  </v-list>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "SidebarLists",

  data() {
    return {
      admins: [
        ["نمایش", "mdi-account-multiple-outline", "AllAdmins"],
        ["دسترسی", "mdi-account-multiple-outline", "AllAdmins"],
      ],
    };
  },
});
</script>
