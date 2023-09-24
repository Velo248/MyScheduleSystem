import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    onAuthStateChanged,
    getRedirectResult,
    sendEmailVerification,
    deleteUser,
    signOut,
} from "firebase/auth"
import {
    doc,
    setDoc,
    query,
    collection,
    where,
    getDocs,
} from "firebase/firestore"
import { firestore } from "../service/firebase"
import User from "../type/user"

const userFetcher = {}

const actionCodeSettings = {
    url: `${process.env.REACT_APP_MSS}`,
    handleCodeInApp: true,
}

userFetcher.signin = async function (user) {
    const auth = getAuth()
    return signInWithEmailAndPassword(auth, user.email, user.password)
        .then((userCredential) => {
            const userObj = userCredential.user
            const uuid = userObj.uid
            const token = userObj.accessToken
            const refreshToken = userObj.stsTokenManager.refreshToken

            // 이거 빼야됨 나중에
            let emailVerified = userObj.emailVerified
            const obj = {}
            if (uuid == `${process.env.REACT_APP_MSS_ADMIN}`) {
                emailVerified = true
            }
            if (!emailVerified) {
                obj.emailVerified = emailVerified
                return obj
            }
            obj.uuid = uuid
            obj.refreshToken = refreshToken
            obj.accessToken = token
            obj.authenticated = true
            obj.emailVerified = emailVerified
            return obj
        })
        .catch((error) => console.error(error))
}

userFetcher.signup = async (user) => {
    const auth = getAuth()
    return createUserWithEmailAndPassword(auth, user.email, user.password)
        .then((userCredential) => {
            const userObj = userCredential.user
            sendEmailVerification(userObj, actionCodeSettings)
            return userObj
        })
        .then((userObj) => {
            setDoc(doc(firestore, "user", `${userObj.uid}`), {
                uuid: `${userObj.uid}`,
                username: user.username,
                name: user.name,
                email: user.email,
                infoMessage: "",
                profileUrl: "",
                friends: [],
            })
            const obj = {}
            obj.uuid = `${userObj.uid}`
            obj.username = user.username
            obj.name = user.name
            obj.email = user.email
            obj.friends = []
            return obj
        })
        .catch((error) => console.error(error))
}
userFetcher.providerSignin = async function () {
    const auth = getAuth()
    const googleProvider = new GoogleAuthProvider()
    return signInWithPopup(auth, googleProvider).then(async (result) => {
        const user = result.user
        const uuid = user.uid
        const credential = GoogleAuthProvider.credentialFromResult(result)
        const q = query(
            collection(firestore, "user"),
            where("uuid", "==", uuid)
        )
        const querySnapshot = await getDocs(q)

        const obj = {}
        if (querySnapshot.empty) {
            deleteUser(user)
            obj.empty = true
            return obj
        } else {
            const uuid = user.uid
            const token = credential.accessToken
            const refreshToken = user.refreshToken
            obj.uuid = uuid
            obj.accessToken = token
            obj.refreshToken = refreshToken
            obj.authenticated = true
            return obj
        }
    })
}

userFetcher.providerSignup = async (user) => {
    return setDoc(doc(firestore, "user", `${user.uid}`), {
        uuid: `${user.uid}`,
        username: user.username,
        name: user.name,
        email: user.email,
        infoMessage: "",
        profileUrl: "",
        friends: [],
    })
        .then(() => {
            const obj = {}
            obj.uuid = `${user.uid}`
            obj.username = user.username
            obj.name = user.name
            obj.email = user.email
            obj.friends = []
            return obj
        })
        .catch((error) => console.error(error))
}

userFetcher.signupWithGoogle = async function () {
    const auth = getAuth()
    const googleProvider = new GoogleAuthProvider()
    return signInWithPopup(auth, googleProvider)
        .then((result) => {
            const user = {}
            const credential = GoogleAuthProvider.credentialFromResult(result)
            user.email = result.user.email
            user.uid = result.user.uid
            return user
        })
        .catch((e) => console.log(e))
}

// 토큰 값이랑 유저정보 데이터 확인해야됨.
userFetcher.googleResult = async function () {
    const auth = getAuth()
    getRedirectResult(auth)
        .then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result)
            const token = credential.accessToken
            const user = result.user
        })
        .catch((error) => {
            const errorCode = error.code
            const errorMessage = error.message
            console.log(errorCode, errorMessage)
        })
}

userFetcher.signupWithGithub = function () {
    ErrorUtil.notImplemented()
}

userFetcher.signout = async () => {
    const auth = getAuth()
    signOut(auth).then(() => User.clearStorage())
}

userFetcher.getUserInformation = function (setUserObj) {
    // getAuth() => currentUser 체크하려면 onAuthStateChanged가 필요함.
    const auth = getAuth()
    onAuthStateChanged(auth, async (user) => {
        if (user) {
            const userId = user.uid
            const q = query(
                collection(firestore, "user"),
                where("uuid", "==", userId)
            )
            const querySnapshot = await getDocs(q)
            querySnapshot.docs.forEach((item) => {
                const obj = {}
                obj.accessToken = user.stsTokenManager.accessToken
                obj.refreshToken = user.stsTokenManager.refreshToken
                obj.authenticated = true
                obj.fetchOption = {}
                obj.fetchOption.uuid = item.data().uuid
                setUserObj(obj)
            })
        } else setUserObj(undefined)
    })
}

userFetcher.getMyInformationByUuid = function (uuid) {
    if (uuid) {
        const q = query(
            collection(firestore, "user"),
            where("uuid", "==", uuid)
        )
        return getDocs(q)
    }
}

userFetcher.getMyInformationByEmail = async function (email) {
    const q = query(collection(firestore, "user"), where("email", "==", email))
    const data = await getDocs(q)
    const arr = []
    data.forEach((d) => {
        arr.push(d.data())
    })
    return {
        uuid: arr[0].uuid,
        name: arr[0].name,
        username: arr[0].useranme,
        infoMessage: arr[0].infoMessage,
        profileUrl: arr[0].profileUrl,
        email: arr[0].email,
    }
}

userFetcher.addFriendList = async function (uuid, friendUuid) {
    const q = query(collection(firestore, "user"), where("uuid", "==", uuid))
    const data = await getDocs(q)
    const arr = []
    data.forEach((d) => {
        arr.push(d.data())
    })
    const friendList = arr[0].friends
    const userRef = doc(firestore, "user", uuid)
    friendList.push(friendUuid)
    setDoc(userRef, { friends: friendList }, { merge: true })
}

// infoMessage -> null, created
// infoMessage -> not null, merge
userFetcher.updateMyInfomationMessage = function (uuid, infoMessage) {
    if (uuid) {
        const messageRef = doc(firestore, "user", `${uuid}`)
        setDoc(messageRef, { infoMessage: infoMessage }, { merge: true })
    }
}

Object.freeze(userFetcher)
export default userFetcher
