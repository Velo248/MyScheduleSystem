import { useRef, useState, useCallback } from "react"
import MyIcon from "../../icon/myIcon"
import { Grid, ListItem, ListItemText, TextField } from "@mui/material"
import DateType from "../../type/dateType"

const MyChatRoomInput = ({ onSendButtonClickEvent }) => {
    const [message, setMessage] = useState("")

    const inputRef = useRef()

    const onMessageChangeEventHandler = useCallback((e) => {
        const msg = messageSendEvent.call(this, e)
        setMessage(msg)
    }, [])

    const onSendButtonClickEventHandler = () => {
        onSendButtonClickEvent(message)
        inputRef.current.value = ""
    }

    return (
        <Grid container={true}>
            <Grid item={true} xs={11}>
                <TextField
                    fullWidth={true}
                    label="Enter your message"
                    inputRef={inputRef}
                    onChange={onMessageChangeEventHandler}
                />
            </Grid>
            <Grid item={true} xs={1} align="right">
                <ListItem button={true} onClick={onSendButtonClickEventHandler}>
                    <ListItemText
                        align="center"
                        primary={<MyIcon name="send" />}
                    />
                </ListItem>
            </Grid>
        </Grid>
    )
}

function messageSendEvent(e) {
    const message = {}
    message.message = e.target.value
    message.time = `${DateType.createDate()}//${DateType.getTime()}`
    return message
}

export default MyChatRoomInput
