import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { signinSchema, signupSchema } from "../validate/auth.js";
import User from '../models/User.js'
import nodemailer from "nodemailer"



export const signup = async (req, res) => {
    try {
        const { error } = signupSchema.validate(req.body, { abortEarly: false });
        if (error) {
            const errors = error.details.map((err) => err.message);
            return res.status(400).json({
                message: errors,
            });
        }
        // Kiểm tra xem user đã đk chưa?
        const userExist = await User.findOne({ email: req.body.email });
        if (userExist) {
            return res.status(400).json({
                message: "Email đã tồn tại",
            });
        }

        // Mã hóa mật khẩu
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const data = await User.create({
            name: req.body.name,
            email: req.body.email,
            images: req.body.images,
            password: hashedPassword,
        });
        // không trả về password
        const token = jwt.sign({ id: data._id }, "12345678", { expiresIn: "1d" });

        data.password = undefined;

        return res.status(201).json({
            message: "Tạo tài khoản thành công",
            accessToken: token,
            data,
        });
    } catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
};

export const checkSignin = async (req, res) => {
    try {
        const { email } = req.body;
        console.log(email);
        const data = await User.findOne({ email });
        if (data) {
            const verificationCodee = Math.floor(100000 + Math.random() * 900000).toString();
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'hoangmaph23084@fpt.edu.vn',
                    pass: 'injteevybwiugzax'
                }
            });

            // Thiết lập nội dung email
            const mailOptions = {
                from: 'hoangmaph23084@fpt.edu.vn',
                to: email,
                subject: 'Mã xác thực đăng nhập',
                text: `Mã xác thực của bạn là: ${verificationCodee}`,
            };
            // Gửi email
            transporter.sendMail(mailOptions, async (error) => {
                if (error) {
                    return res.status(400).json({
                        message: error,
                    });
                } else {
                    console.log(verificationCodee);
                    const user = await User.findOneAndUpdate(
                        { email },
                        { verificationCode: verificationCodee },
                        { upsert: true, new: true }
                    );
                    console.log(user);
                }
            });
            return res.status(200).json({
                message: "Đã gửi mã xác thực thành công",
            });
        }

    } catch (error) {
        return res.status(400).json({
            message: error,
        });
    };

};

export const signin = async (req, res) => {
    try {
        console.log(req.body);
        const { email, password } = req.body;
        const { verificationCode } = req.body;
        console.log("client", verificationCode);
        const { error } = signinSchema.validate(req.body, { abortEarly: false });
        if (error) {
            return res.status(400).json({
                message: error.details.map((err) => err.message)
            });
        };
        //Kiểm tra xem user đã đki chưa ? 
        const data = await User.findOne({ email });
        console.log("sigin", data);
        if (!data) {
            return res.status(400).json({ message: "Email chưa tồn tại" });
        }

        const isMatch = await bcrypt.compare(password, data.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Mật khẩu không đúng" });
        }
        const token = jwt.sign({ id: data._id }, "12345678", { expiresIn: "1d" });
        data.password = undefined;

        if (data.verificationCode !== verificationCode) {
            console.log(data.verificationCode, verificationCode);
            return res.status(400).json({ message: "Mã xác thực không đúng" });
        }

        const user = await User.findOneAndUpdate(
            { email },
            { verificationCode: "" },
            { upsert: true, new: true }
        );

        console.log(user);

        return res.status(200).json({
            message: "Đăng nhập thành công",
            accessToken: token,
            data,
        });




    } catch (error) {
        return res.status(400).json({
            message: error,
        });
    }
}



export const getUser = async (req, res) => {
    const userId = req.params.userId
    try {
        const response = await User.findById(userId);
        if (!response) {
            return res.status(201).json({
                message: "User không tồn tại",
            });
        }
        return res.status(201).json({
            message: "Lấy User thành công",
            response,
        });
    } catch (error) {
        return res.status(404).json({
            message: error.message,
        });
    }
}



export const getAllUsers = async (req, res) => {
    try {
        const listUsers = await User.find();

        if (!listUsers) {
            return res.status(201).json({
                message: "Users không tồn tại",
            });
        }
        return res.status(201).json({
            message: "Lấy Users thành công",
            listUsers,
        });
    } catch (error) {
        return res.status(404).json({
            message: error.message,
        });
    }

}