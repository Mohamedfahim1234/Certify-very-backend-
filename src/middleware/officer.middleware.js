import jwt from 'jsonwebtoken';

export const authenticateOffice = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Token is missing' });
    }

    if(!process.env.SECRET_KEY){
        return res.status(401).json({ message: 'Internal server error'})
    }

    try {
        const decoded = jwt.verify(token,process.env.SECRET_KEY_OFFICER);
        req.user = decoded;
        next()
    } catch (error) {
        return res.status(500).json({message: 'Internal server error', error: error.message})
    }
}