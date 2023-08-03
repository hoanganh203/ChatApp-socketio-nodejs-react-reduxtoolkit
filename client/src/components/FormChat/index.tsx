
import { BsSendFill } from 'react-icons/bs'
import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from '../../store'
import { sendMessageApi } from '../../asyncThunk/chat'
import { io } from 'socket.io-client'
import { isText } from '../../sliceRedux/chat.slice'


const socket = io("http://localhost:8080")


const FormChat = () => {
    const { chatId, User, receiver, inputvalue } = useSelector((state: RootState) => state.chat)
    const dispatch = useAppDispatch()
    const sendMessage = () => {
        const newData = {
            chatId: chatId._id || chatId,
            senderId: User?._id,
            text: inputvalue,
        }
        dispatch(sendMessageApi(newData))
        if (receiver) {
            socket.emit("sendMessage", { ...newData, receiver: receiver._id || receiver.senderId })
        }
        return () => {
            socket.disconnect();
        };
    }

    return (
        <div>
            <div className=" flex items-center mx-3 my-2">
                <div className="formMobile relative w-full">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    </div>
                    <input type="text" value={inputvalue} onChange={(e: any) => dispatch(isText(e.target.value))} className="bg-transparent text-white bg-none outline-none text-sm block w-full pl-10 p-2.5" placeholder="Search Mockups, Logos, Design Templates..." />
                    <hr />
                    <button type="button" className="absolute  inset-y-0 right-0 flex items-center pr-3">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7v3a5.006 5.006 0 0 1-5 5H6a5.006 5.006 0 0 1-5-5V7m7 9v3m-3 0h6M7 1h2a3 3 0 0 1 3 3v5a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V4a3 3 0 0 1 3-3Z" />
                        </svg>
                    </button>
                </div>
                <button onClick={() => sendMessage()} className="formMobile backdrop-blur-xl backdrop-opacity-70 text-white text-2xl inline-flex items-center py-3 px-3 ml-2 hover:scale-90 hover:text-white-60   ease-in duration-100 font-medium">
                    <span><BsSendFill /></span>
                </button>
            </div>
        </div>
    )
}

export default FormChat