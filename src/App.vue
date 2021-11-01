<template>
  <v-app>
    <!------------------------------- START: TopBar ------------------------------->
    <v-app-bar
      app
      class="primary elevation-0"
      dark
      v-model="topbar"
      id="topbar"
      v-if="token"
      v-resize="onResize"
    >
      <!-- show/hide Sidebar -->
      <v-app-bar-nav-icon @click.stop="sidebar = !sidebar"></v-app-bar-nav-icon>

      <v-spacer></v-spacer>

      <div class="d-flex align-center">
        <v-switch
          @click="changeTheme"
          class="mt-5 ml-4"
          color="white"
          inset
          persistent-hint
        ></v-switch>

        <router-link :to="{ name: 'Home' }">
          <v-img
            alt="Jeanwest Logo"
            class="shrink"
            contain
            src="@/assets/images/jeanwest-logo.png"
            transition="scale-transition"
            width="140"
          />
        </router-link>
      </div>
    </v-app-bar>
    <!-------------------------------- END: TopBar -------------------------------->

    <!------------------------------ START: Sidebar ------------------------------->
    <v-navigation-drawer
      app
      bottom
      right
      v-model="sidebar"
      class="rounded-0"
      id="sidebar"
      v-if="token"
      :mini-variant="variant"
    >
      <template v-slot:prepend>
        <v-list-item class="disable-hover px-2">
          <v-list-item-avatar @click="checkMiniVariant()">
            <img :src="require('@/assets/images/admin.png')" />
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>ادمین</v-list-item-title>
            <v-list-item-subtitle>آنلاین</v-list-item-subtitle>
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
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import SidebarLists from "@/components/SidebarLists.vue";
import { local, tokenName } from "@/common/globals/globals";
import { mapState } from "vuex";

export default Vue.extend({
  name: "App",

  components: {
    SidebarLists,
  },

  data(): Record<string, unknown> {
    return {
      topbar: true,
      sidebar: document.body.clientWidth > 1264,
      variant: false,
      group: null,
      showTopMenuBtn: document.body.clientWidth > 1264,
    };
  },

  computed: {
    ...mapState(["token"]),
  },

  mounted() {
    const theme = JSON.parse(localStorage.getItem(local.theme.dark) || "true");
    this.$vuetify.theme.dark = theme;
  },

  methods: {
    changeTheme() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
      localStorage.setItem(
        local.theme.dark,
        JSON.stringify(this.$vuetify.theme.dark)
      );
    },
    onResize() {
      this.showTopMenuBtn = document.body.clientWidth > 1264;
    },
    checkMiniVariant(): void {
      this.showTopMenuBtn
        ? (this.variant = !this.variant)
        : (this.variant = false);
    },
    getToken(name: string): string | undefined {
      const storageToken = localStorage.getItem(name);
      if (storageToken) {
        this.$store.dispatch("setToken", storageToken);
        return storageToken;
      }
    },
    checkLogin(): void {
      let token = this.getToken(tokenName);
      const route = document.location.pathname.slice(1);
      if (!token && route !== "login") {
        Vue.prototype.$toast("info", "لطفا ابتدا لاگین کنید.");
        this.$router.push({ name: "Login" });
      }
    },
    logOut(): void {
      localStorage.removeItem(tokenName);
      this.$store.dispatch("setToken", "");
      this.checkLogin();
    },
  },
  created(): void {
    this.checkLogin();
    this.$store.dispatch("setTheme", "dark");
  },
  updated(): void {
    this.$vuetify.theme["dark"]
      ? this.$store.dispatch("setTheme", "dark")
      : this.$store.dispatch("setTheme", "light");
  },
});
</script>

<style lang="sass">
@import "@/assets/scss/vuetify.scss"

a
  text-decoration: none

// tinymce toolbar color
.tox .tox-toolbar,
.tox .tox-toolbar__overflow,
.tox .tox-toolbar__primary
  background-color: #1a1a2f !important

.ltr
  direction: ltr !important

.rtl
  direction: rtl !important

.pointer
  cursor: pointer
</style>
