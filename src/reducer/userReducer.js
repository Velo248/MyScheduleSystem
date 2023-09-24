import UserActionType from "./action/userActionType"
import ErrorUtil from "../util/errorUtil"

const UserReducer = {}

UserReducer.type = "userReducer"

const UserInitialState = {}

UserInitialState.type = "userInitialState"
UserInitialState.refreshToken = null
UserInitialState.accessToken = null
UserInitialState.authenticated = false
UserInitialState.fetchOption = {}
UserInitialState.fetchOption.uuid = null

UserReducer.clearUserState = function() {
    UserInitialState.refreshToken = null
    UserInitialState.accessToken = null
    UserInitialState.authenticated = false
    UserInitialState.fetchOption = {}
    UserInitialState.fetchOption.uuid = null
    return UserInitialState
}

// input: action => object,
// action: token(string), authenticated(boolean)
// access => authenticated: true, rejected => authenticated: false
UserReducer.userReducer = function(state, action) {
    switch(action.type) {
        case UserActionType.type.signin: {
            const obj = action.action
            ErrorUtil.invalidParameter(obj.accessToken)
            ErrorUtil.invalidParameter(obj.refreshToken)
            ErrorUtil.invalidParameter(obj.fetchOption.uuid)
            state.accessToken = obj.accessToken
            state.refreshToken = obj.refreshToken
            state.fetchOption.uuid = obj.fetchOption.uuid
            state.authenticated = obj.authenticated
            return {
                ...state,
                accessToken: obj.accessToken,
                refreshToken: obj.refreshToken,
                authenticated: obj.authenticated,
                fetchOption: obj.fetchOption.uuid,
            }
        }

        case UserActionType.type.signout:
            return { ...UserReducer.clearUserState() }

        default:
            ErrorUtil.notImplemented()
    }
}

Object.freeze(UserReducer)
export {
    UserReducer,
    UserInitialState,
}