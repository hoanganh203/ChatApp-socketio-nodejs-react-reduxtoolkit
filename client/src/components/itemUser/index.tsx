import { RootState, useAppDispatch } from '../../store'
import { useSelector } from 'react-redux'
import { BsCircleFill } from "react-icons/bs"
import { useEffect } from 'react'
import { getLastChid } from '../../asyncThunk/chat'
import { IUser } from '../../interfaces/auth'


type propsUser = {
    userChat: IUser,
}

const UserItem = ({ userChat, }: propsUser) => {
    const userId = localStorage.getItem('yourId')
    const { lastMessages, messages, newMessages, usersOnline, notifications, Friends } = useSelector((state: RootState) => state.chat)
    const friend = userChat?.members.find((member: any) => member._id !== userId)
    // useEffect(() => {
    //     dispatch(getLastChid(chat?.chat.items._id))
    // }, [newMessages, notifications])

    return (
        <div>
            <li className="group flex items-center w-auto p-2 text-white rounded-lg hover:text-white hover:bg-rose-500 ease-in duration-200 hover:bg-opacity-60 hover:ml-5 dark:hover:bg-gray-700 ">
                <img src={friend?.images} className="friend_img w-12 mr-3 sm:h-12 object-cover group-hover:scale-90 ease-in duration-200 rounded-[50%]" alt="Ảnh đại diện" />
                <span className="friend_name">{friend.name}
                    {/* <p className="text-start">{
                        chat?.chat.thisUserNotifications &&
                        <span>{chat?.chat.thisUserNotifications.find((senderId: any) => senderId.senderId) === friend?._id && <>{chat?.chat.thisUserNotifications.length}</>}</span>
                    }</p> */}
                    {/* <p className="text-start">{
                        lastMessages?.map((item: any, index: any) => {
                            return <div key={index}>
                                <span>{item?.chatId?._id === chat?.chat.items._id ? <>{item?.text}</> : <></>}</span>
                            </div>
                        })
                    }</p> */}
                </span>
                <span className="absolute right-0 -mt-5 mx-3  group-hover:my-8 ease-in duration-200">{
                    usersOnline?.some((user: any) => user?.yourId === friend._id) ? <>
                        <p className="flex items-center">On <span className="text-green-600"><BsCircleFill /></span></p>
                    </> : <>
                        <p className="flex items-center">Off <span className="text-gray-500"><BsCircleFill /></span></p>
                    </>
                }</span>
            </li>

        </div >
    )
}

export default UserItem