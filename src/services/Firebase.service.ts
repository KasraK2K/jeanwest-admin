/* eslint-disable @typescript-eslint/no-explicit-any */
import { IPushNotification } from "./../interfaces/entities/notification.interface";
import { globals } from "@/common/globals/globals";
import { AxiosResponse } from "axios";
import { apiClient } from "./Axios.service";
import {
  firebaseConfig,
  fcmServerKey,
} from "@/common/globals/plugins/firebase";
import firebase from "firebase";
import * as _ from "lodash";
// import { formatDate } from "@/mixin/date.mixin";

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

export const Firebase = {
  // ────────────────────────────────────────────────────────────────────
  //   :::::: F I R E S T O R E : :  :   :    :     :        :          :
  // ────────────────────────────────────────────────────────────────────
  refrence(
    collection: string
  ): firebase.firestore.CollectionReference<firebase.firestore.DocumentData> {
    return db.collection(collection);
  },

  // ─── GET ONE DOCUMENT ───────────────────────────────────────────────────────────
  async getOne(
    collection: string,
    id: string
  ): Promise<firebase.firestore.DocumentData | undefined> {
    return (await this.refrence(collection).doc(id).get()).data();
  },

  // ─── GET ALL DOCUMENTS ──────────────────────────────────────────────────────────
  async getAll(collection: string): Promise<firebase.firestore.DocumentData[]> {
    return (await this.refrence(collection).get()).docs.map((doc) =>
      doc.data()
    );
  },

  // ─── GET ALL BY QUERY ───────────────────────────────────────────────────────────
  async getAllByQuery(
    collection: string,
    where: { fieldPath: string; opStr: any; value: any }
  ): Promise<Record<string, unknown>[]> {
    return await this.refrence(collection)
      .where(where.fieldPath, where.opStr, where.value)
      .get()
      .then((snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        return data;
      });
  },

  // ─── UPSERT DOCUMENT ────────────────────────────────────────────────────────────
  async upsert(
    collection: string,
    id: string,
    data: firebase.firestore.DocumentData
  ): Promise<void> {
    return await this.refrence(collection).doc(id).set(data);
  },

  // ─── DELETE ONE DOCUMENT ────────────────────────────────────────────────────────
  async deleteOne(collection: string, id: string): Promise<void> {
    return await this.refrence(collection).doc(id).delete();
  },

  // ─── DELETE ALL DOCUMENTS ───────────────────────────────────────────────────────
  async deleteAll(
    collection: string,
    where: { fieldPath: string; opStr: any; value: any }
  ): Promise<void> {
    return await this.refrence(collection)
      .where(where.fieldPath, where.opStr, where.value)
      .get()
      .then((docs) => {
        docs.forEach((doc) => doc.ref.delete());
      });
  },

  // ────────────────────────────────────────────────────────────────────────────────
  //   :::::: C L O U D   M E S S A G I N G : :  :   :    :     :        :          :
  // ────────────────────────────────────────────────────────────────────────────────
  async sendPushToToken(
    notification: IPushNotification,
    token: string
  ): Promise<AxiosResponse> {
    const data = JSON.stringify({ notification, to: token });
    return await apiClient.post(globals.fcmBaseUrl, data, {
      headers: { Authorization: `key=${fcmServerKey}` },
    });
  },

  async sendPushToQuery(
    collection: string,
    where: { fieldPath: string; opStr: any; value: any },
    notification: IPushNotification,
    time_to_live: number
    // schedule: Date
  ): Promise<AxiosResponse<any> | undefined> {
    const results = await this.getAllByQuery(collection, where);
    if (results && results.length) {
      const tokens = _.map(results, "token");
      // const scheduledTime = formatDate(schedule, "YYYY-MM-DD HH:MM:SS");
      const data = JSON.stringify({
        notification,
        registration_ids: tokens,
        time_to_live,
        // topic: notification.id,
        // isScheduled: true,
        // scheduledTime: scheduledTime,
        // dry_run: true, // for developer to send as test
      });
      return await apiClient.post(globals.fcmBaseUrl, data, {
        headers: { Authorization: `key=${fcmServerKey}` },
      });
    }
  },
};

// {
//   name: "projects/836085134543/campaigns/1542676248201380644",
//   displayName: "نام تست ۱",
//   state: "RUNNING",
//   targetingCondition: "app.id == '1:836085134543:web:e6babc3a0602a2a88773ba'",
//   onStart: {},
//   lastUpdateTime: "2021-08-21T05:58:16.207260Z",
//   notificationOptions: {
//     messageText: "متن تست ۱",
//     messageTitle: "تست ۱",
//     expiryTime: "2419200s",
//   },
//   targetingConditionJson:
//     '{\n  "or": {\n    "conditions": [{\n      "and": {\n        "conditions": [{\n          "appId": {\n            "targetGmpAppId": "1:836085134543:web:e6babc3a0602a2a88773ba"\n          }\n        }]\n      }\n    }]\n  }\n}',
// };

// ------------------------------------------------------------------------------

// POST https://fcm.googleapis.com/v1/projects/myproject-b5ae1/messages:send HTTP/1.1

// Content-Type: application/json
// Authorization: Bearer ya29.ElqKBGN2Ri_Uz...PbJ_uNasm

// {
//   "message": {
//     "token" : <token of destination app>,
//     "notification": {
//       "title": "FCM Message",
//       "body": "This is a message from FCM"
//     },
//     "webpush": {
//       "headers": {
//         "Urgency": "high"
//       },
//       "notification": {
//         "body": "This is a message from FCM to web",
//         "requireInteraction": "true",
//         "badge": "/badge-icon.png"
//       }
//     }
//   }
// }
