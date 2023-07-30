import UserChat from '../models/userChat.js'



export const createUserChat = async (req, res) => {
    const { firstId, secondId } = req.body;
    try {
        const chat = await UserChat.findOne({
            members: { $all: [firstId, secondId] }
        })
        if (chat) {
            return res.status(201).json({
                chat
            })
        }
        const newChat = new UserChat({
            members: [firstId, secondId]
        })
        const response = await newChat.save()
        return res.status(201).json({
            message: "Thêm bạn bè thành công",
            response
        })
    } catch (error) {
        return res.status(404).json({
            message: error.message,
        })
    }
}

export const findUserschat = async (req, res) => {
    const userId = req.params.userId
    try {
        const chats = await UserChat.find({
            members: { $in: [userId] }
        }).populate("members")

        return res.status(201).json({
            chats
        })

    } catch (error) {
        return res.status(404).json({
            message: error.message,
        })
    }
}

export const findChats = async (req, res) => {
    const { firstId, secondId } = req.params

    try {
        const response = await UserChat.find({
            members: { $all: [firstId, secondId] }
        }).populate("members")

        return res.status(201).json({
            response
        })

    } catch (error) {
        return res.status(404).json({
            message: error.message,
        })
    }
}





// export const createUserChat = async (req, res) => {
//     const { yourId, friendId } = req.body; // lấy id_user và id_song từ request
//     try {
//         const checkUserChat = await UserChat.findOne({ yourId: yourId, friendsList: friendId });
//         if (checkUserChat) {
//             const index = checkUserChat.friendsList.findIndex((item) => item.equals(friendId))
//             checkUserChat.friendsList.splice(index, 1);
//             await checkUserChat.save();
//             return res.status(201).json({
//                 message: "Xóa bạn bè thành công",
//                 checkUserChat,
//             })
//         }
//         // bắt đầu call API
//         if (!checkUserChat) {
//             const dataUserChat = await UserChat.findOneAndUpdate(
//                 { yourId }, //tham số đầu tiên là id_user
//                 { $addToSet: { friendsList: friendId } },
//                 { upsert: true, new: true } // này chưa biết là gì
//             ).populate("friendsList")

//             if (!dataUserChat) {
//                 return res.status(201).json({
//                     message: "Thêm bạn bè không thành công"
//                 })
//             }
//             return res.status(201).json({
//                 message: "Thêm bạn bè thành công thành công",
//                 dataUserChat
//             })
//         }
//     } catch (error) {
//         return res.status(404).json({
//             message: error.message,
//         })
//     }
// }
// export const getUserChat = async (req, res) => {
//     const yourId = req.params.yourId
//     try {
//         const listUser = await UserChat.findOne({ yourId }).populate("friendsList")
//         if (!listUser) {
//             return res.status(201).json({
//                 message: "Danh sách không tồn tại",
//             });
//         }
//         return res.status(201).json({
//             message: "Danh sách bạn bè",
//             listUser,
//         });
//     } catch (error) {
//         return res.status(404).json({
//             message: error.message,
//         });
//     }
// }








