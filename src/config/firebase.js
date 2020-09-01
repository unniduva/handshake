// import * as firebase from "firebase/app";
import "firebase/messaging";
import { updateCookie, getCookie } from "../app/helpers/utility"
import config from "./index";
import { FirebaseAdmin } from "../app/firebase";
import firebase from "firebase/app"
import { store } from "../app/store"
import { normalizeEmail } from "../app/helpers";

var messaging = null
if (firebase.messaging.isSupported()) {
  messaging = FirebaseAdmin.messaging();
  messaging.usePublicVapidKey(
    config.usePublicVapidKey
  );
}
export default class fcm {
  static async deleteFcmToken() {
    await messaging.getToken();
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
          // let data = { token: oldToken }
          store.dispatch.user.deletePushToken({ "device_id": token });
        }
        if (cookie && cookie.email)
          store.dispatch.user.updateToken({
            "device_id": token, user_id: normalizeEmail(cookie.email),
            "device_type": "web",
          });
        var data = { fcm: token }
        updateCookie(data);
      })
      .catch(function (err) {
        console.log("Unable to get permission to notify.", err);
      });
    navigator.serviceWorker.addEventListener("message", async (message) => {
      console.log(message, "======")
      // const title = payload.notification.title;
      // const options = {
      //     body: payload.notification.body,
      //     icon: "images/favicon.png"
      // }
      // new Notification(title, options);
      // NotificationManager.success(`${"KOOOOOIIII Firebase message recieved"}`)
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

