import SymbolName from "../util/symbolName"

class Friend extends SymbolName {
    constructor(uuid, username, profileURL, infoMessage) {
        super("friend")
        this.uuid = uuid
        this.username = username
        this.profileURL = profileURL
        this.infoMessage = infoMessage
    }

    getFriendUuid() {
        return this.uuid
    }

    getFriendNickname() {
        return this.username
    }

    getFriendImageUrl() {
        return this.profileURL
    }

    getInfoMessage() {
        return this.infoMessage
    }
}

Object.freeze(Friend)
export default Friend
