
import mongoose from "mongoose";

// schema
const userSchema= new mongoose.Schema({
    userName:{
        type: 'string',
        required:[true,'user name is required']
    },
    email:{
        type:String,
        required:[true,'email is required'],
        unique:true
    },
        password:{
            type:String,
            required:[true,'password is required'],
        },
        address:{
            type:Array,
        },
        phone:{
            type:String,
            required:[true,'phone number is required'],
        },
        usertype:{
            type:String,
            required:[true,'user type is required'],
            default: 'clinet',
            enum:['clinet', 'admin','vendor','driver',]
        },
        profile:{
            type:String,
            default:'https://i.pinimg.com/736x/8b/16/7a/8b167af653c2399dd93b952a48740620.jpg',
        },
        answer:{
            type:String,
            required:[true,'answer is required']
        }
},{timestamps:true})

export const UserModel = mongoose.model('Usars', userSchema)
export default UserModel;
