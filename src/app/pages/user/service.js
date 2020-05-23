import { normalizeEmail } from "../../helpers";
import { db } from "../../firebase"
import firebase from "firebase/app";
import moment from "moment"

export function AddUserToCollection(payload) {
    let res = db
        .collection("users")
        .doc(normalizeEmail(payload.email)).set(payload)
    return res;
}

export function getUser(email) {
    var docRef = db.collection("users").doc(normalizeEmail(email));
    return docRef.get().then(function (doc) {
        if (doc.exists) return doc.data()
        else return ({})
    }).catch(function (error) { throw error });
}

export async function getStudio() {
    var temp = []
    var array = []
    var promises = []

    await db.collection("studios").get().then(snapshot => {
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

export async function updateProfile(payload) {
    var docRef = db.collection("users").doc(normalizeEmail(payload.email));
    // console.log("return", docRef.update({
    //     Dob: payload.dob,
    //     Fname: payload.fname,
    //     Lname: payload.lname
    // }))
    return docRef.update({
        Dob: payload.dob,
        Fname: payload.fname,
        Lname: payload.lname
    }).then(res => { return payload }).catch(e => { throw e })
    // return;

    // return await db.collection("users").doc(normalizeEmail(payload.email)).update({
    //     Dob: payload.dob,
    //     Fname: payload.fname,
    //     Lname: payload.lname
    // })
}
export function uploadImage(payload) {
    const storage = firebase.storage();
    const files = payload.files
    return new Promise((resolve, reject) => {
        storage
            .ref(`/user/${payload.userId}/profile`)
            .put(files.originFileObj)
            .then(url => {
                console.log("Got download url: ", url);
                storage
                    .ref(`/user/${payload.userId}/profile`)
                    .getDownloadURL()
                    .then(async re => {
                        await db.collection("users").doc(payload.userId).update({ imageUrl: re }).then(res => resolve(re))
                    })
            })
            .catch(e => { reject(e); throw e })
    })
}

export async function getWarnings(data) {
    var array = []
    var docRef = db.collection("users").doc(data).collection("Notifications");
    await docRef.get().then(function (snap) {
        snap.forEach(doc => {
            array.push({ id: doc.id, ...doc.data() })
        })
    }).catch(function (error) { throw error });
    return array
}

export async function getSingleWarning(payload) {
    var temp = {}
    var docRef = db.collection("users").doc(payload.docKey)
        .collection("Notifications").doc(payload.id);
    await docRef.get().then(function (snap) {
        temp = { id: snap.id, ...snap.data() }
    }).catch(function (error) { throw error });
    return temp
}

export async function updateRating(data) {
    await db.collection("users")
        .doc(data.userId)
        .collection("ratings")
        .doc(data.studioId)
        .set(data)
        .then(async res => {
            await db.collection("studios")
                .doc(data.studioId)
                .collection("ratings")
                .doc(data.userId)
                .set(data)
        })
}

export async function getRating(data) {
    return await db.collection("users")
        .doc(data.userId)
        .collection("ratings")
        .doc(data.studioId)
        .get()
        .then(res => (res.data()))
}

export async function registerTokens(data) {
    const networkCollectionDocRef = db.collection("devices")

    networkCollectionDocRef
        .where("pushToken", "==", data.token)
        .get()
        .then(querySnapshot => {
            if (querySnapshot.empty) {
                networkCollectionDocRef.add({
                    userId: data.userId,
                    pushToken: data.token,
                    createdAt: moment()
                        .utc()
                        .toDate()
                });
            } else {
                // Update
                querySnapshot.forEach(function (doc) {
                    let queryData = doc.data();
                    if (queryData.pushToken == data.token) {
                        // console.log("Same user aade");
                        networkCollectionDocRef.doc(doc.id).update({
                            userId: data.userId,
                            platform: "Browser",
                            createdAt: moment()
                                .utc()
                                .toDate()
                        });
                    }
                });
            }
        });
}

export async function deletePushToken(data) {
    const networkCollectionDocRef = db.collection("devices")
    networkCollectionDocRef
        .where("pushToken", "==", data.token)
        .get()
        .then(querySnapshot => {
            if (!querySnapshot.empty) {
                querySnapshot.forEach(function (doc) {
                    networkCollectionDocRef.doc(doc.id).delete()
                });
            }
        });
}