import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
    name: String,
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        require: true,

    },
    verificationCode: {
        type: String,
        default: "",

    },
    images: {
        type: String,
        require: true,
    },
    status: {
        type: Boolean,
        default: false
    },
},
    { timestamps: true, versionKey: false });

const User = mongoose.model('User', userSchema, 'User');
export default User;

