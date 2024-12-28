import UserModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import JWT from 'jsonwebtoken';

export const ragisterController = async (req, res) => {
    try {

        const { userName, email, password, phone, address, answer } = req.body;
        // validation
        if (!userName || !email || !password || !phone || !address || !answer) {
            return res.status(404).send({
                success: false,
                message: 'please provide all fields'
            });
        }
        // check user
        const exisiting = await UserModel.findOne({ email })
        if (exisiting) {
            return res.status(402).send({
                success: false,
                message: 'Email Already Registered please login'
            })
        }
        let salt = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create and save new user
        const user = new UserModel({
            userName,
            email,
            password: hashedPassword,
            phone,
            address,
            answer,
        });

        await user.save();
        res.status(200).send({
            success: true,
            message: 'successfully registered',
            user,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in ragister API ',
            error,
        })
    }
}


export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        // validation
        if (!email || !password) {
            return res.status(404).send({
                success: false,
                message: 'please provide Email OR Password'
            })
        }
        // check user
        const user = await UserModel.findOne({ email })
        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'User not found'
            });
        }
        // check user password | compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(405).send({
                success: false,
                message: 'Invalid Credentials',
            });
        }
        // token
        const token = JWT.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        })
        user.password = undefined;
        res.status(200).send({
            success: true,
            message: 'login successful',
            token,
            user,
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in login'
        })
    }
}