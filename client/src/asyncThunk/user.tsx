import { createAsyncThunk } from "@reduxjs/toolkit";
import { ISignup } from "../interfaces/auth";
import Swal from "sweetalert2";
import { SignupAuth, addFriend, checkCode, getAllUsers, getUser, getUserChats, signin } from "../api/auth";
import { useAppDispatch } from "../store";
import { isLoadingForm } from "../sliceRedux/chat.slice";


export const signupAPI = createAsyncThunk(
    'user/signup',
    async (body: ISignup) => {

        try {
            const reponse = await SignupAuth(body);
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            })
            Toast.fire({
                icon: 'success',
                title: reponse.data.message
            })


            return reponse.data
        } catch (error: any) {
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            })
            Toast.fire({
                icon: 'error',
                title: error
            })
            if (error.response.data.message) {
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.addEventListener('mouseenter', Swal.stopTimer)
                        toast.addEventListener('mouseleave', Swal.resumeTimer)
                    }
                })
                Toast.fire({
                    icon: 'error',
                    title: error.response.data.message
                })
            }

        }
    }
)


export const checkCodeApi = createAsyncThunk(
    'user/checkCode',
    async (body: any) => {
        try {

            const reponse = await checkCode(body);
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            })
            Toast.fire({
                icon: 'success',
                title: reponse.data.message,
            })
            return reponse.data
        } catch (error: any) {
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            })
            Toast.fire({
                icon: 'error',
                title: error
            })
            const dispatch = useAppDispatch()
            dispatch(isLoadingForm(false))

            if (error.response.data.message) {
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.addEventListener('mouseenter', Swal.stopTimer)
                        toast.addEventListener('mouseleave', Swal.resumeTimer)
                    }
                })
                Toast.fire({
                    icon: 'error',
                    title: error.response.data.message
                })
            }

        }
    }
)

export const signinApi = createAsyncThunk(
    'user/signin',

    async (body: any) => {
        try {
            const reponse = await signin(body);
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            })
            Toast.fire({
                icon: 'success',
                title: reponse.data.message,
            })

            return reponse.data
        } catch (error: any) {

            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            })
            Toast.fire({
                icon: 'error',
                title: error
            })

            if (error.response.data.message) {
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.addEventListener('mouseenter', Swal.stopTimer)
                        toast.addEventListener('mouseleave', Swal.resumeTimer)
                    }
                })
                Toast.fire({
                    icon: 'error',
                    title: error.response.data.message
                })
                const dispatch = useAppDispatch()
                dispatch(isLoadingForm(false))
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
        } catch (error) {
            console.log(error);
        }
    }
)

export const getAllUsersApi = createAsyncThunk(
    'user/getAllUserssApi',
    async () => {
        try {
            const reponse = await getAllUsers()
            return reponse.data.listUsers
        } catch (error) {
            console.log(error);
        }
    }
)


export const addFriendApi = createAsyncThunk(
    'user/addFriendApi',
    async (data: any) => {
        try {
            const reponse = await addFriend(data)
            console.log(reponse.data.response.members);

            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            })
            Toast.fire({
                icon: 'success',
                title: reponse.data.message,
            })
            return reponse.data.response.members
        } catch (error) {
            console.log(error);
        }
    }
)

export const getUserChatsApi = createAsyncThunk(
    'user/getUserChatsApi',
    async (userId: string) => {

        try {
            const response = await getUserChats(userId)
            return response.data.chats
        } catch (error) {
            console.log(error);

        }


    })




// export const getUserChat = createAsyncThunk(
//     'user/getUserChat',
//     async (id: number | string) => {
//         try {
//             const reponse = await getOne_user(id)
//             return reponse.data.data
//         } catch (error) {
//             console.log(error);
//         }
//     }
// )

// export const getUserList = createAsyncThunk(
//     'user/getUserList',
//     async () => {
//         try {
//             const reponse = await getAll()

//             return reponse.data.data
//         } catch (error) {
//             console.log(error);
//         }
//     }
// )