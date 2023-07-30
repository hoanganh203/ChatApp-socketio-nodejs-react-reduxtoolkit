import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"

const { Schema } = mongoose;

const chatSchema = new Schema({
    members: [{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }]
}, { timestamps: true, versionKey: false });
chatSchema.plugin(mongoosePaginate);
const UserChat = mongoose.model('UserChat', chatSchema, 'UserChat');
export default UserChat;

