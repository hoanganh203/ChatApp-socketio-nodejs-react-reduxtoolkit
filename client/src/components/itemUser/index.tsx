import { RootState, useAppDispatch } from '../../store'
import { useSelector } from 'react-redux'
import { BsCircleFill } from "react-icons/bs"
import { useCallback, useEffect } from 'react'
import { getLastChid } from '../../asyncThunk/chat'
import { IUser } from '../../interfaces/auth'
import { oneChat, oneChatUser } from '../../sliceRedux/chat.slice'


type propsUser = {
    userChat: IUser,
    lastMessages: any
}

const UserItem = ({ userChat, lastMessages }: propsUser) => {
    const { usersOnline, notifications, newMessages } = useSelector((state: RootState) => state.chat)
    const userId = localStorage.getItem('yourId')
    const friend = userChat?.members.find((member: any) => member._id !== userId)
    const unreadnotifications = notifications.filter((n: any) => n.isRead === false)
    const thisUser = unreadnotifications?.filter((n: any) => n.senderId === friend._id)
    const dispatch = useAppDispatch()
    const markedNotificationsUser = useCallback((friend: any, notifications: any) => {
        const newData = {
            item: friend,
            notifications: notifications
        }
        dispatch(oneChatUser(newData))
    }, [])

    useEffect(() => {
        if (userChat?._id) {
            dispatch(getLastChid(userChat?._id))
            return
        }
    }, [notifications, dispatch])

    console.log(lastMessages, "123");


    return (
        <button onClick={() => markedNotificationsUser(friend._id, notifications)} className='w-full'>
            <li className="group flex items-center w-auto p-2 text-white rounded-lg hover:text-white hover:bg-rose-500 ease-in duration-200 hover:bg-opacity-60 hover:ml-5 dark:hover:bg-gray-700 ">
                <img src={friend?.images} className="friend_img w-12 mr-3 sm:h-12 object-cover group-hover:scale-90 ease-in duration-200 rounded-[50%]" alt="Ảnh đại diện" />
                <span className="friend_name">{friend.name} <br />

                    {lastMessages &&
                        lastMessages.map((message: any, index: any) => {
                            return <span key={index}>
                                {message?.chatId?._id === userChat?._id && message?.text}
                            </span>
                        })
                    }
                    {/* {lastMessages?.chatId?._id === userChat?._id && lastMessages?.text[lastMessages.length - 1]} */}
                </span>
                {thisUser.length > 0 &&
                    <span className="text-xl text-white bg-red-500 text-center px-2 mx-2 rounded-full"> {thisUser.length}</span>
                }
                <span className="absolute right-0 -mt-5 mx-3  group-hover:my-8 ease-in duration-200">{
                    usersOnline?.some((user: any) => user?.yourId === friend._id) ? <>
                        <p className="flex items-center">On <span className="text-green-600"><BsCircleFill /></span></p>
                    </> : <>
                        <p className="flex items-center">Off <span className="text-gray-500"><BsCircleFill /></span></p>
                    </>
                }</span>
            </li>

        </button >
    )
}

export default UserItem