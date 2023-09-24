import React, {
    useRef,
    useState,
    useCallback,
} from "react"
import MyIcon from "../icon/myIcon"
import AlertPopup from "../components/popup/alertPopup"
import userFetcher from "../fetcher/userFetcher"
import {
    Container,
    Box,
    FormGroup,
    FormControl,
    Input,
    InputAdornment,
    InputLabel,
    Button,
    Divider,
    CardMedia,
    Typography,
} from "@mui/material"
import Lodash from "lodash"
import MyStepper from "./myStepper"

const steps = [
    "Sign up email or provider",
    "Enter your information",
]

const SignupForm = ({ isUserFailed, isEmailCheck ,onSignupEvent, 
    onClickUserServiceButtonEvent, onProviderSignupEvent }) => {
    const [isOpenPopup, setIsOpenPopup] = useState(false)
    const [isEamilCheckPopup, setIsEmailCheckPopup] = useState(false)
    const [isValidUserInfo, setIsValidUserInfo] = useState({
        username: false,
        name: false,
        email: false,
        password: false,
    })
    const [providerUser, setProviderUser] = useState({})
    const [isNextStepButton, setIsNextStepButton] = useState(true)
    const [activeStep, setActiveStep] = useState(0)
    const usernameRef = useRef()
    const nameRef = useRef()
    const emailRef = useRef()
    const passwordRef = useRef()

    const onUsernameChangeHandler = useCallback((e) => {
        if(validateForUserInfo("username", e.target.value)) {
            setIsValidUserInfo((prev) => {
                return { ...prev, username: true }
            })
            return
        }
        setIsValidUserInfo((prev) => {
            return { ...prev, username: false }
        })
    }, [])

    const onNameChangeHandler = useCallback((e) => {
        if(validateForUserInfo("name", e.target.value)) {
            setIsValidUserInfo((prev) => {
                return { ...prev, name: true }
            })
            return
        }
        setIsValidUserInfo((prev) => {
            return { ...prev, name: false }
        })
    }, [])

    const onEmailChangeHandler = useCallback((e) => {
        if(validateForUserInfo("email", e.target.value)) {
            setIsValidUserInfo((prev) => {
                return { ...prev, email: true }
            })
            return
        }
        setIsValidUserInfo((prev) => {
            return { ...prev, email: false }
        })
    }, [])

    const onPasswordChangeHandler = useCallback((e) => {
        if(validateForUserInfo("password", e.target.value)) {
            setIsValidUserInfo((prev) => {
                return { ...prev, password: true }
            })
            return
        }
        setIsValidUserInfo((prev) => {
            return { ...prev, password: false }
        })
    }, [])

    const onClickRegisterButtonHandler = () => {
        const isValid = Lodash.cloneDeep(isValidUserInfo)
        let checkInfo = false
        Lodash.forEach(isValid, (v, k) => {
            if(v) {
                checkInfo = true
                return
            }
        })
        const user = {}
        user.username = usernameRef.current.value
        user.name = nameRef.current.value
        user.email = emailRef.current.value
        user.password = passwordRef.current.value
        Lodash.forEach(user, (v, k) => {
            if(v === "") {
                checkInfo = true
                return
            }
        })
        if(checkInfo) {
            setIsOpenPopup(true)
            return
        }
        setIsEmailCheckPopup(isEmailCheck)
        onSignupEvent(user)
        setIsOpenPopup(isUserFailed)
    }

    const onClickProviderRegisterButtonHandler = () => {
        const isValid = Lodash.cloneDeep(isValidUserInfo)
        let checkInfo = false
        Lodash.forEach(isValid, (v, k) => {
            if(v) {
                console.log(k)
                checkInfo = true
                return
            }
        })
        const user = {}
        user.username = usernameRef.current.value
        user.name = nameRef.current.value
        user.email = providerUser.email
        user.uid = providerUser.uid
        Lodash.forEach(user, (v, k) => {
            if(v === "") {
                checkInfo = true
                return
            }
        })
        if(checkInfo) {
            setIsOpenPopup(true)
            return
        }
        onProviderSignupEvent(user)
        setIsOpenPopup(isUserFailed)
    }

    const onSetIsShowPopupEventHandler = useCallback((isChecked) => {
        setIsOpenPopup(isChecked)
    }, [])

    const onClickLoginButtonHandler = (isChecked) => () => {
        onClickUserServiceButtonEvent(isChecked)
    }

    const onStepButtonClickEventHandler = useCallback((step) => {
        setIsNextStepButton(true)
        setActiveStep(step)
    }, [])

    const onResetButtonClickEventHandler = useCallback((step) => {
        setActiveStep(step)
    }, [])

    const onNextButtonClickEventHandler = useCallback((step) => {
        setActiveStep(step)
    }, [])

    const onBackButtonClickEventHandler = useCallback((step) => {
        setIsNextStepButton(true)
        setActiveStep(step)
    }, [])

    const onProviderButtonClickEventHandler = useCallback(() => {
        userFetcher.signupWithGoogle().then((user) => {
            setIsNextStepButton(false)
            setActiveStep(prev => prev + 1)
            setProviderUser(user)
            setIsValidUserInfo((prev) => {
                return { ...prev, email: false, password: false }
            })
        })
    }, [])

    const validateForUserInfo = (target, value) => {
        switch(target) {
            case "username": {
                const isValid = (() => {
                    const name = value.trim()
                    if(name.length !== value.length) return true
                    if(name.length < 4 || name.length === 0) return true
                    if(!(["!", "@", "$", "%", "`", ",", ".", " "].every((e) => !name.includes(e)))) return true
                    return false
                })()
                return isValid
            }

            case "name": {
                const isValid = (() => {
                    const name = value.trim()
                    if(name.length !== value.length) return true
                    if(name.length === 0) return true
                    if(!(["!", "@", "$", "%", "`", ",", ".", " "].every((e) => !name.includes(e)))) return true
                    return false
                })()
                return isValid
            }

            case "email": {
                const isValid = (() => {
                    // email 정규식 google 참고
                    const emailRegex = /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
                    const email = value.trim()
                    if(email.length !== value.length) return true
                    if(!emailRegex.test(email)) return true
                    return false
                })()
                return isValid
            }

            case "password": {
                const isValid = (() => {
                    // password 정규식 google 참고 ( 특수문자 + 영문자 + 숫자 )
                    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/
                    const password = value.trim()
                    if(password.length !== value.length) return true
                    if(!passwordRegex.test(password)) return true
                    if(password.length < 8) return true
                    return false
                })()
                return isValid
            }

            default:
                return null
        }
    }

    return (
        <Container sx={container}>
            <MyStepper
                steps={steps}
                activeStep={activeStep}
                onStepButtonClickEvent={onStepButtonClickEventHandler}
                onResetButtonClickEvent={onResetButtonClickEventHandler}
                onNextButtonClickEvent={onNextButtonClickEventHandler}
                onBackButtonClickEvent={onBackButtonClickEventHandler}
                isNextButtonDisable={isNextStepButton}
            />
            <Container sx={signupContainer}>
                <CardMedia
                    sx={cardMediaFontStyle}
                    component="img"
                    image={"/images/mss.png"}
                />
                <FormGroup sx={formStyle}>
                    {activeStep === 0 &&
                        <React.Fragment>
                            <Box sx={signupStyle}>
                                <Typography
                                    sx={typographyStyle}
                                    variant="h4"
                                >
                                    Social Accounts
                                </Typography>
                            </Box>
                                <FormControl variant="standard" sx={formControltyle}>
                                    <InputLabel>
                                        With a start your email
                                    </InputLabel>
                                    <Input
                                        type="text"
                                        error={isValidUserInfo.email}
                                        inputRef={emailRef}
                                        onChange={onEmailChangeHandler}
                                        startAdornment={
                                            <InputAdornment position="start">
                                                <MyIcon name="user"></MyIcon>
                                            </InputAdornment>
                                        }>
                                    </Input>
                                </FormControl>
                                <FormControl variant="standard" sx={formControltyle}>
                                    <InputLabel>
                                        With a start your password
                                    </InputLabel>
                                    <Input
                                        type="password"
                                        error={isValidUserInfo.password}
                                        inputRef={passwordRef}
                                        onChange={onPasswordChangeHandler}
                                        startAdornment={
                                            <InputAdornment position="start">
                                                <MyIcon name="password"></MyIcon>
                                            </InputAdornment>
                                        }>
                                    </Input>
                                </FormControl>
                                <FormControl variants="standard" sx={formControltyle}>
                                    <InputLabel>
                                        With a start your username
                                    </InputLabel>
                                    <Input
                                        type="text"
                                        error={isValidUserInfo.username}
                                        inputRef={usernameRef}
                                        onChange={onUsernameChangeHandler}
                                        startAdornment={
                                            <InputAdornment position="start">
                                                <MyIcon name="user" />
                                            </InputAdornment>
                                        }>
                                    </Input>
                                </FormControl>
                                <FormControl variants="standard" sx={formControltyle}>
                                    <InputLabel>
                                        With a start your name
                                    </InputLabel>
                                    <Input
                                        type="text"
                                        error={isValidUserInfo.name}
                                        inputRef={nameRef}
                                        onChange={onNameChangeHandler}
                                        startAdornment={
                                            <InputAdornment position="start">
                                                <MyIcon name="user" />
                                            </InputAdornment>
                                        }>
                                    </Input>
                                </FormControl>
                                <Box sx={buttonBoxStyle}>
                                    <Button onClick={onClickRegisterButtonHandler}>register</Button>
                                    <Divider/>
                                    <Button onClick={onClickLoginButtonHandler(true)}>login</Button>
                                    <Divider/>
                                </Box>
                                <Box>
                                    <Button
                                        onClick={onProviderButtonClickEventHandler} 
                                        startIcon={
                                            <CardMedia
                                                component="img"
                                                image={"/images/google.png"}
                                            />
                                        }>
                                    </Button>
                                </Box>
                        </React.Fragment>
                    }
                    {activeStep === 1 &&
                        <React.Fragment>
                            <Box sx={signupStyle}>
                                <Typography
                                    sx={typographyStyle}
                                    variant="h4"
                                >
                                    Your Imformation
                                </Typography>
                            </Box>
                            <FormControl variants="standard" sx={formControltyle}>
                                <InputLabel>
                                    With a start your username
                                </InputLabel>
                                <Input
                                    type="text"
                                    error={isValidUserInfo.username}
                                    inputRef={usernameRef}
                                    onChange={onUsernameChangeHandler}
                                    startAdornment={
                                        <InputAdornment position="start">
                                            <MyIcon name="user" />
                                        </InputAdornment>
                                    }>
                                </Input> 
                            </FormControl>
                            <FormControl variants="standard" sx={formControltyle}>
                                <InputLabel>
                                    With a start your name
                                </InputLabel>
                                <Input
                                    type="text"
                                    error={isValidUserInfo.name}
                                    inputRef={nameRef}
                                    onChange={onNameChangeHandler}
                                    startAdornment={
                                        <InputAdornment position="start">
                                            <MyIcon name="user" />
                                        </InputAdornment>
                                    }>
                                </Input>
                            </FormControl>
                            <Box sx={buttonBoxStyle}>
                                <Button onClick={onClickProviderRegisterButtonHandler}>register</Button>
                                <Divider/>
                                <Button onClick={onClickLoginButtonHandler(true)}>login</Button>
                                <Divider/>
                            </Box>
                        </React.Fragment>
                    }
                </FormGroup>
            </Container>    
            <AlertPopup
                isShowPopup={isOpenPopup}
                setIsShowPopupEvent={onSetIsShowPopupEventHandler}
                message="Check your account information!!"
            />
            <AlertPopup
                isShowPopup={isEamilCheckPopup}
                setIsShowPopupEvent={onSetIsShowPopupEventHandler}
                message="Send to your email"
            />
        </Container>
    )
}

const container = {
    textAlign: "center",
}

const signupContainer = {
    marginTop: "2rem",
    border: 1,
    width: "50%",
    boxShadow: "0 10px 5px 5px rgba(0, 0, 0, 0.1)",
}

const signupStyle = {
    padding: "1rem",
}

const typographyStyle = {
    mb: "1rem",
}

const formStyle = {
    margin: "10px",
}

const formControltyle = {
    marginBottom: "10px",
}

const buttonBoxStyle = {
    border: 1,
    textAlign: "center",
}

const cardMediaFontStyle = {
    margin: "0 auto",
    mb: 2,
    mt: 2,
    width: "250px",
}

export default SignupForm