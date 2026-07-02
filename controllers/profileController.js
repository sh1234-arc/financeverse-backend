const User = require("../models/User");

// Get Profile
const getProfile = async(req, res) => {
    try {
        const user = await User.findById(req.user._id).select("-password");

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error("Get Profile Error:", error);

        res.status(500).json({
            message: "Server Error",
        });
    }
};

// Update Profile
const updateProfile = async(req, res) => {
    try {
        const {
            name,
            email,
            salary,
            company,
            role,
            experience,
            location,
        } = req.body;

        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        user.name = name;
        user.email = email;
        user.salary = salary;
        user.company = company;
        user.role = role;
        user.experience = experience;
        user.location = location;

        await user.save();

        res.status(200).json({
            message: "Profile updated successfully",
            user,
        });
    } catch (error) {
        console.error("Update Profile Error:", error);

        res.status(500).json({
            message: "Server Error",
        });
    }
};

module.exports = {
    getProfile,
    updateProfile,
};