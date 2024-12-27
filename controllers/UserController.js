import UserModel from "../models/userModel.js";
import bcrypt from 'bcrypt';


export const getUserController = async (req, res) => {
    try {
        // find user
        const user = await UserModel.find({})
        if (!user) {
            return res.status(404).send({
                succes: false,
                message: 'User not found',
            });
        }
        // hinde password
        res.status(200).send({
            succes: true,
            message: 'User get succesfully',
            user,
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            succes: false,
            message: 'user controller'
        })
    }
}


export const UpdateUserController = async (req, res) => {
    try {

        // Find user
        const user = await UserModel.findById(req.params.id );
        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'User not found',
            });
        }

        const { userName, address, phone } = req.body;
        // Update fields only if they are provided
        if (userName) user.userName = userName;
        if (address) user.address = address;
        if (phone) user.phone = phone;

        // Save user
        await user.save();
        res.status(200).send({
            success: true,
            message: 'User updated successfully',
        });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).send({
            success: false,
            message: 'Error updating user',
            error: error.message
        });
    }
};

// export const resetPasswordController=async(req,res)=>{
//     try {
//         const {email,newPassword,answer}=req.body;

//         if(!email || !newPassword || !answer){
//             return res.status(403).send({
//                 success: false,
//                 message: 'please provide all fields'
//             });
//         }
//         const user=await UserModel.findOne({email,answer});
//         if(!user){
//             return res.status(403).send({
//                 success: false,
//                 message: 'User Not Found or invalid answer'
//             });
//         }
//         // hashing password
//         var salt=bcrypt.genSaltSync(10);
//         const hashedPassword = await crypt.hash(newPassword, salt);
//         user.password = hashedPassword;
//         await user.save();
//         res.status(200).send({
//             success: true,
//             message: "password Reset Successfully",
//         });
        
//     } catch (error) {
//         console.log(error);
//         res.status(500).send({
//             success: false,
//             message:'error in password REST API',
//             error
//         })
//     }
// }


export const resetPasswordController = async (req, res) => {
    try {
        const { email, newPassword, answer } = req.body;

        // Validate if all fields are provided
        if (!email || !newPassword || !answer) {
            return res.status(400).send({
                success: false,
                message: 'Please provide all fields'
            });
        }

        // Find user by email and security answer
        const user = await UserModel.findOne({ email, answer });
        if (!user) {
            return res.status(403).send({
                success: false,
                message: 'User Not Found or invalid answer'
            });
        }

        // Hash the new password
        const salt = await bcrypt.genSalt(10);  // Asynchronous salt generation
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        // Update the user's password
        user.password = hashedPassword;
        await user.save();

        res.status(200).send({
            success: true,
            message: 'Password reset successfully',
        });

    } catch (error) {
        console.error('Error resetting password:', error);
        res.status(500).send({
            success: false,
            message: 'Error in password reset API',
        });
    }
};

export const updatePasswordController=async(req,res)=>{
    try {
        const user=await UserModel.findById(req.params.id)
        if(!user){
            return res.status(404).send({
                succes: false,
                message:'User not found'
            })
        };
        // get data from user
      const {oldPassword,newPassword}=req.body;
      if(!oldPassword || !newPassword){
        return res.status(404).send({
            succes: false,
            message:'please provide old or new password'
        });
      }

      // check user password | compare password
      const isMatch=await bcrypt.compare(oldPassword,user.password);
      if(!isMatch){
        return res.status(404).send({
            succes: false,
            message:'invalid old password',
        });
      }
      // hashing password
      var salt=bcrypt.genSaltSync(10);
      const hashedPassword=await bcrypt.hash(newPassword, salt);
      user.password=hashedPassword;
      await user.save();
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'error update password'
        })
    }
}

export const deleteProfileController=async(req,res)=>{
    try {
        await UserModel.findByIdAndDelete(req.params.id)
        return res.status(200).send({
            success:true,
            message:'your account has been deleted'
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message:'Error in delete profile API'
        })
    }
}