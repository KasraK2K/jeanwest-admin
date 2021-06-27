<template>
  <v-container style="height: 100vh" class="d-flex align-center justify-center">
    <!-- get pin -->
    <v-form
      v-if="showMobile"
      v-model="valid"
      @submit.prevent="getPin"
      style="min-width: 360px"
    >
      <v-card class="py-6 px-8" elevation="3" outlined rounded>
        <v-card-title>ورود به سایت</v-card-title>

        <v-col>
          <v-text-field
            type="text"
            v-model="phoneNumber"
            :rules="phoneNumberRules"
            :counter="11"
            label="موبایل"
            outlined
            single-line
            clearable
            required
          ></v-text-field>
        </v-col>

        <v-card-actions class="pt-4">
          <v-btn type="submit" color="primary">دریافت کد</v-btn>
        </v-card-actions>
      </v-card>
    </v-form>

    <!-- get token -->
    <v-form
      v-if="showPin"
      v-model="valid"
      @submit.prevent="login"
      style="min-width: 360px"
    >
      <v-card class="py-6 px-8" elevation="3" outlined rounded>
        <v-card-title>ورود به سایت</v-card-title>

        <v-col>
          <v-text-field
            type="text"
            v-model="phoneNumber"
            :rules="phoneNumberRules"
            :counter="11"
            label="موبایل"
            outlined
            single-line
            readonly
            required
          ></v-text-field>
        </v-col>

        <v-col>
          <v-text-field
            v-model="pin"
            :rules="pinRules"
            :counter="5"
            label="کد فعالسازی"
            outlined
            single-line
            clearable
            required
          ></v-text-field>
        </v-col>

        <v-card-actions class="pt-4">
          <v-btn type="submit" color="primary">ورود</v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import { tokenName } from "@/common/globals/globals";
import { mapState } from "vuex";
import AuthService from "@/services/Auth.service";

export default Vue.extend({
  name: "Login",

  data(): Record<string, unknown> {
    return {
      valid: false,
      showMobile: true,
      phoneNumber: "",
      phoneNumberRules: [
        (v: string) => !!v || "موبایل نباید خالی باشد.",
        (v: string) => /^09\d{9}$/.test(v) || "شماره موبایل صحیح نمی‌باشد.",
      ],
      showPin: false,
      pin: "",
      pinRules: [
        (v: string) => !!v || "کد نباید خالی باشد.",
        (v: string) => v.length >= 5 || "کد باید ۵ حرف باشد.",
        (v: string) => v.length <= 5 || "کد باید ۵ حرف باشد.",
      ],
    };
  },
  computed: {
    ...mapState(["token"]),
  },
  methods: {
    getPin(): void {
      const data = {
        phoneNumber: this.phoneNumberGen(),
      };
      console.log(data);
      if (this.valid) {
        AuthService.getPin(data)
          .then()
          .catch((error) => console.log("error", error));
        this.showMobile = false;
        this.showPin = true;
      }
    },
    login(): void {
      if (this.valid) {
        const data = {
          phoneNumber: this.phoneNumberGen(),
          pin: String(this.pin),
        };
        // get jwt with axios
        AuthService.login(data)
          .then((response) => {
            this.$store.dispatch("setToken", response.data.data.accessToken);
            // set token state as tokenName
            if (this.token) this.setToken(this.token);
            // set localStorage with key tokenName
            this.checkLogin();
          })
          .catch((error) => console.log("error", error));
      }
    },
    setToken(token: string): void {
      this.$store.state.token = token;
      localStorage.setItem(tokenName, token);
    },
    getToken(name: string): string | undefined {
      const storageToken = localStorage.getItem(name);
      if (this.token) return this.token;
      else if (storageToken) return storageToken;
      else return undefined;
    },
    checkLogin(): void {
      let token = this.getToken(tokenName);
      if (token) {
        Vue.prototype.$toast("success", "لاگین به درستی انجام شد.");
        this.$router.push({ name: "Home" });
      }
    },
    phoneNumberGen() {
      return String(this.phoneNumber).slice(1);
    },
  },
  mounted(): void {
    this.checkLogin();
  },
});
</script>
