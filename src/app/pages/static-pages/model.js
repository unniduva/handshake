import NotificationManager from "../../components/notification";
import * as service from "./service";

export default {
    state: {
        cms: {},
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
        onGetCMS(state, data) {
            return {
                ...state,
                loading: false,
                cms: data,
            };
        },

    },
    effects: {
        async getCMS(payload, rootState) {
            this.onRequest();
            try {
                var res = await service.getCMS(payload)
                this.onGetCMS(res)
                return
            } catch (e) {
                this.onError(e);
            }
        },
    }
};







