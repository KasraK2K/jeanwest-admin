import Vue from "vue";
import Vuetify from "vuetify/lib/framework";
import { fa } from "vuetify/src/locale";
import { light, dark } from "@/plugins/theme";

Vue.use(Vuetify);

export default new Vuetify({
  lang: {
    current: "fa",
    locales: { fa },
    // t: undefined as any,
  },
  rtl: true,
  options: {
    breakpoint: { scrollbarWidth: 2 },
    themeCache: {
      get: (key: string) => localStorage.getItem(key),
      set: (key: string, value: string) => localStorage.setItem(key, value),
      max: 10,
      maxAge: 1000 * 60 * 60,
    },
  },
  theme: {
    dark: true,
    default: "dark",
    disable: false,
    themes: { light, dark },
  },
});
