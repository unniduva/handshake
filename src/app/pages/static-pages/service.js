import { db } from "../../firebase"

export async function getCMS(data) {
    return await db.collection("cms")
        .doc(data.type)
        .collection(data.language)
        .doc(data.type + "_" + data.language)
        .get()
        .then(x => !x.empty && ({ ...x.data(), id: x.id }))
}
