import { db } from "../../../firebase"
import firebase from "firebase/app";

export function imageUpload(payload) {
    const storage = firebase.storage();
    const files = payload.files
    console.log(files)
    var imgArray = payload.images || []
    return new Promise((resolve, reject) => {
        var promisify = new Promise((resolve, reject) => {
            files.map((item, i) => {
                var name = new Date().getTime().toString() + i.toString() + item.name
                storage
                    .ref(`/studio/${payload.docId}/${name}`)
                    .put(item.originFileObj)
                    .then(url => {
                        console.log("Got download url: ", url);
                        storage
                            .ref(`/studio/${payload.docId}/${name}`)
                            .getDownloadURL()
                            .then(re => {
                                imgArray.push(re)
                                if (i === files.length - 1) resolve(imgArray)
                            })

                    })
                    .catch(e => { reject(e); throw e })
                return item
            });

        })
        promisify.then(async res => {
            console.log(res, "Image ARRAY")
            await db.collection("studios").doc(payload.docId).update({ images: res.filter(Boolean), step: 5 }).then(res => resolve(res))
        }).catch(e => { reject(e); throw e })
    })
}

// const imageRef = this.storage.ref(`${this.auth.networkKey}/${this.auth.userKey}/${path}/${moment().unix()}/${uploadData.name}`)
// await imageRef.put(uploadData);
// const downloadURL = await imageRef.getDownloadURL().take(1).toPromise();