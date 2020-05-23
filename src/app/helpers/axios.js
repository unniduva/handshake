import axios from "axios";
import config from "../../config";
import { history } from "../store";
import { getJsonCookies, getLanguage, clearCookies } from "./utility";

const customHeader = () => ({
    Authorization: getJsonCookies() || undefined,
    "lang-abbr": getLanguage() || "en"
});

export function api() {
    let opts = {
        baseURL: config.api.trim(),
        headers: customHeader(),
    };
    return axios.create(opts);
}

export function catchHandler(e) {
    let res = e.response && e.response.data ? e.response.data : { message: "Server restarting, please try again later." };
    console.log(e.response.status)
    if (getJsonCookies() && e.response && e.response.status === 401) {
        clearCookies();
        history.push("/login");
    }
    throw res
}
