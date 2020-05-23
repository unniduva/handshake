import Cookies from "js-cookie";
import { reactLocalStorage } from "reactjs-localstorage";
import config from "../../config";
const cookies = config.cookies;

export function clearCookies() {
    Cookies.remove(cookies.name);
    // Cookies.remove("lng")
}

export function setCookies(data) {
    console.log("at cokkie set", data)
    try {
        let cookie = {};
        if (data.accessToken) cookie.authKey = data.accessToken;
        if (data.user && data.user.email) cookie.email = data.user.email;
        if (data.user && data.user.firstName) cookie.firstName = data.user.firstName;
        if (data.user && data.user.dob) cookie.dob = data.user.dob;
        if (data.user && data.user.lastName) cookie.lastName = data.user.lastName;
        if (data.user && data.user.Dob) cookie.Dob = data.user.Dob;
        if (data.user && data.user.imgUrl) cookie.imgUrl = data.user.imgUrl;
        if (data.customer && data.customer.id) cookie.id = data.customer.id;
        if (data.customer && data.customer.otp_verified) cookie.otp_verified = data.customer.otp_verified;
        // if (data.refreshToken) cookie.refreshToken = data.refreshToken;
        Cookies.set(cookies.name, cookie, { expires: cookies.expiry });
    } catch (e) {
        console.error(e)
    }
}

export function updateCookie(data) {
    let cookie = Cookies.getJSON(cookies.name);
    if (data.user && data.user.email) cookie.email = data.user.email;
    if (data.user && data.user.firstName) cookie.firstName = data.user.firstName;
    if (data.user && data.user.dob) cookie.dob = data.user.dob;
    if (data.user && data.user.lastName) cookie.lastName = data.user.lastName;
    if (data.user && data.user.imgUrl) cookie.imgUrl = data.user.imgUrl;
    if (data.user && data.user.Dob) cookie.Dob = data.user.Dob;
    if (data.fcm) cookie.fcm = data.fcm;
    Cookies.set(cookies.name, cookie, { expires: cookies.expiry });
}

export function updateOtpStatus() {
    let user = Cookies.getJSON(cookies.name);
    user.otp_verified = 1;
    Cookies.set(cookies.name, user, { expires: cookies.expiry });
}

export function getCookies() {
    return Cookies.get(cookies.name);
}

export function getJsonCookies() {
    let token = Cookies.getJSON(cookies.name);
    if (token) return token.email;
}

export function getCookie() {
    let token = Cookies.getJSON(cookies.name);
    if (token) return token;
}

export function setLanguage(data) {
    Cookies.set(cookies.language, data, { expires: 365 });
}
export function getLanguage() {
    return Cookies.getJSON(cookies.language) || "eng";
}
export function setlanguageData(data) {
    if (data && data.length)
        reactLocalStorage.setObject("languageData", data)
}
export function getPolygonCenter(polygons) {
    if (!polygons || !polygons.length) {
        // throw {name: "dataNotFound", message: "Polygons not provided"}
        return null
    }
    let lat1 = polygons[0].latitude         // lowest lat
    let lat2 = polygons[0].latitude         // highest lat
    let lng1 = polygons[0].longitude        // lowest lng
    let lng2 = polygons[0].longitude        // highest lng

    polygons.forEach(item => {
        if (item.latitude < lat1) lat1 = item.latitude
        else if (item.latitude > lat2) lat2 = item.latitude

        if (item.longitude < lng1) lng1 = item.longitude
        else if (item.longitude > lng2) lng2 = item.longitude
    })

    let lat = lat1 + ((lat2 - lat1) / 2);
    let lng = lng1 + ((lng2 - lng1) / 2);
    return { lat, lng }
}


