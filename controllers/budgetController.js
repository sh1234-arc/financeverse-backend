const Budget = require("../models/Budget");

// ======================
// Get All Budgets
// ======================
const getBudgets = async(req, res) => {
    try {
        const budgets = await Budget.find({
            user: req.user.id,
        }).sort({ createdAt: -1 });

        res.status(200).json(budgets);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server Error",
        });
    }
};

// ======================
// Add Budget
// ======================
const addBudget = async(req, res) => {
    try {
        const { category, amount, month } = req.body;

        if (!category || !amount || !month) {
            return res.status(400).json({
                message: "Please fill all fields",
            });
        }

        const budget = await Budget.create({
            user: req.user.id,
            category,
            amount,
            month,
        });

        res.status(201).json({
            message: "Budget Added Successfully",
            budget,
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server Error",
        });
    }
};

// ======================
// Update Budget
// ======================
const updateBudget = async(req, res) => {
    try {
        const budget = await Budget.findOne({
            _id: req.params.id,
            user: req.user.id,
        });

        if (!budget) {
            return res.status(404).json({
                message: "Budget Not Found",
            });
        }

        const updatedBudget = await Budget.findByIdAndUpdate(
            req.params.id,
            req.body, {
                new: true,
                runValidators: true,
            }
        );

        res.status(200).json({
            message: "Budget Updated Successfully",
            budget: updatedBudget,
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server Error",
        });
    }
};

// ======================
// Delete Budget
// ======================
const deleteBudget = async(req, res) => {
    try {
        const budget = await Budget.findOne({
            _id: req.params.id,
            user: req.user.id,
        });

        if (!budget) {
            return res.status(404).json({
                message: "Budget Not Found",
            });
        }

        await Budget.findByIdAndDelete(req.params.id);

        res.status(200).json({
            message: "Budget Deleted Successfully",
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server Error",
        });
    }
};

module.exports = {
    getBudgets,
    addBudget,
    updateBudget,
    deleteBudget,
};