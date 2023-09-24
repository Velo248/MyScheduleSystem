import {
    createContext,
    useState,
    useMemo,
    useCallback,
    useReducer,
    useEffect,
} from "react"
import SignupForm from "../pages/signupForm"
import SigninForm from "../pages/signinForm"
import UserActionType from "../reducer/action/userActionType"
import { UserReducer, UserInitialState } from "../reducer/userReducer"
import userFetcher from "../fetcher/userFetcher"
import User from "../type/user"
import AlertPopup from "../components/popup/alertPopup"
import CheckPopup from "../components/popup/checkPopup"
import LoadingSpinner from "../components/spinner/loadingSpinner"

export const UserContext = createContext({})

// react 자식 component => children이라는 이름.
// children props는 하위 컴포넌트가 어떻게 구성되어 있는지 모를 때 사용.
function UserContextProvider({ children }) {
    const [userObj, setUserObj] = useState(null)
    const [isSignin, setIsSignin] = useState(true)
    const [isUserFailed, setIsUserFailed] = useState(false)
    const [userState, userDispatch] = useReducer(
        UserReducer.userReducer,
        UserInitialState
    )
    const [isEamilCheckPopup, setIsEmailCheckPopup] = useState(false)
    const [isEmptyUser, setIsEmptyUser] = useState(false)

    useEffect(() => {
        userFetcher.getUserInformation(setUserObj)
    }, [])

    const onSignupEventHandler = useCallback(async (user) => {
        const obj = {}
        obj.username = user.username
        obj.name = user.name
        obj.email = user.email
        obj.password = user.password
        const result = await userFetcher.signup(obj)
        if (result) {
            setIsSignin(true)
            setIsEmailCheckPopup(true)
        } else {
            setIsUserFailed(true)
        }
    }, [])

    const onSigninEventHandler = useCallback(
        async (user) => {
            const obj = {}
            obj.email = user.email
            obj.password = user.password
            const response = await userFetcher.signin(obj)
            if (!response.emailVerified) {
                setIsUserFailed(true)
                return
            }
            if (!response.authenticated) {
                setIsUserFailed(true)
                return
            }
            const userObj = {}
            userObj.fetchOption = {}
            userObj.refreshToken = response.refreshToken
            userObj.accessToken = response.accessToken
            userObj.authenticated = response.authenticated
            userObj.fetchOption.uuid = response.uuid
            userDispatch({
                type: UserActionType.type.signin,
                state: userState,
                action: userObj,
            })
            User.saveAccessStorage(userState.accessToken)
            setUserObj(userState)
        },
        [userState]
    )

    const onProviderSigninEventHandler = useCallback(async () => {
        const response = await userFetcher.providerSignin()
        if (response.empty) {
            setIsEmptyUser(true)
            return
        }
        const userObj = {}
        userObj.fetchOption = {}
        userObj.refreshToken = response.refreshToken
        userObj.accessToken = response.accessToken
        userObj.authenticated = response.authenticated
        userObj.fetchOption.uuid = response.uuid
        userDispatch({
            type: UserActionType.type.signin,
            state: userState,
            action: userObj,
        })
        User.saveAccessStorage(userState.accessToken)
        setUserObj(userState)
    }, [userState])

    const onSignoutButtonClickHandler = useCallback(() => {
        userFetcher.signout().then(() => {
            setUserObj(null)
            userDispatch({
                type: UserActionType.type.signout,
                state: UserReducer.clearUserState().state,
                action: userObj,
            })
        })
    }, [])

    const onProviderSignupEventHandler = useCallback(async (user) => {
        const obj = {}
        obj.username = user.username
        obj.name = user.name
        obj.email = user.email
        obj.uid = user.uid
        const result = await userFetcher.providerSignup(obj)
        if (result) setIsSignin(true)
        else setIsUserFailed(true)
    }, [])

    const onClickUserServiceButtonEventHandler = (isChecked) => {
        setIsSignin(isChecked)
    }

    const onCloseAlertPopupEventHandler = useCallback(() => {
        setIsUserFailed(false)
    }, [])

    const onCloseCheckPopupEventHandler = useCallback((isChecked) => {
        if (isChecked) setIsSignin(false)
        else setIsSignin(true)
        setIsEmptyUser(false)
    }, [])

    const userContextObj = useMemo(
        () => ({
            userObj,
            onSignoutButtonClickHandler,
        }),
        [userObj, onSignoutButtonClickHandler]
    )

    return (
        <UserContext.Provider value={userContextObj}>
            {userObj && User.checkForUserPersistence() ? (
                children
            ) : isSignin === false ? (
                <SignupForm
                    isUserFailed={isUserFailed}
                    isEmailCheck={isEamilCheckPopup}
                    onSignupEvent={onSignupEventHandler}
                    onProviderSignupEvent={onProviderSignupEventHandler}
                    onClickUserServiceButtonEvent={
                        onClickUserServiceButtonEventHandler
                    }
                />
            ) : userObj === null ? (
                <LoadingSpinner />
            ) : (
                <SigninForm
                    onSigninEvent={onSigninEventHandler}
                    onProviderSigninEvent={onProviderSigninEventHandler}
                    onClickUserServiceButtonEvent={
                        onClickUserServiceButtonEventHandler
                    }
                />
            )}
            <AlertPopup
                message="Check your input information or validation email"
                isShowPopup={isUserFailed}
                setIsShowPopupEvent={onCloseAlertPopupEventHandler}
            />
            <CheckPopup
                message="You are not registered member. Please register now."
                isShowPopup={isEmptyUser}
                onCheckPopupEvent={onCloseCheckPopupEventHandler}
            />
        </UserContext.Provider>
    )
}

export default UserContextProvider
