import styled from "styled-components"
import MyCalendar from "../components/calendar/myCalendar"
import { Container } from "@mui/material"

const MyLayout = () => {
    return (
        <Container sx={boxSizeStyle}>
            <MyCalendarBoxDiv>
                <MyCalendar />
            </MyCalendarBoxDiv>
        </Container>
    )
}

const boxSizeStyle = {
    width: "100%",
    height: "100%",
    textAlign: "center",
}

const MyCalendarBoxDiv = styled.div`
    border-radius: 10px;
    width: 85%;
    height: 100%;
    display: flex;
    margin-top: 8rem;

    .react-calendar__navigation button {
        all: unset;
        margin: 1rem;
        font-size: 3rem;
    }

    .react-calendar__month-view__weekdays {
        margin-top: 2rem;
        font-weight: bold;
        font-size: 2rem;
    }

    .react-calendar__month-view__weekdays abbr {
        text-decoration: none;
    }

    .react-calendar__month-view__days button {
        all: unset;
        margin-top: 2rem;
    }

    .react-calendar__month-view__days button:hover {
        font-weight: bold;
    }
`

export default MyLayout
