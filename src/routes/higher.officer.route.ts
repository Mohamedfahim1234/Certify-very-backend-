import { Router } from "express";
import { loginController } from "../controller/higher-officer/auth/login";
import { signupController } from "../controller/higher-officer/auth/signup";
import { getAllCertificatesController, updateCertificateStatusController } from "../controller/higher-officer/certificate";
import { getHigherProfileController, updateHigherProfileController } from "../controller/higher-officer/profile";
import { higherAuthMiddleware } from "../middleware/higher.middleware";
import { forgotPasswordController } from "../controller/higher-officer/auth/forgotpassword";

const higherRouter = Router();

higherRouter.post('/login', loginController);
higherRouter.post('/signup', signupController);
higherRouter.get('/certificates/list', higherAuthMiddleware, getAllCertificatesController);
higherRouter.get('/profile', higherAuthMiddleware, getHigherProfileController);
higherRouter.put('/profile/update', higherAuthMiddleware, updateHigherProfileController);
higherRouter.put('/certificate/status/update/:certificateId', higherAuthMiddleware, updateCertificateStatusController);
higherRouter.put('/forgot-password', forgotPasswordController);

export default higherRouter;