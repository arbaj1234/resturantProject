import express from 'express';
import { deleteProfileController, getUserController, resetPasswordController, updatePasswordController, UpdateUserController } from '../controllers/userController.js';
import { isAuth } from '../middlewares/authMiddlewares.js';

const router=express.Router();

// get user
router.get('/getUsers',isAuth,getUserController)

// update user
router.put('/updateUser/:id',isAuth,UpdateUserController)

// RESET PASSWORD
router.post('/resetPassword',isAuth,resetPasswordController);

// UPDATE PASSWORD
router.put('/updatepassword/:id',isAuth,updatePasswordController);

router.delete('/deleteProfile/:id',isAuth,deleteProfileController)

export default router