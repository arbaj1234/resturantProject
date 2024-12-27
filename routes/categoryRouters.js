import express from 'express';
import { isAuth } from '../middlewares/authMiddlewares.js';
import { categoryController, deleteCatController, getAllController, UpdateCatController } from '../controllers/categoryController.js';


const router=express.Router();


router.post('/category',isAuth,categoryController)

router.get('/category',isAuth,getAllController)

router.put('/update/:id',isAuth,UpdateCatController)

router.delete('/delete/:id',isAuth,deleteCatController)
export default router