import { Grid, List, ListItem, ListItemText, Divider } from "@mui/material"

const MyChatRoomUserList = ({ chatRoomName, myInfo, friendInfo }) => {
    return (
        <Grid item={true} xs={3}>
            <List>
                <ListItem button={true}>
                    <ListItemText primary="Chatroom name: " />
                    <ListItemText primary={chatRoomName} />
                </ListItem>
            </List>
            <Divider />
            <Grid item={true} xs={12}>
                <ListItemText primary="User list" align="center" />
            </Grid>
            <Divider />
            <List>
                <ListItem button={true}>
                    <ListItemText primary={myInfo.name} />
                    <ListItemText secondary="Me" align="right" />
                </ListItem>
                {friendInfo.map((f) => {
                    return (
                        <ListItem key={f.uuid} button={true}>
                            <ListItemText primary={f.username} />
                        </ListItem>
                    )
                })}
            </List>
        </Grid>
    )
}

export default MyChatRoomUserList
