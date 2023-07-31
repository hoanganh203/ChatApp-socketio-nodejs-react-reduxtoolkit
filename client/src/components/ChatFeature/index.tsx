
import { BiSolidPhoneCall, BiDotsVerticalRounded } from "react-icons/bi"
import { AiOutlineVideoCameraAdd } from "react-icons/ai"
import { RootState, useAppDispatch } from "../../store"
import { useSelector } from "react-redux"
import { BsCircleFill } from "react-icons/bs"
import { TbArrowBackUp } from "react-icons/tb"
import { isChatId } from "../../sliceRedux/chat.slice"



const ChatFeature = () => {
    const { receiver, usersOnline } = useSelector((state: RootState) => state.chat)
    const dispatch = useAppDispatch()
    return (
        <div className="chatFeatureMobile">
            <div className=" flex items-center justify-between my-6">

                <button onClick={() => dispatch(isChatId(null))} className="back w-20 text-2xl pl-4 -mr-1 text-white"><TbArrowBackUp /></button>

                <div className="flex items-center mx-10">
                    <img src={receiver?.images} className="receiverImg w-12 mr-3 sm:h-12 object-cover rounded-[50%] " alt="Ảnh đại diện" />
                    <span className="mt-7 -ml-3">{
                        usersOnline?.some((user: any) => user?.yourId === receiver?._id) ? <>
                            <p className=""><span className="text-green-600"><BsCircleFill /></span></p>
                        </> : <>
                            <p className=""> <span className="text-gray-500"><BsCircleFill /></span></p>
                        </>
                    }</span>
                    <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                        <p className="text-xl">{receiver?.name}</p>
                    </span>
                </div>
                <div className="flex items-center text-3xl cursor-pointer ">
                    <span className="mx-2 iconsMobile hover:scale-125 hover:text-blue-600 ease-in duration-100"><BiSolidPhoneCall /></span>
                    <span className="mx-2 iconsMobile hover:scale-125 hover:text-blue-600 ease-in duration-100"><AiOutlineVideoCameraAdd /></span>
                    <span className="mx-2 iconsMobile hover:scale-125 hover:text-blue-600 ease-in duration-100"><BiDotsVerticalRounded /></span>
                </div>
            </div>
        </div >
    )
}

export default ChatFeature