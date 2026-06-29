const Goal = require("../models/Goal");

// =======================================
// Get All Goals
// =======================================
const getGoals = async(req, res) => {
    try {
        const goals = await Goal.find({
            user: req.user.id,
        }).sort({ createdAt: -1 });

        res.status(200).json(goals);
    } catch (error) {
        console.error("Get Goals Error:", error);

        res.status(500).json({
            message: "Server Error",
        });
    }
};

// =======================================
// Add Goal
// =======================================
const addGoal = async(req, res) => {
    try {
        const { name, target, saved, deadline } = req.body;

        if (!name || !target || !deadline) {
            return res.status(400).json({
                message: "Please fill all required fields",
            });
        }

        const goal = await Goal.create({
            user: req.user.id,
            name,
            target,
            saved: saved || 0,
            deadline,
        });

        res.status(201).json({
            message: "Goal Added Successfully",
            goal,
        });

    } catch (error) {
        console.error("Add Goal Error:", error);

        res.status(500).json({
            message: "Server Error",
        });
    }
};

// =======================================
// Update Goal
// =======================================
const updateGoal = async(req, res) => {
    try {
        const goal = await Goal.findOne({
            _id: req.params.id,
            user: req.user.id,
        });

        if (!goal) {
            return res.status(404).json({
                message: "Goal Not Found",
            });
        }

        const updatedGoal = await Goal.findByIdAndUpdate(
            req.params.id,
            req.body, {
                new: true,
                runValidators: true,
            }
        );

        res.status(200).json({
            message: "Goal Updated Successfully",
            goal: updatedGoal,
        });

    } catch (error) {
        console.error("Update Goal Error:", error);

        res.status(500).json({
            message: "Server Error",
        });
    }
};

// =======================================
// Delete Goal
// =======================================
const deleteGoal = async(req, res) => {
    try {
        const goal = await Goal.findOne({
            _id: req.params.id,
            user: req.user.id,
        });

        if (!goal) {
            return res.status(404).json({
                message: "Goal Not Found",
            });
        }

        await Goal.findByIdAndDelete(req.params.id);

        res.status(200).json({
            message: "Goal Deleted Successfully",
        });

    } catch (error) {
        console.error("Delete Goal Error:", error);

        res.status(500).json({
            message: "Server Error",
        });
    }
};

module.exports = {
    getGoals,
    addGoal,
    updateGoal,
    deleteGoal,
};