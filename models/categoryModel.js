import mongoose from "mongoose";
const categorySchema=new mongoose.Schema({
    title:{
        type: 'string',
        required:[true,'category title is required'],
    },
    imageUrl:{
        type: 'string',
        default: 'https://t4.ftcdn.net/jpg/06/44/64/49/360_F_644644908_uIYJYFIZE019oztZagHdxBOMyCfKSaHt.jpg'
    },
},
{timestamps:true}
)

export const categoryModel = mongoose.model('category', categorySchema)
export default categoryModel;