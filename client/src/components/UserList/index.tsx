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
import { getMessageApi } from "../../asyncThunk/chat"
import { GrNotification } from "react-icons/gr"
import moment from "moment"


const UserList = () => {
    const navigate = useNavigate()
    const userId = localStorage.getItem("yourId")
    const dispatch = useAppDispatch()
    const { User, Friends, chatId, newMessages, receiver, notifications, isNotifications, lastMessages } = useSelector((state: RootState) => state.chat)


    //    ==============notifications =============================

    const unreadnotifications = notifications.filter((n: any) => n.isRead === false)
    const modifiedNotifications = notifications.map((n: any) => {
        const sender = Friends.find((a: any) => a.members.find((b: any) => b._id === n.senderId))
        const sender1 = sender?.members.find((c: any) => c._id === n.senderId)
        return {
            ...n,
            name: sender1?.name,
            images: sender1?.images,
        }
    })

    const markedNotifications = () => {
        dispatch(allNotification())
    }

    const markedNotificationsAsRead = (item: any, notifications: any) => {
        const newData = {
            item: item,
            notifications: notifications,
        }
        updateChatIdNotifications(item.chatId)
        dispatch(oneChat(newData))
    }

    const updateChatIdNotifications = useCallback((chatId: any) => {
        dispatch(isChatId(chatId))
        dispatch(getMessageApi(chatId))
    }, [])

    const updateChatId = useCallback((Friends: any) => {
        const receiver = Friends?.members.find((member: any) => member._id !== userId)
        dispatch(isGetReceiver(receiver))
        dispatch(getMessageApi(Friends._id))
        dispatch(isChatId(Friends))
        dispatch(isFriends(false))
    }, [])

    //    ==============notifications =============================


    // ==============socket=================
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
            if (chatId?._id === res.chatId || chatId === res.chatId) {
                dispatch(isSocketMessage(res))
            } else {
                return
            }
        })
        socket.on("getNotification", (res: any) => {
            const newData = {
                chatId: res.chatId,
                senderId: res.senderId,
                isRead: false,
                date: res.date,
            };
            if (receiver && chatId) {
                const ischatOpen = receiver.senderId === res.senderId || receiver._id === res.senderId
                if (ischatOpen) {
                    dispatch(addNotification({ ...newData, isRead: true }));
                } else {
                    dispatch(addNotification(newData));
                }
            }
            else {
                dispatch(addNotification(newData));
            }
        })
        return () => {
            socket.disconnect();
        };
    }, [dispatch, chatId, newMessages])

    // ==============socket=================


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
    const adFriedns = () => {
        dispatch(isFriends(true))
        dispatch(isChatId(null))
    }
    const sortedNotifications = modifiedNotifications.sort((a, b) => moment(b.date).diff(moment(a.date)));

    return (<>
        <aside id="logo-sidebar" className="userBox z-30 w-[300px] -mt-7 shadow-2xl" aria-label="Sidebar">
            <div className="userBox_me h-[580px] px-3 py-4 backdrop-blur-3xl backdrop-opacity-90 dark:bg-gray-800 overflow-y-auto ">
                <div className="flex items-center pl-2.5">
                    <span className="flex items-center pl-2.5 ">
                        <img src={User?.images} className="userBox_me_img w-12 mr-3 sm:h-12 object-cover rounded-[50%] " alt="Ảnh đại diện" />
                        <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                            <p className="text-xl flex items-center text-white">{User?.name}
                                <button className=" flex items-center justify-center mx-2 " onClick={() => dispatch(isNotification(!isNotifications))}><GrNotification />
                                    {unreadnotifications?.length === 0 ? null : <>
                                        <span className="text-xl text-white mx-2 bg-red-500 px-2.5 rounded-full">{unreadnotifications.length}</span>
                                    </>}

                                    <div id={isNotifications ? "userBox_me_notifi" : "userBox_me_notifiTest"} className="z-50 text-black bg-white shadow-2xl absolute left-1 top-16 rounded-2xl h-[auto] overflow-y-auto">
                                        <button onClick={() => markedNotifications()}>Đánh dấu đã đọc</button>
                                        <hr />
                                        <div className="my-1">
                                            <div className="mx-3">
                                                {modifiedNotifications?.length === 0 ? <span>
                                                    Không có tin nhắn nào....
                                                </span> :
                                                    null
                                                }
                                                <ul className="">
                                                    {sortedNotifications && sortedNotifications.map((item: any, index: any) => {
                                                        return <div key={index} onClick={() => markedNotificationsAsRead(item, notifications)} className="cursor-pointer">
                                                            {item.isRead ? <li className="mx-2 text-start text-sm ">
                                                                <p className="">{item.name} đã gửi tin nhắn đến bạn</p>
                                                                <p>{moment(item.date).calendar()}</p>
                                                            </li> : <li className="mx-2 text-start text-sm bg-gray-300 px-3 -ml-1">
                                                                <p className="">{item.name} đã gửi tin nhắn đến bạn</p>
                                                                <p>{moment(item.date).calendar()}</p>
                                                            </li>}

                                                            <hr />
                                                        </div>
                                                    })}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

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
                                    <UserItem userChat={userChat} lastMessages={lastMessages} />
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