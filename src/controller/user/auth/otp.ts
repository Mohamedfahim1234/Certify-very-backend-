import { Request, Response } from 'express';
import User from '../../../model/user.model';
import crypto from 'crypto';
import { sendMail } from "../mail";

function generateOTP() {
    const otp = crypto.randomInt(0, Math.pow(10, 6)).toString().padStart(6, '0');
    return otp;
}

export const OTPController = async (req: Request, res: Response) => {
    const { email } = req.body;

    try {
        if(!email){
            return res.status(400).json({ message: 'Email is required' });
        }
        
        const otp = generateOTP();

        await sendMail(email,`Your OTP for Login`,`<h3>Your OTP is <b>${otp}</b></h3>`,).catch(()=>res.status(401).json({message:'Error in sending mail'}));

        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(401).json({message: 'User not found'});
        }

        const user = await User.updateOne({ email }, { otp });

        return res.status(201).json({ message: 'OTP sent successfully', user });
    } catch (error: any) {
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}