import React, {useContext, useEffect, useState} from 'react'
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import {Button, Col, Container, Form, Table} from "react-bootstrap";
import {banUsers, deleteUsers, getUsers, unBanUsers} from "../http/userApi";
import User from "../components/User";

const UsersListPage = observer(({checkAuth}) => {
    const [selectAllValue, setSelectAllValue] = useState(false)
    const [unSelectAllValue, setUnselectAllValue] = useState(false)
    const {users, user} = useContext(Context)
    useEffect(() => {
        getUsers().then((data) => {
            users.setUsers(data.users)
        })
    }, [users])
    const selectAll = async () => {
        await checkAuth()
        if (!selectAllValue) {
            users.selectAll()
            setSelectAllValue(true)
        } else {
            users.unSelectAll()
            setSelectAllValue(false)
        }
    }
    const unSelectAll = async () => {
        await checkAuth()
        if (!unSelectAllValue) {
            users.unSelectAll()
            setSelectAllValue(false)
            setUnselectAllValue(false)
        }
    }

    const banUsersButton = async () => {
        await checkAuth()
        setSelectAllValue(false)
        if (users.selectedUsers.some(id => id === user.user.id)) {
            try {
                await banUsers(Array.from(users.selectedUsers))
                users.banSelectedUsers()
                user.setIsAuth(false)
                user.setUser({})
                localStorage.clear()
            } catch (e) {
            }
        } else {
            try {
                await banUsers(Array.from(users.selectedUsers))
                users.banSelectedUsers()
            } catch (e) {
            }
        }

    }
    const unBanUsersButton = async () => {
        await checkAuth()
        setSelectAllValue(false)
        try {
            await unBanUsers(Array.from(users.selectedUsers))
            users.unBanSelectedUsers()
        } catch (e) {

        }
    }
    const deleteUsersButton = async () => {
        await checkAuth()
        setSelectAllValue(false)
        if (users.selectedUsers.some(id => id === user.user.id)) {
            try {
                await deleteUsers(Array.from(users.selectedUsers))
                users.deleteSelectedUsers()
                user.setIsAuth(false)
                user.setUser({})
                localStorage.clear()
            } catch (e) {
            }
        } else {
            try {
                await deleteUsers(Array.from(users.selectedUsers))
                users.deleteSelectedUsers()
            } catch (e) {
            }
        }
    }
    return (
        <Container className={'mt-3'}>
            <Form className='d-flex'>
                <Col className={'md-3'}>
                    <Form.Check onChange={selectAll}
                                label='select all users'
                                checked={selectAllValue}/>
                    <Form.Check
                        label='unselect all users'
                        checked={unSelectAllValue}
                        onChange={unSelectAll}/>
                </Col>
                <Col className={'md-9'}>
                    <Button variant={"outline-danger"}
                            onClick={banUsersButton}>
                        Ban selected users
                    </Button>
                    <Button variant={"outline-success"}
                            className={'ms-3'}
                            onClick={unBanUsersButton}>
                        Unban selected users
                    </Button>
                    <Button variant={"danger"}
                            className={'ms-3'}
                            onClick={deleteUsersButton}>
                        Delete selected users
                    </Button>
                </Col>
            </Form>
            <Table striped
                   bordered
                   hover>
                <thead>
                <tr>
                    <th>#</th>
                    <th>EMAIL</th>
                    <th>REGISTRATION DATE</th>
                    <th>LAST LOGIN</th>
                    <th>IS BANNED</th>
                </tr>
                </thead>
                <tbody>
                {users.users.map(user =>
                    <User id={user.id}
                          email={user.email}
                          last_login={user.last_login}
                          is_banned={user.is_banned}
                          reg_date={user.createdAt}
                          key={user.id}/>
                )}
                </tbody>
            </Table>
        </Container>
    )
})

export default UsersListPage