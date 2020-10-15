import { db } from "../../firebase"
import axios from "axios"
export async function listStudio(payload) {
    var temp = []
    var array = []
    var promises = []
    var docRef = ""
    docRef = db.collection("studios")
    // if (payload.language) docRef = docRef.where("defaultLang", "==", payload.language)
    if (payload.userId) docRef = docRef.where("ownerId", "==", payload.userId)
    if (payload.studioType) docRef = docRef.where("studioType", "array-contains", payload.studioType);

    await docRef.orderBy("Hourlyrate").get().then(snapshot => {
        snapshot.forEach(doc => {
            let location = doc.data()
            location.id = doc.id
            temp.push({ id: doc.id, data: doc.data() })
            promises.push(doc.ref.collection("English").get());
        })
        return Promise.all(promises);
    }).then(async results => {
        await results.forEach((querySnapshot, i) => {
            querySnapshot.forEach(function (doc) {
                let item = temp[i]
                item = item && item.data
                array.push({ id: temp[i].id, data: { ...doc.data(), ...item } })
            });
        });
    }).catch(err => console.log("ERROR===>", err))
    return array
}

export function getIncludedServices(id) {
    var docRef = db.collection("includedServices").doc(id);
    return docRef.get().then(function (doc) {
        if (doc.exists) return doc.data()
        else return ({})
    }).catch(function (error) { throw error });
}

export async function getStudio(docKey) {
    var temp = {}
    var docRef = db.collection("studios").doc(docKey);
    await docRef.get().then(async function (doc) {
        temp = doc.data() ? doc.data() : {}
        temp.id = docKey
        let language = doc.data().defaultLang === "eng" ? "English" : "Swedish"
        await doc.ref.collection(language).get().then(res => res.forEach(item => temp = { ...temp, ...item.data() }))
    }).catch(function (error) { throw error });
    return temp
}

export async function addStudio(payload) {
    var response = {}
    let language = payload.nonLngPayload.defaultLang === "eng" ? "English" : "Swedish"
    return new Promise(async (resolve, reject) => {
        if (payload.step === 0 && payload.docId === undefined) {

            await db.collection("studios").add(payload.nonLngPayload).then(async newRes => {
                await db.collection("studios")
                    .doc(newRes.id)
                    .collection(language)
                    .doc(newRes.id.toString() + language)
                    .set(payload.lngSpecificPayload)

                response.id = newRes.id

                newRes.get().then(re => {
                    response = { ...response, ...re.data() }
                    resolve(response)
                })
            }).catch(e => reject(e))
        }
        else {
            if (payload.currStep === 4) {
                await db.collection("includedServices").add({
                    audioEngineer: payload.lngSpecificPayload.audioEngineer,
                    isDiscountSelected: payload.lngSpecificPayload.isDiscountSelected,
                    discount: payload.lngSpecificPayload.discount
                }).then(async res => {
                    await db.collection("additionalServices").add({
                        sessionAudEng: payload.lngSpecificPayload.sessionAudEng,
                        sessionAudEngRate: payload.lngSpecificPayload.sessionAudEngRate,
                        mixingServices: payload.lngSpecificPayload.mixingServices,
                        mixingServicesRate: payload.lngSpecificPayload.mixingServicesRate,
                        otherServices: payload.lngSpecificPayload.otherServices,
                        otherServicesRate: payload.lngSpecificPayload.otherServicesRate,
                        discAudEng: payload.lngSpecificPayload.discAudEng
                    }).then(async result => {
                        payload.lngSpecificPayload.includedServices = [res.id]
                        payload.lngSpecificPayload.additionalServices = [result.id]
                        await db.collection("studios").doc(payload.docId).update(payload.nonLngPayload).then(async newRes => {
                            await RegisterStudio(payload.lngSpecificPayload, payload.docId, language)
                            response.id = payload.docId
                            resolve(response)
                        })
                    })

                }).catch(err => { throw err })
            }
            else {
                console.log(payload, "pooooooi")
                await db.collection("studios").doc(payload.docId).update(payload.nonLngPayload).then(async newRes => {
                    await RegisterStudio(payload.lngSpecificPayload, payload.docId, language)
                    response.id = payload.docId
                    resolve(response)
                })
            }
        }
    })
}

export function RegisterStudio(payload, id, language) {
    return db.collection("studios")
        .doc(id)
        .collection(language)
        .doc(id.toString() + language)
        .update(payload)

}


export async function getStaticData() {
    var array = []
    await db.collection("staticData").get().then(snapshot => {
        snapshot.forEach(doc => {
            array.push({ key: doc.id, data: doc.data() })
        })
    })
    return array
}

export async function getOnGoingStudio(docKey) {
    var temp = {}
    var docRef = db.collection("studios").doc(docKey);
    await docRef.get().then(async function (doc) {
        temp = doc.data()
        temp.id = docKey
        await doc.ref.collection("English").get().then(res => res.forEach(item => temp = { ...temp, ...item.data() }))
    }).catch(function (error) { throw error });
    return temp
}

export async function bookStudio(payload) {
    return await db.collection("booking")
        .add(payload.bookingData).then(async res => {
            await db.collection("booking").doc(res.id)
                .collection("cards")
                .doc(payload.card.id)
                .set(payload.card)
            await db.collection("booking").doc(res.id)
                .collection("payment")
                .doc(payload.payment.id)
                .set(payload.payment)
        })

}
export async function bookManual(payload) {
    return await db.collection("booking")
        .add(payload)
}
export async function listmyRequests(payload) {
    var temp = []
    var array = []
    var promises = []
    var docRef = db.collection("booking").where("userId", "==", payload.userId)

    await docRef.get().then(snapshot => {
        snapshot.forEach(doc => {
            if (doc) {
                temp.push({ bookingData: { id: doc.id, ...doc.data() } })
                promises.push(getStudio(doc.data().studioId));
            }
        })
        return Promise.all(promises);
    }).then(async results => {
        array = results.map((item, i) => Object.assign({}, item, temp[i]));

    }).catch(err => console.log("ERROR===>", err))
    return array
}

export function updateBooking(payload) {
    var id = payload.id
    delete payload.id
    return db.collection("booking")
        .doc(id)
        .update(payload)

}

export async function listmyBooking(payload) {
    var temp = []
    var array = []
    var promises = []
    var docRef = db.collection("booking").where("studioOwnerId", "==", payload.ownerId)
    if (payload.query && payload.query !== null) docRef = docRef.where("status", "==", payload.query)
    await docRef.get().then(snapshot => {
        snapshot.forEach(doc => {
            if (doc) {
                temp.push({ bookingData: { id: doc.id, ...doc.data() } })
                promises.push(getStudio(doc.data().studioId));
            }
        })
        return Promise.all(promises);
    }).then(async results => {
        array = results.map((item, i) => Object.assign({}, item, temp[i]));
    }).catch(err => console.log("ERROR===>", err))
    return array
}

export async function getMyRequest(payload) {
    var temp = []
    var promises = []
    var docRef = db.collection("booking").doc(payload.docId)

    await docRef.get().then(doc => {
        temp = { id: doc.id, ...doc.data() }
        promises.push(getStudio(doc.data().studioId));
        return Promise.all(promises);
    }).then(async results => {
        temp = { ...temp, studioDetails: { ...results[0] } }
    }).catch(err => console.log("ERROR===>", err))
    return temp
}

export async function updateStudio(data) {
    return await db.collection("studios").doc(data.id).update(data)
}
