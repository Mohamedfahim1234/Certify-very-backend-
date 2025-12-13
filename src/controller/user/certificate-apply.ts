import { Response } from "express";
import { AuthenticatedRequest } from "../../middleware/user.middleware.js";
import Certificate from "../../model/certicate.model.ts";
import mongoose from "mongoose";

export const applyCertificateController = async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user?.id;
    const applicantName = req.user?.name;
    const { certificateType } = req.body;
    const documentUrl = (req.files as Express.Multer.File[]) ?? [];
    console.log(req.body);
    console.log(req.files);

    try {
        if (!userId) {
            return res.status(400).json({ message: 'User ID is required' });
        }
        if (!applicantName) {
            return res.status(400).json({ message: 'Applicant name is required' });
        }
        if (!certificateType) {
            return res.status(400).json({ message: 'Certificate type is required' });
        }

        if (!documentUrl || documentUrl.length === 0) {
            return res.status(400).json({ message: 'Document URL is required' });
        }
        
        const documentproof = documentUrl.map((file: Express.Multer.File) => `http://localhost:8000/${file.path}`);
        console.log(documentproof);

        const certificate = await Certificate.create({
            userId: new mongoose.Types.ObjectId(userId),
            applicantName,
            certificateType,
            documentUrl: documentproof
        });
        res.status(200).json({ message: 'Certificate application submitted successfully', certificate });
    } catch (error: any) {
        res.status(500).json({ message: 'Failed to apply for certificate', error: error.message });
    }
}

export const getUserCertificatesController = async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user?.id;

    if (!userId) {
        return res.status(400).json({ message: 'User ID is required' });
    }

    try {
        const certificates = await Certificate.find({userId});
        console.log(certificates, userId);
        res.status(200).json({ certificates });
    } catch (error: any) {
        res.status(500).json({ message: 'Failed to fetch certificates', error: error.message });
    }
}