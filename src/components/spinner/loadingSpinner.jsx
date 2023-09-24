import { BallTriangle } from "react-loader-spinner"
import { Container } from "@mui/material"

const LoadingSpinner = () => {
    return (
        <Container sx={containerStyle}>
            <BallTriangle color="#1976D2" height={80} width={80} />
        </Container>
    )
}

const containerStyle = {
    display: "flex",
    justifyContent: "center",
    mt: 30,
}

export default LoadingSpinner
