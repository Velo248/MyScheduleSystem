import { useRef, useState, useCallback } from "react"
import MyIcon from "../../icon/myIcon"
import AlertPopup from "../popup/alertPopup"
import {
    Dialog,
    DialogContent,
    Card,
    CardHeader,
    CardContent,
    TextField,
    Button,
} from "@mui/material"
import LocalizationProvider from "@mui/lab/LocalizationProvider"
import AdapterDateFns from "@mui/lab/AdapterDateFns"
import DesktopDatePicker from "@mui/lab/DesktopDatePicker"
import DateType from "../../type/dateType"
import Lodash from "lodash"

const CardEditModal = ({
    editTodoItem,
    isCardModalShow,
    onEditTodoItemEvent,
    onCardModalCloseEvent,
}) => {
    const [startDate, setStartDate] = useState(DateType.createDate)
    const [endDate, setEndDate] = useState(DateType.createDate)
    const [isOpen, setIsOpen] = useState(false)
    const [isValidTitle, setIsValidTitle] = useState(false)
    const [isValieStartDate, setIsValidStartDate] = useState(false)
    const [isValieEndDate, setIsValidEndtDate] = useState(false)
    const titleRef = useRef()
    const contentRef = useRef()
    const startRef = useRef()
    const endRef = useRef()

    const onCloseCardModal = () => {
        onCardModalCloseEvent(false)
    }

    const onSaveButtonHandler = () => {
        const prev = Lodash.cloneDeep(editTodoItem)
        if (
            !titleRef.current.value ||
            !contentRef.current.value ||
            isValidTitle ||
            isValieStartDate ||
            isValieEndDate
        ) {
            setIsOpen(true)
            return
        }
        editTodoItem.title = titleRef.current.value
        editTodoItem.content = contentRef.current.value
        editTodoItem.startDate = startDate
        editTodoItem.endDate = endDate
        onEditTodoItemEvent(prev, editTodoItem)
        setStartDate(DateType.createDate())
        setEndDate(DateType.createDate())
        onCardModalCloseEvent(false)
    }

    const onIsOpenEvent = (isChecked) => {
        setIsOpen(isChecked)
    }

    const onChangeStartDateHandler = (newValue) => {
        const date = DateType.createDateFormat(newValue, "YYYY-MM-DD")
        setStartDate(date)
        if (parseInt(DateType.dateFromDate(date, endDate, "days")) < 0) {
            setIsValidStartDate(true)
            startRef.current.labels[0].innerText =
                "Please check your start date!"
        } else {
            setIsValidStartDate(false)
            startRef.current.labels[0].innerText = "Start Date"
        }
    }

    const onChangeEndDateHandler = (newValue) => {
        const date = DateType.createDateFormat(newValue, "YYYY-MM-DD")
        setEndDate(date)
        if (parseInt(DateType.dateFromDate(startDate, date, "days")) < 0) {
            setIsValidEndtDate(true)
            endRef.current.labels[0].innerText = "Please check your end date!"
        } else {
            setIsValidEndtDate(false)
            endRef.current.labels[0].innerText = "End Date"
        }
    }

    const onTitleChangeHandler = useCallback((e) => {
        if (validateForTitle(e.target.value)) {
            titleRef.current.labels[0].innerText = "Please check your title!"
            setIsValidTitle(true)
            return
        }
        titleRef.current.labels[0].innerText = "Enter todo title!"
        setIsValidTitle(false)
    }, [])

    const validateForTitle = (titleStr) => {
        const isValid = (function () {
            const title = titleStr.trim()
            if (title.length < 4 || title.length === 0) return true
            const special = ["#", "$", "|", "`"]
            if (!special.every((e) => !title.includes(e))) return true
            return false
        })()
        return isValid
    }

    return (
        <>
            <AlertPopup
                isShowPopup={isOpen}
                setIsShowPopupEvent={onIsOpenEvent}
                message="Please check your input agin!!"
            />
            <Dialog
                sx={dialogStyle}
                open={isCardModalShow}
                onClose={onCloseCardModal}
            >
                <DialogContent sx={dialogContentStyle}>
                    <Card sx={cardStyle}>
                        <CardHeader
                            title={
                                <TextField
                                    error={isValidTitle}
                                    inputRef={titleRef}
                                    label="Enter todo title"
                                    variant="outlined"
                                    sx={titleStyle}
                                    defaultValue={editTodoItem.title}
                                    onChange={onTitleChangeHandler}
                                />
                            }
                        />
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DesktopDatePicker
                                inputRef={startRef}
                                label="Start Date"
                                value={startDate}
                                onChange={onChangeStartDateHandler}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        error={isValieStartDate}
                                    />
                                )}
                            />
                            <DesktopDatePicker
                                inputRef={endRef}
                                label="End Date"
                                value={endDate}
                                onChange={onChangeEndDateHandler}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        error={isValieEndDate}
                                    />
                                )}
                            />
                        </LocalizationProvider>
                        <CardContent>
                            <TextField
                                inputRef={contentRef}
                                label="Enter todo contents"
                                variant="outlined"
                                multiline
                                rows={8}
                                sx={contentStyle}
                                defaultValue={editTodoItem.content}
                            />
                        </CardContent>
                    </Card>
                </DialogContent>
                <Button sx={buttonStyle} onClick={onSaveButtonHandler}>
                    <MyIcon name="checkCircle" />
                </Button>
            </Dialog>
        </>
    )
}

const dialogStyle = {
    "& .MuiDialog-paper": {
        width: "80%",
        height: "80%",
    },
}

const dialogContentStyle = {
    // TODO Height & Scroll
}

const cardStyle = {
    textAlign: "center",
}

const avtarStyle = {
    bgColor: "blue[500]",
}

const titleStyle = {
    width: "100%",
}

const contentStyle = {
    width: "100%",
}

const buttonStyle = {
    fontSize: "30px",
}

export default CardEditModal
