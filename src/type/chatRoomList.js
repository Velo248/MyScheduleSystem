import ChatRoom from "./chatRoom"
import ErrorUtil from "../util/errorUtil"
import ArrayUtil from "../util/arrayUtil"
import SymbolName from "../util/symbolName"

class _ChatRoomList extends SymbolName {
    constructor(chatRoomList) {
        super("chatRoomList")
        this.$_chatRoomList = chatRoomList
    }

    asChatRoomObject() {
        const obj = {}
        this.$_chatRoomList.forEach(e => {
            obj[e.uuid] = {
                name: e.name,
                users: e.users
            }
        })
        return obj
    }

    chatRoomList() {
        return this.$_chatRoomList
    }
}

const ChatRoomList = {}

ChatRoomList.createChatRoomList = function(array) {
    const cArray = ArrayUtil.createArray(array, ChatRoom)
    return new _ChatRoomList(cArray)
}

ChatRoomList.createChatRoomNameList = function(array) {
    const newArray = array.map(e => e.name)
    newArray.every(e => ErrorUtil.typeCheck(e, "string"))
    return newArray
}

Object.freeze(ChatRoomList)
export default ChatRoomList