import MyIcon from "../../icon/myIcon"
import {
    Box,
    Dialog,
    DialogTitle,
    DialogActions,
    Button,
} from "@mui/material"

function CheckPopup({ message, isShowPopup, onCheckPopupEvent }) {
    const onCloseButtonClickHandler = (isChecked) => () => {
        onCheckPopupEvent(isChecked)
    }

    return (
        <Box>
            <Dialog open={isShowPopup}>
                <DialogTitle>
                    <MyIcon name="excalmationCircle" /> {message}
                </DialogTitle>
                <DialogActions>
                    <Button onClick={onCloseButtonClickHandler(true)}>
                        Yes
                    </Button>
                    <Button
                        autoFocus={true}
                        onClick={onCloseButtonClickHandler(false)}
                    >
                        No
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}

export default CheckPopup