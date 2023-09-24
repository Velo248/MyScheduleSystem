import React from "react"
import { Grid, List, ListItem, ListItemText } from "@mui/material"

const MyChatRoomMessage = ({ messages }) => {
    return (
        <List>
            <ListItem>
                <Grid container={true}>
                    {messages.map((m, i) => {
                        return (
                            <Grid key={i} item={true} xs={12}>
                                <ListItemText
                                    align={m.isMe ? "right" : "left"}
                                    primary={m.message}
                                />
                                <ListItemText
                                    align={m.isMe ? "right" : "left"}
                                    primary={m.time}
                                />
                            </Grid>
                        )
                    })}
                </Grid>
            </ListItem>
        </List>
    )
}

export default MyChatRoomMessage
