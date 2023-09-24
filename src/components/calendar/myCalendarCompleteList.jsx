import {
    Box,
    Container,
    ListItemText,
    Divider,
    Grid,
    Button,
} from "@mui/material"
import TodoItem from "../../type/todoItem"

const MyCalendarCompleteList = ({ item, onCompletedEvent }) => {
    const onCompletedEventHandler = (e) => () => {
        const newObj = new TodoItem(
            e.uuid,
            e.title,
            e.content,
            e.startDate,
            e.endDate,
            !e.isCompleted
        )
        onCompletedEvent(newObj)
    }

    return (
        <Box sx={todoListBoxStyle}>
            {item.map((e, i) => {
                return (
                    <Container key={i}>
                        <Grid container>
                            <Grid item xs={8} sx={mainGridStyle}>
                                <ListItemText primary={e.title} />
                                <Grid container sx={dateGridStyle}>
                                    <Grid item xs={6}>
                                        <ListItemText secondary={e.startDate} />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <ListItemText secondary={e.endDate} />
                                    </Grid>
                                </Grid>
                                <ListItemText secondary={e.content} />
                            </Grid>
                            {e.isCompleted ? (
                                <Grid item xs={1}>
                                    <Button
                                        onClick={onCompletedEventHandler(e)}
                                    >
                                        Up
                                    </Button>
                                </Grid>
                            ) : (
                                <Grid item xs={1}>
                                    <Button
                                        onClick={onCompletedEventHandler(e)}
                                    >
                                        Down
                                    </Button>
                                </Grid>
                            )}
                        </Grid>
                        <Divider />
                    </Container>
                )
            })}
        </Box>
    )
}

const dateGridStyle = {
    marginLeft: 1.5,
}

const mainGridStyle = {
    marginLeft: 1,
}

const avatarStyle = {
    width: "50px",
    height: "50px",
    margin: 3,
}

const todoListBoxStyle = {
    overflow: "auto",
    height: "185px",
    alignItems: "center",
    boxShadow: "10px 10px 10px 10px rgba(0, 0, 0, 0.085)",
    borderRadius: "10px 10px 10px 10px",
}

export default MyCalendarCompleteList
