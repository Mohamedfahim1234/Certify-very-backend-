import { Router } from "express";
import multer from "multer";
import { OTPController } from "../controller/user/auth/otp";
import { loginController } from "../controller/user/auth/login";
import { signupController } from "../controller/user/auth/signup";
import { authenticateUser } from "../middleware/user.middleware";
import { applyCertificateController, getUserCertificatesController } from "../controller/user/certificate-apply";
import { getUserProfileController, updateUserProfileController } from "../controller/user/profile";
// import { ask, ingest } from "../controller/ai/rag";

const router = Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ 
    storage,
     fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        return cb(new Error('Only JPEG, PNG images and PDF files are allowed'));
    }
}
});

router.post('/request-otp', OTPController);
router.post('/login', loginController);
router.post('/signup', signupController);
router.get('/profile', authenticateUser, getUserProfileController);
router.put('/profile/update', authenticateUser, updateUserProfileController);
router.post('/apply-certificate', authenticateUser, upload.array('documentUrl', ), applyCertificateController);
router.get('/certificates', authenticateUser, getUserCertificatesController);
// router.post('/ingest',authenticateUser, ingest);
// router.post('/ask', authenticateUser, ask);

export default router;