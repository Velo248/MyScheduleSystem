import React, { useState, useRef } from "react"
import MyIcon from "../../icon/myIcon"
import {
    Modal,
    Box,
    List,
    ListItem,
    ListItemAvatar,
    Avatar,
    ListItemText,
    Divider,
    Button,
    Input,
} from "@mui/material"

const MyInfoPopup = ({
    isClickInfo,
    onCloseEvent,
    user,
    onClickImageUploaderEvent,
    onSaveProfileMessageEvent,
}) => {
    const [imageUpload, setImageUpload] = useState("")
    const [isEnterEditMode, setIsEnterEditMode] = useState(false)
    const [isEnterEditProfile, setIsEnterEditProfile] = useState(false)

    const imageInput = useRef()
    const profileInputRef = useRef()

    const onCloseEventHandler = () => {
        setIsEnterEditMode(false)
        setIsEnterEditProfile(false)
        onCloseEvent(false)
    }

    const onChangeImageUploaderEventHandler = (e) => {
        setImageUpload(e.target.files[0])
    }

    const onClickImageUploaderEventHandler = () => {
        onClickImageUploaderEvent(imageUpload)
        setIsEnterEditMode(false)
    }

    const onClickImageUploaderButtonEventHandler = () => {
        imageInput.current.click()
    }

    const onClickEnterEditModeEventHandler = () => {
        setIsEnterEditMode(true)
    }

    const onClickEnterEditProfileEventHandler = () => {
        setIsEnterEditProfile(true)
    }

    const onSaveProfileMessageEventHandler = () => {
        onSaveProfileMessageEvent(profileInputRef.current.value)
        profileInputRef.current.value = ""
        setIsEnterEditProfile(false)
    }

    return (
        <Modal open={isClickInfo} sx={modalStyle} onClose={onCloseEventHandler}>
            {!isEnterEditMode ? (
                <Box sx={boxStyle}>
                    <List sx={listStyle}>
                        <ListItem sx={ListItemAvatarStyle}>
                            <ListItemAvatar>
                                <Avatar
                                    alt="profile"
                                    sx={avatarSizeStyle}
                                    src={user.profileURL}
                                />
                            </ListItemAvatar>
                        </ListItem>
                        <ListItemText
                            primary={user.username}
                            secondary={user.infoMessage}
                        />
                    </List>
                    <Box>
                        <Divider />
                        <Box sx={editBoxStyle}>
                            <Button onClick={onClickEnterEditModeEventHandler}>
                                <MyIcon name="pencil" />
                            </Button>
                            <Button>
                                <MyIcon name="chat" />
                            </Button>
                        </Box>
                    </Box>
                </Box>
            ) : (
                <Box sx={boxStyle}>
                    <List sx={listStyle}>
                        <ListItem sx={ListItemAvatarStyle}>
                            <ListItemAvatar>
                                <Button
                                    onClick={
                                        onClickImageUploaderButtonEventHandler
                                    }
                                >
                                    <Avatar
                                        alt="profile"
                                        sx={avatarSizeStyle}
                                        src={user.profileURL}
                                    />
                                </Button>
                            </ListItemAvatar>
                        </ListItem>
                        {!isEnterEditProfile ? (
                            <React.Fragment>
                                <ListItemText
                                    primary={user.username}
                                    secondary={user.infoMessage}
                                />
                                <Button
                                    onClick={
                                        onClickEnterEditProfileEventHandler
                                    }
                                >
                                    <MyIcon name="pencil" />
                                </Button>
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                <ListItemText primary={user.username} />
                                <Input inputRef={profileInputRef} type="text" />
                                <Button
                                    onClick={onSaveProfileMessageEventHandler}
                                >
                                    <MyIcon name="pencil" />
                                </Button>
                            </React.Fragment>
                        )}
                    </List>
                    <Box>
                        <Divider />
                        <Box sx={editBoxStyle}>
                            <Input
                                type="file"
                                inputRef={imageInput}
                                sx={uploadImageInputStyle}
                                onChange={onChangeImageUploaderEventHandler}
                            />
                            <Button onClick={onClickImageUploaderEventHandler}>
                                <MyIcon name="checkCircle" />
                            </Button>
                        </Box>
                    </Box>
                </Box>
            )}
        </Modal>
    )
}

const modalStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
}

const boxStyle = {
    width: "20%",
    height: "80%",
    backgroundColor: "#E9ECEF",
    borderRadius: "10px",
    overflow: "auto",
}

const listStyle = {
    width: "100%",
    maxWidth: "360",
    bgColor: "background.paper",
}

const ListItemAvatarStyle = {
    justifyContent: "center",
    marginTop: "19rem",
}

const avatarSizeStyle = {
    width: "85px",
    height: "85px",
}

const uploadImageInputStyle = {
    display: "none",
}

const editBoxStyle = {
    height: "100%",
    mt: 4,
}

export default MyInfoPopup
