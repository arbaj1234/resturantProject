import categoryModel from "../models/categoryModel.js";

export const categoryController = async (req, res) => {
    try {
        const { title, imageUrl } = req.body;
        // validation
        if (!title) {
            return res.status(404).send({
                success: false,
                message: 'please provide category title or image',
            });
        }
        const newCategory = new categoryModel({ title, imageUrl });
        await newCategory.save();
        res.status(200).send({
            success: true,
            message: 'category created successfully',
            newCategory
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in category API',
            error,
        })
    }
}


export const getAllController=async(req,res)=>{
    try {
        const category=await categoryModel.find({});
        if(!category){
            return res.status(404).send({
                success: false,
                message: 'No category found',
            });
        }
    res.status(200).send({
        success:true,
        message: category.length,
        category
    });
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in category getAll  API',
            error,
        })
        
    }
}

export const UpdateCatController=async(req,res)=>{
    try {
        const category=await categoryModel.findByIdAndUpdate(req.params.id);
        if(!category){
            return res.status(404).send({
                success: false,
                message: 'No category found',
            });
        }
        res.status(200).send({
            success:true,
            message: 'category updated successfully',
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in UPDATE CAt  API',
            error,
        })
        
    }
}

export const deleteCatController=async(req,res)=>{
    try {
        const category=await categoryModel.findByIdAndDelete(req.params.id);
        if(!category){
            return res.status(404).send({
                success: false,
                message: 'please provide category id',
            });
        }
        res.status(200).send({
            success:true,
            message: 'category Delete successfully',
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: 'Error in DELETE CAt  API',
            error,
        })
    }
}