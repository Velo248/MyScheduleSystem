import React from "react"
import { Route, Routes } from "react-router-dom"
import MyLayout from "../myLayout"
import Header from "../../components/nav/header"
import RightSidebar from "../../components/nav/rightSidebar"
import MyChatRoom from "../../components/chat/myChatRoom"
import SearchFriend from "../searchFriend"
import Footer from "../../components/footer/footer"

const MyRouter = () => {
    return (
        <React.Fragment>
            <Header />
            <RightSidebar />
            <Routes>
                <Route path="/" element={<MyLayout />} />
                <Route path="/chat/:id" element={<MyChatRoom />} />
                <Route path="/search" element={<SearchFriend />} />
            </Routes>
            <Footer />
        </React.Fragment>
    )
}

export default MyRouter
