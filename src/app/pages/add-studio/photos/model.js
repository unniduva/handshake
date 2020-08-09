import NotificationManager from "../../../components/notification";
import * as service from "./service";

export default {
    state: {
        media: {},
        loading: false
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
            console.log("at reducer", data)
            return {
                ...state,
                loading: false,
                user: data.user,
            };
        },

    },
    effects: {
        async uploadMedia(payload, rootState) {
            this.onRequest();
            try {
                await service.imageUpload(payload)
                return
            } catch (e) {
                this.onError(e);
            }
        },
    }
};
