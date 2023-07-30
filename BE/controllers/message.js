import Message from "../models/message.js";


export const createMessage = async (req, res) => {
    const { chatId, senderId, text } = req.body;

    const newMessage = new Message({
        chatId, senderId, text
    })
    try {
        const response = await newMessage.save()
        return res.status(201).json({
            response
        })
    } catch (error) {
        return res.status(404).json({
            message: error.message,
        });
    }
}

export const getMessage = async (req, res) => {
    const { chatId } = req.params
    try {
        const message = await Message.find({ chatId }).populate("chatId")
        return res.status(201).json({
            message
        })
    } catch (error) {
        return res.status(404).json({
            message: error.message,
        });
    }
}



// export const createMessage = async (req, res) => {

//     const yourId = req.body.friendId
//     const friendId = req.body.yourId
//     const text = req.body.text

//     const newData = {
//         yourId: yourId,
//         friendId: friendId,
//         text: text
//     }

//     try {

//         const checkMessage = await Message.findOne({
//             $or: [
//                 { yourId: yourId, friendId: friendId },
//                 { yourId: friendId, friendId: yourId }
//             ]
//         })
//         if (!checkMessage) {
//             const dataMessage = await Message.findOneAndUpdate(
//                 { $and: [{ yourId: yourId }, { friendId: friendId }] }, //tham số đầu tiên là id_user
//                 { $addToSet: { content: newData } },
//                 { upsert: true, new: true } // này chưa biết là gì
//             )

//             if (!dataMessage) {
//                 return res.status(201).json({
//                     message: "Thêm tin nhắn không thành công"
//                 })
//             }
//             return res.status(201).json({
//                 message: "Thêm tin nhắn thành công",
//                 dataMessage
//             })

//         }


//         checkMessage.content.push(newData)
//         checkMessage.save()
//         return res.status(201).json({
//             message: "Thêm tin nhắn thành công",
//             checkMessage,
//         });
//     } catch (error) {
//         return res.status(404).json({
//             message: error.message,
//         });
//     }

// }
// export const getMessage = async (req, res) => {
//     const yourId = req.params.friendId
//     const friendId = req.params.yourId
//     try {
//         const messenger = await Message.findOne({


//             $or: [
//                 { yourId: yourId, friendId: friendId },
//                 { yourId: friendId, friendId: yourId }
//             ]
//         })

//         if (!messenger) {
//             return res.status(201).json({
//                 message: "Không tìm thấy danh sách"
//             })
//         }

//         return res.status(201).json({
//             message: "Danh sách tin nhắn",
//             messenger
//         })
//     } catch (error) {
//         return res.status(404).json({
//             message: error.message
//         })
//     }





// }