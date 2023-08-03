import { useSelector } from "react-redux"
import { RootState, useAppDispatch } from "../../store"
import { useEffect, useRef } from "react"
import ItemMessage from "../itemMessage"


const Message = () => {
    const scrollRef = useRef<HTMLDivElement>(null);

    const { messages } = useSelector((state: RootState) => state.chat)

    useEffect(() => {
        if (scrollRef.current !== null) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages])


    return (
        <>
            <div className="messageMobile overflow-y-auto h-[440px]" ref={scrollRef}>
                {messages.map((message: any, index: any) => {
                    return <div key={index}>
                        <ItemMessage message={message} />
                    </div>
                })}
            </div >
        </>

    )
}

export default Message