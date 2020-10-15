
import { reactLocalStorage } from "reactjs-localstorage";
import axios from "axios";
import moment from "moment";
import queryString from "qs";
import config from "../../config"
import { getLanguage } from "./utility"
export const groupBy = (xs, key) => {
    return xs.reduce(function (rv, x) {
        (rv[x[key]] = rv[x[key]] || []).push(x);
        return rv;
    }, {});
};


export function gatherStaticDatalength() {
    return reactLocalStorage.getObject("languageData");

    // return data.length === 0 || data.length === undefined
}
export function generateLabels(key) {
    let data = reactLocalStorage.getObject("languageData");
    let label = "";
    var lang_abbr = getLanguage()
    if (data && data.length) {
        let item = data.find(x => x.key === key)
        if (item)
            label = item.data[lang_abbr]
    }
    return label
}

export function camelize(str) {
    return str.split(" ").map(function (word, index) {
        // If it is the first word make sure to lowercase all the chars.
        if (index === 0) {
            return word.toLowerCase();
        }
        // If it is not the first word only upper case the first char and lowercase the rest.
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    }).join("");
}


export const generateRandomKey = () => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};
export const getNumberOfDays = (startDate, endDate) => {
    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    const firstDate = new Date(startDate);
    const secondDate = new Date(endDate);
    return Math.round(Math.abs((firstDate - secondDate) / oneDay));
}

export const capitalize = str => {
    return str.charAt(0).toUpperCase() + str.slice(1);
};

export const getDate = date => {
    return moment(date).format("DD MMMM  YYYY");
};
export const getFormatedDate = date => {
    return moment(date).format("DD MMM  YYYY");
};
export const getYear = date => {
    return moment(date).format("YYYY");
};
export const objToUrlParams = obj => {
    return queryString.stringify(cleanObject(obj));
};
export const imageUrl = obj => {
    return config.imageDomain + obj;
};

export function cleanObject(obj) {
    for (var propName in obj) {
        if (obj[propName] === null || obj[propName] === undefined) {
            delete obj[propName];
        }
    }
    return obj;
}

export function getCurrentPosition() {
    return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
            return navigator.geolocation.getCurrentPosition(resolve, reject);
        }
        return reject("Geolocation is not supported by this browser.");
    });
}

// export function getAddress(location) {
//     return new Promise(function (resolve, reject) {
//         axios({
//             url: `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.lat},${location.lng}&key=${config.mapKey}`,
//             method: "GET",
//         })
//             .then(function (response) {
//                 resolve(response.data);
//             })
//             .catch(function (error) {
//                 reject(error);
//             });
//     });
// }
// export function getLatLong(address) {
//     return new Promise(function (resolve, reject) {
//         axios({
//             url: `https://maps.googleapis.com/maps/api/geocode/json?place_id=${address}&key=${config.mapKey}`,
//             method: "GET",
//         })
//             .then(function (response) {
//                 resolve(response.data);
//             })
//             .catch(function (error) {
//                 reject(error);
//             });
//     });
// }

export function getNextSunday(date) {
    date = new Date(date)
    date.setDate(date.getDate() + (1 + 6 - date.getDay()) % 6)
    if (new Date(date).getDay() !== 0) {
        date = new Date(new Date(date).setDate(new Date(date).getDate() - (new Date(date).getDay())))
    }
    console.log("inside function helperNXTSUNDAY", date)
    return date
}
export function getNearestSaturday(date) {
    date = new Date(date)
    date.setDate(date.getDate() + (1 + 5 - date.getDay()) % 5)
    if (new Date(date).getDay() !== 6) {
        date = new Date(new Date(date).setDate(new Date(date).getDate() - (new Date(date).getDay() + 1)))
    }

    console.log("inside function helperNXTSATURDAY", date)
    return date
}
export function normalizeEmail(email) {
    return email.replace(/[^\w\s]/gi, "");
}

export function getUserLocation() {
    return new Promise(function (resolve, reject) {
        axios({
            url: "https://ipapi.co/json/",
            method: "GET",
        })
            .then(function (response) {
                resolve(response.data);
            })
            .catch(function (error) {
                reject(error);
            });
    });
}