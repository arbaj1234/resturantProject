import express from 'express';
import { isAuth } from '../middlewares/authMiddlewares.js';
import { CreateFoodController, deleteFoodController, getAllFoodController, getSingleFoodController, OrderStatusController, PlaceOrderController, updateFoodController } from '../controllers/foodController.js';
import { adminIsAuth } from '../middlewares/adminMiddlewares.js';


const router=express.Router();


router.post('/create',isAuth,CreateFoodController)

router.get('/getallfood',isAuth,getAllFoodController)

router.get('/getbyid/:id',isAuth,getSingleFoodController)

router.put('/update/:id',isAuth,updateFoodController)

router.delete('/deletefood/:id',isAuth,deleteFoodController)

// PLACE ORDER
router.post('/placeOrder',isAuth,PlaceOrderController)

// ORDER STATUS
router.put('/orderStatus/:id',adminIsAuth,isAuth,OrderStatusController)

export default router