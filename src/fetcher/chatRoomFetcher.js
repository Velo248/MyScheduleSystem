import {
    doc,
    deleteDoc,
    addDoc,
    collection,
    getDocs,
    updateDoc,
    onSnapshot,
} from "firebase/firestore"
import ChatRoom from "../type/chatRoom"
import { firestore } from "../service/firebase"

const chatRoomFetcher = {}

// chatRoomType에는 doc의 id가 있어야 하고
// chatRoom field에는 user들의 id가 있어야만 한다.
chatRoomFetcher.createChatRoom = async function (
    uuid,
    userUuid,
    startDate,
    chatRoomName
) {
    return addDoc(collection(firestore, "chatroom"), {
        uuid: uuid,
        userUuid: userUuid,
        startDate: startDate,
        chatRoomName: chatRoomName,
        messages: [],
    })
}

chatRoomFetcher.allChatRoomLists = async function (uuid) {
    const qs = await getDocs(collection(firestore, "chatroom"))
    const result = []
    if (uuid) {
        qs.forEach((doc) => {
            const obj = doc.data()
            if (obj.userUuid.includes(uuid)) {
                result.push(
                    new ChatRoom(
                        doc.id,
                        obj.chatRoomName,
                        obj.startDate,
                        obj.userUuid
                    )
                )
            }
        })
        return result
    }
}

chatRoomFetcher.updateChatRoom = function (uuid, updated) {
    const chatRoom = doc(firestore, "chatroom", uuid)
    updateDoc(chatRoom, updated)
}

chatRoomFetcher.deleteChatRoom = async function (chatRoomUuid) {
    const chatRoom = doc(firestore, "chatroom", `${chatRoomUuid}`)
    await deleteDoc(chatRoom)
}

// ?@? 기준으로 날짜/시간/메세지 나눔
// send: 2022-07-30?@?16:32?@?This is admin !
chatRoomFetcher.subscribeChatContents = async function (
    uuid,
    myUuid,
    setMessages
) {
    onSnapshot(
        doc(firestore, "chatroom", uuid),
        { includeMetaDataChanges: true },
        (doc) => {
            const msgs = doc.data().messages
            const arr = []
            msgs.forEach((m) => {
                const temp = m.split("?@?")
                const uuid = temp[0]
                const date = temp[1]
                const time = temp[2]
                const message = temp[3]
                arr.push({
                    uuid: uuid,
                    date: date,
                    time: time,
                    message: message,
                    isMe: uuid == myUuid ? true : false,
                })
            })
            setMessages(arr)
        }
    )
}

// 기존의 Messages 에다가 새로운 내용 추가.
// 각각의 환경에서 각자의 Message만 추가한다면 문제가 없을 것으로 예상된다.
chatRoomFetcher.uploadChatContents = async function (state) {
    const chatRoom = doc(firestore, "chatroom", state.uuid)
}

Object.freeze(chatRoomFetcher)
export default chatRoomFetcher
