import ChatRoomType from "./chatRoomType"
import ArrayUtil from "../util/arrayUtil"
import ErrorUtil from "../util/errorUtil"

class ChatRoom extends ChatRoomType {
    constructor(uuid, chatRoomName, startDate, users) {
        ErrorUtil.invalidParameter(uuid)
        ErrorUtil.invalidParameter(chatRoomName)
        ErrorUtil.invalidParameter(startDate)
        ErrorUtil.assert(ArrayUtil.size(users) >= 1, "Error")
        super(uuid, chatRoomName, startDate, "chatRoom")
        this.users = users
        this.isGroupChat = ArrayUtil.size(users) <= 2 ? false : true
    }
}

export default ChatRoom