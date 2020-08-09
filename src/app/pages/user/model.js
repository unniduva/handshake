import NotificationManager from "../../components/notification";
import fcm from "../../../config/firebase"
import * as service from "./service";
import { setCookies, clearCookies, getCookie, updateCookie } from "../../helpers/utility"
import { FirebaseAdmin } from "../../firebase";
export default {
    state: {
        user: getCookie() || {},
        loading: false,
        // currentLng: getLanguage(),
        imgUrl: "",
        userRating: 0,
        warningDetail: {},
        warnings: []
    },
    reducers: {
        onRequest(state) {
            return {
                ...state,
                loading: true
            };
        },
        onError(state, data) {
            NotificationManager("error", data.message);
            return {
                ...state,
                loading: false
            };
        },
        onLoginSuccess(state, data) {
            return {
                ...state,
                loading: false,
                user: getCookie(),
                imgUrl: data.user.imageUrl ? data.user.imageUrl : ""
            };
        },
        onLogoutSuccess(state) {
            return {
                ...state,
                user: null
            };
        },
        onUpdateSuccess(state, data) {
            NotificationManager("success", "User Details Updated")
            return {
                ...state,
                user: getCookie() || {},
            };
        },
        onForgotSuccess(state) {
            NotificationManager("info", "An Email has been sent");
            return {
                ...state,
            };
        },
        updateLng(state, data) {
            return {
                ...state,
                // currentLng: data
            };
        },
        onUpload(state, data) {
            return {
                ...state,
                imgUrl: data
            };
        },
        onGetWarnings(state, data) {
            return { ...state, loading: false, warnings: data }
        },
        onGetWarningDetail(state, data) {
            return { ...state, loading: false, warningDetail: data }
        },
        onGotUserRating(state, data) {
            return { ...state, loading: false, userRating: data ? data.rating : 0 }
        }
    },
    effects: {
        async login(payload, rootState) {
            this.onRequest();
            try {
                let data = {};
                var res = {}
                let user = await FirebaseAdmin
                    .auth()
                    .signInWithEmailAndPassword(payload.email, payload.password);
                data.user = {
                    email: user.user.email,
                    name: user.Fname + user.Lname ? user.Lname : "",
                };

                let unsubscribe = await FirebaseAdmin.auth().onAuthStateChanged(async user => {
                    if (user) {
                        console.log(user, "----")
                        data.accessToken = await user.getIdToken(true);
                        data.refreshToken = user.refreshToken;
                        res = await service.getUser(payload.email)
                        console.log("hey user ====", res);
                        res.Dob = res && res.Dob && res.Dob.toDate()
                        data.user.Dob = res.Dob
                        data.user.firstName = res.Fname;
                        data.user.lastName = res.Lname;
                        data.user.imgUrl = res.imageUrl
                        await setCookies(data);
                        fcm.mountFcm()
                        this.onLoginSuccess({ user: res })
                        return data;
                    }
                });
                await unsubscribe();
                return

            } catch (e) {
                e.message = "Invalid credentials";
                this.onError(e);
            }
        },
        async logout() {
            var fcmTok = getCookie().fcm
            if (fcmTok)
                await service.deletePushToken({ token: fcmTok })
            await FirebaseAdmin.auth().signOut().then(async () => await clearCookies()).catch(e => this.onError(e))
            this.onLogoutSuccess();
        },
        async updateInformation(data, rootState) {
            try {
                this.onRequest();
                return;
            } catch (e) {
                this.onError(e);
                throw e;
            }
        },
        async registerUser(payload) {
            this.onRequest();
            try {
                await FirebaseAdmin
                    .auth()
                    .createUserWithEmailAndPassword(payload.email, payload.password)
                    .then(async userCredentials => {
                        delete payload.password
                        // userCredentials.user
                        //     .sendEmailVerification()
                        //     .then(data => {
                        //     })
                        //     .catch(err => { });

                        if (userCredentials.user) {
                            var data = {
                                user: {
                                    email: payload.email,
                                    Dob: payload.Dob,
                                    firstName: payload.Fname,
                                    lastName: payload.Lname
                                }
                            }
                            await FirebaseAdmin.auth().onAuthStateChanged(async user => {
                                if (user) data.accessToken = await user.getIdToken(true);
                                if (user) payload.uid = user.uid
                                await service.AddUserToCollection(payload)

                            });
                            await setCookies(data);
                            fcm.mountFcm()
                            this.onLoginSuccess(userCredentials);
                            return userCredentials;
                        }
                    })
                    .catch(error => {
                        this.onError(error);
                    });
            } catch (e) {
                this.onError(e);
            }
        },
        async firebaseForgetPassword(payload, rootState) {
            this.onRequest();
            try {
                await FirebaseAdmin
                    .auth()
                    .sendPasswordResetEmail(payload.email)
                    .then(() => {
                        this.onForgotSuccess(true);
                        return true;
                    })
                    .catch(() => {
                        let e = {};
                        e.message = "Invalid Email";
                        this.onError(e);
                        return false;
                    });
            } catch (e) {
                this.onError(e);
            }
        },
        async updateProfile(payload) {
            // this.onRequest();
            var data = { user: {} }
            try {
                var res = await service.updateProfile(payload)
                res.Dob = res && res.dob && res.dob
                data.user.Dob = res.Dob
                data.user.firstName = res.fname;
                data.user.lastName = res.lname;
                await updateCookie(data);
                this.onUpdateSuccess(res)
                return
            } catch (e) {
                this.onError(e);
            }
        },
        async uploadProfileImage(payload) {
            try {
                var res = service.uploadImage(payload)
                res.then(async re => {
                    await updateCookie({ user: { imgUrl: re } });
                    this.onUpload(re)
                })
                return res
            }
            catch (er) {
                this.onError(er)
            }
        },
        async getWarnings(data) {
            try {
                this.onRequest()
                var resp = await service.getWarnings(data)
                this.onGetWarnings(resp)
            } catch (er) {
                this.onError(er)
            }
        }
        ,
        async getWarningDetail(data) {
            try {
                this.onRequest()
                var resp = await service.getSingleWarning(data)
                this.onGetWarningDetail(resp)
            } catch (er) {
                this.onError(er)
            }
        },
        async getRating(data) {
            try {
                this.onRequest()
                var resp = await service.getRating(data)
                this.onGotUserRating(resp)
            } catch (er) {
                this.onError(er)
            }
        },
        async updateRating(data) {
            await service.updateRating(data)
            return
        }
    }
};
