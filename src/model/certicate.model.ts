import mongoose from 'mongoose';

export interface ICertificate extends mongoose.Document {
    userId: mongoose.Types.ObjectId;
    applicantName: string;
    certificateType: string;
    documentUrl: string[];
    status: 'pending' | 'approved' | 'rejected';
    appliedAt: Date;
    approvalHistory: {
        level: string;
        action: 'approved' | 'rejected';
        officer: string;
        timestamp: Date;
        remarks?: string;
    }[];
    createdAt: Date;
    updatedAt: Date;
};

const certificateSchema = new mongoose.Schema<ICertificate>({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    applicantName: { type: String, required: true },
    certificateType: { type: String, required: true },
    documentUrl: { type: [String], required: true },
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
    appliedAt: { type: Date, default: Date.now },
    approvalHistory: [{
        level: { type: String },
        action: { type: String, enum: ['approved', 'rejected'] },
        officer: { type: String },
        timestamp: { type: Date },
        remarks: { type: String }
    }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const Certificate = mongoose.model<ICertificate>('Certificate', certificateSchema);

export default Certificate;