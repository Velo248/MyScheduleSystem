import {
    Card,
    Button,
    Typography,
    CardHeader,
    CardContent,
    Avatar,
    CardMedia,
} from "@mui/material"
import MyIcon from "../../icon/myIcon"

const CardItem = ({
    index,
    cardItem,
    onEditModeEnterEvent,
    onRemoveCardEvent,
}) => {
    const onClickEventHandler = (isClicked) => () => {
        onEditModeEnterEvent(isClicked, cardItem)
    }

    const onRemoveCardEventHandler = (e) => {
        e.stopPropagation()
        onRemoveCardEvent(index, true)
    }

    return (
        // 카드 UI변경
        <Card sx={cardStyle} onClick={onClickEventHandler(true)}>
            <CardHeader
                avatar={<Avatar />}
                sx={titleStyle}
                title={cardItem.title}
                subheader={`Start : ${cardItem.startDate} End : ${cardItem.endDate}`}
                alt="Modal Card"
                action={
                    <Button sx={buttonStyle} onClick={onRemoveCardEventHandler}>
                        <MyIcon name="delete" />
                    </Button>
                }
            />
            <CardMedia
                component="img"
                height={100}
                image={"/images/schedule.jpg"}
            ></CardMedia>
            <CardContent>
                <Typography sx={contentStyle} variant="body2">
                    {cardItem.content}
                </Typography>
            </CardContent>
        </Card>
    )
}

export default CardItem

const cardStyle = {
    alignItems: "center",
    textAlign: "center",
    marginTop: "20px",
    width: "300px",
    height: "280px",
    boxShadow: "0 10px 5px 5px rgba(0, 0, 0, 0.1)",
    border: "1px solid #eeeeee",
    borderRadius: "8px",
}

const titleStyle = {
    cursor: "pointer",
    height: "15%",
    width: "70%",
}

const contentStyle = {
    height: "35%",
}

const buttonStyle = {
    minWidth: "10px",
    left: "52px",
}
