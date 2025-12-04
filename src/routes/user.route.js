import { Router } from "express";
import multer from "multer";
import { OTPController } from "../controller/user/auth/otp.js";
import { loginController } from "../controller/user/auth/login.js";
import { signupController } from "../controller/user/auth/signup.js";
import { authenticateUser } from "../middleware/user.middleware.js";
import { applyCertificateController, getUserCertificatesController } from "../controller/user/certificate-apply.js";
import { getUserProfileController, updateUserProfileController } from "../controller/user/profile.js";

const router = Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const filefilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Only jpeg, jpg, png, pdf files are allowed'), false);
    }
};

const upload = multer({ storage: storage, fileFilter: filefilter });

router.post('/request-otp', OTPController);
router.post('/login', loginController);
router.post('/signup', signupController);
router.get('/profile', authenticateUser, getUserProfileController);
router.put('/profile/update', authenticateUser, updateUserProfileController);
router.post('/apply-certificate', authenticateUser, upload.array('documentUrl', ), applyCertificateController);
router.get('/certificates', authenticateUser, getUserCertificatesController);

export default router;