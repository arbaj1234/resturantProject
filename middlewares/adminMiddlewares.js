import UserModel from "../models/userModel.js";

export const adminIsAuth = async (req, res, next) => {
    try {
        // get token
        const user= await UserModel.findById(req.body.id);
            if (user.usertype !== "admin") {

                return res.status(402).send({
                    success: false,
                    message: 'only admin access allowed'
                });
            }else{
                next();
            }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            succes: false,
            message: 'Error in Auth API',
            error,
        })
    }
}