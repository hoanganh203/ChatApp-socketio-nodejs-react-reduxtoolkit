import { AsyncThunk, PayloadAction, createSlice } from "@reduxjs/toolkit"
import { IMesages, IUser } from "../interfaces/auth"
import { getAllUsersApi, getUserApi, getUserChatsApi, signinApi } from "../asyncThunk/user"
import { getLastChid, getMessageApi, sendMessageApi } from "../asyncThunk/chat"

type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>
type PendingAction = ReturnType<GenericAsyncThunk['pending']>
type RejectedAction = ReturnType<GenericAsyncThunk['rejected']>
type FulfilledAction = ReturnType<GenericAsyncThunk['fulfilled']>


interface chatState {
    isLoading: boolean,
    User: IUser | null,
    login: boolean,
    Friends: IUser[],
    addFriends: boolean,
    listUsers: IUser[] | null,
    listUsersApi: IUser | null,
    search: string,
    usersOnline: any,
    chatId: any,
    receiver: IUser | null,
    messages: IMesages[],
    statusChatApp: boolean,
    inputvalue: string,
    newMessages: IMesages | null,
    lastMessages: IMesages[],
    notifications: any[],
    isNotifications: boolean
}


const initialState: chatState = {
    isLoading: false,
    User: null,
    login: false,
    Friends: [],
    addFriends: false,
    listUsers: null,
    listUsersApi: null,
    search: "",
    usersOnline: null,
    chatId: null,
    receiver: null,
    messages: [],
    statusChatApp: false,
    inputvalue: "",
    newMessages: null,
    lastMessages: [],
    notifications: [],
    isNotifications: false
}



const chatSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        isStatusChatApp: (state, action: PayloadAction<boolean>) => {
            state.statusChatApp = action.payload
        },
        isText: (state, action: PayloadAction<string>) => {
            state.inputvalue = action.payload
        },
        isSocketMessage: (state, action: PayloadAction<any>) => {
            console.log("action", action.payload);
            state.messages.push(action.payload)
        },
        isLoadingForm: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload
        },
        islogin: (state, action: PayloadAction<boolean>) => {
            state.login = action.payload
        }, isFriends: (state, action: PayloadAction<boolean>) => {
            state.addFriends = action.payload
        }, searchFriends: (state, action: PayloadAction<string>) => {
            state.search = action.payload
        }, isUsersOnline: (state, action: PayloadAction<any>) => {
            state.usersOnline = action.payload
        }, isChatId: (state, action: PayloadAction<any>) => {
            state.chatId = action.payload
        }, isGetReceiver: (state, action: PayloadAction<any>) => {
            state.receiver = action.payload
        },
        addNotification: (state, action: PayloadAction<any>) => {
            state.notifications.push(action.payload);
        },
        isNotification: (state, action: PayloadAction<boolean>) => {
            state.isNotifications = action.payload
        }, allNotification: (state) => {
            state.notifications = state.notifications.map((notification) => {
                return { ...notification, isRead: true }
            })
        }, oneChat: (state, action: PayloadAction<any>) => {
            state.receiver = action.payload.item
            state.notifications = action.payload.notifications.map((el: any) => {
                if (action.payload.item?.senderId === el.senderId) {
                    return { ...action.payload.item, isRead: true };
                } else {
                    return el
                }
            })
        }, oneChatUser: (state, action: PayloadAction<any>) => {
            state.notifications = action.payload.notifications.map((item: any) => {
                if (action.payload.item === item.senderId) {
                    return { ...action.payload.item, isRead: true };
                } else {
                    return item
                }
            })
        }
    }, extraReducers(builder) {
        builder.addCase(signinApi.fulfilled, (state, action) => {
            localStorage.setItem('yourId', action.payload.data._id)
            state
        }).addCase(getUserChatsApi.fulfilled, (state, action) => {
            state.Friends = action.payload
        }).addCase(getUserApi.fulfilled, (state, action) => {
            state.User = action.payload
        }).addCase(getAllUsersApi.fulfilled, (state, action) => {
            const userId = localStorage.getItem('yourId')
            const list = action.payload
            const friend = state.Friends.map((a: any) => a.members.find((b: any) => b._id !== userId) || false)
            state.listUsers = list?.filter((user: any) => !friend.some((p: any) => p._id === user._id));
        }).addCase(getMessageApi.fulfilled, (state, action) => {
            state.messages = action.payload
        }).addCase(sendMessageApi.fulfilled, (state, action) => {
            state.newMessages = action.payload
            state.messages.push(action.payload)
            state.inputvalue = ""
        }).addCase(getLastChid.fulfilled, (state, action) => {
            state.lastMessages.push(action.payload)
        })
            .addMatcher<PendingAction>( //lấy ra các trang thái bắt đầu hay kết thúc của action
                (action) => action.type.endsWith('/pending'),
                (state, action) => {
                    action
                    state.isLoading = true
                }
            ).addMatcher<RejectedAction>(
                (action) => action.type.endsWith('/rejected'),
                (state, action) => {
                    action
                    state.isLoading = false
                }
            ).addMatcher<FulfilledAction>(
                (action) => action.type.endsWith('/fulfilled'),
                (state, action) => {
                    action
                    state.isLoading = false
                }
            )

    }
})

export const { isLoadingForm, islogin, oneChat, oneChatUser, isFriends, allNotification, isNotification, searchFriends, isUsersOnline, isChatId, isGetReceiver, isSocketMessage, isStatusChatApp, isText, addNotification } = chatSlice.actions
const chatReducer = chatSlice.reducer
export default chatReducer