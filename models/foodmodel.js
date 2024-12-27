import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
    title: {
        type: "string",
        required: [true, 'food title is required']
    },
    description:{
        type: "string",
        required: [true, 'food description is required']
    },
    price:{
        type: "Number",
        required: [true, 'food price is required']
    },
    imageUrl:{
        type: 'string',
        default: 'https://t4.ftcdn.net/jpg/06/44/64/49/360_F_644644908_uIYJYFIZE019oztZagHdxBOMyCfKSaHt.jpg'
    },
    foodTage: {
        type: "string",
    },
    catgeory:{
        type: "string",
    },
    code:{
        type: "string",
    },
    isAvailable:{
        type: Boolean,
        default: true,
    },
    resturnat:{
     type:mongoose.Schema.Types.ObjectId,
     ref:"resturant",
    },
    rating:{
        type:Number,
        default:5,
        min:1,
        max:5,
    },
    ratingCount:{
        type:"string",
    },
},

{ timestamps: true }
)

export const foodModel = mongoose.model('food', foodSchema)
export default foodModel;