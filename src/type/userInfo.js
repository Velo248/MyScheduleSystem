import SymbolName from "../util/symbolName"

class UserInfo extends SymbolName {
    constructor(infoMessage, profileUrl, friends) {
        super("userInformationType")
        this.infoMessage = infoMessage
        this.profileURL = profileUrl
        this.friends = friends

        SymbolName.freezeObject(UserInfo, this)
    }

    getInfoMessage() {
        return this.infoMessage
    }

    getProfileImageUrl() {
        return this.profileURL
    }

    getFriends() {
        return this.friends
    }

    setInfoMessage(infoMessage) {
        this.infoMessage = infoMessage
    }

    setProfileUrl(profileUrl) {
        this.profileURL = profileUrl
    }

    setFriends(friends) {
        this.friends = friends
    }
}

export default UserInfo
