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
  baseURL:
  process.env.NODE_ENV === "production"
    ? "http://10.0.1.131:5000/api/v1"
    : "http://10.0.1.111:8000/api/v1",

  // baseURL: "http://10.0.1.111:8000/api/v1",

  /** NOTE: Server Backend Local */
  // baseURL: "http://localhost:3500/api/v1",

  /** NOTE: Media Server API */
  mediaServerBaseURL: "http://10.0.1.111:3000/api/v1/media/upload/image",

  /** NOTE: Media Server Read */
  mediaServerStatic: "http://10.0.1.111:8081/uploads",

  /** NOTE: Firebase Cloud Messaging send API */
  fcmBaseUrl: "https://fcm.googleapis.com/fcm/send",
};
