import { Router } from "express";
import multer from "multer";
import { OTPController } from "../controller/user/auth/otp.js";
import { loginController } from "../controller/user/auth/login.js";
import { authenticateUser } from "../middleware/user.middleware.js";
import { applyCertificateController } from "../controller/user/certificate-apply.js";

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
router.post('/apply-certificate', authenticateUser, upload.fields([{ name: 'aadharUrl', maxCount: 1 }, { name: 'documentUrl', maxCount: 1 }]), applyCertificateController);

export default router;