import React, {useContext} from 'react'
import {Button, Container, Nav, Navbar} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import {LOGIN_ROUTE, USERS_LIST_ROUTE} from "../utils/consts";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import {check} from "../http/userApi";

const NavBar = observer(({checkAuth}) => {
    const {user} = useContext(Context)
    const navigate = useNavigate()
    const isAuth = user.isAuth
    const exit = () => {
        user.setIsAuth(false)
        localStorage.clear()
    }

    const contentForAuthUser = (
        <>
            <Link
                to={USERS_LIST_ROUTE}
                onClick={async () => {
                    await checkAuth()
                }}
                className='nav-link'
            >Users</Link>
            <Button className='ms-2'
                    variant={"outline-light"}
                    onClick={exit}>Exit</Button>
        </>
    )
    const contentForUnAuthUser = (
        <>
            <Button variant={'outline-light'}
                    onClick={() => navigate(LOGIN_ROUTE)}>
                Authorization
            </Button>
        </>
    )

    return (
        <Navbar bg="dark"
                variant="dark">
            <Container>
                <Link to={user.isAuth ? USERS_LIST_ROUTE : LOGIN_ROUTE}
                      style={{color: 'white'}}

                      onClick={async () => {
                          await checkAuth()
                      }}>
                    TASK 4
                </Link>
                <Nav className="ml-auto">
                    {isAuth ? contentForAuthUser : contentForUnAuthUser}
                </Nav>
            </Container>
        </Navbar>
    )
})

export default NavBar