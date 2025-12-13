import { Request, Response } from 'express';
import User from '../../../model/user.model.js';

export const signupController = async (req: Request, res: Response) => {
    const { name, phone, email, role } = req.body;

    if(!name){
        return res.status(401).json({message:'Name is required'});
    }

    if(!phone){
        return res.status(401).json({message:'Phone is required'});
    }

    if(!email){
        return res.status(401).json({message:'Email is required'});
    }

    if(!role){
        return res.status(401).json({message:'Role is required'});
    }

    try{
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(409).json({message: 'User with this email already exists'});
        }

        const user = await User.create({name, phone, email, role });
        return res.status(200).json({message: 'User registered successfully', user});
    }catch(error: any){
        return res.status(500).json({message: 'Internal server error', error: error.message});
    }
}