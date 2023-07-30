import { useSelector } from "react-redux"
import { IMesages } from "../../interfaces/auth"
import { RootState } from "../../store"


type propsMessages = {
    message: IMesages
}

const ItemMessage = ({ message }: propsMessages) => {
    const { User, receiver } = useSelector((state: RootState) => state.chat)
    return <>
        {message?.senderId === User?._id ? <div>
            <ul className="messageMobile right-3 mt-5 flex items-center justify-start flex-row-reverse">
                <div className="flex items-center mx-2">
                    <img src={User?.images} className="messageImgMobile my-2 w-10 flex items-center justify-center sm:h-10 object-cover rounded-[50%] " alt="Ảnh đại diện" />
                </div>
                <li className="mx-3 bg-[#4285F4] text-white max-w-max rounded-3xl py-4">
                    <span className=" font-semibold whitespace-nowrap dark:text-white">
                        <p className="text-s mx-3 text-white">{User?.name}</p>
                    </span>
                    <p className="text mx-3 ">{message.text}</p>
                </li>
            </ul>
        </div>
            :
            <div>
                <ul className=" mx-4 mt-5 flex flex-row items-center">
                    <div className="flex flex-row items-center mx-2">
                        <img src={receiver?.images} className="messageImgMobile my-2 w-10 flex items-center justify-center sm:h-10 object-cover rounded-[50%] " alt="Ảnh đại diện" />
                    </div>
                    <li className="mx-3 bg-slate-100 text-black max-w-max rounded-3xl py-4">
                        <span className="self-center font-semibold whitespace-nowrap dark:text-white">
                            <p className="text-s mx-3 text-gray-950">{receiver?.name}</p>
                        </span>
                        <p className="mx-3 ">{message.text}</p>
                    </li>
                </ul>

            </div>
        }
    </>

}

export default ItemMessage