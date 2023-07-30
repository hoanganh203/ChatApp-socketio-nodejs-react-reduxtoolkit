import { configureStore } from "@reduxjs/toolkit"
import { useDispatch } from "react-redux"
import chatReducer from "../sliceRedux/chat.slice"

const store = configureStore({
    reducer: { chat: chatReducer }
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()

export default store