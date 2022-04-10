import jwtDecode from "jwt-decode";
import {$authHost, $host} from "./index";

export const registration = async (email, password) => {
    const {data} = await $host.post('api/user/registration', {email, password})
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}

export const login = async (email, password) => {
    const {data} = await $host.post('api/user/login', {email, password})
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}

export const check = async () => {
    const {data} = await $authHost.get('api/user/auth')
    const decoded = jwtDecode(data.token)
    localStorage.setItem('token', data.token)
    localStorage.setItem('userId', decoded.id)
    return decoded
}

export const getUsers = async () => {
    const {data} = await $authHost.get('api/user/users')
    return data
}
export const banUsers = async (ids) => {
    const {data} = await $authHost.post('api/user/ban', {ids})
    console.log(data)
    return data
}
export const unBanUsers = async (ids) => {
    const {data} = await $authHost.post('api/user/unban', {ids})
    return data
}
export const deleteUsers = async (ids) => {
    const {data} = await $authHost.post('api/user/delete', {ids})
    console.log(data)
    return data
}