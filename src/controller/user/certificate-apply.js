import Certificate from "../../model/certicate.model.js";

export const applyCertificateController = async (req, res) => {
    const userId = req.user.id;
    const applicantName = req.user.name;
    const { certificateType } = req.body;
    const documentUrl = req.files ?? [];
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
        
        const documentproof = documentUrl.map(file => `http://localhost:8000/${file.path}`);
        console.log(documentproof);

        const certificate = await Certificate.create({
            userId,
            applicantName,
            certificateType,
            documentUrl: documentproof
        });
        res.status(200).json({ message: 'Certificate application submitted successfully', certificate });
    } catch (error) {
        res.status(500).json({ message: 'Failed to apply for certificate', error: error.message });
    }
}

export const getUserCertificatesController = async (req, res) => {
    const userId = req.user.id;

    try {
        const certificates = await Certificate.find({ userId });
        res.status(200).json({ certificates });
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch certificates', error: error.message });
    }
}