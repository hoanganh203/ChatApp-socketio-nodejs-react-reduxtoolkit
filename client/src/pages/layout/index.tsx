import { useSelector } from 'react-redux'
import ChatFeature from '../../components/ChatFeature'
import FormChat from '../../components/FormChat'
import Message from '../../components/Message'
import SearchFriends from '../../components/SearchFriends'
import UserList from '../../components/UserList'
import { RootState } from '../../store'
import { useNavigate } from 'react-router-dom'
const Layout = () => {
    const navigate = useNavigate()
    const { addFriends, chatId } = useSelector((state: RootState) => state.chat)
    const id = localStorage.getItem("yourId")

    if (!id) {
        navigate("/signin")
    }
    return (
        <div className='layout mx-auto mt-20 flex items-center justify-center' >
            <UserList />
            {addFriends &&
                <div id={addFriends ? "chatBox_ease" : "chatBox_out"} className='w-[800px] -mt-7 h-[610px] shadow-2xl backdrop-blur-xl backdrop-opacity-90 rounded-lg dark:bg-gray-700'>
                    {addFriends && <SearchFriends />}
                </div>}
            {chatId && <div className='chatBox w-[800px] z-10 -mt-10 h-[610px] shadow-2xl backdrop-blur-xl backdrop-opacity-90 rounded-lg dark:bg-gray-700'>
                {!addFriends && <ChatFeature />}
                <hr />
                {!addFriends && <Message />}
                {!addFriends && <FormChat />}
            </div>}

        </div>
    )
}

export default Layout