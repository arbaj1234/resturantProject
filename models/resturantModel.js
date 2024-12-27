import mongoose from "mongoose";

const resturantSchema=new mongoose.Schema({
    title:{
        type: 'string',
        required: [true,"Resturant title is required"]
    },
    imageUrl:{
        type: 'string',
    },
    foods:{type: Array},
    time:{
        type: 'string',
    },
    pickup:{
        type: 'Boolean',
        default:true
    },
    delivery:{
        type: 'Boolean',
        default:true
    },
    isOpen:{
        type: 'Boolean',
        default:true
    },
    logoUrl:{
        type: 'String',
    },
    rating:{
        type: Number,
        default:1,
        min:1,
        max:5,
    },
    ratingCount:{type: String},
    code:{
        type:String,
    },
    coords:{
        id:{type:String},
        latitude:{type:Number},
        latitudeDelta:{type:Number},
        longitude:{type:Number},
        longitudeDelta:{type:Number},
        address:{type:String},
        title:{type:String}
    }
},
{timestamps:true},
);

export const resturantModel = mongoose.model('resturant', resturantSchema)
export default resturantModel;