import { Router } from "express";
import { signupController } from "../controller/officer/auth/signup.js";
import { loginController } from "../controller/officer/auth/login.js";
import { authenticateOffice } from "../middleware/officer.middleware.js";
import { getAllCertificatesController, updateCertificateStatusController } from "../controller/officer/certificate.js";
import { getOfficerProfileController, updateOfficerProfileController } from "../controller/officer/profile.js";

const Officerouter = Router();

Officerouter.post('/signup', signupController);
Officerouter.post('/login',loginController);
Officerouter.get('/profile',authenticateOffice, getOfficerProfileController);
Officerouter.put('/profile/update',authenticateOffice, updateOfficerProfileController);
Officerouter.get('/certificates',authenticateOffice, getAllCertificatesController);
Officerouter.put('/certificate/:certificateId/status',authenticateOffice, updateCertificateStatusController);

export default Officerouter;