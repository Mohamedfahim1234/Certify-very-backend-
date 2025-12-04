import User from "../../model/user.model.js";

export const getUserProfileController = async (req, res) => {
    const userId = req.user.id;

    if (!userId) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const user = await User.findById(userId).select('-otp');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        return res.status(200).json({ message: "User profile fetched successfully", user });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}

export const updateUserProfileController = async (req, res) => {
    const userId = req.user.id;
    const { name, phone } = req.body;
    if (!userId) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const updatedData = {};
        if (name) updatedData.name = name;
        if (phone) updatedData.phone = phone;

        const user = await User.findByIdAndUpdate(userId, updatedData, { new: true }).select('-otp');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        return res.status(200).json({ message: "User profile updated successfully", user });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}