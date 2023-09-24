import SymbolName from "../util/symbolName"
import ErrorUtil from "../util/errorUtil"

class UserType extends SymbolName {
    constructor(uuid, username, email, name, typeName) {
        super(typeName)
        ErrorUtil.invalidParameter(uuid)
        this.uuid = uuid
        this.username = username
        this.email = email
        this.name = name
    }

    getId() {
        return this.uuid
    }

    getUserName() {
        return this.username
    }

    getEmail() {
        return this.email
    }

    getName() {
        return this.name
    }
}

Object.freeze(UserType)
export default UserType
