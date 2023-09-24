import { useState, useRef } from "react"
import { useNavigate } from "react-router-dom"
import {
    Box,
    Typography,
    Tab,
    Tabs,
    Menu,
    MenuItem,
    TextField,
    Button,
    MenuList,
} from "@mui/material"
import DateType from "../../type/dateType"

function MyCalendarSide({
    date,
    onClickTodayTodoListEvent,
    onClickQuickTodoListEvent,
}) {
    const [tabValue, setTabValue] = useState(0)
    const [todoAnchor, setTodoAnchor] = useState(null)
    const [validObject, setValidObject] = useState({
        title: false,
        content: false,
    })
    const isOpenTodo = Boolean(todoAnchor)
    const navigate = useNavigate()
    const titleRef = useRef()
    const contentRef = useRef()

    const onChangeTabButtonEventHandler = (event, newValue) => {
        setTabValue(newValue)
    }

    const onMenuButtonClickEventHandler = (e) => {
        setTodoAnchor(e.currentTarget)
    }

    const onMenuCloseButtonClickEventHanlder =
        onClickQuickAddTodoEventHandler.bind(this, setTodoAnchor)

    const onSaveButtonClickEventHandler = () => {
        const title = titleRef.current.value
        const content = contentRef.current.value
        if (validateForTodoTitle(title)) {
            setValidObject((prev) => {
                return { ...prev, title: true }
            })
            return
        } else {
            setValidObject((prev) => {
                return { ...prev, title: false }
            })
        }
        if (validateForTodoContent(content)) {
            setValidObject((prev) => {
                return { ...prev, content: true }
            })
            return
        } else {
            setValidObject((prev) => {
                return { ...prev, content: false }
            })
        }
        const todoObj = {}
        todoObj.title = title
        todoObj.content = content
        todoObj.startDate = DateType.createDate()
        todoObj.endDate = DateType.createDate()
        todoObj.isCompleted = false
        onClickQuickTodoListEvent(todoObj)
        setTodoAnchor(null)
    }

    const onCancelButtonClickEventHandler = () => {
        setTodoAnchor(null)
    }

    const onKeyDownEventHandler = (e) => {
        e.stopPropagation()
    }

    const validateForTodoTitle = (titleRef) => {
        const isValid = (function () {
            const title = titleRef.trim()
            if (title.length < 4 || title.length === 0) return true
            const special = ["#", "$", "|", "`"]
            if (!special.every((e) => !title.includes(e))) return true
            return false
        })()
        return isValid
    }

    const validateForTodoContent = (contentRef) => {
        const isValid = (function () {
            const content = contentRef.trim()
            if (content.length < 4 || content.length === 0) return true
            return false
        })()
        return isValid
    }

    const tabItems = [
        {
            name: "Quick add",
            onClickEventHandler: onMenuButtonClickEventHandler,
        },
        {
            name: "Today's Todo",
            onClickEventHandler: onClickTodayTodoListEventHandler.bind(
                this,
                onClickTodayTodoListEvent
            ),
        },
        {
            name: "Search Friend",
            onClickEventHandler: onClickSearchFriendEVentHandler.bind(
                this,
                navigate
            ),
        },
    ]

    return (
        <Box sx={wrapperBox}>
            <Typography sx={monthStyle} variant="h1">
                {date.month}
            </Typography>
            <Typography sx={yearStyle} variant="h1">
                {date.year}
            </Typography>
            <Typography sx={dayStyle} variant="h2">
                {date.day}
            </Typography>
            <Typography sx={todoStyle} variant="h4">
                MSS Calendar
            </Typography>
            <Box sx={tabStyle}>
                <Tabs
                    value={tabValue}
                    onChange={onChangeTabButtonEventHandler}
                    variant="scrollable"
                    scrollButtons="auto"
                >
                    {tabItems.map((t) => (
                        <Tab
                            key={t.name}
                            label={t.name}
                            onClick={t.onClickEventHandler}
                        />
                    ))}
                </Tabs>
            </Box>
            <Menu
                anchorEl={todoAnchor}
                open={isOpenTodo}
                onClose={onMenuCloseButtonClickEventHanlder}
            >
                <MenuList>
                    <MenuItem>
                        <TextField
                            inputRef={titleRef}
                            error={validObject.title}
                            label="Enter todo title"
                            variant="outlined"
                            onKeyDown={onKeyDownEventHandler}
                        />
                    </MenuItem>
                    <MenuItem>
                        <TextField
                            inputRef={contentRef}
                            error={validObject.content}
                            label="Enter todo content"
                            variant="outlined"
                            onKeyDown={onKeyDownEventHandler}
                        />
                    </MenuItem>
                </MenuList>
                <Box sx={buttonStyle}>
                    <Button onClick={onSaveButtonClickEventHandler}>
                        Save
                    </Button>
                    <Button onClick={onCancelButtonClickEventHandler}>
                        Cancel
                    </Button>
                </Box>
            </Menu>
        </Box>
    )
}

function onClickQuickAddTodoEventHandler(setTodoAnchor) {
    setTodoAnchor(null)
}

function onClickTodayTodoListEventHandler(onClickTodayTodoListEvent) {
    const today = DateType.createDate()
    onClickTodayTodoListEvent(true, today)
}

function onClickSearchFriendEVentHandler(navigate) {
    navigate("/search")
}

const wrapperBox = {
    borderRadius: "10px 0 0 10px",
    display: "inline-block",
    width: "30%",
    height: "100%",
    float: "left",
    color: "#fff",
    backgroundColor: "#1976D2",
}

const monthStyle = {
    fontSize: "8.5rem",
    marginTop: "0.8rem",
}

const yearStyle = {
    fontSize: "5rem",
}

const dayStyle = {
    fontSize: "2rem",
}

const todoStyle = {
    fontSize: "1.5rem",
    marginTop: "2rem",
}

const tabStyle = {
    mt: 4,
    pt: 0.5,
    pb: 0.5,
    width: "100%",
    bgcolor: "background.paper",
    color: "black",
}

const buttonStyle = {
    float: "right",
}

export default MyCalendarSide
