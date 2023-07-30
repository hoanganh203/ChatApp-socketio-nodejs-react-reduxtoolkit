import { createAsyncThunk } from "@reduxjs/toolkit";
import { getMessage, sendMessage } from "../api/auth";

export const getMessageApi = createAsyncThunk(
    'chat/getMessage',
    async (chatId: string) => {
        try {
            const reponse = await getMessage(chatId)
            return reponse.data.message
        } catch (error) {
            console.log(error);
        }
    }
)

export const getLastChid = createAsyncThunk(
    'chat/getLastChid',
    async (chatId: string) => {

        try {
            const reponse = await getMessage(chatId)
            const last = reponse.data.message[reponse.data.message?.length - 1]
            console.log("last", last);

            return last
        } catch (error) {
            console.log(error);
        }
    }
)
export const sendMessageApi = createAsyncThunk(
    'chat/sendMessageApi',
    async (newData: any) => {
        try {
            const reponse = await sendMessage(newData)
            return reponse.data.response
        } catch (error) {
            console.log(error);
        }
    }
)