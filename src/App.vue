<template>
  <v-app>
    <!------------------------------- START: TopBar ------------------------------->
    <v-app-bar
      app
      class="primary"
      dark
      v-model="topbar"
      id="topbar"
      v-if="token"
    >
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

    <v-card height="100vh" :style="true && 'overflow-y: scroll'">
      <!------------------------------ START: Sidebar ------------------------------->
      <v-navigation-drawer
        app
        bottom
        right
        v-model="sidebar"
        class="rounded-0"
        id="sidebar"
        v-if="token"
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
              v-if="showTopMenuBtn"
              @click.stop="topbar = !topbar"
            ></v-app-bar-nav-icon>
          </v-list-item>
        </template>

        <v-divider></v-divider>

        <!-- START: Sidebar Lists -->
        <SidebarLists @log-out="logOut" />
        <!-- END: Sidebar Lists -->
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
import SidebarLists from "@/components/SidebarLists.vue";
import { tokenName } from "./common/globals/globals";
import { mapState } from "vuex";

export default Vue.extend({
  name: "App",

  components: {
    SidebarLists,
  },
  data() {
    return {
      topbar: true,
      sidebar: document.body.clientWidth > 1264,
      group: null,
      showTopMenuBtn: document.body.clientWidth > 1264,
    };
  },
  computed: {
    ...mapState(["token"]),
  },
  methods: {
    getToken(name: string): any {
      const storageToken = localStorage.getItem(name);
      if (storageToken) {
        this.$store.dispatch("setToken", storageToken);
        return this.token;
      } else return undefined;
    },
    checkLogin(): void {
      let token = (this as any).getToken(tokenName);
      const route = document.location.pathname.slice(1);
      if (!token && route !== "login")
        (this as any).$router.push({ name: "Login" });
    },
    logOut() {
      localStorage.removeItem(tokenName);
      (this as any).$store.state.token = "";
      (this as any).checkLogin();
    },
  },
  created(): void {
    (this as any).checkLogin();
  },
});
</script>

<style lang="scss">
a {
  text-decoration: none;
}
</style>

<style lang="scss" scoped>
// a {
//   display: flex;
//   .v-list-item__title,
//   i.v-icon {
//     color: rgba(0, 0, 0, 0.6) !important;
//   }
//   &:hover {
//     i.v-icon,
//     .v-list-item__title {
//       color: white !important;
//       transition: none;
//     }
//   }
// }
// .v-list-item:not(.disable-hover) {
//   &:hover {
//     background-color: #9575cd;
//   }
// }
</style>
