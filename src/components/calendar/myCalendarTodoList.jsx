import MyCalendarCompleteList from "./myCalendarCompleteList"
import { Box, List, ListItemText } from "@mui/material"
import DateType from "../../type/dateType"
import Lodash from "lodash"

const MyCalendarTodoList = ({ todoItems, onCompletedEvent }) => {
    const dataForCompletedRender = (todoItems) => {
        const arr = []
        Lodash.forEach(todoItems, (todo) => {
            todo.forEach((e) => {
                if (
                    DateType.isBetween(
                        DateType.createDate(),
                        e.startDate,
                        e.endDate
                    ) &&
                    e.isCompleted
                ) {
                    arr.push(e)
                }
            })
        })
        arr.sort((a, b) => a.startDate.localeCompare(b.startDate))
        return arr
    }

    const dataForUnCompletedRender = (todoItems) => {
        const arr = []
        Lodash.forEach(todoItems, (todo) => {
            todo.forEach((e) => {
                if (
                    DateType.isBetween(
                        DateType.createDate(),
                        e.startDate,
                        e.endDate
                    ) &&
                    !e.isCompleted
                ) {
                    arr.push(e)
                }
            })
        })
        arr.sort((a, b) => a.startDate.localeCompare(b.startDate))
        return arr
    }

    const onCompletedEventHandler = (e) => {
        onCompletedEvent(e)
    }

    return (
        <Box sx={todoListBoxStyle}>
            <List sx={todoListStyle}>
                <ListItemText primary="Uncompleted" />
                <MyCalendarCompleteList
                    item={dataForUnCompletedRender(todoItems)}
                    onCompletedEvent={onCompletedEventHandler}
                />
            </List>
            <List sx={todoListStyle}>
                <ListItemText primary="Completed" />
                <MyCalendarCompleteList
                    item={dataForCompletedRender(todoItems)}
                    onCompletedEvent={onCompletedEventHandler}
                />
            </List>
        </Box>
    )
}

const todoListBoxStyle = {
    boxShadow: "10px 10px 10px 10px rgba(0, 0, 0, 0.1)",
    borderRadius: "10px 10px 10px 10px",
    height: "100%",
}

const todoListStyle = {
    width: "100%",
    height: "45%",
    bgColor: "background.paper",
}

export default MyCalendarTodoList
