import SymbolName from "../util/symbolName"

class ChatRoomType extends SymbolName {
    constructor(uuid, chatRoomName, startDate , typeName) {
        super(typeName)
        this.uuid = uuid
        this.chatRoomName = chatRoomName
        this.startDate = startDate
        this.isGroupChat = null
    }

    isGroupChatRoom() {
        if(!this.isGroupChat) return false
        return true
    }

    getChatRoomName() {
        return this.chatRoomName
    }

    getUuid() {
        return this.uuid
    }
}

Object.freeze(ChatRoomType)
export default ChatRoomType