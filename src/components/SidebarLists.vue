<template>
  <v-list shaped>
    <v-list-item-group v-model="selectedMenu" color="primary">
      <!-- dashboard -->
      <router-link :to="{ name: 'Home' }" @click="selectedMenu = 0">
        <v-list-item>
          <v-list-item-icon>
            <v-icon>mdi-home</v-icon>
          </v-list-item-icon>
          <v-list-item-title>داشبورد</v-list-item-title>
        </v-list-item>
      </router-link>
      <!-- dashboard -->

      <!-- order -->
      <v-list-group
        :value="nameToValue(['AllOrders'])"
        prepend-icon="mdi-cart"
        @click="selectedMenu = 1"
      >
        <!-- #1 -->
        <template v-slot:activator>
          <v-list-item-title>سفارشات</v-list-item-title>
        </template>
        <!-- #2 -->
        <router-link :to="{ name: 'AllOrders' }">
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-format-list-numbered-rtl</v-icon>
            </v-list-item-icon>
            <v-list-item-title :to="{ name: 'AllOrders' }"
              >لیست سفارشات</v-list-item-title
            >
          </v-list-item>
        </router-link>
      </v-list-group>
      <!-- order -->

      <!-- payment -->
      <v-list-group
        :value="nameToValue(['AllPayments'])"
        prepend-icon="mdi-currency-usd"
        @click="selectedMenu = 2"
      >
        <!-- #1 -->
        <template v-slot:activator>
          <v-list-item-title>پرداخت‌ها</v-list-item-title>
        </template>
        <!-- #2 -->
        <router-link :to="{ name: 'AllPayments' }">
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-format-list-numbered-rtl</v-icon>
            </v-list-item-icon>
            <v-list-item-title>لیست پرداخت‌ها</v-list-item-title>
          </v-list-item>
        </router-link>
      </v-list-group>
      <!-- payment -->

      <!-- promotions -->
      <v-list-group
        :value="nameToValue(['AllDiscounts', 'AllJeansPoints'])"
        prepend-icon="mdi-sale"
        @click="selectedMenu = 3"
      >
        <!-- #1 -->
        <template v-slot:activator>
          <v-list-item-title>پروموشن‌ها</v-list-item-title>
        </template>
        <!-- #2: Discount -->
        <router-link :to="{ name: 'AllDiscounts' }">
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-format-list-numbered-rtl</v-icon>
            </v-list-item-icon>
            <v-list-item-title>لیست تخفیف‌ها</v-list-item-title>
          </v-list-item>
        </router-link>
        <!-- #2: Offers -->
        <!-- <router-link :to="{ name: 'AllOffers' }">
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-format-list-numbered-rtl</v-icon>
            </v-list-item-icon>
            <v-list-item-title>لیست پیشنهادات</v-list-item-title>
          </v-list-item>
        </router-link> -->
        <!-- #2: JeansPoints -->
        <router-link :to="{ name: 'AllJeansPoints' }">
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-format-list-numbered-rtl</v-icon>
            </v-list-item-icon>
            <v-list-item-title>لیست جین‌پوینت‌ها</v-list-item-title>
          </v-list-item>
        </router-link>
        <!-- #2: Groups -->
        <!-- <router-link :to="{ name: 'AllGroups' }">
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-format-list-numbered-rtl</v-icon>
            </v-list-item-icon>
            <v-list-item-title>لیست گروه‌ها</v-list-item-title>
          </v-list-item>
        </router-link> -->
      </v-list-group>
      <!-- promotions -->

      <!-- support -->
      <v-list-group
        :value="nameToValue(['AllTickets'])"
        prepend-icon="mdi-lifebuoy"
        @click="selectedMenu = 4"
      >
        <!-- #1 -->
        <template v-slot:activator>
          <v-list-item-title>تیکت‌ها</v-list-item-title>
        </template>
        <!-- #2 -->
        <router-link :to="{ name: 'AllTickets' }">
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-format-list-numbered-rtl</v-icon>
            </v-list-item-icon>
            <v-list-item-title>لیست تیکت‌ها</v-list-item-title>
          </v-list-item>
        </router-link>
      </v-list-group>

      <!-- notification -->
      <v-list-group
        :value="nameToValue(['AllNotifications'])"
        prepend-icon="mdi-bell-ring"
        @click="selectedMenu = 5"
      >
        <!-- #1 -->
        <template v-slot:activator>
          <v-list-item-title>اعلانات</v-list-item-title>
        </template>
        <!-- #2 -->
        <router-link :to="{ name: 'AllNotifications' }">
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-format-list-numbered-rtl</v-icon>
            </v-list-item-icon>
            <v-list-item-title>لیست اعلانات</v-list-item-title>
          </v-list-item>
        </router-link>
      </v-list-group>
      <!-- notification -->

      <!-- custommers -->
      <v-list-group
        :value="nameToValue(['AllCustomers'])"
        prepend-icon="mdi-account-circle"
        @click="selectedMenu = 6"
      >
        <!-- #1 -->
        <template v-slot:activator>
          <v-list-item-title>کاربران</v-list-item-title>
        </template>
        <!-- #2 -->
        <router-link :to="{ name: 'AllCustomers' }">
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-format-list-numbered-rtl</v-icon>
            </v-list-item-icon>
            <v-list-item-title>لیست کاربران</v-list-item-title>
          </v-list-item>
        </router-link>
      </v-list-group>
      <!-- custommers -->

      <!-- admins -->
      <v-list-group
        :value="nameToValue(['AllAdmins'])"
        prepend-icon="mdi-headset"
        @click="selectedMenu = 6"
      >
        <!-- #1 -->
        <template v-slot:activator>
          <v-list-item-title>ادمین‌ها</v-list-item-title>
        </template>
        <!-- #2 -->
        <router-link :to="{ name: 'AllAdmins' }">
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-format-list-numbered-rtl</v-icon>
            </v-list-item-icon>
            <v-list-item-title>لیست ادمین‌ها</v-list-item-title>
          </v-list-item>
        </router-link>
      </v-list-group>
      <!-- admins -->

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
      selectedMenu: undefined,
    };
  },
  methods: {
    logOut(): void {
      this.$emit("log-out");
    },
    nameToValue(pathnames: string[]) {
      for (const pathname of pathnames)
        if (pathname === (this as any).$router.history.current.name)
          return true;
      return false;
    },
  },
});
</script>

<style lang="sass" scoped>
a.router-link-exact-active.router-link-active > .v-list-item
  background-color: #0066d0 !important
  color: white

.theme--dark.v-list-item--active:hover::before, .theme--dark.v-list-item--active::before
  opacity: 0
</style>
