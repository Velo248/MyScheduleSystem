import { doc, updateDoc, getDocs, collection, where, query } from "firebase/firestore"
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage"
import { firestorage, firestore } from "../service/firebase"
const imageFetcher = {}

imageFetcher.profileImageUpload = function (uuid, file) {
    const imageRef = ref(firestorage, `${uuid}/profile/${file.name}`)
    uploadBytes(imageRef, file)
        .then(() => getUrlData(uuid, "user", imageRef))
        .catch((e) => console.error(e))
}

imageFetcher.calendarImageUpload = function (uuid, docId, file) {
    const imageRef = ref(firestorage, `${uuid}/calendar/${docId}`)
    uploadBytes(imageRef, file).then(() => {
        getDownloadURL(imageRef).then(async (url) => {
            const calendarRef = doc(firestore, "calendar", uuid)
            await updateDoc(calendarRef, {canlendarImageURL: url})
        })
        .catch(e => console.error(e))
    })
    .catch(e => console.error(e))
}

async function getUrlData(uuid, cName, imageRef) {
    const profileURL = {}
    const url = await getDownloadURL(imageRef)
    const q = query(
        collection(firestore, cName),
        where("uuid", "==", uuid)
    )
    const querySnapshot = await getDocs(q)
    querySnapshot.docs.forEach((item) => {
        profileURL.url = item.data().profileURL
    })
    const deleteRef = ref(firestorage, profileURL.url)
    const profileRef = doc(firestore, cName, uuid)
    await updateDoc(profileRef, {profileURL: url})
    deleteObject(deleteRef)
        .then(() => {
            const profileRef = doc(firestore, cName, uuid)
            updateDoc(profileRef, {profileURL: url})
        })
}

Object.freeze(imageFetcher)
export default imageFetcher