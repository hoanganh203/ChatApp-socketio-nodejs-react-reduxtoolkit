import { RootState, useAppDispatch } from '../../store'
import { useSelector } from 'react-redux'
import { BsCircleFill } from "react-icons/bs"
import { useCallback } from 'react'
import { IUser } from '../../interfaces/auth'
import { oneChatUser } from '../../sliceRedux/chat.slice'

type propsUser = {
    userChat: IUser,
    lastMessages: any
}

const UserItem = ({ userChat }: propsUser) => {
    const { usersOnline, notifications } = useSelector((state: RootState) => state.chat)
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

    return (
        <button onClick={() => markedNotificationsUser(friend._id, notifications)} className='w-full'>
            <li className="group flex items-center w-auto text-white rounded-lg hover:text-white hover:bg-rose-500 ease-in duration-200 hover:bg-opacity-60 hover:ml-5 dark:hover:bg-gray-700 ">
                <img src={friend?.images} className="friend_img w-12 mr-3 sm:h-12 object-cover group-hover:scale-90 ease-in duration-200 rounded-[50%]" alt="Ảnh đại diện" />
                <span className="-ml-3 mt-5">{
                    usersOnline?.some((user: any) => user?.yourId === friend._id) ? <>
                        <p className="flex items-center"> <span className="text-green-600"><BsCircleFill /></span></p>
                    </> : <>
                        <p className="flex items-center"> <span className="text-gray-500"><BsCircleFill /></span></p>
                    </>
                }</span>
                <span className="friend_name mx-2">{friend.name} <br />
                </span>
                {thisUser.length > 0 &&
                    <span className="text-xl text-white bg-red-500 text-center px-2 mx-2 rounded-full"> {thisUser.length}</span>
                }

            </li>

        </button >
    )
}

export default UserItem