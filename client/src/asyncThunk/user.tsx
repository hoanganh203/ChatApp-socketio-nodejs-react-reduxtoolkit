import { createAsyncThunk } from "@reduxjs/toolkit";
import { ISignup } from "../interfaces/auth";
import { SignupAuth, addFriend, checkCode, getAllUsers, getUser, getUserChats, signin } from "../api/auth";
import { useAppDispatch } from "../store";
import { isLoadingForm } from "../sliceRedux/chat.slice";
import Notifications from "../components/Notifications";


export const signupAPI = createAsyncThunk(
    'user/signup',
    async (body: ISignup) => {
        try {
            const reponse = await SignupAuth(body);
            Notifications("success", reponse.data.message)
            return reponse.data
        } catch (error: any) {
            Notifications("error", error)
            if (error.response.data.message) {
                Notifications("error", error.response.data.message)
            }
        }
    }
)


export const checkCodeApi = createAsyncThunk(
    'user/checkCode',
    async (body: any) => {
        try {
            const reponse = await checkCode(body);
            Notifications("success", reponse.data.message)
            return reponse.data
        } catch (error: any) {
            Notifications("error", error)

            const dispatch = useAppDispatch()
            dispatch(isLoadingForm(false))
            if (error.response.data.message) {
                Notifications("error", error.response.data.message)
            }
        }
    }
)

export const signinApi = createAsyncThunk(
    'user/signin',
    async (body: any) => {
        try {
            const reponse = await signin(body);
            Notifications("success", reponse.data.message)
            return reponse.data
        } catch (error: any) {
            Notifications("error", error)
            if (error.response.data.message) {
                Notifications("error", error.response.data.message)
            }
        }
    }
)


export const getUserApi = createAsyncThunk(
    'user/getUserApi',
    async (UserId: number | string) => {
        try {
            const reponse = await getUser(UserId)
            return reponse.data.response
        } catch (error: any) {
            Notifications("error", error)
            if (error.response.data.message) {
                Notifications("error", error.response.data.message)
            }
        }
    }
)

export const getAllUsersApi = createAsyncThunk(
    'user/getAllUserssApi',
    async () => {
        try {
            const reponse = await getAllUsers()
            return reponse.data.listUsers
        } catch (error: any) {
            Notifications("error", error)
            if (error.response.data.message) {
                Notifications("error", error.response.data.message)
            }
        }
    }
)


export const addFriendApi = createAsyncThunk(
    'user/addFriendApi',
    async (data: any) => {
        try {
            const reponse = await addFriend(data)
            Notifications("success", reponse.data.message)
            return reponse.data.response.members
        } catch (error: any) {
            Notifications("error", error)
            if (error.response.data.message) {
                Notifications("error", error.response.data.message)
            }
        }
    }
)

export const getUserChatsApi = createAsyncThunk(
    'user/getUserChatsApi',
    async (userId: string) => {

        try {
            const response = await getUserChats(userId)
            return response.data.chats
        } catch (error: any) {
            Notifications("error", error)
            if (error.response.data.message) {
                Notifications("error", error.response.data.message)
            }
        }
    })