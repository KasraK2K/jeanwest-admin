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

      <!-- support -->
      <v-list-group :value="false" prepend-icon="mdi-lifebuoy">
        <!-- #1 -->
        <template v-slot:activator>
          <v-list-item-title>تیکت‌ها</v-list-item-title>
        </template>
        <!-- #2 -->
        <router-link :to="{ name: 'AllTickets' }">
          <v-list-group
            :value="false"
            no-action
            sub-group
            prepend-icon="mdi-checkbox-blank-circle-outline"
          >
            <template v-slot:activator>
              <v-list-item-title>لیست تیکت‌ها</v-list-item-title>
            </template>
          </v-list-group>
        </router-link>
      </v-list-group>
      <!-- support -->

      <!-- notification -->
      <v-list-group :value="false" prepend-icon="mdi-bell-ring">
        <!-- #1 -->
        <template v-slot:activator>
          <v-list-item-title>اعلانات</v-list-item-title>
        </template>
        <!-- #2 -->
        <router-link :to="{ name: 'AllNotifications' }">
          <v-list-group
            :value="false"
            no-action
            sub-group
            prepend-icon="mdi-checkbox-blank-circle-outline"
          >
            <template v-slot:activator>
              <v-list-item-title>لیست اعلانات</v-list-item-title>
            </template>
          </v-list-group>
        </router-link>
      </v-list-group>
      <!-- notification -->

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

      <!-- exit -->
      <a @click="logOut">
        <v-list-item>
          <v-list-item-icon>
            <v-icon>mdi-location-exit</v-icon>
          </v-list-item-icon>
          <v-list-item-title>خروج</v-list-item-title>
        </v-list-item>
      </a>
      <!-- exit -->
    </v-list-item-group>
  </v-list>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "SidebarLists",

  data(): Record<string, unknown> {
    return {
      selectedItem: 0,
      admins: [
        ["نمایش", "mdi-account-multiple-outline", "AllAdmins"],
        ["دسترسی", "mdi-account-multiple-outline", "AllAdmins"],
      ],
    };
  },
  methods: {
    logOut(): void {
      this.$emit("log-out");
    },
  },
});
</script>
