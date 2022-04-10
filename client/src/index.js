import React, {createContext} from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import {BrowserRouter} from "react-router-dom";
import UserStore from "./store/UserStore";
import UsersStore from "./store/UsersStore";
import {ToastProvider} from "react-toast-notifications";

export const Context = createContext(null)

ReactDOM.render(
    <BrowserRouter>


        <ToastProvider><Context.Provider value={{
            user: new UserStore(),
            users: new UsersStore()
        }}><App/></Context.Provider></ToastProvider>

    </BrowserRouter>
    ,
    document.getElementById('root')
)
