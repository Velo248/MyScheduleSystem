import { Box, ListItemButton, Typography } from "@mui/material"

function MyFriendList({ friends, onClickFriendButtonClickEvent }) {
    const onClickFriendButtonClickEventHandler = (isChecked, index) => () => {
        onClickFriendButtonClickEvent(isChecked, index)
    }

    return (
        Array.isArray(friends) &&
        friends.map((f, index) => {
            return (
                <Box key={f.uuid}>
                    <ListItemButton
                        divider={true}
                        onClick={onClickFriendButtonClickEventHandler(
                            true,
                            index
                        )}
                    >
                        <Typography>{f.username}</Typography>
                    </ListItemButton>
                </Box>
            )
        })
    )
}

export default MyFriendList
