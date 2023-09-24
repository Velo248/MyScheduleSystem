import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter } from "react-router-dom"
import UserContextProvider from "./context/userContextProvider"
import App from "./app"
import "./index.css"


ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <UserContextProvider>
                <App />
            </UserContextProvider>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById("root")
)