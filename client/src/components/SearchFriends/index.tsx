import { GiCancel } from "react-icons/gi"
import { RootState, useAppDispatch } from "../../store"
import { isFriends, isUsersOnline, searchFriends } from "../../sliceRedux/chat.slice"
import { useSelector } from "react-redux"
import { addFriendApi, getAllUsersApi, getUserChatsApi } from "../../asyncThunk/user"
import { BsCircleFill } from "react-icons/bs"
import { useEffect } from "react"
import { io } from "socket.io-client"

const SearchFriends = () => {
    const dispatch = useAppDispatch()
    const userId = localStorage.getItem('yourId')


    const { User, usersOnline } = useSelector((state: RootState) => state.chat)

    const listUsers = useSelector((state: RootState) => state.chat.listUsers?.filter((user) => {
        return user.name?.includes(state.chat.search)
    }))
    const addFriend = async (secondId: any) => {
        const newData = {
            firstId: User?._id,
            secondId: secondId,
        }
        await dispatch(addFriendApi(newData))
        if (userId) {
            await dispatch(getUserChatsApi(userId))
        }
        dispatch(getAllUsersApi())
    }

    const valueInput = (event: any) => {
        dispatch(searchFriends(event.target.value))
    }

    useEffect(() => {
        dispatch(getAllUsersApi())
    }, [])

    useEffect(() => {
        const socket = io("http://localhost:8080")
        socket.on("getUsersOnline", (data) => {
            dispatch(isUsersOnline(data))
        })

        return () => {
            socket.disconnect();
        };
    }, [usersOnline])


    return (
        <div>
            <div className="w-[800px] h-[610px] overflow-y-auto">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <div className="px-6 py-4 border-b rounded-t dark:border-gray-600">
                        <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                        <div className="relative flex">
                            <input type="search" onChange={valueInput} className="block w-full py-2 px-3 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeHolder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Friends" required />
                            <button onClick={() => dispatch(isFriends(false))} className="text-3xl mx-2 my-2 hover:text-red-800"><GiCancel /></button>
                        </div>
                    </div>
                    <div className="p-6">
                        <ul className="my-4 space-y-3 h-[400px] overflow-y-auto">
                            {listUsers?.map((item: any, index) => {
                                return <div key={index}>
                                    {item._id !== User?._id && <>
                                        <li key={index}>
                                            <div className="flex items-center justify-between p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white">
                                                <div className="flex items-center">
                                                    <img src={item.images} alt="" className="w-16 h-16 rounded-full mx-4" />
                                                    <p>{item.name}</p>
                                                    <span className="absolute right-60">{
                                                        usersOnline?.some((user: any) => user?.yourId === item._id) ? <>
                                                            <p className="flex items-center">On <span className="text-green-600"><BsCircleFill /></span></p>
                                                        </> : <>
                                                            <p className="flex items-center">Off <span className="text-gray-500"><BsCircleFill /></span></p>
                                                        </>
                                                    }</span>
                                                </div>

                                                <div>
                                                    <button className="mx-10 py-3 px-5 bg-slate-300 rounded-3xl hover:bg-gray-400" onClick={() => addFriend(item._id)}>Thêm bạn</button>
                                                </div>
                                            </div>
                                        </li>
                                    </>}
                                </div>
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SearchFriends