import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
      type: String,
    },
    phone: {
        type: String,
    },
    email: {
        type: String,
        unique: true
    },
    role: {
        type: String,
        enum: ['citizen', 'officer'],
        default: 'citizen'
    },
    otp: {
        type: String,
    }
});

const User = mongoose.model("User", userSchema);

export default User;