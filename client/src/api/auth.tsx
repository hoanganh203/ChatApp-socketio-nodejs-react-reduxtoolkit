import { ISignup } from "../interfaces/auth";
import http from "./http";


export const SignupAuth = (data: ISignup) => {
    const uri = "/api/auth/signup"
    return http.post(uri, data)
}
export const checkCode = (data: any) => {
    const uri = "/api/auth/signin"
    return http.post(uri, data)
}


export const signin = (data: any) => {
    const uri = "/api/auth/very-signin"
    return http.post(uri, data)
}


export const getUser = (yourId: number | string) => {
    const uri = `/api/auth/${yourId}`
    return http.get(uri)
}

export const getAllUsers = () => {
    const uri = `/api/auth`
    return http.get(uri)
}

export const addFriend = (data: any) => {
    const uri = `/api/chat/`
    return http.post(uri, data)
}

export const getUserChats = (userId: string) => {
    const uri = `/api/chat/${userId}`
    return http.get(uri)
}

export const getMessage = (chatId: string) => {
    const uri = `/api/message/${chatId}`
    return http.get(uri)
}

export const sendMessage = (data: any) => {
    const uri = `/api/message`
    return http.post(uri, data)
}
