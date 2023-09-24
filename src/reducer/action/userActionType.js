const USER_SIGNIN_ACTION = "USER_SIGNIN_ACTION"
const USER_SIGNOUT_ACTION = "USER_SIGNOUT_ACTION"

const UserActionType = {}

UserActionType.type = {}
UserActionType.type.signin = USER_SIGNIN_ACTION
UserActionType.type.signout = USER_SIGNOUT_ACTION

Object.freeze(UserActionType)
export default UserActionType