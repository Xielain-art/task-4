import {makeAutoObservable} from "mobx";


export default class UsersStore {
    constructor() {
        this._users = []
        this._selectedUsers = []
        this._candidates = []
        makeAutoObservable(this)
    }

    setUsers(users) {
        this._users = users.sort((a, b) => a.id - b.id)
    }

    selectUser(user_id) {
        if (this._selectedUsers.some((id) => id === user_id)) {
            this._selectedUsers = this._selectedUsers.filter((id) => id !== user_id)
        } else {
            this._selectedUsers.push(user_id)
        }
    }

    banSelectedUsers() {
        this._users = this._users.filter((user) => {
            if (this._selectedUsers.some(id => id === user.id) && user.is_banned === false) {
                user.is_banned = true
                return user
            }
            return user
        })
        this._selectedUsers = []
    }

    unBanSelectedUsers() {
        this._users = this._users.filter((user) => {
            if (this._selectedUsers.some(id => id === user.id) && user.is_banned === true) {
                user.is_banned = false
                return user
            }
            return user
        })
        this._selectedUsers = []
    }

    deleteSelectedUsers() {
        this._users = this._users.filter((user) => {
            if (!this._selectedUsers.some(id => id === user.id)) {
                return user
            }
        })
        this._selectedUsers = []

    }

    selectAll() {
        this._selectedUsers = this._users.map((user) => user.id)
    }

    unSelectAll() {
        this._selectedUsers = []
    }

    get users() {
        return this._users
    }

    get selectedUsers() {
        return this._selectedUsers
    }

}