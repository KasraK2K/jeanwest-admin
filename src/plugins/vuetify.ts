import Vue from "vue";
import Vuetify from "vuetify/lib/framework";
import { fa } from "vuetify/src/locale";

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
    dark: false,
    default: "light",
    disable: false,
    themes: {
      light: {
        // class
        primary: "#003974",
        secondary: "#A7A8A9",
        warning: "#FEC233",
        error: "#F51F1F",
        success: "#32BE93",
        info: "#2196F3",
        accent: "#82B1FF",
        // link
        anchor: "#003974",
        // colors
        blue: "#003974",
        grey: "#A7A8A9",
        gray: "#D0D0CE",
        yellow: "#FEC233",
        red: "#F51F1F",
        green: "#32BE93",
      },
      dark: {
        // class
        primary: "#0066d0",
        secondary: "#A7A8A9",
        warning: "#FEC233",
        error: "#F51F1F",
        success: "#32BE93",
        info: "#2196F3",
        accent: "#82B1FF",
        // link
        anchor: "#82B1FF",
        // colors
        blue: "#0066d0",
        grey: "#ACACAC",
        gray: "#D0D0CE",
        yellow: "#FEC233",
        red: "#F51F1F",
        green: "#32BE93",
        background: "#1A1A2F",
      },
    },
  },
});
