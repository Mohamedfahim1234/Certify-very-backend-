import { Request, Response } from "express";
import { OfficerAuthenticatedRequest } from "../../middleware/officer.middleware.js";
import Certificate from "../../model/certicate.model.js";

export const getAllCertificatesController = async (req: OfficerAuthenticatedRequest, res: Response) => {
    try {
        const certificates = await Certificate.find();

        res.status(200).json({message: 'Certificates fetched successfully', certificates });
    } catch (error: any) {
        res.status(500).json({ message: 'Failed to fetch certificates', error: error.message });
    }
}

export const updateCertificateStatusController = async (req: OfficerAuthenticatedRequest, res: Response) => {
    const { certificateId } = req.params;
    const { status, remarks } = req.body;
    console.log(certificateId, status, remarks);

    try {
        const certificate = await Certificate.findById(certificateId);
        if (!certificate) {
            return res.status(404).json({ message: 'Certificate not found' });
        }

        if (!['approved', 'rejected', 'pending'].includes(status)) {
            return res.status(400).json({ message: 'Invalid status value' });
        }

        console.log('Current Status:', certificate.status, 'New Status:', status);
        if(status == 'approved'){
        certificate.status = status;
        await Certificate.findByIdAndUpdate(certificateId, { status, $push: { approvalHistory: { level: 'final', action: status, officer: req.user?.id, timestamp: new Date() } } });
        return res.status(200).json({ message: 'Certificate status updated successfully', certificate });
        }else if(status == 'rejected'){
            if(!remarks){
                return res.status(400).json({ message: 'Remarks are required for rejection' });
            }
            console.log('Rejection Remarks:', remarks);
            await Certificate.findByIdAndUpdate(certificateId, { status, $push: { approvalHistory: { level: 'final', action: status, officer: req.user?.id, timestamp: new Date(), remarks } } });
            return res.status(200).json({ message: 'Certificate status updated successfully', certificate });
        }
    } catch (error: any) {
        res.status(500).json({ message: 'Failed to update certificate status', error: error.message });
    }
}