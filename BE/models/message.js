import mongoose from "mongoose";

const meesageSchema = new mongoose.Schema({
    chatId: {
        type: mongoose.Types.ObjectId,
        ref: 'UserChat'
    },
    senderId: String,
    text: String,
    images: String,

}, { timestamps: true, versionKey: false })

const Message = mongoose.model('Message', meesageSchema, 'Message');
export default Message;