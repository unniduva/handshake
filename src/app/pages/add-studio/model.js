import NotificationManager from "../../components/notification";
import * as service from "./service";
import { setlanguageData, setLanguage, getLanguage } from "../../helpers/utility"
import { gatherStaticDatalength } from "../../helpers"
export default {
    state: {
        studios: {},
        studio: {},
        myRequests: [],
        myBookings: [],
        studioDetails: {},
        myStudios: [],
        loading: false,
        onGoingBooking: {},
        onGoingProcess: { step: 0 },
        includedServices: {},
        language: getLanguage() || "eng",
        currUsrLoc: {},
        searchKeyword: ""
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
        onListStudio(state, data) {
            return {
                ...state,
                loading: false,
                studios: data
            };
        },
        onClearStore(state) {
            return {
                ...state,
                onGoingProcess: { step: 0 },
                studioDetails: {},
            }
        },

        updateLng(state, data) {
            return {
                ...state,
                language: data
            };
        },
        setCurrLanguage(state, data) {
            return {
                ...state,
                language: data, loading: false
            };
        },
        onSetCurrLoc(state, data) {
            return { ...state, currUsrLoc: data }
        },
        setSearchKey(state, data) {
            return { ...state, searchKeyword: data.searchKeyword }
        }
    },
    effects: {
        async listStudios(payload = {}, rootState) {
            this.onRequest();
            try {
                var res = await service.listStudio(payload)
                this.onListStudio(res)
                console.log(res, "at model")
                return
            } catch (e) {
                this.onError(e);
            }
        },

        async getLanguages(payload = "eng", rootState) {
            this.onRequest()
            var res = await service.getStaticData()
            setlanguageData(res)
            console.log("AT MODEL STUDIO", payload)
            setLanguage(payload)
            this.setCurrLanguage(payload)
            return
        },

        async clearStore(payload, rootState) {
            this.onClearStore()
            return
        },
        async updateLanguage(payload, rootState) {
            await this.updateLng(payload)
            return true
        },
        async setCurrLoc(data) {
            this.onSetCurrLoc(data)
            return
        },
        async setPublicSearchPhase(data) {
            this.setSearchKey(data)
            return
        },
    }
};
