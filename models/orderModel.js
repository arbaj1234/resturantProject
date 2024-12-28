import mongoose from "mongoose";

const orderSchema=new mongoose.Schema({
foods:[
    {type:mongoose.Schema.Types.ObjectId,ref:'Foods'}
],
payment:{},
buyer:{
    type:String,
    enum:['preparing','prepare','on the way','delivered'],
    default:'preparing',
},
},
{timestamps: true}
)

export const orderModel=mongoose.model('Order', orderSchema);
export default orderModel

