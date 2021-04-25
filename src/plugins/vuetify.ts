import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

Vue.use(Vuetify);

export default new Vuetify({
  rtl: true,
  // theme: { dark: true },
  theme: {
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
    },
  },
});
