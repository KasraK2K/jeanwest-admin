//===================================================================================
//
//   ####  ##      ##  #####  #####  ######    ###    ##      #####  #####    ######
//  ##     ##      ##  ##     ##       ##     ## ##   ##      ##     ##  ##     ##
//   ###   ##  ##  ##  #####  #####    ##    ##   ##  ##      #####  #####      ##
//     ##  ##  ##  ##  ##     ##       ##    #######  ##      ##     ##  ##     ##
//  ####    ###  ###   #####  #####    ##    ##   ##  ######  #####  ##   ##    ##
//
//===================================================================================
import Swal from "sweetalert2";
import { SweetAlertResult, SweetAlertIcon } from "sweetalert2";

const Toaster = Swal.mixin({
  toast: true,
  position: "top-start", // 'top', 'top-start', 'top-end', 'center', 'center-start', 'center-end', 'bottom', 'bottom-start', or 'bottom-end'
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  // customClass: "animated slideInLeft", // use if animation equl false
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});

//==========================================
//
//  ######   #####     ###     ####  ######
//    ##    ##   ##   ## ##   ##       ##
//    ##    ##   ##  ##   ##   ###     ##
//    ##    ##   ##  #######     ##    ##
//    ##     #####   ##   ##  ####     ##
//
//==========================================
export const Toast: (
  icon: SweetAlertIcon,
  title: string
) => Promise<SweetAlertResult> = (icon, title) =>
  Toaster.fire(title, undefined, icon);
