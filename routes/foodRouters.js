import express from 'express';
import { isAuth } from '../middlewares/authMiddlewares.js';
import { CreateFoodController, deleteFoodController, getAllFoodController, getSingleFoodController, updateFoodController } from '../controllers/foodController.js';


const router=express.Router();


router.post('/create',isAuth,CreateFoodController)

router.get('/getallfood',isAuth,getAllFoodController)

router.get('/getbyid/:id',isAuth,getSingleFoodController)

router.put('/update/:id',isAuth,updateFoodController)

router.delete('/deletefood/:id',isAuth,deleteFoodController)

export default router