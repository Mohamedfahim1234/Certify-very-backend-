import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const secret = process.env.SECRET_KEY_SENIOR_OFFICER;

export interface SeniorAuthenticatedRequest extends Request {
    user?: {
        id: string;
        email: string;
    };
}

export const seniorAuthMiddleware = (req: SeniorAuthenticatedRequest, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    if(!secret){
        return res.status(500).json({message: 'Internal server error' });
    }

    try {
        const decoded = jwt.verify(token, secret) as { id: string; email: string; };
        req.user = { id: decoded.id, email: decoded.email };
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
}