import {
    collection,
    deleteDoc,
    doc,
    getDocs,
    query,
    where,
    updateDoc,
} from "firebase/firestore"
import { firestore } from "../service/firebase"

const messageFetcher = {}

messageFetcher.allUserMessageAlarm = async function (uuid) {
    if (uuid) {
        const q = query(
            collection(firestore, "message"),
            where("userUuid", "==", uuid)
        )
        const querySnapshot = await getDocs(q)
        const msgResult = []
        if (querySnapshot.empty) {
            return []
        } else {
            querySnapshot.forEach((v) => {
                const data = v.data()
                const msgObj = {}
                msgObj.uuid = data.uuid
                msgObj.isChecked = data.isChecked
                msgObj.message = data.message
                msgObj.startDate = data.startDate
                msgObj.friendName = data.friendName
                msgResult.push(msgObj)
            })
        }
        return msgResult
    }
}

messageFetcher.updateUserMessageAlarm = async function (uuid, userUuid, mObj) {
    const message = doc(firestore, "message", uuid)
    const updated = {}
    updated.userUuid = userUuid
    updated.message = mObj.msg
    updated.startDate = mObj.startDate
    updated.friendName = mObj.friendName
    updated.isChecked = mObj.isChecked
    updated.uuid = uuid
    await updateDoc(message, updated)
}

messageFetcher.deleteUserMessageAlarm = async function (uuid) {
    const message = doc(firestore, "message", uuid)
    await deleteDoc(message)
}

export default messageFetcher
