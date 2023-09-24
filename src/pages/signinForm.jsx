import { useState, useRef, useCallback } from "react"
import AlertPopup from "../components/popup/alertPopup"
import MyIcon from "../icon/myIcon"
import {
    Container,
    Box,
    FormGroup,
    FormControl,
    Input,
    InputAdornment,
    InputLabel,
    Typography,
    Button,
    CardMedia,
} from "@mui/material"

const SigninForm = ({
    onSigninEvent,
    onProviderSigninEvent,
    onClickUserServiceButtonEvent,
}) => {
    const [isValidUserInfo, setIsValidUserInfo] = useState({
        email: false,
        password: false,
    })
    const [isShowPopup, setIsShowPopup] = useState(false)
    const textRef = useRef()
    const passwordRef = useRef()

    const onSigninButtonClickHandler = () => {
        const userInfo = {}
        userInfo.email = textRef.current.value
        userInfo.password = passwordRef.current.value
        // email 정규식 google 참고
        const emailRegex =
            /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
        const email = userInfo.email.trim()
        if (!emailRegex.test(email)) {
            setIsValidUserInfo((prev) => {
                return { ...prev, email: true }
            })
            setIsShowPopup(true)
            return
        }
        if (!userInfo.email || !userInfo.password) {
            if (!userInfo.email) {
                setIsValidUserInfo((prev) => {
                    return { ...prev, email: true }
                })
            }
            if (!userInfo.password) {
                setIsValidUserInfo((prev) => {
                    return { ...prev, password: true }
                })
            }
            setIsShowPopup(true)
            return
        }
        setIsValidUserInfo((prev) => {
            return { ...prev, email: false }
        })
        setIsValidUserInfo((prev) => {
            return { ...prev, password: false }
        })
        onSigninEvent(userInfo)
    }

    const onProviderButtonClickEventHandler = () => {
        onProviderSigninEvent()
    }

    const onPopupCloseEventHanlder = (value) => {
        setIsShowPopup(value)
    }

    const onRegisterButtonClickHandler = (isChecked) => () => {
        onClickUserServiceButtonEvent(isChecked)
    }

    return (
        <Container sx={signinContainer}>
            <Box>
                <CardMedia
                    sx={imgBoxStyle}
                    component="img"
                    image={"/images/signin.png"}
                />
            </Box>
            <Box sx={signinBoxStyle}>
                <Box sx={signinFormStyle}>
                    <FormGroup sx={formStyle}>
                        <CardMedia
                            sx={cardMediaFontStyle}
                            component="img"
                            image={"/images/mss.png"}
                        />
                        <FormControl variants="outlined" sx={formControltyle}>
                            <InputLabel> With a start your email </InputLabel>
                            <Input
                                type="email"
                                error={isValidUserInfo.email}
                                inputRef={textRef}
                                startAdornment={
                                    <InputAdornment position="start">
                                        <MyIcon name="user" />
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                        <FormControl variants="standard" sx={formControltyle}>
                            <InputLabel>Enter your password</InputLabel>
                            <Input
                                type="password"
                                error={isValidUserInfo.password}
                                inputRef={passwordRef}
                                startAdornment={
                                    <InputAdornment position="start">
                                        <MyIcon name="password" />
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                        <Button
                            variant="contained"
                            onClick={onSigninButtonClickHandler}
                        >
                            login
                        </Button>
                        <Button
                            onClick={onProviderButtonClickEventHandler}
                            startIcon={
                                <CardMedia
                                    component="img"
                                    image={"/images/google.png"}
                                />
                            }
                        ></Button>
                        <Button>Forgot Password</Button>
                    </FormGroup>
                </Box>

                <Box sx={signupBoxStyle}>
                    <Typography>NO ACCOUNT?</Typography>
                    <Button onClick={onRegisterButtonClickHandler(false)}>
                        register
                    </Button>
                    <AlertPopup
                        isShowPopup={isShowPopup}
                        setIsShowPopupEvent={onPopupCloseEventHanlder}
                        message="Check your input information"
                    />
                </Box>
            </Box>
        </Container>
    )
}

const signinContainer = {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "2rem",
    width: "48%",
    height: "100%",
}

const signinBoxStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
}

const signinFormStyle = {
    border: 1,
    height: "87%",
}

const signupBoxStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: 1,
    height: "8%",
}

const imgBoxStyle = {
    width: "90%",
    height: "100%",
    objectFit: "cover",
}

const cardMediaFontStyle = {
    width: "250px",
}

const formStyle = {
    margin: "45px",
}

const formControltyle = {
    marginTop: "1rem",
    marginBottom: "15px",
}

export default SigninForm
