import { IRouter } from "@/interfaces/others/route.interface";
import Login from "@/views/auth/Login.vue";

export const auths: IRouter[] = [
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      title: "ورود به سایت",
    },
  },
];
