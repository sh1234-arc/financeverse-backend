const User = require("../models/User");

// Get Settings
const getSettings = async(req, res) => {
    try {
        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        res.status(200).json({
            name: user.name,
            salary: user.salary,
            currency: user.currency,
            darkMode: user.darkMode,
        });
    } catch (error) {
        console.error("Get Settings Error:", error);

        res.status(500).json({
            message: "Server Error",
        });
    }
};

// Update Settings
const updateSettings = async(req, res) => {
    try {
        const {
            name,
            salary,
            currency,
            darkMode,
        } = req.body;

        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        user.name = name;
        user.salary = salary;
        user.currency = currency;
        user.darkMode = darkMode;

        await user.save();

        res.status(200).json({
            message: "Settings updated successfully",
        });
    } catch (error) {
        console.error("Update Settings Error:", error);

        res.status(500).json({
            message: "Server Error",
        });
    }
};

module.exports = {
    getSettings,
    updateSettings,
};