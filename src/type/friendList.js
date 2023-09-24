import ArrayUtil from "../util/arrayUtil"
import ErrorUtil from "../util/errorUtil"
import SymbolName from "../util/symbolName"
import Friend from "./friend"

class _FriendList extends SymbolName {
    constructor(friendListArray) {
        super("friendList")
        this.$_friendListArray = friendListArray
    }

    friendListObject() {
        const friendObj = {}
        this.$_friendListArray.forEach((f) => {
            friendObj[f.getFriendUuid()] =  {
                nickName: f.getFriendNickname(),
                createdAt: f.getCreatedAt(),
                firendImageUrl: f.getFriendImageUrl(),
            }
        })
        return friendObj
    }

    friendListArray() {
        return this.$_friendListArray
    }
}

const FriendList = {}

FriendList.createFriendList = function(array) {
    const fArr = ArrayUtil.createArray(array, Friend)
    ErrorUtil.assert(ArrayUtil.size(fArr) > 1, "Array size > 1")
    return new _FriendList(fArr)
}

FriendList.createFriendStringList = function(array) {
    ErrorUtil.assert(!ArrayUtil.isEmpty(array), "Array must be filled!")
    const fArr = array.map(friend => friend.getFriendNickname)
    fArr.every(e => ErrorUtil.typeCheck(e, "string"))
    ErrorUtil.assert(ArrayUtil.size(fArr) > 1, "Array size > 1")
    return fArr
}

Object.freeze(FriendList)
export default FriendList