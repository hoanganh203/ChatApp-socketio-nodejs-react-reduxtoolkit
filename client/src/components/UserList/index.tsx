import { useCallback, useEffect } from "react"
import { RootState, useAppDispatch } from "../../store"
import { useSelector } from "react-redux"
import { getUserApi, getUserChatsApi } from "../../asyncThunk/user"
import { useNavigate } from "react-router-dom"
import { AiOutlineUsergroupAdd } from "react-icons/ai"
import Swal from "sweetalert2"
import { addNotification, allNotification, isChatId, isFriends, isGetReceiver, isNotification, isSocketMessage, isUsersOnline, oneChat } from "../../sliceRedux/chat.slice"
import { io } from "socket.io-client"
import UserItem from "../itemUser"
import { getLastChid, getMessageApi } from "../../asyncThunk/chat"
import { GrNotification } from "react-icons/gr"
import moment from "moment"
import { addFriend } from "../../api/auth"


const UserList = () => {
    const navigate = useNavigate()
    const userId = localStorage.getItem("yourId")
    const dispatch = useAppDispatch()
    const { User, Friends, chatId, newMessages, receiver, lastMessages, notifications, isNotifications } = useSelector((state: RootState) => state.chat)
    // const friend = Friends.map((a: any) => a.members.find((b: any) => b._id !== userId) || false)
    // const test = Friends.map((a:any)=>a.)
    // const thisUserNotifications = unreadNotifications?.filter((n) => n.senderId === )
    // console.log("thisUserNotifications", thisUserNotifications);

    const unreadnotifications = notifications.filter((n: any) => n.isRead === false)

    const modifiedNotifications = notifications.map((n: any) => {
        const sender = Friends.find((a: any) => a.members.find((b: any) => b._id === n.senderId))
        const sender1 = sender?.members.find((c: any) => c._id === n.senderId)
        return {
            ...n,
            senderName: sender1?.name,
        }
    })

    const markedNotifications = () => {
        dispatch(allNotification())
    }

    const markedNotificationsAsRead = useCallback((item: any, notifications: any, Friends: any) => {

        const newData = {
            items: item,
            notifications: notifications
        }
        console.log(newData);

        dispatch(oneChat(newData))
    }, [])


    useEffect(() => {
        const socket = io("http://localhost:8080")
        if (userId) {
            dispatch(getUserChatsApi(userId))
            dispatch(getUserApi(userId))
        }
        socket.emit("statusUsers", userId)
        socket.on("getUsersOnline", (data) => {
            dispatch(isUsersOnline(data))

        })

        socket.on("getMessage", (res: any) => {
            if (socket === null) return
            console.log(chatId);
            console.log(chatId?._id, res.chatId);
            if (chatId?._id === res.chatId) {
                console.log(res);
                dispatch(isSocketMessage(res))
            } else {
                console.log(1);
                return
            }
        })

        socket.on("getNotification", (res: any) => {
            const ischatOpen = Friends.some((a: any) => a.members.some((b: any) => b._id === res.senderId))
            const newData = {
                chatId: res.chatId,
                senderId: res.senderId,
                isRead: false,
                date: res.date,
            };
            if (ischatOpen) {
                dispatch(addNotification({ ...newData, isRead: true }));
            } else {
                dispatch(addNotification(newData));
            }
        })

        // useEffect(() => {

        //     dispatch(getLastChid(friend._id))
        // }, [newMessages, notifications])

        // const id=  Friends.map((item: any) => item._id);
        // dispatch(getLastChid(id))
        return () => {
            socket.disconnect();
        };
    }, [dispatch, chatId, newMessages])

    useEffect(() => {

    }, [])

    const logOut = () => {
        const socket = io("http://localhost:8080")
        Swal.fire({
            title: 'Đăng xuất?',
            text: "Bạn chắc là muốn đăng xuất chứ!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Đăng xuất'
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.removeItem("yourId")
                navigate("/signin")
                Swal.fire(
                    'Đăng xuất',
                    'Thành công',
                    'success'
                )
            }
        })
        return () => {
            socket.disconnect();
        };
    }
    const updateChatId = useCallback((Friends: any) => {
        const receiver = Friends?.members.find((member: any) => member._id !== userId)
        dispatch(isGetReceiver(receiver))
        dispatch(getMessageApi(Friends._id))
        dispatch(isChatId(Friends))
        dispatch(isFriends(false))
    }, [])


    const adFriedns = () => {
        dispatch(isFriends(true))
        dispatch(isChatId(null))
    }


    return (<>{
        isNotifications && <>
            <div className="userBox_me_notifi z-50 text-black bg-white shadow-2xl absolute ml-56 top-28 rounded-r-2xl rounded-bl-2xl opacity-60 h-[auto] overflow-y-auto">
                <button onClick={() => markedNotifications()}>Đánh dấu đã đọc</button>
                <div className="">
                    <div className="mx-3 w-96">
                        {modifiedNotifications?.length === 0 ? <span>
                            Không có tin nhắn nào....
                        </span> :
                            null
                        }
                        <ul className="w-full">
                            {modifiedNotifications && modifiedNotifications.map((item: any, index: any) => {
                                return <div key={index} onClick={() => markedNotificationsAsRead(item, Friends, notifications)} className="cursor-pointer">
                                    <li className="mx-2 my-4">
                                        <span>{item.senderName} đã gửi tin nhắn đến bạn</span><br />
                                        <span>{moment(item.data).calendar()}</span>
                                    </li>
                                    <hr />
                                </div>
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    }
        <aside id="logo-sidebar" className="userBox z-30 w-[300px] -mt-7 shadow-2xl" aria-label="Sidebar">
            <div className="userBox_me h-[580px] px-3 py-4 backdrop-blur-3xl backdrop-opacity-90 dark:bg-gray-800 overflow-y-auto ">
                <div className="flex items-center pl-2.5">
                    <span className="flex items-center pl-2.5 ">
                        <img src={User?.images} className="userBox_me_img w-12 mr-3 sm:h-12 object-cover rounded-[50%] " alt="Ảnh đại diện" />
                        <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                            <p className="text-xl flex items-center text-white">{User?.name}
                                <button className="ml-3" onClick={() => dispatch(isNotification(!isNotifications))}><GrNotification />
                                    {unreadnotifications?.length === 0 ? null : <>
                                        <span className="text-2xl text-white">{unreadnotifications.length}</span>
                                    </>}
                                </button>
                                <button onClick={() => logOut()} className="logoutBlock  text-white my-2 ml-2 bg-red-700 hover:bg-white hover:text-red-600 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-[13px] px-2 py-1 text-center mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900" >Đăng xuất</button>
                            </p>
                        </span>
                    </span>
                </div>
                <button className="float-right text-[30px] text-red-600 hover:text-white hover:scale-75 py-1" onClick={() => adFriedns()}><AiOutlineUsergroupAdd /></button>
                <ul className="space-y-2 font-medium cursor-pointer ">
                    <p className="flex items-center justify-center text-white underline decoration-1">Danh sách Bạn bè</p>
                    {Friends.map((userChat: any, index: any) => {
                        return <div key={index}>
                            <ul >
                                <button onClick={() => updateChatId(userChat)} className="w-full">
                                    <UserItem userChat={userChat} />
                                </button>
                            </ul>

                        </div>
                    })}

                </ul>

            </div>
            <button onClick={() => logOut()} className="logoutNone text-white my-2 ml-2 bg-red-700 hover:bg-white hover:text-red-600 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-[13px] px-2 py-1 text-center mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900" >Đăng xuất</button>
        </aside>
    </>
    )
}

export default UserList