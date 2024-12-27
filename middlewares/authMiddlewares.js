import JWT from 'jsonwebtoken';
import UserModel from '../models/userModel.js';

export const isAuth = async (req, res, next) => {
    try {
        // get token
        const token = req.headers['authorization'].split(' ')[1];
        JWT.verify(token, process.env.JWT_SECRET, (err, decode) => {
            if (err) {

                return res.status(402).send({
                    success: false,
                    message: 'Un-Authorized User'
                });
            }else{
                req.body.id=decode.id;
                next();
            }
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            succes: false,
            message: 'Error in Auth API',
            error,
        })
    }
}