import MyIcon from "../../icon/myIcon"
import {
    Box,
    Button,
    Typography,
} from "@mui/material"

const EmptyCard = ({ onCardModalShow }) => {
    const onPlusButtonClickHandler = () => {
        onCardModalShow(true)
    }

    return (
        <Box sx={cardStyle}>
            <Typography color="text.secondary">
                <Button onClick={onPlusButtonClickHandler}><MyIcon name="plus" /></Button>
            </Typography>
        </Box>
    )
}

const cardStyle = {
    marginTop: "25px",
    display: "flex",
    alignItems: "center",
    textAlign: "center",
    justifyContent: "center",
    width: "300px",
    height: "280px",
    border: "dotted",
    borderRadius: "10px",
}

export default EmptyCard