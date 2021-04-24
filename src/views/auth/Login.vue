<template>
  <v-container style="height: 100vh" class="d-flex align-center justify-center">
    <v-form v-model="valid" style="min-width: 360px">
      <v-card class="py-6 px-8">
        <v-card-title>ورود به سایت</v-card-title>

        <v-col v-if="showMobile">
          <v-text-field
            v-model="mobile"
            :rules="mobileRules"
            :counter="11"
            label="موبایل"
            required
          ></v-text-field>
        </v-col>

        <v-col v-if="showPin">
          <v-text-field
            v-model="pin"
            :rules="pinRules"
            :counter="5"
            label="کد فعالسازی"
            required
          ></v-text-field>
        </v-col>

        <v-card-actions class="pt-4">
          <v-btn color="primary" v-if="showMobile" @click="getPin"
            >دریافت کد</v-btn
          >
          <v-btn color="primary" v-if="showPin" @click="login">ورود</v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-container>
</template>

<script lang="ts">
import { tokenName } from "@/common/globals/globals";
import { mapGetters, mapState } from "vuex";
import AuthService from "@/services/Auth.service";

export default {
  name: "Login",

  data: () => ({
    valid: false,
    showMobile: true,
    mobile: "",
    mobileRules: [
      (v: string) => !!v || "موبایل نباید خالی باشد.",
      (v: string) =>
        /^(\+98|0)?9\d{9}$/.test(v) || "شماره موبایل صحیح نمی‌باشد.",
    ],
    showPin: false,
    pin: "",
    pinRules: [
      (v: string) => !!v || "کد نباید خالی باشد.",
      (v: string) => v.length >= 5 || "کد باید ۵ حرف باشد.",
      (v: string) => v.length <= 5 || "کد باید ۵ حرف باشد.",
    ],
  }),
  computed: {
    ...mapState(["token"]),
  },
  methods: {
    getPin(): void {
      const data = { phoneNumber: (this as any).mobile };
      if ((this as any).valid) {
        AuthService.getPin(data)
          .then()
          .catch((error: any) => console.log("error", error));
        (this as any).showMobile = false;
        (this as any).showPin = true;
      }
    },
    login(): void {
      if ((this as any).valid) {
        const data = {
          phoneNumber: (this as any).mobile,
          pin: (this as any).pin,
        };
        // get jwt with axios
        AuthService.login(data)
          .then((response: any) => {
            (this as any).$store.dispatch(
              "setToken",
              response.data.data.accessToken
            );
            // set token state as tokenName
            if ((this as any).token)
              (this as any).setToken((this as any).token);
            // set localStorage with key tokenName
            (this as any).checkLogin();
          })
          .catch((error: any) => console.log("error", error));
      }
    },
    setToken(token: string): void {
      (this as any).$store.state.token = token;
      localStorage.setItem(tokenName, token);
    },
    getToken(name: string): any {
      const storageToken = localStorage.getItem(name);
      if ((this as any).token) return (this as any).token;
      else if (storageToken) return storageToken;
      else return undefined;
    },
    checkLogin(): void {
      let token = (this as any).getToken(tokenName);
      if (token) (this as any).$router.push({ name: "Home" });
    },
  },
  mounted(): void {
    (this as any).checkLogin();
  },
};
</script>

<style scoped></style>
