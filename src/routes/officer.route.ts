import { Router } from "express";
import { signupController } from "../controller/officer/auth/signup";
import { loginController } from "../controller/officer/auth/login";
import { authenticateOffice } from "../middleware/officer.middleware";
import { getAllCertificatesController, updateCertificateStatusController } from "../controller/officer/certificate";
import { getOfficerProfileController, updateOfficerProfileController } from "../controller/officer/profile";

const Officerouter = Router();

Officerouter.post('/signup', signupController);
Officerouter.post('/login',loginController);
Officerouter.get('/profile',authenticateOffice, getOfficerProfileController);
Officerouter.put('/profile/update',authenticateOffice, updateOfficerProfileController);
Officerouter.get('/certificates',authenticateOffice, getAllCertificatesController);
Officerouter.put('/certificate/:certificateId/status',authenticateOffice, updateCertificateStatusController);

export default Officerouter;