import { response } from "express";
import resturantModel from "../models/resturantModel.js";

export const createResturantController=async(req,res)=>{
    try {
        const {title,imageUrl,foods,time,pickup,delivery,isOpen,logoURL,rating,ratingCount,code,coords}=req.body;
        // validation
        if(!title || !coords){
            return res.status(404).send({
                success: false,
                message: 'please provide all filde'
            })
        }
        const newResturant = new resturantModel({title,imageUrl,foods,time,pickup,delivery,isOpen,logoURL,rating,ratingCount,code,coords});
        await newResturant.save();

        res.status(201).send({
            success: true,
            message:'new resturant saved successfully'
        })

        
    } catch (error) {
        console.log(error);
        res.status(404).send({
            success: false,
            message:'Error in creating API'
        })
    }
}


export const getAllResturants=async(req,res)=>{
    try {
        const resturants=await resturantModel.find({});
        if(!resturants){
            return res.status(404).send({
                success: false,
                message:'no resturants available'
            })
        }
        res.status(200).send({
            success: true,
            totalCount: resturants.length,
            resturants,
        });
    } catch (error) {
        console.log(error);
        res.status(404).send({
            success: false,
            message:'Error in getAllResturants API',
            error
        })
    }
}

export const getResturantByIdController=async(req,res)=>{
    try {
        const resturant=await resturantModel.findById(req.params.id)
        if(!resturant){
            return res.status(404).send({
                success: false,
                message:'please provide RESTURANT ID'
            });
        }
        res.status(200).send({
            success: true,
            resturant,
        })
        
    } catch (error) {
        console.log(error);
        response.status(500).send({
            success:false,
            message:'Error in get by ID'
        })
    }
}

export const deleteResturntController=async(req,res)=>{
    try {
        const resturant=await resturantModel.findByIdAndDelete(req.params.id)
        if(!resturant){
            return res.status(404).send({
                success: false,
                message:'No Resturant Found OR provide Resturant ID'
            })
        }
        res.status(200).send({
            success: true,
            message: 'Resturant deleted successfully'
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message:'Error in deleteResturntController API'
        })
    }
}