import Certificate from "../../model/certicate.model.js";

export const applyCertificateController = async (req, res) => {
    const userId = req.user.id;
    const { certificateType } = req.body;
    const aadharUrl = req.files['aadharUrl'] ? req.files['aadharUrl'][0].path : null;
    const documentUrl = req.files['documentUrl'] ? req.files['documentUrl'][0].path : null;
    console.log(req.body);

    try {
        if (!certificateType) {
            return res.status(400).json({ message: 'Certificate type is required' });
        }
        if (!aadharUrl) {
            return res.status(400).json({ message: 'Aadhar URL is required' });
        }
        if (!documentUrl) {
            return res.status(400).json({ message: 'Document URL is required' });
        }
        const certificate = await Certificate.create({
            userId,
            certificateType,
            aadharUrl,
            documentUrl
        });
        res.status(201).json({ message: 'Certificate application submitted successfully', certificate });
    } catch (error) {
        res.status(500).json({ message: 'Failed to apply for certificate', error: error.message });
    }
}