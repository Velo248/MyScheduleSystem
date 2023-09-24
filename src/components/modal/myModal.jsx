import { useState, useCallback, useContext } from "react"
import CardModal from "./cardModal"
import CardEditModal from "./cardEditModal"
import CardItem from "../card/cardItem"
import EmptyCard from "../card/emptyCard"
import CheckPopup from "../popup/checkPopup"
import {
    Modal,
    Box,
    Button,
} from "@mui/material"
import Lodash from "lodash"
import { UserContext } from "../../context/userContextProvider"
import calendarFetcher from "../../fetcher/calendarFetcher"

function MyModal({ isClickModal, onCloseEvent, onAddListEvent, todoItems }) {
    const [isOpenCardModal, setIsOpenCardModal] = useState(false)
    const [todoItemList, setTodoItemList] = useState(dataForRender.call(this, todoItems))
    const [editMode, setEditmode] = useState(false)
    const [editTodoItem, setEditTodoItem] = useState({})
    const [isOpenAlert, setIsOpenAlert] = useState(false)
    const [removeIndex, setRemoveIndex] = useState()
    const { userObj } = useContext(UserContext)

    const onCloseEventHandler = () => onCloseEvent(false)

    const onCardModalShow = (isShow) => {
        setIsOpenCardModal(isShow)
    }

    const onCardModalCloseHandler = useCallback((isClose) => {
        setIsOpenCardModal(isClose)
    }, [])

    const onAddTodoItemEventHandler = useCallback((addedItem) => {
        todoItemList.push({
            uuid: addedItem.uuid,
            title: addedItem.title,
            content: addedItem.content,
            startDate: addedItem.startDate,
            endDate: addedItem.endDate,
            isCompleted: false,
        })
        onAddListEvent(addedItem)
    }, [todoItemList])

    const onCancelButtonClickHandler = () => {
        onCloseEvent(false)
    }

    const onEditModeEnterEventHandler = useCallback((isClicked, item) => {
        setEditmode(isClicked)
        const obj = {}
        obj.uuid = item.uuid
        obj.title = item.title
        obj.content = item.content
        obj.startDate = item.startDate
        obj.endDate = item.endDate
        obj.isCompleted = item.isCompleted
        setEditTodoItem(() => Lodash.cloneDeep(obj))
    }, [])

    const onEditTodoItemEventHandler = useCallback((prev, editedItem) => {
        const find = todoItemList.findIndex((e) => (e.title === prev.title && e.content === prev.content))
        calendarFetcher.updateTodoList(editedItem.uuid, userObj.fetchOption.uuid, editedItem)
        todoItemList[find] = editedItem
        setTodoItemList(() => [...todoItemList])
    }, [todoItemList])

    const onEditModeExitEventHandler = useCallback((isClose) => {
        setEditmode(isClose)
    }, [])

    const onRemoveCardEventHandler = useCallback((i, isOpen) => {
        setIsOpenAlert(isOpen)
        calendarFetcher.deleteTodoList(todoItemList[i].uuid)
        setRemoveIndex(i)
    }, [])

    const onRemoveEventHandler = useCallback((isChecked) => {
        if(isChecked) setTodoItemList(() => todoItemList.filter((e, index) => removeIndex !== index))
        setIsOpenAlert(false)
    }, [todoItemList, removeIndex])

    return (
        <>
            <CheckPopup
                message="Warning"
                isShowPopup={isOpenAlert}
                onCheckPopupEvent={onRemoveEventHandler}
            />
            <Modal
                style={modalStyle}
                open={isClickModal}
                onClose={onCloseEventHandler}
            >
                <Box sx={boxStyle}>
                    <Box sx={topBoxStyle}>
                        <Button onClick={onCancelButtonClickHandler}>Cancel</Button>
                    </Box>
                    <Box sx={cardListStyle}>
                        {todoItemList.map((item, i) => {
                            return (
                                <CardItem
                                    key={i}
                                    index={i}
                                    cardItem={item}
                                    onEditModeEnterEvent={onEditModeEnterEventHandler}
                                    onRemoveCardEvent={onRemoveCardEventHandler}
                                />
                            )
                        })}
                        <EmptyCard onCardModalShow={onCardModalShow} />
                    </Box>
                    <CardModal
                        isCardModalShow={isOpenCardModal}
                        onCardModalCloseEvent={onCardModalCloseHandler}
                        onAddTodoItemEvent={onAddTodoItemEventHandler}
                    />
                    <CardEditModal
                        editTodoItem={editTodoItem}
                        isCardModalShow={editMode}
                        onEditTodoItemEvent={onEditTodoItemEventHandler}
                        onCardModalCloseEvent={onEditModeExitEventHandler}
                    />
                </Box>
            </Modal>
        </>
    )
}

const dataForRender = (todoItems) => {
    if(Lodash.size(todoItems) === 0) return []
    const items = todoItems
    const rtnArr = []
    items.forEach((item) => {
        const obj = {}
        obj.uuid = item.uuid
        obj.title = item.title
        obj.content = item.content
        obj.startDate = item.startDate
        obj.endDate = item.endDate
        obj.isCompleted = item.isCompleted
        rtnArr.push(obj)
    })
    return rtnArr
}

const modalStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
}

const boxStyle = {
    width: "90%",
    height: "90%",
    backgroundColor: "#fff",
    borderRadius: "10px",
    opacity: "0.95",
    overflow: "auto",
}

const topBoxStyle = {
    height: "8%",
    width: "100%",
    paddingTop: "10px",
}

const cardListStyle = {
    display: "grid",
    placeItems: "center",
    gridTemplateColumns: "repeat(4, 1fr)",
}

export default MyModal