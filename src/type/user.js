import UserType from "./userType"
import Storage from "../storage/storage"
import UserInfo from "./userInfo"
import ErrorUtil from "../util/errorUtil"

class User extends UserType {
    constructor(uuid, username, email, name) {
        super(uuid, username, email, name, "user")
        this.info = new UserInfo("", "", [])
        ErrorUtil.invalidParameter(uuid)
    }
}

User.saveAccessStorage = function (accessToken) {
    Storage.saveAccessToken(accessToken)
}

User.checkForUserPersistence = function () {
    return Storage.checkPersistenceUser()
}

User.clearStorage = function () {
    Storage.clear()
}

Object.freeze(User)
export default User
