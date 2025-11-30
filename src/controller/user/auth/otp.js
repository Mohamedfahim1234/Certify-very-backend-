import User from '../../../model/user.model.js';
import crypto from 'crypto';
import { sendMail } from "../mail.js";

function generateOTP() {
    const otp = crypto.randomInt(0, Math.pow(10, 6)).toString().padStart(6, '0');
    return otp;
}

export const OTPController = async (req, res) => {
    const { email } = req.body;

    try {
        if(!email){
            return res.status(400).json({ message: 'Email is required' });
        }
        
        const otp = generateOTP();

        await sendMail(email,`Your OTP for Login`,`<h3>Your OTP is <b>${otp}</b></h3>`,).catch(()=>res.status(401).json({message:'Error in sending mail'}));

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            await User.updateOne({ email }, { otp });
            return res.status(200).json({ message: 'OTP resent successfully' });
        }

        const user = await User.create({ email, otp });
        return res.status(201).json({ message: 'OTP sent successfully', user });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}