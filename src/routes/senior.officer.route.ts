import Router from 'express';
import { loginController } from '../controller/senior-officer/auth/login';
import { signupController } from '../controller/senior-officer/auth/signup';
import { getAllCertificatesController, updateCertificateStatusController } from '../controller/senior-officer/certificate';
import { getSeniorProfileController, updateSeniorProfileController } from '../controller/senior-officer/profile';
import { seniorAuthMiddleware } from '../middleware/senior.middleware';
import { forgotPasswordController } from '../controller/senior-officer/auth/forgotpassword';

const seniorRouter = Router();

seniorRouter.post('/login', loginController);
seniorRouter.post('/signup', signupController);
seniorRouter.get('/certificates/list', seniorAuthMiddleware, getAllCertificatesController);
seniorRouter.get('/profile', seniorAuthMiddleware, getSeniorProfileController);
seniorRouter.put('/profile/update', seniorAuthMiddleware, updateSeniorProfileController);
seniorRouter.put('/certificate/status/update/:certificateId', seniorAuthMiddleware, updateCertificateStatusController);
seniorRouter.put('/forgot-password', forgotPasswordController);

export default seniorRouter;