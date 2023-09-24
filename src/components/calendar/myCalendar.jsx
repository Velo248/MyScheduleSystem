import { useState, useEffect, useCallback, useContext } from "react"
import Calendar from "react-calendar"
import Lodash from "lodash"
import DateType from "../../type/dateType"
import MyModal from "../modal/myModal"
import calendarFetcher from "../../fetcher/calendarFetcher"
import TodoItem from "../../type/todoItem"
import MyCalendarTodoList from "./myCalendarTodoList"
import MyCalendarSide from "./myCalendarSide"
import { UserContext } from "../../context/userContextProvider"
import { Box } from "@mui/material"

function MyCalendar() {
    const [isClickModal, setIsClickModal] = useState(false)
    const [allTodoItems, setAllTodoItems] = useState({})
    const [selectedDate, setSelectedDate] = useState(null)
    const [sideDate, setSideDate] = useState({
        year: DateType.getYear(DateType.createDate()),
        month: DateType.getMonth(DateType.createDate()),
        day: DateType.getDay(),
    })

    const { userObj } = useContext(UserContext)

    useEffect(() => {
        doFetchTodoItemList.call(
            this,
            setAllTodoItems,
            userObj.fetchOption.uuid
        )
    }, [])

    const onClickDayEventHandler = (e) => {
        const date = DateType.createDateFormat(e, "YYYY-MM-DD")
        setSelectedDate(date)
        setIsClickModal(true)
    }

    const onClickMonthEventHanlder = (e) => {
        // e.action => event
        // next, prev => month
        // next2, prev2 => year
        const dayString = DateType.castToDay(
            e.activeStartDate.toString().split(" ")[0]
        )
        const dateString = DateType.castToMonth(
            e.activeStartDate.toString().split(" ")[1]
        )
        const yearString = e.activeStartDate.toString().split(" ")[3]
        const rtnObj = {}
        rtnObj.year = yearString
        rtnObj.month = dateString
        rtnObj.day = dayString
        setSideDate(rtnObj)
    }

    const onCloseEventHandler = useCallback(
        (closed) => {
            setIsClickModal(closed)
        },
        [isClickModal]
    )

    const onAddTodoListEventHandler = (addedItem) => {
        calendarFetcher.createTodoList(
            userObj.fetchOption.uuid,
            addedItem,
            allTodoItems[selectedDate]
        )
    }

    const onCompletedEventHandler = useCallback(
        (e) => {
            const obj = {}
            Lodash.forEach(allTodoItems, (data, dayKey) => {
                obj[dayKey] = []
                data.forEach((todo) => {
                    if (
                        todo.startDate === e.startDate &&
                        todo.endDate === e.endDate &&
                        todo.title === e.title
                    ) {
                        const newObj = e
                        obj[dayKey].push(newObj)
                        return
                    }
                    const newObj = new TodoItem(
                        todo.uuid,
                        todo.title,
                        todo.content,
                        todo.startDate,
                        todo.endDate,
                        todo.isCompleted
                    )
                    obj[dayKey].push(newObj)
                })
            })
            calendarFetcher.updateTodoList(e.uuid, userObj.fetchOption.uuid, e)
            setAllTodoItems(Lodash.cloneDeep(obj))
        },
        [allTodoItems]
    )

    const onClickTodayTodoListEventHandler = useCallback(
        (isOpen, date) => {
            setIsClickModal(isOpen)
            setSelectedDate(date)
        },
        [isClickModal, selectedDate]
    )

    const onClickQuickTodoListEventHandler = (todo) => {
        const today = todo.startDate
        calendarFetcher.createTodoList(
            userObj.fetchOption.uuid,
            todo,
            allTodoItems[today]
        )
    }

    return (
        <Box sx={mainBoxSizeStyle}>
            <Box sx={myCalendarBoxStyle}>
                <MyCalendarSide
                    date={sideDate}
                    onClickTodayTodoListEvent={onClickTodayTodoListEventHandler}
                    onClickQuickTodoListEvent={onClickQuickTodoListEventHandler}
                />
                <Calendar
                    calendarType="US"
                    onClickDay={onClickDayEventHandler}
                    onActiveStartDateChange={onClickMonthEventHanlder}
                />
                {isClickModal && (
                    <MyModal
                        isClickModal={isClickModal}
                        onCloseEvent={onCloseEventHandler}
                        onAddListEvent={onAddTodoListEventHandler}
                        todoItems={allTodoItems[selectedDate]}
                    />
                )}
            </Box>
            <Box sx={myTodoListStyle}>
                <MyCalendarTodoList
                    todoItems={allTodoItems}
                    onCompletedEvent={onCompletedEventHandler}
                />
            </Box>
        </Box>
    )
}

function doFetchTodoItemList(setAllTodoItems, uuid) {
    const todoListObj = {}
    todoListObj[DateType.createDate()] = []
    calendarFetcher.allCalenderTodoList(uuid).then((todoList) => {
        todoList.forEach((item) => {
            todoListObj[item.startDate] = []
        })
        todoList.forEach((item) => {
            const obj = new TodoItem(
                item.uuid,
                item.title,
                item.content,
                item.startDate,
                item.endDate,
                item.isCompleted
            )
            todoListObj[item.startDate].push(obj)
        })
        setAllTodoItems(todoListObj)
    })
}

export default MyCalendar

const mainBoxSizeStyle = {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
}

const myCalendarBoxStyle = {
    width: "100%",
    boxShadow: "5px 10px 5px 5px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#F8F8FF",
    border: "1px solid #eeeeee",
    borderRadius: "10px",
    height: "100%",
}

const myTodoListStyle = {
    width: "40%",
    height: "100%",
}
