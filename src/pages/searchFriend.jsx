import { useState, useRef, useContext } from "react"
import {
    Box,
    TextField,
    Card,
    CardContent,
    CardHeader,
    CardMedia,
    Typography,
    Button,
} from "@mui/material"
import AlertPopup from "../components/popup/alertPopup"
import { UserContext } from "../context/userContextProvider"
import userFetcher from "../fetcher/userFetcher"

const SearchFriend = () => {
    const [isAlertOpen, setIsAlertOpen] = useState(false)
    const [isFound, setIsFound] = useState(false)
    const [friendInfo, setFriendInfo] = useState({
        uuid: "",
        username: "",
        name: "",
        email: "",
        infoMessage: "",
        profileUrl: "",
    })

    const searchRef = useRef()

    const { userObj } = useContext(UserContext)

    const onSearchClickButtonEventHandler = async () => {
        const findEmail = searchRef.current.value
        const found = await userFetcher.getMyInformationByEmail(findEmail)
        if (found.length == 0) {
            setIsAlertOpen(true)
            return
        }
        setIsFound(true)
        setFriendInfo((prev) => {
            return {
                ...prev,
                uuid: found.uuid,
                username: found.username,
                name: found.name,
                email: found.email,
                infoMessage: found.infoMessage,
                profileUrl: found.profileUrl,
            }
        })
    }

    const onFollowButtonClickEventHandler = () => {
        userFetcher.addFriendList(userObj.fetchOption.uuid, friendInfo.uuid)
    }

    const onCloseButtonClickEventHandler = (isChecked) => {
        setIsAlertOpen(isChecked)
    }

    return (
        <Box sx={boxStyle}>
            <Box sx={inputStyle}>
                <TextField
                    inputRef={searchRef}
                    label="Enter friend's email"
                    variant="outlined"
                />
                <Button onClick={onSearchClickButtonEventHandler}>
                    Search
                </Button>
            </Box>
            {isFound && (
                <Card>
                    <CardHeader
                        title={friendInfo.name}
                        subheader={friendInfo.infoMessage}
                    />
                    <CardMedia
                        height="300"
                        component="img"
                        image="images/schedule.jpg"
                    />
                    <CardContent>
                        <Typography
                            gutterBottom={true}
                            component="div"
                            variant="h5"
                        >
                            {friendInfo.email}
                        </Typography>
                        <Typography
                            gutterBottom={true}
                            component="div"
                            variant="h5"
                        >
                            {friendInfo.username}
                        </Typography>
                    </CardContent>
                    <Button onClick={onFollowButtonClickEventHandler}>
                        Follow
                    </Button>
                </Card>
            )}
            <AlertPopup
                isShowPopup={isAlertOpen}
                setIsShowPopupEvent={onCloseButtonClickEventHandler}
                message="Cannot find email !"
            />
        </Box>
    )
}

export default SearchFriend

const boxStyle = {
    width: "70%",
    margin: "0 auto",
    ml: 10,
    mt: 10,
}

const inputStyle = {
    display: "flex",
    alignItems: "center",
}
