import {Route, Routes} from 'react-router-dom'
import {LOGIN_ROUTE, REGISTRATION_ROUTE, USERS_LIST_ROUTE} from "./utils/consts";
import Layout from "./components/Layout";
import UsersListPage from "./pages/UsersListPage";
import AuthPage from "./pages/AuthPage";
import {useContext, useEffect} from "react";
import {Context} from "./index";
import {observer} from "mobx-react-lite";
import {check} from "./http/userApi";
const App = observer(() => {
    const {user} = useContext(Context)
    const checkAuth = async () => {
        try {
            let data = await check()
            user.setIsAuth(true)
            user.setUser(data)
        } catch (e) {
            user.setIsAuth(false)
            user.setUser({})
            localStorage.clear()
        }
    }
    useEffect(() => {
        checkAuth().then(() => {
        })
    }, [])
    return (
        <Routes>
            <Route path='/'
                   element={<Layout checkAuth={checkAuth}/>}>
                {user.isAuth && <Route index
                                       path={USERS_LIST_ROUTE}
                                       element={<UsersListPage checkAuth={checkAuth}/>}/>}
                <Route path={LOGIN_ROUTE}
                       element={<AuthPage/>}/>}
                <Route path={REGISTRATION_ROUTE}
                       element={<AuthPage/>}/>
                {user.isAuth ? <Route path='*'
                                      element={<UsersListPage/>}/> : <Route
                    path='/'
                    element={<AuthPage/>}/>}
            </Route>
        </Routes>
    )
})

export default App
