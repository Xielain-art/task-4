import React, {useContext} from 'react'
import {Context} from "../index";
import {observer} from "mobx-react-lite";

const User = observer(({id, email, reg_date, last_login, is_banned}) => {
    const {users} = useContext(Context)


    return (
        <tr onClick={() => {
            users.selectUser(id)}}
            style={{backgroundColor: users.selectedUsers.some((user_id) => user_id === id) ? 'red' : ''}}>
            <td>{id}</td>
            <td>{email}</td>
            <td>{reg_date}</td>
            <td>{last_login}</td>
            <td>{is_banned ? 'Yes' : 'No'}</td>
        </tr>
    )
})

export default User