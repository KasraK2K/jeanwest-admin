<template>
  <v-app>
    <!------------------------------- START: TopBar ------------------------------->
    <v-app-bar app dark v-model="topbar">
      <!-- show/hide Sidebar -->
      <v-app-bar-nav-icon @click.stop="sidebar = !sidebar"></v-app-bar-nav-icon>

      <v-spacer></v-spacer>

      <div class="d-flex align-center">
        <v-img
          alt="Jeanwest Logo"
          class="shrink"
          contain
          src="@/assets/images/jeanwest-logo.png"
          transition="scale-transition"
          width="140"
        />
      </div>
    </v-app-bar>
    <!-------------------------------- END: TopBar -------------------------------->

    <v-card height="100vh">
      <!------------------------------ START: Sidebar ------------------------------->
      <v-navigation-drawer
        app
        absolute
        bottom
        right
        v-model="sidebar"
        class="rounded-0"
      >
        <template v-slot:prepend>
          <v-list-item class="disable-hover">
            <v-list-item-avatar>
              <img src="https://randomuser.me/api/portraits/women/81.jpg" />
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>Jane Smith</v-list-item-title>
              <v-list-item-subtitle>Logged In</v-list-item-subtitle>
            </v-list-item-content>

            <!-- show/hide TopBar -->
            <v-app-bar-nav-icon
              @click.stop="topbar = !topbar"
            ></v-app-bar-nav-icon>
          </v-list-item>
        </template>

        <v-divider></v-divider>

        <v-list dense rounded>
          <v-list-item v-for="item in items" :key="item.title">
            <router-link :to="item.link" class="active">
              <v-list-item-icon>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item-content>
            </router-link>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
      <!------------------------------- END: Sidebar -------------------------------->

      <v-main>
        <router-view />
      </v-main>
    </v-card>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "App",

  data() {
    return {
      topbar: true,
      sidebar: document.body.clientWidth > 1264 ? true : false,
      group: null,
      items: [
        { title: "Dashboard", icon: "mdi-view-dashboard", link: "/" },
        { title: "Home", icon: "mdi-home-city", link: "/home" },
        { title: "Card", icon: "mdi-widgets", link: "/card" },
      ],
    };
  },
});
</script>

<style lang="scss">
a {
  text-decoration: none;
}
</style>

<style lang="scss" scoped>
a {
  display: flex;
}
.v-list-item:not(.disable-hover) {
  .active,
  .v-icon {
    color: rgba(0, 0, 0, 0.6) !important;
  }
  &:hover {
    .active,
    .v-icon {
      color: white !important;
      transition: none;
    }
    background-color: #9575cd;
  }
}
</style>
