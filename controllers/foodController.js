import foodModel from "../models/foodmodel.js";
import orderModel from "../models/orderModel.js";

export const CreateFoodController = async (req, res) => {
    try {
        const {
            title,
            description,
            price,
            imageUrl,
            foodTage,
            category,
            code,
            isAvailable,
            restaurant,
            rating,
        } = req.body;
        if (!title || !description || !price || !restaurant) {
            return res.status(404).send({
                success: false,
                message: 'Please provide all fields'
            });
        }
        const newFood = new foodModel({
            title,
            description,
            price,
            imageUrl,
            foodTage,
            category,
            code,
            isAvailable,
            restaurant,
            rating,
        });
        await newFood.save();
        res.status(200).send({
            success: true,
            message: 'new food item created',
            newFood
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: 'Error in CREATE FOOD  API',
            error,
        })
    }
}

export const getAllFoodController = async (req, res) => {
    try {
        const foods = await foodModel.find({});

        if (!foods) {
            return res.status(404).send({
                success: false,
                message: 'no food items was found'
            });
        }
        res.status(200).send({
            success: true,
            totalFoods: foods.length,
            foods,
        });

    } catch (error) {
        res.status(500).send({
            success: false,
            message: 'Error in getAll FOOD  API',
            error,
        })
    }
}

export const getSingleFoodController = async (req, res) => {
    try {
        const foods = await foodModel.findById(req.params.id);
        if (!foods) {
            return res.status(404).send({
                success: false,
                message: 'please provide ID',
            });
        }
        res.status(200).send({
            success: true,
            foods
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: 'Error in get singale FOOD  API',
            error,
        })
    }
}

export const updateFoodController = async (req, res) => {
    try {
        const foods = await foodModel.findByIdAndUpdate(req.params.id)
        if (!foods) {
            return res.status(404).send({
                success: false,
                message: 'No category found',
            });
        }
        res.status(200).send({
            success: true,
            message: 'food updated successfully',
        });


    } catch (error) {
        res.status(500).send({
            success: false,
            message: 'Error in update FOOD  API',
            error,
        });
    }
}

export const deleteFoodController = async (req, res) => {
    try {
        const foods = await foodModel.findByIdAndDelete(req.params.id);
        if (!foods) {
            return res.status(404).send({
                success: false,
                message: 'please provide food id',
            });
        }
        res.status(200).send({
            success: true,
            message: 'food Delete successfully',
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: 'Error in delete FOOD  API',
            error,
        });
    }
}

export const PlaceOrderController = async (req, res) => {
    try {
        const { cart } = req.body;
        if (!cart) {
            return res.status(404).send({
                success: false,
                message: 'please food card or payment method',
            });
        }
        let total = 0;
        cart.map((i) => { total += i.price });
        const newOrder = new orderModel({
            foods: cart,
            payment:total,
            enum: req.body.id,
        });
        await newOrder.save();
        res.status(200).send({
            success: true,
            message: 'order place successfully',
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: 'Error in  place order  API',
            error,
        });
    }
}

export const OrderStatusController=async(req,res)=>{
    try {
        const orderId = req.params.id;
        if(!orderId){
            return  res.status(402).send({
                success: false,
                message: 'please provide valid order id',
            });
        }
        const {status} = req.body;
        const order=await orderModel.findByIdAndUpdate(
            orderId,
            {status},
            {new:true}
        )
        res.status(200).send({
            success: true,
            message: 'order updated successfully'
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: 'Error in order status  API',
            error,
        });
    }
}