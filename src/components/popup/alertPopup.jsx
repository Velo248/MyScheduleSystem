import MyIcon from "../../icon/myIcon"
import {
    Box,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
} from "@mui/material"

const AlertPopup = ({ isShowPopup, setIsShowPopupEvent, message }) => {
    const onCloseButtonClickHandler = (isChecked) => () => {
        setIsShowPopupEvent(isChecked)
    }

    return (
        <Box>
            <Dialog open={isShowPopup}>
                <DialogTitle>
                    <MyIcon name="excalmationCircle" /> Please check your input agin.
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        { message }
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        autoFocus={true}
                        onClick={onCloseButtonClickHandler(false)}
                    >
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}

export default AlertPopup