import { useSelector } from "react-redux"
import { IMesages } from "../../interfaces/auth"
import { RootState } from "../../store"


type propsMessages = {
    message: IMesages
}



const ItemMessage = ({ message }: propsMessages) => {
    const { User, receiver } = useSelector((state: RootState) => state.chat)

    console.log(message);

    return <div className="">
        {message?.senderId === User?._id ? <div>
            <ul className="messageMobile animateMessage right-3 mt-5 flex items-center justify-start flex-row-reverse">
                <div className="flex items-center mx-2">
                    <img src={User?.images} className="messageImgMobile my-2 w-10 flex items-center justify-center sm:h-10 object-cover rounded-[50%] " alt="Ảnh đại diện" />
                </div>

                <li className="mx-3 bg-[#4285F4] text-white max-w-max rounded-3xl py-4">
                    <span className=" font-semibold whitespace-nowrap dark:text-white">
                        <p className="text-s mx-3 text-white text-right">{User?.name}</p>
                    </span>
                    {message.text && <p className="mx-3">{message?.text}</p>}

                </li>
                {message.images && <img src={message?.images} className="w-96 h-auto object-cover bg-none" />}

            </ul>
        </div>
            :
            <div>
                <ul className=" mx-4 mt-5 flex flex-row items-center">
                    <div className="flex flex-row items-center mx-2">
                        <img src={receiver?.images} className="messageImgMobile my-2 w-10 flex items-center justify-center sm:h-10 object-cover rounded-[50%] " alt="Ảnh đại diện" />
                    </div>
                    <li className="animateMessage mx-3 bg-slate-100 text-black max-w-max rounded-3xl py-4">
                        <span className="self-center font-semibold whitespace-nowrap dark:text-white">
                            <p className="text-s mx-3 text-gray-950">{receiver?.name}</p>
                        </span>
                        {message.text && <p className="mx-3 ">{message.text}</p>}
                        {message.images && <img src={message?.images} className="w-36 h-36" />}

                    </li>
                </ul>

            </div>
        }
    </div>

}

export default ItemMessage