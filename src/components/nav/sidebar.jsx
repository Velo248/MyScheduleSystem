import { useCallback, useState } from "react"
import MyFriendList from "./list/myFriendList"
import MyChatRoomList from "./list/myChatRoomList"
import ChatRoomList from "../../type/chatRoomList"
import MyChatRoomModal from "../modal/myChatRoomModal"
import MyIcon from "../../icon/myIcon"
import { Link } from "react-router-dom"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    ListItemButton,
    Typography,
    Button,
} from "@mui/material"
import React from "react"

function SideBar({
    isOpen,
    userFriend,
    unInviteFriend,
    chatRoomList,
    selectChatRoom,
    onClickFriendButtonClickEvent,
    onClickDeleteBtnEvent,
    onSignoutBtnClickEvnet,
    onAddChatRoomListEvent,
    onClickEnterChatRoomEvent,
    onClickGetChatRoomInfoEvent,
    onUpdateChatRoomInfoEvnet,
}) {
    const [isOpenEditChatRoom, setIsOpenEditChatRoom] = useState(false)
    const [isOpenModal, setIsOpenModal] = useState(false)
    const [isOpenEditModal, setIsOpenEditModal] = useState(false)

    const onClickFriendButtonClickEventHandler = useCallback(
        (isChecked, index) => {
            onClickFriendButtonClickEvent(isChecked, index, false)
        },
        []
    )

    const onSignoutBtnClickEvnetHandler = () => {
        onSignoutBtnClickEvnet()
    }

    const onClickAddChatRoomBtnEventHandler = useCallback(() => {
        setIsOpenModal(true)
    }, [])

    const onClickChatRoomEditBtnEventHandler = () => {
        setIsOpenEditChatRoom((current) => !current)
    }

    const onClickDeleteBtnEventHandler = useCallback((checked, uuid) => {
        onClickDeleteBtnEvent(checked, uuid)
    }, [])

    const onClickCloseModalEventHandler = useCallback((closed) => {
        setIsOpenModal(closed)
    }, [])

    const onAddChatRoomListEventHanlder = useCallback(
        (chatRoomName, friendList) => {
            onAddChatRoomListEvent(chatRoomName, friendList)
            setIsOpenModal(false)
        },
        []
    )

    const onClickEnterChatRoomEventHanlder = useCallback((chatRoomInfo) => {
        const chatRoomPath = chatRoomInfo.uuid.substr(0, 7)
        onClickEnterChatRoomEvent(chatRoomInfo, chatRoomPath)
    }, [])

    const onClickOpenChatRoomEditModalEventHandler = useCallback((isOpen) => {
        setIsOpenEditModal(isOpen)
    }, [])

    const onClickCloseChatRoomEditModalEventHandler = useCallback((isClose) => {
        setIsOpenEditModal(isClose)
    }, [])

    const onClickGetChatRoomInfoEventHandler = useCallback((chatRoomInfo) => {
        onClickGetChatRoomInfoEvent(chatRoomInfo)
    }, [])

    const onUpdateChatRoomInfoEvnetHandler = useCallback((updateItem, isClose) => {
        onUpdateChatRoomInfoEvnet(updateItem)
        setIsOpenEditModal(isClose)
    }, [])

    const items = [
        {
            name: "Friends",
            icon: <MyIcon name="friends" />,
            list: (
                <MyFriendList
                    friends={userFriend}
                    onClickFriendButtonClickEvent={
                        onClickFriendButtonClickEventHandler
                    }
                />
            ),
        },
        {
            name: "ChatRooms",
            icon: <MyIcon name="chat" />,
            list: (
                <React.Fragment>
                    <Button onClick={onClickAddChatRoomBtnEventHandler}>
                        Create
                    </Button>
                    <Button onClick={onClickChatRoomEditBtnEventHandler}>
                        Edit
                    </Button>
                    <MyChatRoomList
                        chatRoom={
                            ChatRoomList.createChatRoomList(chatRoomList)
                                .$_chatRoomList
                        }
                        isOpenEditChatRoom={isOpenEditChatRoom}
                        onClickDeleteBtnEvent={onClickDeleteBtnEventHandler}
                        onClickEnterChatRoomEvent={onClickEnterChatRoomEventHanlder}
                        onClickOpenChatRoomEditModalEvent={onClickOpenChatRoomEditModalEventHandler}
                        onClickGetChatRoomInfoEvent={onClickGetChatRoomInfoEventHandler}
                    />
                </React.Fragment>
            ),
        },
        {
            name: "Schedule",
            path: "/",
            icon: <MyIcon name="calendar" />,
            list: (
                <ListItemButton divider={true}>
                    <Typography>FoxMon"s Schedule</Typography>
                </ListItemButton>
            ),
        },
        {
            name: "Logout",
            path: "/",
            icon: <MyIcon name="signout" />,
            list: (
                <ListItemButton
                    divider={true}
                    onClick={onSignoutBtnClickEvnetHandler}
                >
                    <Typography>Logout</Typography>
                </ListItemButton>
            ),
        },
    ]

    return (
        <Box sx={sidebarStyle}>
            <Box>
                {items.map((item) => {
                    return (
                        <Accordion
                            key={item.name}
                            sx={sidebarListStyle}
                            disableGutters={false}
                        >
                            <AccordionSummary
                                expandIcon={isOpen && <MyIcon name="expand" />}
                            >
                                <Typography>
                                    {item.icon} {isOpen && item.name}
                                </Typography>
                            </AccordionSummary>
                            {isOpen && (
                                <AccordionDetails>
                                    {item.name !== "Friends" && item.name !== "ChatRooms" ? (
                                        <Link
                                            to={item.path}
                                            style={sidebarLinkStyle}
                                        >
                                            {item.list}
                                        </Link>
                                    ) : (
                                        item.list
                                    )}
                                </AccordionDetails>
                            )}
                        </Accordion>
                    )
                })}
            </Box>
            {(isOpenModal || isOpenEditModal) && (
                <DndProvider backend={HTML5Backend}>
                    <MyChatRoomModal
                        isOpenModal={isOpenModal}
                        isOpenEditModal={isOpenEditModal}
                        friend={userFriend}
                        unInviteFriend={userFriend.filter((value) => unInviteFriend.indexOf(value.uuid) !== -1)}
                        selectChatRoom={selectChatRoom}
                        onClickCloseModalEvent={onClickCloseModalEventHandler}
                        onClickCloseChatRoomEditModalEvent={
                            onClickCloseChatRoomEditModalEventHandler
                        }
                        onClickAddChatRoomBtnEvent={
                            onClickAddChatRoomBtnEventHandler
                        }
                        onAddChatRoomListEvent={onAddChatRoomListEventHanlder}
                        onUpdateChatRoomInfoEvnet={
                            onUpdateChatRoomInfoEvnetHandler
                        }

                    />
                </DndProvider>
            )}
        </Box>
    )
}

const sidebarStyle = {
    height: "100%",
    overflow: "auto",
}

const sidebarListStyle = {
    display: "block",
    width: "100%",
}

const sidebarLinkStyle = {
    textDecoration: "none",
    color: "black",
}

export default SideBar
