import express from 'express';
import { isAuth } from '../middlewares/authMiddlewares.js';
import { createResturantController, deleteResturntController, getAllResturants, getResturantByIdController } from '../controllers/resturantController.js';


const router=express.Router();


router.post('/resturant',isAuth,createResturantController)


router.get('/getAll',isAuth,getAllResturants)

router.get('/getbyid/:id',isAuth,getResturantByIdController)

router.delete('/delete/:id',isAuth,deleteResturntController)


export default router