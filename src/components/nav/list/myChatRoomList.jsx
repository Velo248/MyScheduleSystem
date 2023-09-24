import React, { useState, useCallback } from "react"
import MyIcon from "../../../icon/myIcon"
import CheckPopup from "../../popup/checkPopup"
import { IconButton, ListItem, ListItemButton, Typography } from "@mui/material"

function MyChatRoomList({
    chatRoom,
    isOpenEditChatRoom,
    onClickDeleteBtnEvent,
    onClickEnterChatRoomEvent,
    onClickOpenChatRoomEditModalEvent,
    onClickGetChatRoomInfoEvent,
}) {
    const [isOpen, setIsOpen] = useState(false)
    const [selected, setSelected] = useState("")

    const onClickDeleteBtnEventHandler = (uuid) => () => {
        setIsOpen(true)
        setSelected(uuid)
    }

    const onClickDeleteCheckButtonEventHanlder = useCallback(
        (checked) => {
            onClickDeleteBtnEvent(checked, selected)
            setIsOpen(false)
        },
        [selected]
    )

    const onClickEnterChatRoomEventHandler = (chatRoomInfo) => () => {
        onClickEnterChatRoomEvent(chatRoomInfo)
    }
    
    const onClickOpenChatRoomEditModalEventHandler = (chatRoomInfo) => () => {
        onClickGetChatRoomInfoEvent(chatRoomInfo)
        onClickOpenChatRoomEditModalEvent(true)
    }

    return (
        <React.Fragment>
            {chatRoom.length > 0 &&
                chatRoom.map((c) => {
                    return (
                        <React.Fragment key={c.uuid}>
                            {!isOpenEditChatRoom ? (
                                <ListItemButton 
                                    divider={true}
                                    onClick={onClickEnterChatRoomEventHandler(c)}
                                >
                                    <Typography>{c.chatRoomName}</Typography>
                                </ListItemButton>
                            ) : (
                                <ListItem
                                    secondaryAction={
                                        <React.Fragment>
                                            <IconButton
                                                edge="end"
                                                size="small"
                                                onClick={onClickOpenChatRoomEditModalEventHandler(c)}
                                            >
                                                <MyIcon name="pencil" />
                                            </IconButton>
                                            <IconButton
                                                edge="end"
                                                size="medium"
                                                onClick={onClickDeleteBtnEventHandler(
                                                    c.uuid
                                                )}
                                            >
                                                <MyIcon name="delete" />
                                            </IconButton>
                                        </React.Fragment>
                                    }
                                    divider={true}
                                >
                                    <Typography>{c.chatRoomName}</Typography>
                                </ListItem>
                            )}
                        </React.Fragment>
                    )
                })}
            <CheckPopup
                message="Are you sure you want to delete?"
                isShowPopup={isOpen}
                onCheckPopupEvent={onClickDeleteCheckButtonEventHanlder}
            />
        </React.Fragment>
    )
}

export default MyChatRoomList