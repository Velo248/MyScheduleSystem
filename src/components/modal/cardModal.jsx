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

const CardModal = ({
    isCardModalShow,
    onCardModalCloseEvent,
    onAddTodoItemEvent,
}) => {
    const [startDate, setStartDate] = useState(DateType.createDate())
    const [endDate, setEndDate] = useState(DateType.createDate())
    const [isOpen, setIsOpen] = useState(false)
    const [isValidTitle, setIsValidTtile] = useState(false)
    const [isValidStartDate, setIsValidStartDate] = useState(false)
    const [isValidEndDate, setIsValidEndtDate] = useState(false)
    const titleRef = useRef()
    const contentRef = useRef()
    const startRef = useRef()
    const endRef = useRef()

    const onCloseCardModal = () => {
        onCardModalCloseEvent(false)
    }

    const onSaveButtonClickEventHandler = (e) => {
        e.preventDefault()
        const itemObj = {}
        if (
            !titleRef.current.value ||
            !contentRef.current.value ||
            isValidTitle ||
            isValidStartDate ||
            isValidEndDate
        ) {
            setIsOpen(true)
            return
        }
        itemObj.title = titleRef.current.value
        itemObj.content = contentRef.current.value
        itemObj.startDate = startDate
        itemObj.endDate = endDate
        onAddTodoItemEvent(itemObj)
        titleRef.current.value = ""
        contentRef.current.value = ""
        setStartDate(DateType.createDate())
        setEndDate(DateType.createDate())
        onCardModalCloseEvent(false)
    }

    const onIsOpenEventHandler = (isChecked) => {
        setIsOpen(isChecked)
    }

    const onChangeStartDateEventHandler = (newValue) => {
        const date = DateType.createDateFormat(newValue, "YYYY-MM-DD")
        setStartDate(date)
        if (parseInt(DateType.dateFromDate(date, endDate, "days")) < 0) {
            setIsValidStartDate(true)
            startRef.current.labels[0].innerText =
                "Please check your start date!"
        } else {
            if (isValidEndDate) {
                setIsValidEndtDate(false)
                endRef.current.labels[0].innerText = "End Date"
            }
            setIsValidStartDate(false)
            startRef.current.labels[0].innerText = "Start Date"
        }
    }

    const onChangeEndDateEventHandler = (newValue) => {
        const date = DateType.createDateFormat(newValue, "YYYY-MM-DD")
        setEndDate(date)
        if (parseInt(DateType.dateFromDate(startDate, date, "days")) < 0) {
            setIsValidEndtDate(true)
            endRef.current.labels[0].innerText = "Please check your end date!"
        } else {
            if (isValidStartDate) {
                setIsValidStartDate(false)
                startRef.current.labels[0].innerText = "Start Date"
            }
            setIsValidEndtDate(false)
            endRef.current.labels[0].innerText = "End Date"
        }
    }

    const onTitleChangeEventHandler = useCallback((e) => {
        if (validateForTitle(e.target.value)) {
            titleRef.current.labels[0].innerText = "Please check your title!"
            setIsValidTtile(true)
            return
        }
        titleRef.current.labels[0].innerText = "Enter todo title!"
        setIsValidTtile(false)
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
                setIsShowPopupEvent={onIsOpenEventHandler}
                message="Please check your input agin!!"
            />
            <Dialog
                sx={dialogStyle}
                open={isCardModalShow}
                onClose={onCloseCardModal}
            >
                <DialogContent>
                    <Card sx={cardStyle}>
                        <CardHeader
                            title={
                                <TextField
                                    error={isValidTitle}
                                    label="Enter todo title"
                                    inputRef={titleRef}
                                    variant="outlined"
                                    sx={headerStyle}
                                    onChange={onTitleChangeEventHandler}
                                />
                            }
                        />
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DesktopDatePicker
                                inputRef={startRef}
                                label="Start Date"
                                value={startDate}
                                onChange={onChangeStartDateEventHandler}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        error={isValidStartDate}
                                    />
                                )}
                            />
                            <DesktopDatePicker
                                inputRef={endRef}
                                label="End Date"
                                value={endDate}
                                onChange={onChangeEndDateEventHandler}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        error={isValidEndDate}
                                    />
                                )}
                            />
                        </LocalizationProvider>
                        <CardContent>
                            <TextField
                                label="Enter todo contents"
                                variant="outlined"
                                inputRef={contentRef}
                                multiline
                                rows={8}
                                autoFocus={true}
                                sx={contentStyle}
                            />
                        </CardContent>
                    </Card>
                </DialogContent>
                <Button
                    sx={buttonStyle}
                    onClick={onSaveButtonClickEventHandler}
                >
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

const cardStyle = {
    textAlign: "center",
}

const avtarStyle = {
    bgColor: "blue[500]",
}

const headerStyle = {
    width: "100%",
}

const contentStyle = {
    width: "100%",
}

const buttonStyle = {
    fontSize: "30px",
}

export default CardModal
