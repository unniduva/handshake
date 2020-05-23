// import * as firebase from "firebase/app";
import "firebase/messaging";
import { registerTokens, deletePushToken } from "../app/pages/user/service"
import { updateCookie, getCookie } from "../app/helpers/utility"
import NotificationManager from "../app/components/notification";
import config from ".";
import { normalizeEmail } from "../app/helpers";
import { FirebaseAdmin } from "../app/firebase";
import firebase from "firebase/app"
// const initializedFirebaseApp = firebase.initializeApp({
//   messagingSenderId: "362502497032"
// });
var messaging = null
console.log(firebase.messaging.isSupported(),"=================")
if (firebase.messaging.isSupported()) {
  // messaging = FirebaseAdmin.messaging();
  // messaging.usePublicVapidKey(
  //   config.usePublicVapidKey
  // );
}
export default class fcm {
  static async deleteFcmToken() {
    const data = await messaging.getToken();
    // deleteToken(data);
  }
  static mountFcm() {
    messaging !== null && messaging.requestPermission()
      .then(async function () {
        const token = await messaging.getToken();
        console.log("FCM TOKEN:", token)
        let cookie = await getCookie();
        const oldToken = cookie.fcm;
        if (oldToken && token !== oldToken) {
          let data = { token: oldToken }
          deletePushToken(data);
        }
        if (cookie && cookie.email)
          registerTokens({ token, userId: normalizeEmail(cookie.email) });
        let data = { fcm: token }
        updateCookie(data);
      })
      .catch(function (err) {
        console.log("Unable to get permission to notify.", err);
      });
    navigator.serviceWorker.addEventListener("message", async (message) => {
      NotificationManager.success(`${message.data["firebase-messaging-msg-data"].notification.body}`)
    });
  }
}
































// import firebase from "firebase/app";
// import "firebase/auth";
// import "firebase/messaging";
// import config from "../config"
// import {FirebaseAdmin} from "../app/firebase"
// import { registerTokens } from "../app/pages/user/service";
// import {  getCookie } from "../app/helpers/utility"
// import { normalizeEmail } from "../app/helpers";

// export function init() {
//   console.log("Got here",firebase.apps.length)
//   initializePush();
//   if (!firebase.apps.length) {

//     // firebase.initializeApp(config.firebase.appConf);
//     // if (config.AllowPushNotification)
//       initializePush();
//   }
// }

// export function firebaseMessaging() {
//   if (!global.messaging) {
//     if (firebase.messaging.isSupported()) {
//       global.messaging = firebase.messaging();
//       global.messaging.usePublicVapidKey(config.usePublicVapidKey);
//     }
//   }
//   return global.messaging;
// }

// export function initializePush() {
//   const messaging = firebaseMessaging();
//   if (!messaging) return;
//   messaging
//     .requestPermission()
//     .then(() => {
//       return messaging.getToken();
//     })
//     .then(async token => {
//       console.log("FCM Token:", token);
//       global.fcm_token = token;
//       var cookie = JSON.parse(JSON.stringify(getCookie() || {}))
//       if (cookie && cookie.email) {
//         await registerTokens({ token: token, userId: normalizeEmail(cookie.email) })
//       }
//       // updateCookies({ fcm: token })
//     })
//     .catch(error => {
//       if (error.code === "messaging/permission-blocked") {
//         console.log("Please Unblock Notification Request  Manually");
//       } else {
//         console.log("Error Occurred", error);
//       }
//     });
//   messaging.onMessage((payload) => {
//     console.log("onMessage received. fb ", payload);
//     const title = payload.notification.title;
//     const options = {
//       body: payload.notification.body,
//       icon: "images/favicon.png"
//     }
//     new Notification(title, options);
//   });
// }
// export default firebase;

