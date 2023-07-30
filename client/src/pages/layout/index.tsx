import { useSelector } from 'react-redux'
import ChatFeature from '../../components/ChatFeature'
import FormChat from '../../components/FormChat'
import Message from '../../components/Message'
import SearchFriends from '../../components/SearchFriends'
import UserList from '../../components/UserList'
import { RootState } from '../../store'
const Layout = () => {
    const { addFriends, chatId } = useSelector((state: RootState) => state.chat)
    return (
        <div className='layout mx-auto mt-20  flex items-center justify-center' >
            <UserList />

            {chatId && <div className='chatBox w-[800px] -mt-7 h-[610px] shadow-2xl backdrop-blur-xl backdrop-opacity-0 rounded-lg dark:bg-gray-700'>
                {!addFriends && <ChatFeature />}
                <hr />
                {addFriends ? <SearchFriends /> : <Message />}
                {!addFriends && <FormChat />}
            </div>}

        </div>
    )
}

export default Layout