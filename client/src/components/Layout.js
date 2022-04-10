import React, {useContext, useEffect} from 'react'
import {Outlet} from 'react-router-dom'
import NavBar from "./NavBar";
import {check} from "../http/userApi";
import {Context} from "../index";
import {observer} from "mobx-react-lite";

const Layout = observer(({checkAuth}) => {

    return (
        <div>
            <NavBar checkAuth={checkAuth}/>
            <Outlet/>
        </div>
    )
})

export default Layout