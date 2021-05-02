import { SweetAlertResult, SweetAlertIcon } from "sweetalert2";
import { Toast } from "@/common/globals/plugins/sweetalert";

export default {
  install(Vue: {
    prototype: {
      $toast: (
        icon: SweetAlertIcon,
        title: string
      ) => Promise<SweetAlertResult>;
    };
  }): void {
    Vue.prototype.$toast = (
      icon: SweetAlertIcon,
      title: string
    ): Promise<SweetAlertResult> => {
      return Toast(icon, title);
    };
  },
};
