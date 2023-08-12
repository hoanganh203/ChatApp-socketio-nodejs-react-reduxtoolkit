
import { BsSendFill } from 'react-icons/bs'
import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from '../../store'
import { sendMessageApi } from '../../asyncThunk/chat'
import { io } from 'socket.io-client'
import { isText } from '../../sliceRedux/chat.slice'
import axios from 'axios'
import { useState } from 'react'
const socket = io("http://localhost:8080")




const FormChat = () => {
    const [img, setImg] = useState<string>("")
    const [cancel, setCancel] = useState<boolean>(false)
    const [isLoading, setIsloading] = useState<boolean>(false)
    const { chatId, User, receiver, inputvalue } = useSelector((state: RootState) => state.chat)
    const dispatch = useAppDispatch()
    const sendMessage = () => {
        const newData = {
            chatId: chatId._id || chatId,
            senderId: User?._id,
            text: inputvalue,
            images: img
        }
        dispatch(sendMessageApi(newData))
        setImg("")
        setCancel(false)

        if (receiver) {
            socket.emit("sendMessage", { ...newData, receiver: receiver._id || receiver.senderId })
        }
        return () => {
            socket.disconnect();
        };
    }


    const imagesUpload = async (e: any) => {
        setIsloading(true)
        const file = e.target.files[0]
        try {
            const CLOUD_NAME = "doa7mkkpq";
            const PRESET_NAME = "upload";
            const api = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`; // Thay thế với giá trị của bạn
            const formData = new FormData();
            formData.append("upload_preset", PRESET_NAME);
            formData.append("file", file);
            // gửi lên cloudinary
            const response = await axios.post(
                api,
                formData
            );
            setImg(response.data.secure_url)
            setIsloading(false)
            setCancel(true)
        } catch (error) {
            console.log(error);
        }
    }

    const deleteImg = (file: any) => {
        setImg("")
        setCancel(false)
    }



    return (
        <div>
            <div className="flex items-center mx-3 my-2">
                <div className="flex items-center justify-center formMobile relative w-full">
                    <div>
                        {isLoading ? <div role="status" className="flex items-center justify-center h-20 w-20 -mt-20 bg-gray-300 rounded-lg animate-pulse dark:bg-gray-700">
                            <svg className="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 20">
                                <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
                                <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM9 13a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2Zm4 .382a1 1 0 0 1-1.447.894L10 13v-2l1.553-1.276a1 1 0 0 1 1.447.894v2.764Z" />
                            </svg>
                            <span className="sr-only">Loading...</span>
                        </div> : <img src={img} alt="" className='-mt-32 px-10 py-5 absolute w-60' />}
                        {cancel ? <button className='bg-violet-50 text-violet-700 px-5 py-2 rounded-3xl' onClick={deleteImg}>Cancel</button> : <input type="file" onChange={imagesUpload} className="block text-none text-slate-500 w-28
      file:mr-4 file:py-2 file:px-4
      file:rounded-full file:border-0
      file:bg-violet-50 file:text-violet-700
      hover:file:bg-violet-100
    "/>}
                    </div>

                    <input type="text" value={inputvalue} onChange={(e: any) => dispatch(isText(e.target.value))} className="bg-transparent text-white bg-none outline-none text-sm block w-full ml-1 p-2.5" placeholder="Soạn tin nhắn ..." />
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
        </div >
    )
}

export default FormChat