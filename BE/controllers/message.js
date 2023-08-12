import Message from "../models/message.js";


export const createMessage = async (req, res) => {
    const { chatId, senderId, text, images } = req.body;

    const newMessage = new Message({
        chatId, senderId, text, images
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
