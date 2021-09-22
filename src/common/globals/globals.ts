//====================================================
//
//   ####    ##       #####   #####     ###    ##
//  ##       ##      ##   ##  ##  ##   ## ##   ##
//  ##  ###  ##      ##   ##  #####   ##   ##  ##
//  ##   ##  ##      ##   ##  ##  ##  #######  ##
//   ####    ######   #####   #####   ##   ##  ######
//
//====================================================
export const tokenName = "token";

export const globals = {
  /** NOTE: Server Backend */
  baseURL: `${process.env.VUE_APP_BACKEND_PROTOCOL}://${process.env.VUE_APP_BACKEND_URL}:${process.env.VUE_APP_BACKEND_PORT}/${process.env.VUE_APP_BACKEND_PREFIX}`,

  /** NOTE: Media Server API */
  mediaServerBaseURL: `${process.env.VUE_APP_MEDIA_PROTOCOL}://${process.env.VUE_APP_MEDIA_URL}:${process.env.VUE_APP_MEDIA_PORT}/${process.env.VUE_APP_MEDIA_PREFIX}/${process.env.VUE_APP_MEDIA_PATH}`,

  /** NOTE: Media Server Read */
  mediaServerStatic: `${process.env.VUE_APP_MEDIA_PROTOCOL}://${process.env.VUE_APP_MEDIA_URL}:${process.env.VUE_APP_MEDIA_PORT_STATIC}/${process.env.VUE_APP_MEDIA_PREFIX}/${process.env.VUE_APP_MEDIA_PATH_STATIC}`,

  /** NOTE: Firebase Cloud Messaging send API */
  fcmBaseUrl: process.env.VUE_APP_FCM_BASE_URL,
};
