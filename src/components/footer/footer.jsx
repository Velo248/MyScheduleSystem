import { Box, BottomNavigation, BottomNavigationAction } from "@mui/material"

const Footer = () => {
    return (
        <Box sx={boxStyle}>
            <BottomNavigation showLabels={true}>
                <BottomNavigationAction label="@Copyright: MSS team"></BottomNavigationAction>
                <BottomNavigationAction label="Team: MyScheduleSystem"></BottomNavigationAction>
                <BottomNavigationAction label="Since: 2022.05.04"></BottomNavigationAction>
            </BottomNavigation>
        </Box>
    )
}

export default Footer

const boxStyle = {
    width: "100%",
    position: "absolute",
    bottom: "0px",
}
